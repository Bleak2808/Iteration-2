class LevelBaseClass extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.playerSpawn = {};
    }
    preload() {
        this.load.spritesheet("player", "assets/goblin_spritesheet.png", {}) //{frameWidth: sd, frameHeight: sdgf, spacing: 1}

        this.load.image("tilesheet", "assets/tileset.png");
        this.load.tilemapTiledJSON(this.id, ("assets/" + this.id + ".json"));
    }
    create() {
        //loadAnims.call(this);
        this.map = this.make.tilemap({ key: this.id });
        this.tileset = this.map.addTilesetImage("tilesheet", "tilesheet", 16, 16, 0, 0);
        this.map.createStaticLayer("background", this.tileset, 0, 0);
        console.log(this.map)
        //var collisionLayer = this.map.getLayer("collision").tilemapLayer;
        //collisionLayer.setCollisionBetween(0, 1000);
        this.map.findObject("objects", function (object) {
            if (object.type === "playerSpawn") {
                this.playerSpawn.x = object.x;
                this.playerSpawn.y = object.y;
            }
        }, this);
        this.player = new Player(this.playerSpawn.x, this.playerSpawn.y, "player", this);
        this.player.setCollideWorldBounds(true);
        //set up physics colliders here
    }
    update() {

    }
}

class StartScreen extends Phaser.Scene {
    constructor() {
        super("StartScreen");
        //this.id = "StartScreen";
    }
    preload() {
        this.load.image("startButton", "assets/startButton.png");
    }
    create() {
        this.startButton = this.add.image(400, 400, "startButton");
        this.startButton.setInteractive();
        this.startButton.on(
            "pointerdown", function () {
                this.scene.start("Level1")
            }, this);
    }
}