class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('tiles', './assets/tilesheet.png');
        this.load.tilemapTiledJSON('map', './assets/tutorial_level.json');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 64, frameHeight: 128, startFrame: 0, endFrame: 3});
    }

    create() {
        // move keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(20, 20, "Play Scene");
        this.healthText = this.add.text(700, 20, "Health: " + 1);


        // map
        const map = this.make.tilemap({ key: 'map' });
        const tileSet = map.addTilesetImage('simple_tileset', 'tiles');
        const platforms = map.createLayer('Platforms', tileSet, 0, 200);
        platforms.setCollisionByExclusion(-1, true);

        // player
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3, first: 0}),
            frameRate: 1,
            repeat: -1
        });
        this.player = new Player(this, 0, 130, 'player', 0, keyLEFT, keyRIGHT, keySPACE).setOrigin(0,0);
        this.player.play('idle');

        // collision
        this.physics.add.collider(this.player, platforms);
    }

    update() {
        this.player.update();
        this.healthText.setText("Health: " + this.player.health());
    }
}