class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame, kLeft, kRight) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.keyLeft = kLeft;
        this.keyRight = kRight;
        this.health = 1;
        this.setScale(1);
        this.setBounce(0.1);
        this.setCollideWorldBounds(true);
    }

    update() {
        if (this.keyLeft.isDown) {
            //console.log("left is pressed");
            this.setVelocityX(-200);
        }
        else if (this.keyRight.isDown) {
            this.setVelocityX(200);
        } else {
            this.setVelocityX(0);
        }

        if (this.body.velocity.x > 0 ) {
            this.setFlipX(false);
        } else if (this.body.velocity.x < 0) {
            this.setFlipX(true);
        }
    }
}