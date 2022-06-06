class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame, kLeft, kRight, kUp, kSpace, kL, kR, mW, mH) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.keyLeft = kLeft;
        this.keyRight = kRight;
        this.keyUp = kUp;
        this.keySpace = kSpace;
        this.keyL = kL;
        this.keyR = kR;
        this.health = 3;
        this.mw = mW;
        this.mh = mH;
        this.setScale(0.7);
        this.setBounce(0.1);
        this.isFire = false;
        this.hitted = false;
        this.scene = scene;
        this.enemyDir;
        this.shadow = false;
        this.life = 3;
        this.bullet = 0;
        this.magazine = 30;
    }

    preload() {
        //this.load.image('bullet', './assets/bullet.png');
        //this.load.spritesheet('bullet', './assets/bullet.png', {frameWidth: 17, frameHeight: 11, startFrame: 0, endFrame: 1});
    }

    create() {
        this.setMaxVelocity(200, 2000);
        //this.add.text(0, -100, "ooooooo!")
        if(this.hitted){
            this.alpha = 0.5;
            this.life -= 1;
        }
        //this.color = this.anims.generateFrameNumbers('bullet', { start: 0, end: 0, first: 0});
    }

    update(enemy, platform) {

        if(!this.hitted){
            if (Phaser.Input.Keyboard.JustDown(this.keyL)) {
                this.bullet = (this.bullet + chords.length - 1) % chords.length;
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
                this.bullet = (this.bullet + 1) % chords.length;
                //console.log(this.active);
            }
            // move
            if (this.keyLeft.isDown && this.x > 0) {
                this.setVelocityX(-300);
                //this.anims.play('run', true);
            } else if (this.keyRight.isDown && this.x <= this.mw - this.width) {
                this.setVelocityX(300);
                //this.anims.play('run', true);
            } else {
                //this.setVelocityX(0);
                this.setDragX(1000);
                //this.anims.play('idle', true);
            }

            // fire
            if (Phaser.Input.Keyboard.JustDown(this.keySpace) ) {
                this.isFire = true;
            } else {
                this.isFire = false;
            }

            // jump
            if (this.keyUp.isDown && this.body.onFloor()) {
                this.setVelocityY(-900);
            }

            // change direction
            if (this.body.velocity.x > 0 ) {
                this.setFlipX(false);
                //this.dir = 'right';
            } else if (this.body.velocity.x < 0) {
                this.setFlipX(true);
                //this.dir = 'left';
            }

            if(this.isFire && this.magazine > 0) {
                if (!this.flipX) {
                    this.spawnBullet('right', enemy, platform);
                    this.magazine -= 1;
                }
                else if (this.flipX) {
                    this.spawnBullet('left', enemy, platform);
                    this.magazine -= 1;
                }
                this.isFire = false;
            }
        }

        
        if(this.hitted && this.shadow && this.life > 0){
            if(this.enemyDir == 'left'){
                this.setVelocityX(700);
                this.setVelocityY(-500);
                this.shadow = false;
            }
            else{
                this.setVelocityX(-700);
                this.setVelocityY(-500);
                this.shadow = false
            }
            this.alpha = 0.5;
        }
    }

    spawnBullet(dir, enemy, platform) {
        let bullet;
        if(dir == 'left'){
            bullet = new Bullet(this.scene, this.x - 24,  this.y + 60, 'bullet' + chords[this.bullet], 0, dir, chords[this.bullet]).setOrigin(0);
        }
        else{
            bullet = new Bullet(this.scene, this.x + 82,  this.y + 60, 'bullet' + chords[this.bullet], 0, dir, chords[this.bullet]).setOrigin(0);
        }
        this.scene.physics.add.overlap(bullet, enemy, (obj1, obj2) => {
            if(obj2.shooterEvent)
                obj2.shooterEvent.destroy();
            if (obj1.color == obj2.color) {
                obj2.destroy();
            }
            obj1.destroy();
        })
        this.scene.physics.add.collider(bullet, platform, (obj1, obj2) => {
            obj1.destroy();
        })
        bullet.update();
    }
}