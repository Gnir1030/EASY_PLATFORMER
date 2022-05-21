class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, mW, mH, color) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.health = 3;
        this.mw = mW;
        this.mh = mH;
        this.color = color;
        this.setScale(1);
        this.setBounce(0.1);
    }

    update(player) {
        if (this) {
            // enemy ai
            if (this.detect(player) == 'left') {
                this.setVelocityX(-200);
            } else if (this.detect(player) == 'right') {
                this.setVelocityX(200);
            } else {
                this.setVelocityX(0);
            }

            // change the direction
            if (this.body.velocity.x < 0 ) {
                this.setFlipX(true);
            } else if (this.body.velocity.x > 0) {
                this.setFlipX(false);
            }
        }
    }

    detect(player) {
        let dist = 10 * 64
        if (player.x - this.x <= dist && player.x - this.x > 64) {
            return 'right';
        } else if (this.x - player.x <= dist && this.x - player.x > 64) {
            return 'left'
        } else {
            return ''
        }
    }
}