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
    scene: [Menu, Tutorial,Hub]
}
let game = new Phaser.Game(config);

let keyLEFT, keyRIGHT, keySPACE, keyR, keyM;

let borderS = game.config.height/10;

let gameOver = false;

let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '25px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'center',
    padding: {
    top: 5,
    bottom: 5,
    },
    fixedWidth: 550
};

let x = game.config.width;
let y = game.config.height;
let borderUISize = game.config.width/15;
let borderPadding = borderUISize / 3;

let chords = [];
