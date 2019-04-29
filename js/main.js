var config = {
    //2, 560 x 1, 440
    type: Phaser.AUTO,
    pixelArt: true,
    backgroundColor: "#000",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 500
            }
        }
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 704
    },
    scene: [StartScreen, Level1] //TODO - fill as needed
}

var game = new Phaser.Game(config);