//Zachary Hollaway, Sheel Kulkarni, Louis Lim
//Published: 06/07/2022

/*
Mechanics Cohesion
The mechanics cohesion of our game is interaction with objects. In Metroidvania genre, players interact with three objects: enemies, items, and platforms.
Among them, we focused on the interaction between enemies and items. In combat between the player and the enemy, updates to the in-game hitbox are implemented. 
When the player is shot or hit by an enemy, he or she bounces off and cannot move for a while, but during this time, don't get damaged by the enemy. This is because the player can lose a lot of HP in a moment facing many enemies.
The player can change the type of weapon freely by the situation, and there's an interaction that tells players how to use when getting close to it.

Art Cohesion

*/

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

let keyLEFT, keyRIGHT, keyUP, keySPACE, keyR, keyM, keyT, keyA, keyD, keyW, keyP;

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
    fontFamily: 'Roboto',
    fontSize: '20px',
    backgroundColor: '#00c853',
    color: '#ffffff',
    align: 'center',
};

let x = game.config.width;
let y = game.config.height;
let borderUISize = game.config.width/15;
let borderPadding = borderUISize / 3;

let chords = [1];

let completed = [0, 0, 0];
