class Hub extends Phaser.Scene {
    constructor() {
        super("hubScene");
    }
    preload() {
        // load audio
        this.load.audio('Jump_noise', './assets/Jump.wav');
        this.load.audio('Take_Damage', './assets/Damage.wav');
        this.load.audio('Game_over', './assets/Game_Over.wav');


        // load images, spritesheets, and tilemaps
        this.load.image('tilesH', './assets/hub_tilesheet.png');
        this.load.tilemapTiledJSON('mapH', './assets/hub_level.json');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 64, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('portal', './assets/portal.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.image('background', './assets/background.png');
    }

    create() {
        // base settings for this scene
        gameOver = false;
        this.length = 30*64;
        this.height = 9*64;
        this.count = 0;
        
        // Game Over music plays when player dies
        this.Game_over = this.sound.add('Game_over', {volume: 0.5});

        // background
        //this.add.image(0, 0,'background').setOrigin(0, 0);
        // move keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.add.text(20, 20, "Main Hub").setScrollFactor(0);
        this.add.text(84, 84, 'Press M for Menu').setScrollFactor(0);
        this.add.text(84, 84 + 64, chords[0]);


        // map
        const map = this.make.tilemap({ key: 'mapH' });
        const tileSet = map.addTilesetImage('hub_tiles', 'tilesH');
        const platforms = map.createLayer('Platforms', tileSet, 0, 200);
        platforms.setCollisionByExclusion(-1, true);

        // player
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3, first: 0}),
            frameRate: 1,
            repeat: -1
        });
        this.player = new Player(this, 896, 128, 'player', 0, keyLEFT, keyRIGHT, keySPACE, this.length, this.height).setOrigin(0,0);
        this.player.play('idle');

        // set up camera
        const viewH = 640;
        const viewW = 800;
        this.cam = this.cameras.main.setViewport(0, 0, viewW, viewH).setZoom(1);
        this.cam.setBounds(0,0,this.length, this.height);
        this.cam.startFollow(this.player);

        // collision
        this.physics.add.collider(this.player, platforms);

        // portal
        this.portal = new Portal(this, this.length - (8*64), 5*64, 'portal', 0, 'world1Scene').setOrigin(0);
        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5, first: 0}),
            frameRate: 2,
            repeat: -1
        });
        this.portal.play('portal');
        this.physics.add.collider(this.player, this.portal, this.switchScene, null, this);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene');
        }
        this.player.update();
    }

    switchScene(){
        this.scene.start(this.portal.destination);
    }
}