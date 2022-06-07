class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
        // load audio
        this.load.audio('menu_music', './assets/Menu_Music.wav');
        this.load.audio('gunshot', './assets/gunshot.wav');
        this.load.audio('explosion', './assets/explosion.wav');
        this.load.audio('health', './assets/healthIncrease.wav');
        this.load.audio('ineffective', './assets/not_effective.wav');
        this.load.audio('damage', './assets/Damage.wav');
        //this.load.atlas('player_atlas', './assets/colorlessPlayerIdle.png', './assets/colorlessPlayerJump.png', './assets/colorlessPlayerWalk.png', './assets/greymap.json');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 64, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_idle', './assets/playerIdle.png', {frameWidth: 108, frameHeight: 128, startFrame: 0, endFrame: 4});
        this.load.spritesheet('player_walk', './assets/playerWalk.png', {frameWidth: 108, frameHeight: 128, startFrame: 0, endFrame: 2});
        this.load.spritesheet('player_jump', './assets/playerJump.png', {frameWidth: 108, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('portal', './assets/portal.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});

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
        this.load.spritesheet('enemy4', './assets/greenDrone.png', {frameWidth: 108, frameHeight: 88, startFrame: 0, endFrame: 4});
    }

    create() {

        this.menu_music = this.sound.add('menu_music', {volume: 0.50});
        this.menu_music.play();
        this.menu_music.loop = true;

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        //animation preload
        //player animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player_idle', { 
                start: 0, 
                end: 4, 
                first: 0
            }),
            frameRate: 5,
            repeat: -1,
            //repeatDelay: 5000
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player_walk', { 
                start: 0, 
                end: 2, 
                first: 0
            }),
            frameRate: 5,
            repeat: -1,
            //repeatDelay: 5000
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player_jump', { 
                start: 0, 
                end: 3, 
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });

        //enemy animation
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
        this.anims.create({
            key: 'idle4',
            frames: this.anims.generateFrameNumbers('enemy3', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'idle5',
            frames: this.anims.generateFrameNumbers('enemy4', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        //portal animation
        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5, first: 0}),
            frameRate: 2,
            repeat: -1
        });

    // show menu text
    this.add.text(config.width/2, config.height/2 - borderUISize - borderPadding, 'Finding Color', menuConfig).setOrigin(0.5);
    //this.add.text(config.width/2, config.height/2, 'Use ←→ arrows to move, up arrow to Jump, \n& (Space) to shoot', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00FF00';
    menuConfig.color = '#000';
    this.add.text(config.width/2, config.height/2 + borderUISize + borderPadding, 'Press ← to Play', menuConfig).setOrigin(0.5);
    this.add.text(config.width/2, config.height/2 + borderUISize + borderPadding +32, 'Press (T) to play the Tutorial', menuConfig).setOrigin(0.5);
    this.add.text(config.width/2, config.height/2 + borderUISize + borderPadding +64, 'Press (R) to see credit', menuConfig).setOrigin(0.5);
    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.menu_music.stop();
            this.scene.start('instructionsScene');
        }
        else if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.menu_music.stop();
            this.scene.start('tutorialScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.menu_music.stop();
            this.scene.start('creditScene');
        }
    }
}