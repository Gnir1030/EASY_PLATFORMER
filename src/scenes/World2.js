class World2 extends Phaser.Scene {
    constructor() {
        super("world2Scene");
    }

    create() {
        this.add.text(20, 20, "World 2");
    }
}