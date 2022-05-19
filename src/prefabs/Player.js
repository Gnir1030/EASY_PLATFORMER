class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame, kLeft, kRight, kUp, kSpace, mW, mH) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene
        this.keyLeft = kLeft;
        this.keyRight = kRight;
        this.keyUp = kUp;
        this.keySpace = kSpace;
        this.health = 3;
        this.mw = mW;
        this.mh = mH;
        this.setScale(1);
        this.setBounce(0.1);
        this.isFire = false;
    }

    preload() {
        this.load.audio('Jump_noise', './assets/Jump.wav');
        this.load.image('bullet', './assets/bullet.png');
    }

    create() {
        this.jump = this.sound.add('Jump_noise');
    }

    update() {
        // move
        if (this.keyLeft.isDown && this.x > 0) {
            this.setVelocityX(-300);
        } else if (this.keyRight.isDown && this.x <= this.mw - this.width) {
            this.setVelocityX(300);
        } else {
            this.setVelocityX(0);
        }

        // fire
        if (this.keySpace.isDown) {
            this.isFire = true;
        } else {
            this.isFire = false;
        }

        // jump
        if (this.keyUp.isDown && this.body.onFloor()) {
            // this.jump.play();
            this.setVelocityY(-500);
        }

        // change direction
        if (this.body.velocity.x > 0 ) {
            this.setFlipX(false);
        } else if (this.body.velocity.x < 0) {
            this.setFlipX(true);
        }
    }

    spawnBullet(dir) {
        let bullet = new Bullet(this.scene, this.x + 64, this.y, 'bullet', 0, thi.color, dir);
    }
}