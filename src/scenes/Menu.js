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