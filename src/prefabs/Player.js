class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame, kLeft, kRight, kSpace) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.keyLeft = kLeft;
        this.keyRight = kRight;
        this.keySpace = kSpace;
        this.health = 1;
        this.setScale(1);
        this.setBounce(0.1);
    }

    update() {
        // move
        if (this.keyLeft.isDown) {
            this.setVelocityX(-200);
        } else if (this.keyRight.isDown) {
            this.setVelocityX(200);
        } else {
            this.setVelocityX(0);
        }

        // jump
        if (this.keySpace.isDown && this.body.onFloor()) {
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