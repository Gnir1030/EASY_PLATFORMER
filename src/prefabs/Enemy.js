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
        this.isFire = false;
        this.direction;
        this.time = scene.time;
        this.firing = true;
        this.shooterEvent;
    }

    update(player, platform) {
        if (!this.flipX) {
            this.direction = 'right';
        }
        else if (this.flipX) {
            this.direction = 'left';
        }

        if (this.body) {
            // enemy ai
            if (this.detect(player) == 'left') {
                this.body.setVelocityX(-50);
                this.isFire = true;
            } else if (this.detect(player) == 'right') {
                this.body.setVelocityX(50);
                this.isFire = true;
            } else {
                this.body.setVelocityX(0);
                this.isFire = false;
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

            if(this.isFire && this.firing) {
                this.firing = false;
                this.shooterEvent = this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.spawnBullet(this.direction, player, platform);
                        this.firing = true
                    },//this.spawnBullet(this.direction, player, platform),
                    loop: false
                })
                //this.spawnBullet(this.direction, player, platform)
            }
        }
    }

    detect(player) {
        let maxDist = 5 * 64
        let dist = Phaser.Math.Distance.BetweenPoints(this, player);
        let dir = player.x - this.x;

        if(dist > maxDist){
            return ''
        }else if (dir > 0 && dist > 32) {
            return 'right';
        } else if (dir < 0 && dist > 32) {
            return 'left'
        }
    }

    spawnBullet(dir, player, platform) {
        let bullet;
        if(dir == 'left'){
            bullet = new Bullet(this.scene, this.x - 24,  this.y + 60, 'bullet' + this.color, 0, dir, this.color);
            bullet.setFrame(1);
            this.scene.bullets.add(bullet);
            //bullet.setOriginFromFrame();
            //bullet.frame = 1;
        }
        else{
            bullet = new Bullet(this.scene, this.x + 82,  this.y + 60, 'bullet' + this.color, 0, dir, this.color);
            bullet.setFrame(1);
            this.scene.bullets.add(bullet);
            //bullet.setOriginFromFrame();
            //bullet.frame = 1;
        }

        //let bullet = new Bullet(this.scene, this.x + 32,  this.y, 'bullet', 0, dir);
        //console.log(enemy);
        this.scene.physics.add.overlap(bullet, player, (obj1, obj2) => {
            //console.log("obj2 name : " + obj2);
            // obj2.setActive(false).setVisible(false);
            // obj2.destroy();
            obj1.setActive(false).setVisible(false);
            obj1.destroy();
            //player.life -= 1;
        })
        this.scene.physics.add.collider(bullet, platform, (obj1, obj2) => {
            //console.log("obj2 name : " + obj2.name);
            obj1.setActive(false).setVisible(false);
            obj1.destroy();
        })
        bullet.update();
    }
}