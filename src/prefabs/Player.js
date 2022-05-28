class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame, kLeft, kRight, kUp, kSpace, mW, mH) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.keyLeft = kLeft;
        this.keyRight = kRight;
        this.keyUp = kUp;
        this.keySpace = kSpace;
        this.health = 3;
        this.mw = mW;
        this.mh = mH;
        this.setScale(0.7);
        this.setBounce(0.1);
        this.isFire = false;
        this.hitted = false;
        this.scene = scene;
        this.direction;
        this.life = 3;
    }

    preload() {
        this.load.audio('Jump_noise', './assets/Jump.wav');
        //this.load.image('bullet', './assets/bullet.png');
        this.load.spritesheet('bullet', './assets/bullet.png', {frameWidth: 17, frameHeight: 11, startFrame: 0, endFrame: 1});
    }

    create() {
        this.jump = this.sound.add('Jump_noise');
        this.setMaxVelocity(200, 2000);
        if(this.hitted){
            this.alpha = 0.5;
            this.life -= 1;
        }
    }

    update(enemy, platform) {

        if(!this.hitted){
        // move
            if (this.keyLeft.isDown && this.x > 0) {
                this.setVelocityX(-300);
            } else if (this.keyRight.isDown && this.x <= this.mw - this.width) {
                this.setVelocityX(300);
            } else {
                //this.setVelocityX(0);
                this.setDragX(1000);
            }

            // fire
            if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
                this.isFire = true;
            } else {
                this.isFire = false;
            }

            // jump
            if (this.keyUp.isDown && this.body.onFloor()) {
                // this.jump.play();
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

            if(this.isFire) {
                if (!this.flipX) {
                    this.spawnBullet('right', enemy, platform);
                }
                else if (this.flipX) {
                    this.spawnBullet('left', enemy, platform);
                }
                this.isFire = false;
            }

            /*
            if(!this.body.touching.none){
                if(this.direction == 'right'){
                    this.setVelocityX(700);
                    this.setVelocityY(-500);
                    this.hitted = true;
                }
                else{
                    this.setVelocityX(-700);
                    this.setVelocityY(-500);
                    this.hitted = true;
                }
            }
            */
        }

        
        if(this.hitted && !this.body.touching.none){
            if(this.direction == 'right'){
                this.setVelocityX(700);
                this.setVelocityY(-500);
                this.hitted = true;
            }
            else{
                this.setVelocityX(-700);
                this.setVelocityY(-500);
                this.hitted = true;
            }
            this.alpha = 0.5;
        }
        
        //console.log(this.life);
    }

    spawnBullet(dir, enemy, platform) {
        //console.log(dir);
        //console.log(enemy);
        let bullet;
        if(dir == 'left'){
            bullet = new Bullet(this.scene, this.x - 24,  this.y + 60, 'bullet', 0, dir);
            bullet.setFrame(1);
            //bullet.setOriginFromFrame();
            //bullet.frame = 1;
        }
        else{
            bullet = new Bullet(this.scene, this.x + 82,  this.y + 60, 'bullet', 0, dir);
            bullet.setFrame(1);
            //bullet.setOriginFromFrame();
            //bullet.frame = 1;
        }

        //let bullet = new Bullet(this.scene, this.x + 32,  this.y, 'bullet', 0, dir);
        //console.log(enemy);
        this.scene.physics.add.overlap(bullet, enemy, (obj1, obj2) => {
            console.log("obj2 name : " + obj2);
            obj2.setActive(false).setVisible(false);
            obj2.destroy();
            obj1.setActive(false).setVisible(false);
            obj1.destroy();
        })
        this.scene.physics.add.collider(bullet, platform, (obj1, obj2) => {
            console.log("obj2 name : " + obj2.yyName);
            obj1.setActive(false).setVisible(false);
            obj1.destroy();
        })
        bullet.update();
    }
}