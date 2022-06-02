class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }

    preload() {
        this.load.image('background', './assets/Instructions.png');
    }

    create() {
        this.add.image(0,0, 'background', 0).setOrigin(0,0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('hubScene');
        }
    }
}