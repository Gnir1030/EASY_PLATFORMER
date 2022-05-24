class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, mW, mH, color) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.health = 3;
        this.mw = mW;
        this.mh = mH;
        this.color = color;
        this.setScale(0.7);
        this.setBounce(0.1);
        this.jump = false;
        this.direction;
    }

    update(player) {
        if (this.body) {
            // enemy ai
            if (this.detect(player) == 'left') {
                this.body.setVelocityX(-50);
            } else if (this.detect(player) == 'right') {
                this.body.setVelocityX(50);
            } else {
                this.body.setVelocityX(0);
            }

            // change the direction
            if (this.body.velocity.x < 0 ) {
                this.setFlipX(true);
            } else if (this.body.velocity.x > 0) {
                this.setFlipX(false);
            }

            //enemy jumps when blocked by wall
            if ((this.body.blocked.left || this.body.blocked.right) && this.body.blocked.down){
                this.setVelocityY(-700);
            }
        }
    }

    detect(player) {
        let maxDist = 5 * 64
        let dist = Phaser.Math.Distance.BetweenPoints(this, player);
        this.direction = player.x - this.x;

        if(dist > maxDist){
            return ''
        }else if (this.direction > 0 && dist > 65) {
            return 'right';
        } else if (this.direction < 0 && dist > 65) {
            return 'left'
        }
    }


}