class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    preload() {
        //this.load.image('background', './assets/Instructions.png');
    }

    create() {
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

        this.add.text(config.width/2, config.height/2 - 50, 'Louis - Technical Programmer', menuConfig).setOrigin(0.5);
        this.add.text(config.width/2, config.height/2, 'Sheel - Level Designer, Technical Programmer', menuConfig).setOrigin(0.5);
        this.add.text(config.width/2, config.height/2 + 50, 'Zac - Sound Effect/Music Lead, Lead Artist', menuConfig).setOrigin(0.5);
        this.add.text(config.width/2, config.height/2 + 150, 'Press (R) to return', menuConfig).setOrigin(0.5);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('menuScene');
        }
    }
}