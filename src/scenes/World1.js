class World1 extends Phaser.Scene {
    constructor() {
        super("world1Scene");
    }

    preload() {
        // load audio
        this.load.audio('Jump_noise', './assets/Jump.wav');
        this.load.audio('Take_Damage', './assets/Damage.wav');
        this.load.audio('Game_over', './assets/Game_Over.wav');
        this.load.audio('Low_C_Chord', './assets/Low_C_Chord.wav');


        // load images, spritesheets, and tilemaps
        this.load.image('tiles1', './assets/tilesheet1.png');

        this.load.tilemapTiledJSON('map1', './assets/world1.json');
        //this.load.image('spike', './assets/spike.png');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('portal', './assets/portal.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
        //this.load.image('LowChordC', './assets/Low_C_Major_Chord.png');
        this.load.spritesheet('enemy', './assets/RightFacingEnemy1.png', {frameWidth: 108, frameHeight: 128, startFrame: 0, endFrame: 4});

        //bullet image
        this.load.image('bullet', './assets/bullet.png');
    }

    create() {
        // base settings for this scene
        gameOver = false;
        this.length = 100*32;
        this.height = 100*32;
        this.count = 0;
        this.physics.world.gravity.y = 2000;
        
        // Game Over music plays when player dies
        this.Game_over = this.sound.add('Game_over', {volume: 0.5});

        // background
        //this.add.image(0, 0,'background').setOrigin(0, 0);
        // move keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //this.add.text(84, 84, "Pick up the musical chord while avoiding the spikes");


        // map
        const map = this.make.tilemap({ key: 'map1' });
        const tileSet = map.addTilesetImage('tile_sheet_1', 'tiles1');
        const backgroundLayer = map.createLayer("Background", tileSet, 0, 96).setScrollFactor(0.5); // background layer
        const groundLayer = map.createLayer("Ground", tileSet, 0, 96); // background layer
        this.platforms = map.createLayer('Platforms', tileSet, 0, 96);
        this.platforms.setCollisionByExclusion(-1, true);

        // player
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3, first: 0}),
            frameRate: 1,
            repeat: -1
        });
        this.player = new Player(this, 32, 96*32, 'player', 0, keyLEFT, keyRIGHT, keyUP, keySPACE, this.length, this.height).setOrigin(0,0);
        this.player.play('idle');

        // set up camera
        const viewH = 640;
        const viewW = 800;
        //this.cam = this.cameras.main.setViewport(0, 0, viewW, viewH).setZoom(1);
        this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels + 96);
        this.cameras.main.startFollow(this.player);

        // collision
        this.physics.add.collider(this.player, this.platforms);

        // spikes
        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            let sSprite = this.spikes.create(spike.x, spike.y + 96 - spike.height, 'spike').setOrigin(0);
            sSprite.body.setSize(spike.width, spike.height - 16).setOffset(0, 32);
        });
        this.physics.add.collider(this.player, this.spikes, this.looseHealth, null, this);

        // portal
        // this.portal = new Portal(this, this.length - 64, 5*64, 'portal', 0, 'hubScene').setOrigin(0);
        // this.anims.create({
        //     key: 'portal',
        //     frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5, first: 0}),
        //     frameRate: 2,
        //     repeat: -1
        // });
        // this.portal.play('portal');
        // this.physics.add.collider(this.player, this.portal, this.switchScene, null, this);

        //item
        // this.item = new Item(this, this.length - 256, 5*64, 'LowChordC', 0, 'Low_C_chord').setOrigin(0);
        // this.physics.add.collider(this.player, this.item, this.collectChord, null, this);

        // enmmey creation
        this.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3, first: 0}),
            frameRate: 1,
            repeat: -1
        });

        // create enemies
        this.enemy = []
        let enemyObjects = map.filterObjects("Enemies", obj => obj.name === "");
        let index = 0;
        enemyObjects.map((element) => {
            this.enemy[index] = new Enemy(this, element.x, element.y, 'enemy', 0, this.length, this.height).setOrigin(0,0).setImmovable(true); 
            index += 1;
        });
        this.enemies = this.physics.add.group(this.enemy);
        this.physics.add.collider(this.enemies, this.platforms);
        // do damage if player collides with enemies
        this.overlap = this.physics.add.overlap(this.player, this.enemies, (obj1, obj2) => {
            if(obj1.x - obj2.x  < 0)
                {obj1.direction = 'left'}
            else
                {obj1.direction = 'right'}
            this.overlap.active = false;
            this.player.life -= 1;
                this.timedEvent = this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        this.player.alpha = 1;
                        this.player.hitted = false;
                        this.player.lifeHandler = false;
                        this.overlap.active = true;
                    },
                    loop: false
                })
        })

        // detection for bullets and enemies
        this.add.text(20, 20, "Level 1").setScrollFactor(0);
        this.healthText = this.add.text(680, 20, "Health: " + 3).setScrollFactor(0);
    }

    update() {
        //this.healthText.setText("Health: " + this.player.health);
        if (!gameOver) {
            for (let i = 0; i < this.enemy.length; i++) {
                this.player.update(this.enemies, this.platforms);
                this.enemy[i].update(this.player);
            }
            this.checkHealth();
            this.healthText.text = "Health: " + this.player.life;
        } else {
            if (this.count < 1) {
                this.Game_over.play();
                x = this.player.x;
                y = game.config.height/2;
                this.count += 1;
            }
            this.add.text(x, y, 'Game Over', scoreConfig).setOrigin(0.5);
            this.add.text(x, y + 32, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.Game_over.stop();
                this.scene.restart();
            }
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.Game_over.stop();
                this.scene.start('menuScene');
            }
        }
    }

    checkHealth() {
        if (this.player.life <= 0) {
            this.player.life = 0;
            gameOver = true;
        }
    }

    looseHealth() {
        this.player.life -= 1;
    }
    // switchScene() {
    //     //this.player.destroy();
    //     this.scene.start('hubScene');
    // }
    // collectChord() {
    //     this.sound.play('Low_C_Chord');
    //     this.item.addToItems(chords);
    //     this.item.destroy();
    // }
}