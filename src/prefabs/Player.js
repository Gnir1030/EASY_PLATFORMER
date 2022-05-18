class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame, kLeft, kRight, kSpace, mW, mH) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.keyLeft = kLeft;
        this.keyRight = kRight;
        this.keySpace = kSpace;
        this.health = 3;
        this.mw = mW;
        this.mh = mH;
        this.setScale(1);
        this.setBounce(0.1);
    }

    preload() {
        this.load.audio('Jump_noise', './assets/Jump.wav');
    }

    create() {
        this.jump = this.sound.add('Jump_noise');
    }

    update() {
        // move
        if (this.keyLeft.isDown && this.x > 0) {
            this.setVelocityX(-200);
        } else if (this.keyRight.isDown && this.x <= this.mw - this.width) {
            this.setVelocityX(200);
        } else {
            this.setVelocityX(0);
        }

        // jump
        if (this.keySpace.isDown && this.body.onFloor()) {
            this.jump.play();
            this.setVelocityY(-400);
        }

        // change direction
        if (this.body.velocity.x > 0 ) {
            this.setFlipX(false);
        } else if (this.body.velocity.x < 0) {
            this.setFlipX(true);
        }
    }
}