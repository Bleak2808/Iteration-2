var config = {
    //2, 560 x 1, 440
    type: Phaser.AUTO,
    width: 1280,
    height: 704,
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
    scene: [StartScreen, Level1] //TODO - fill as needed
}

var game = new Phaser.Game(config);

function loadAnims() {
    const anims = this.anims;
    anims.create({
        key: "idle",
        frames: anims.generateFrameNumbers("player", { start: 0, end: 2 }),
        frameRate: 3,
        repeat: -1
    })
}