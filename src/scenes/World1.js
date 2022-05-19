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
        this.load.image('tiles1', './assets/hub_tilesheet.png');
        this.load.tilemapTiledJSON('map1', './assets/world1.json');
        //this.load.image('spike', './assets/spike.png');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 64, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('portal', './assets/portal.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
        //this.load.image('LowChordC', './assets/Low_C_Major_Chord.png');
        this.load.spritesheet('enemy', './assets/RightFacingEnemy1.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
    }

    create() {
        // base settings for this scene
        gameOver = false;
        this.length = 50*64;
        this.height = 51*64;
        this.count = 0;
        
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
        this.add.text(20, 20, "Level 1");
        this.healthText = this.add.text(700, 20, "Health: " + 3).setScrollFactor(0);
        //this.add.text(84, 84, "Pick up the musical chord while avoiding the spikes");


        // map
        const map = this.make.tilemap({ key: 'map1' });
        const tileSet = map.addTilesetImage('world1_tiles', 'tiles1');
        const platforms = map.createLayer('Platforms', tileSet, 0, 200);
        platforms.setCollisionByExclusion(-1, true);

        // player
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3, first: 0}),
            frameRate: 1,
            repeat: -1
        });
        this.player = new Player(this, 64, 49*64, 'player', 0, keyLEFT, keyRIGHT, keyUP, keySPACE, this.length, this.height).setOrigin(0,0);
        this.player.play('idle');

        // set up camera
        const viewH = 640;
        const viewW = 800;
        this.cam = this.cameras.main.setViewport(0, 0, viewW, viewH).setZoom(1);
        this.cam.setBounds(0,0,this.length, this.height + 64);
        this.cam.startFollow(this.player);

        // collision
        this.physics.add.collider(this.player, platforms);

        // spikes
        // this.spikes = this.physics.add.group({
        //     allowGravity: false,
        //     immovable: true
        // });
        // map.getObjectLayer('Spikes').objects.forEach((spike) => {
        //     let sSprite = this.spikes.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0);
        //     sSprite.body.setSize(spike.width, spike.height - 32).setOffset(0, 32);
        // });
        // this.physics.add.collider(this.player, this.spikes, this.looseHealth, null, this);

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
        this.enemy = new Enemy(this, 128, 49*64, 'enemy', 0, this.length, this.height).setOrigin(0,0);
        this.enemy.play('idle2');
        this.physics.add.collider(this.enemy, platforms);
    }

    update() {
        this.healthText.setText("Health: " + this.player.health);
        if (!gameOver) {
            this.player.update();
            this.enemy.update(this.player);
            if (this.player.y >= this.height) { // falling off a ledge
                gameOver = true;
            }
        } else {
            if (this.count < 1) {
                this.Game_over.play();
                x = this.player.x;
                y = game.config.height/2;
                this.count += 1;
            }
            this.add.text(x, y, 'Game Over', scoreConfig).setOrigin(0.5);
            this.add.text(x, y + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
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

    looseHealth() {
        this.player.health -= 1;
        this.sound.play('Take_Damage');
        if (this.player.health <= 0) {
            this.player.health = 0;
            gameOver = true;
        }
        this.player.x -= 50;
        this.player.setVelocity(0,0);
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