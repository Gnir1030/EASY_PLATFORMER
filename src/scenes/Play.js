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
        // move keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.add.text(20, 20, "Play Scene");

        // map
        const map = this.make.tilemap({ key: 'map' });
        const tileSet = map.addTilesetImage('simple_tileset', 'tiles');
        const platforms = map.createLayer('Platforms', tileSet, 0, 200);
        platforms.setCollisionByExclusion(-1, true);

        // player
        this.player = new Player(this, 0, 130, 'player', 0, keyLEFT, keyRIGHT).setOrigin(0,0);

        // collision
        this.physics.add.collider(this.player, platforms);
    }

    update() {
        this.player.update();
    }
}