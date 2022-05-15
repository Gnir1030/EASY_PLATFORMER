let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500},
            debug: false
        }
    },
    scene: Play
}
let game = new Phaser.Game(config);

let keyLEFT, keyRIGHT, keySPACE;

let borderS = game.config.height/10;