class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, kLeft, kRight) {
        super(scene, x, y, texture, frame);
        this.keyLeft = kLeft;
        this.keyRight = kRight;
        this.moveSpeed = 4;
        this.armor = false;
        this.shadow = false;
        scene.add.existing(this);
    }
}