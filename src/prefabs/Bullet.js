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
            this.setVelocityX(-100);
            this.setFlipX(true);
        } else if (this.dir == 'right') {
            this.setVelocityX(100);
        }
    }
}