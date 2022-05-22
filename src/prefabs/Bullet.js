class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.dir = direction;
        this.setScale(1);
        this.body.allowGravity = false;
    }
    
    update() {
        if (this.dir == 'left') {
<<<<<<< HEAD
            this.setVelocityX(-1000);
        } else if (this.dir == 'right') {
            this.setVelocityX(1000);
=======
            this.setVelocityX(-100);
            this.setFlipX(true);
        } else if (this.dir == 'right') {
            this.setVelocityX(100);
>>>>>>> 8d0b92532ae01ef5494cda074f7085581804e377
        }
    }
}