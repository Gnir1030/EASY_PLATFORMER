//Zachary Hollaway, Sheel Kulkarni, Louis Lim
//Published: 05/15/2022
let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600},
            debug: true
        }
    },
    //scene: [Menu, Tutorial, Hub, World1]
    scene: [Menu, Tutorial, Hub, World1, World2]
}
let game = new Phaser.Game(config);

let keyLEFT, keyRIGHT, keyUP, keySPACE, keyR, keyM, keyT, keyX;

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

let chords = [1];
