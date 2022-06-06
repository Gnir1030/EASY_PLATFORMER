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
            debug: false
        }
    },
    //scene: [World2]
    scene: [Menu, Tutorial, Instructions, Credit, Hub, World1, World2, World3]
}
let game = new Phaser.Game(config);

let keyLEFT, keyRIGHT, keyUP, keySPACE, keyR, keyM, keyT, keyA, keyD, keyW;

let borderS = game.config.height/10;

let gameOver = false;

let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'center',
};

let clearConfig = {
    fontFamily: 'VT323',
    fontSize: '20px',
    backgroundColor: '#00c853',
    color: '#ffffff',
    align: 'center',
};

let x = game.config.width;
let y = game.config.height;
let borderUISize = game.config.width/15;
let borderPadding = borderUISize / 3;

let chords = [1,2,3,4];

let completed = [0, 0, 0];
