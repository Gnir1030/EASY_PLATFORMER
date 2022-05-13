class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('tiles', './assets/tilesheet.png');
        this.load.tilemapTiledJSON('map', './assets/tutorial_level.json');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 64, frameHeight: 128, startFrame: 0, endFrame: 1});
    }

    create() {
        this.add.text(20, 20, "Play Scene");
        const map = this.make.tilemap({ key: 'map' });
        const tileSet = map.addTilesetImage('simple_tileset', 'tiles');
        const platforms = map.createLayer('Platforms', tileSet, 0, 200);
        this.player = Player();
        platforms.setCollisionByExclusion(-1, true);
    }
}