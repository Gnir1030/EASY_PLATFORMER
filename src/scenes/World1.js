class World1 extends Phaser.Scene {
    constructor() {
        super("world1Scene");
    }

    preload() {
        // load audio
        this.load.audio('Jump_noise', './assets/Jump.wav');
        this.load.audio('Game_over', './assets/Game_Over.wav');
        this.load.audio('Low_C_Chord', './assets/Low_C_Chord.wav');
        this.load.audio('World_1', './assets/World_1.wav');


        // load images, spritesheets, and tilemaps
        this.load.image('tiles1', './assets/tilesheet1.png');
        this.load.spritesheet("tile1_sheet", "./assets/tilesheet1.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.tilemapTiledJSON('map1', './assets/world1.json');
        //this.load.image('spike', './assets/spike.png');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 64, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('portal', './assets/portal.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
        //this.load.image('LowChordC', './assets/Low_C_Major_Chord.png');
        this.load.spritesheet('enemy', './assets/blueDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
        this.load.spritesheet('enemy2', './assets/purpleDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
        //bullet image
        this.load.image('bullet1', './assets/bullet1.png');
        this.load.image('bullet2', './assets/bullet2.png');
        this.load.image('chord1', './assets/blueStar.png');
        this.load.image('chord2', './assets/purpleStar.png');
        //this.load.spritesheet('bullet', './assets/bullet.png', {frameWidth: 17, frameHeight: 11, startFrame: 0, endFrame: 1});
    }

    create() {
        // World 1 Music
        this.World_1_music = this.sound.add('World_1', {volume: 0.50});
        this.World_1_music.play();
        this.World_1_music.loop = true;

        // base settings for this scene
        gameOver = false;
        this.weapon;
        this.length = 100*32;
        this.height = 100*32;
        this.count = 0;
        this.physics.world.gravity.y = 2000;
        
        // Game Over music plays when player dies
        this.Game_over = this.sound.add('Game_over', {volume: 0.5});

        // move keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
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

        let playerPos  = map.findObject("Enemies", obj => obj.name === "player");
        this.player = new Player(this, playerPos.x, playerPos.y, 'player', 0, keyA, keyD, keyW, keySPACE, keyLEFT, keyRIGHT, this.length, this.height).setOrigin(0,0);
        this.player.play('idle');
        this.player.setMaxVelocity(1000, 900);
        this.UI = new UI(this, 0, 0, 'bullet1', 0).setOrigin(0,0);

        // set up camera
        const viewH = 640;
        const viewW = 800;
        this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels + 96);
        this.cameras.main.startFollow(this.player);

        // collision with platforms
        this.physics.add.collider(this.player, this.platforms);

        // spikes
        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            let sSprite = this.spikes.create(spike.x, spike.y + 96 - spike.height, 'tile1_sheet', 20).setOrigin(0);
            sSprite.body.setSize(spike.width, spike.height - 16).setOffset(0, 16);
        });

        this.collider = this.physics.add.overlap(this.player, this.spikes, (obj1, obj2) => {
            if(obj1.x - obj2.x  < 0)
                {obj1.enemyDir = 'right'}
            else
                {obj1.enemyDir = 'left'}
            this.collider.active = false;
            this.overlap.active = false;
            this.overlap2.active = false;
            this.player.hitted = true;
            this.player.shadow = true;
            this.player.life -= 1;
                this.timedEvent = this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        this.player.alpha = 1;
                        this.player.hitted = false;
                        this.collider.active = true;
                        this.overlap.active = true;
                        this.overlap2.active = true;
                    },
                    loop: false
                })
        });

        // set up health pickups
        this.hPickUp = map.createFromObjects("Health", {
            name: "",
            key: "tile1_sheet",
            frame: 13
        });
        this.physics.world.enable(this.hPickUp, Phaser.Physics.Arcade.STATIC_BODY);
        this.hGroup = this.add.group(this.hPickUp);
        this.hSFXManager = this.add.particles('tile1_sheet', 6);
        this.hSFX = this.hSFXManager.createEmitter({
            follow: this.player,
            quantity: 20,
            scale: {start: 1.0, end: 0.0},  // start big, end small
            speed: {min: 50, max: 100}, // speed up
            lifespan: 800,   // short lifespan
            on: false   // do not immediately start, will trigger in collision
        });
        this.physics.add.overlap(this.player, this.hGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            this.hSFX.explode();
            this.player.life += 1; // add 1 to player health
        }, null, this);

        // portal
        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5, first: 0}),
            frameRate: 2,
            repeat: -1
        });
        let portalPos  = map.findObject("Items", obj => obj.name === "portal");
        this.portal = new Portal(this, portalPos.x, portalPos.y, 'portal', 0, 'hubScene').setOrigin(0);
        this.portal.play('portal');
        this.physics.add.collider(this.player, this.portal, this.switchScene, null, this);

        // purple chord item
        let chordPos2 = map.findObject("Items", obj => obj.name === "purple_chord");
        this.chord2 = new Item(this, chordPos2.x, chordPos2.y, 'chord2', 0, 2).setOrigin(0);
        this.physics.add.overlap(this.player, this.chord2, this.collectChord, null, this);
        this.chordTuto2 = this.add.text(chordPos2.x - 50, chordPos2.y - 50, "PRESS (T) to recharge bullets");

        // blue chord item
        let chordPos = map.findObject("Items", obj => obj.name === "blue_chord");
        this.chord = new Item(this, chordPos.x, chordPos.y, 'chord1', 0, 1).setOrigin(0);
        this.physics.add.overlap(this.player, this.chord, this.collectChord, null, this);
        this.chordTuto = this.add.text(chordPos.x - 50, chordPos.y - 50, "PRESS (T) to recharge bullets");

        // enmmey creation
        this.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle3',
            frames: this.anims.generateFrameNumbers('enemy2', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        // create enemies
        this.enemy = []
        let enemyObjects = map.filterObjects("Enemies", obj => obj.name === "");
        let enemyObjects2 = map.filterObjects("Enemies", obj => obj.name === "purple");
        let index = 0;
        enemyObjects.map((element) => {
            this.enemy[index] = new Enemy(this, element.x, element.y, 'enemy', 0, this.length, this.height, 1).setOrigin(0,0).setImmovable(true); 
            this.enemy[index].play('idle2');
            index += 1;
        });
        enemyObjects2.map((element) => {
            this.enemy[index] = new Enemy(this, element.x, element.y, 'enemy2', 0, this.length, this.height, 2).setOrigin(0,0).setImmovable(true); 
            this.enemy[index].play('idle3');
            index += 1;
        });
        this.enemies = this.physics.add.group(this.enemy);
        this.physics.add.collider(this.enemies, this.platforms);

        // do damage if player collides with enemies
        this.overlap = this.physics.add.overlap(this.player, this.enemies, (obj1, obj2) => {
            if(obj1.x - obj2.x  < 0)
                {obj1.enemyDir = 'right'}
            else
                {obj1.enemyDir = 'left'}
            this.collider.active = false;
            this.overlap.active = false;
            this.overlap2.active = false;
            this.player.hitted = true;
            this.player.life -= 1;
            this.player.shadow = true;
                this.timedEvent = this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        this.player.alpha = 1;
                        this.player.hitted = false;
                        this.collider.active = true;
                        this.overlap.active = true;
                        this.overlap2.active = true;
                    },
                    loop: false
                })
        });

        // add instruction text
        this.add.text(20, 20, "Level 1").setScrollFactor(0);
        this.healthText = this.add.text(680, 20, "Health: " + 3).setScrollFactor(0);
        this.magazineText = this.add.text(350, 20, this.player.magazine + "bullets").setScrollFactor(0);

        //bullet hitback
        this.bullets = this.add.group();
        this.overlap2 = this.physics.add.overlap(this.player, this.bullets, (obj1, obj2) => {
            if(obj1.x - obj2.x  < 0)
                {obj1.enemyDir = 'right'}
            else
                {obj1.enemyDir = 'left'}
            this.collider.active = false;
            this.overlap2.active = false;
            this.overlap.active = false;
            this.player.hitted = true;
            this.player.life -= 1;
            this.player.shadow = true;
                this.timedEvent = this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        this.player.alpha = 1;
                        this.player.hitted = false;
                        this.collider.active = true;
                        this.overlap.active = true;
                        this.overlap2.active = true;
                    },
                    loop: false
                })
        });
    }
 
    update() {
        if (!gameOver) {
            this.player.update(this.enemies, this.platforms);
            this.UI.update(this.player);
            for (let i = 0; i < this.enemy.length; i++) {
                this.enemy[i].update(this.player, this.platforms);
            }
            this.checkHealth();
            this.healthText.text = "Health: " + this.player.life;
            this.magazineText.text = this.player.magazine + " bullets";

            //chord tuto
            if(!this.chord.body.touching.none){
                this.chordTuto.setVisible(true);
                if (Phaser.Input.Keyboard.JustDown(keyT)) {
                    this.player.magazine = 20;
                }
            }
            else{
                this.chordTuto.setVisible(false);
            }

            if(!this.chord2.body.touching.none){
                this.chordTuto2.setVisible(true);
                if (Phaser.Input.Keyboard.JustDown(keyT)) {
                    this.player.magazine = 20;
                }
            }
            else{
                this.chordTuto2.setVisible(false);
            }

        } else {
            if (this.count < 1) {
                this.World_1_music.stop();
                this.Game_over.play();
                this.count += 1;
            }
            this.physics.pause();
            this.add.text(this.cameras.main.worldView.x + this.cameras.main.worldView.width/2, this.cameras.main.worldView.y + this.cameras.main.worldView.height/2, 'Game Over', scoreConfig).setOrigin(0.5);
            this.add.text(this.cameras.main.worldView.x + this.cameras.main.worldView.width/2, this.cameras.main.worldView.y + this.cameras.main.worldView.height/2 + 32, 'Press (R) to Restart or (M) to return', scoreConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.World_1_music.stop();
                this.Game_over.stop();
                this.scene.restart();
            }
            if (Phaser.Input.Keyboard.JustDown(keyM)) {
                this.World_1_music.stop();
                this.Game_over.stop();
                this.scene.start('hubScene');
            }
        }
    }

    checkHealth() {
        if (this.player.life <= 0) {
            this.player.life = 0;
            gameOver = true;
        }
    }
    switchScene() {
        //this.player.destroy();
        this.World_1_music.stop();
        completed[0] = 1;
        this.scene.start('hubScene');
    }
    collectChord() {
        //this.sound.play('Low_C_Chord');
        this.chord.addToItems(chords);
    }
}