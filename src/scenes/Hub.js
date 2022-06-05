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
        //this.load.atlas('player_atlas', 'colorlessPlayerIdle.png', 'colorlessPlayerJump.png', 'colorlessPlayerWalk.png', 'greymap.json');
        this.load.spritesheet('player_idle', './assets/playerIdle.png', {frameWidth: 108, frameHeight: 128, startFrame: 0, endFrame: 4});
        this.load.spritesheet('player_walk', './assets/playerWalk.png', {frameWidth: 108, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('portal', './assets/portal.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.image('bullet', './assets/bullet.png');

        this.load.image('bullet1', './assets/bullet1.png');
        this.load.image('bullet2', './assets/bullet2.png');
        this.load.image('bullet3', './assets/bullet3.png');
        this.load.image('bullet4', './assets/bullet4.png');

        this.load.image('chord1', './assets/blueStar.png');
        this.load.image('chord2', './assets/purpleStar.png');
        this.load.image('chord3', './assets/redStar.png');
        this.load.image('chord4', './assets/greenStar.png');

        this.load.spritesheet('enemy', './assets/blueDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
        this.load.spritesheet('enemy2', './assets/purpleDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
        this.load.spritesheet('enemy3', './assets/redDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
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
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.add.text(20, 20, "Main Hub").setScrollFactor(0);
        this.add.text(84, 84, 'Press M for Menu').setScrollFactor(0);
        this.gameclear = this.add.text(480, 640, "Thanks for playing!").setScale(2).setScrollFactor(0.5).setVisible(false);
        this.gameclear2 = this.add.text(84, 104, "Press (R) to reset").setScale(1).setScrollFactor(0).setVisible(false);
        //this.add.text(84, 84 + 64, chords[0]);
        


        // map
        const map = this.make.tilemap({ key: 'mapH' });
        const tileSet = map.addTilesetImage('hub_tiles', 'tilesH');
        const platforms = map.createLayer('Platforms', tileSet, 0, 200);
        platforms.setCollisionByExclusion(-1, true);

        // player
        // this.anims.create({
        //     key: 'idle',
        //     frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3, first: 0}),
        //     frameRate: 1,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'idle',
        //     frames: this.anims.generateFrameNames('player_atlas', {
        //         prefix: 'idle_',
        //         start: 1,
        //         end: 5,
        //         suffix: '',
        //         zeroPad: 4
        //     }),
        //     frameRate: 15,
        //     repeat: -1,
        //     repeatDelay: 5000,
        //     yoyo: true
        // });
        // this.anims.create({
        //     key: 'jump',
        //     frames: this.anims.generateFrameNames('player_atlas', {
        //         prefix: 'jump_',
        //         start: 1,
        //         end: 4,
        //         suffix: '',
        //         zeroPad: 4
        //     }),
        //     frameRate: 15,
        //     repeat: -1,
        //     repeatDelay: 5000,
        //     yoyo: true
        // });
        // this.anims.create({
        //     key: 'run',
        //     frames: this.anims.generateFrameNames('player_atlas2', {
        //         prefix: 'run_',
        //         start: 1,
        //         end: 3,
        //         suffix: '',
        //         zeroPad: 4
        //     }),
        //     frameRate: 15,
        //     repeat: -1,
        //     repeatDelay: 5000,
        //     yoyo: true
        // });
        let playerPos  = map.findObject("Player", obj => obj.name === "player");
        this.player = new Player(this, playerPos.x, playerPos.y, 'player_idle', 0, keyA, keyD, keyW, keySPACE, keyLEFT, keyRIGHT, this.length, this.height).setOrigin(0,0);
        //this.player.play('idle');
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 4, first: 0}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player_walk', { start: 0, end: 3, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.player.play('player_idle');
        this.player.setMaxVelocity(1000, 900);

        // set up camera
        const viewH = 640;
        const viewW = 800;
        this.cam = this.cameras.main.setViewport(0, 0, viewW, viewH).setZoom(1);
        this.cam.setBounds(0,0,map.widthInPixels, map.heightInPixels + 128 + 64);
        this.cam.startFollow(this.player);
        this.cam.setBackgroundColor('#256187');

        // collision
        this.physics.add.collider(this.player, platforms);

        // portals
        let portalPos  = map.findObject("Portals", obj => obj.name === "portal1");
        this.portal = new Portal(this, portalPos.x, portalPos.y + 128 +64, 'portal', 0, 'world1Scene').setOrigin(0);
        this.clear1 = this.add.text(portalPos.x, portalPos.y + 175, 'Cleared').setVisible(false);

        portalPos  = map.findObject("Portals", obj => obj.name === "portal2");
        this.portal2 = new Portal(this, portalPos.x, portalPos.y + 128 +64, 'portal', 0, 'world2Scene').setOrigin(0);
        this.clear2 = this.add.text(portalPos.x, portalPos.y + 175, 'Cleared').setVisible(false);

        portalPos  = map.findObject("Portals", obj => obj.name === "portal3");
        this.portal3 = new Portal(this, portalPos.x, portalPos.y + 128 +64, 'portal', 0, 'world3Scene').setOrigin(0);
        this.clear3 = this.add.text(portalPos.x, portalPos.y + 175, 'Cleared').setVisible(false);

        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.Hub_World_music.stop();
        this.portal.play('portal');
        this.portal2.play('portal');
        this.portal3.play('portal');
        this.portal1Collides = this.physics.add.collider(this.player, this.portal, (obj1, obj2) => {
            this.scene.start(obj2.destination);
        }, null, this);
        
        this.portal2Collides = this.physics.add.collider(this.player, this.portal2, (obj1, obj2) => {
            this.scene.start(obj2.destination);
        }, null, this);
        this.portal2Collides.active = false;
        this.portal2.visible = false;

        this.portal3Collides = this.physics.add.collider(this.player, this.portal3, (obj1, obj2) => {
            this.scene.start(obj2.destination);
        }, null, this);
        // this.portal3Collides.active = false;
        // this.portal3.visible = false;
    }

    update() {
        if (completed[0] == 1) {
            this.portal2Collides.active = true;
            this.portal2.visible = true;
            this.clear1.setVisible(true);
        }
        if(completed[1] == 1){
            this.clear2.setVisible(true);
        }
        if(completed[2] == 1){
            this.clear3.setVisible(true);
        }

        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.Hub_World_music.stop();
            this.scene.start('menuScene');
        }

        if(completed[0] == 1 && completed[1] == 1 && completed[2] == 1){
            this.portal3Collides.active = false;
            this.portal2Collides.active = false;
            this.portal1Collides.active = false;
            this.gameclear.setVisible(true);
            this.gameclear2.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                completed[0] = 0;
                completed[1] = 0;
                completed[2] = 0;
                this.scene.start('menuScene');
            }
            //this.add.text(84, 84, 'Press M for Menu');
        }
        this.player.update();
        // if(this.player.body.velocity.x < 0) {
        //     console.log("no we can't");
        //     this.player.anims.play('walk', true);
        // }
    }
}