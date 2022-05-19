class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, color, direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.color = color;
        this.dir = direction;
        this.setScale(1);
    }

    update() {
        if (this.dir == 'left') {
            this.setVelocityX(-500);
        } else if (this.dir == 'right') {
            this.setVelocityX(500);
        }
    }
}