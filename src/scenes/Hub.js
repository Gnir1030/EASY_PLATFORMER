class Hub extends Phaser.Scene {
    constructor() {
        super("hubScene");
    }
    preload() {
        // load audio
        this.load.audio('Jump_noise', './assets/Jump.wav');
        this.load.audio('Take_Damage', './assets/Damage.wav');
        this.load.audio('Game_over', './assets/Game_Over.wav');
        this.load.audio('Hub_World', './assets/Hub_World.wav');
        this.load.audio('gunshot', './assets/gunshot.wav');


        // load images, spritesheets, and tilemaps
        this.load.image('tilesH', './assets/hub_tilesheet.png');
        this.load.tilemapTiledJSON('mapH', './assets/hub_level.json');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 64, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('portal', './assets/portal.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.image('bullet', './assets/bullet.png');
    }

    create() {
        // Hub World music

        this.Hub_World_music = this.sound.add('Hub_World', {volume: 0.50});
        this.Hub_World_music.play();
        this.Hub_World_music.loop = true;

        // base settings for this scene
        gameOver = false;
        this.length = 30*64;
        this.height = 15*64;
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
        keySPACE.enabled = false;
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.add.text(20, 20, "Main Hub").setScrollFactor(0);
        this.add.text(84, 84, 'Press M for Menu').setScrollFactor(0);
        //this.add.text(84, 84 + 64, chords[0]);


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
        let playerPos  = map.findObject("Player", obj => obj.name === "player");
        this.player = new Player(this, playerPos.x, playerPos.y, 'player', 0, keyA, keyD, keyW, keySPACE, keyLEFT, keyRIGHT, this.length, this.height).setOrigin(0,0);
        this.player.play('idle');
        this.player.setMaxVelocity(1000, 900);

        // set up camera
        const viewH = 640;
        const viewW = 800;
        this.cam = this.cameras.main.setViewport(0, 0, viewW, viewH).setZoom(1);
        this.cam.setBounds(0,0,map.widthInPixels, map.heightInPixels + 128 + 64);
        this.cam.startFollow(this.player);

        // collision
        this.physics.add.collider(this.player, platforms);

        // portals
        let portalPos  = map.findObject("Portals", obj => obj.name === "portal1");
        this.portal = new Portal(this, portalPos.x, portalPos.y + 128 +64, 'portal', 0, 'world1Scene').setOrigin(0);

        portalPos  = map.findObject("Portals", obj => obj.name === "portal2");
        this.portal2 = new Portal(this, portalPos.x, portalPos.y + 128 +64, 'portal', 0, 'world2Scene').setOrigin(0);
        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.Hub_World_music.stop();
        this.portal.play('portal');
        this.portal2.play('portal');
        this.physics.add.collider(this.player, this.portal, (obj1, obj2) => {
            this.scene.start(obj2.destination);
        }, null, this);
        
        this.portal2Collides = this.physics.add.collider(this.player, this.portal2, (obj1, obj2) => {
            this.scene.start(obj2.destination);
        }, null, this);
        this.portal2Collides.active = false;
        this.portal2.visible = false;
    }

    update() {
        if (completed[0] == 1) {
            this.portal2Collides.active = true;
            this.portal2.visible = true;
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.Hub_World_music.stop();
            this.scene.start('menuScene');
        }
        this.player.update();
    }
}