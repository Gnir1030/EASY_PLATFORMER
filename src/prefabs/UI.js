class UI extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }
    
    update(player) {
        this.setPosition(player.x + 12, player.y - 17);
        this.setTexture ('bullet' + (player.active + 1));
        //console.log(this.texture);
    }
}