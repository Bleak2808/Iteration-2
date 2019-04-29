class LevelBaseClass extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.playerSpawn = {};
    }
    preload() {
        this.load.spritesheet("player", "assets/player.png", { frameWidth: 24, frameHeight: 24})

        this.load.image("enemy", "assets/enemy.png");
        this.load.image("tileset", "assets/tileset.png");
        this.load.tilemapTiledJSON(this.id, ("assets/" + this.id + ".json"));
    }
    create() {
        //loadAnims.call(this);
        this.map = this.make.tilemap({ key: this.id });
        this.tileset = this.map.addTilesetImage("tileset", "tileset", 16, 16, 0, 0);
        this.map.createStaticLayer("background", this.tileset, 0, 0);
        //more layers here
        console.log(this)
        this.collisionLayer = this.map.getLayer("collision").tilemapLayer;
        console.log(this.collisionLayer)
        //this.collisionLayer.setCollisionBetween(0, 1000);
        this.map.findObject("objects", function (object) {
            if (object.type === "playerSpawn") {
                this.playerSpawn.x = object.x;
                this.playerSpawn.y = object.y;
            }
        }, this);
        this.enemies = this.physics.add.staticGroup();
        this.map.findObject("objects", function (object) {
            if (object.type === "EnemySpawn") {
                this.enemies.create(object.x + this.map.tileWidth / 2, object.y - this.map.tileHeight / 2, "enemy")
            }
        }, this)
        this.player = new Player(this.playerSpawn.x, this.playerSpawn.y, "player", this);
        this.physics.add.existing(this.player);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("player", { start: 5, end: 10 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player", { frames: [1, 4] }),
            frameRate: 3,
            repeat: -1
        })
        this.anims.create({
            key: "jump",
            frames: [{ key: "player", frame: 3 }],
            frameRate: 15
        });
        this.anims.create({
            key: "fall",
            frames: [{ key: "player", frame: 2 }],
            frameRate: 15
        });
        //set up physics colliders here
        this.physics.add.collider(this.player, this.collisionLayer);
        //this.physics.add.collider()

        this.create_camera()
    }
    update() {

    }
    create_camera() {
        this.camera = this.cameras.getCamera("");
        this.camera.startFollow(this.player);
        this.camera.setBounds(0, 0, this.map.width * this.map.tileWidth, this.map.height * this.map.tileHeight);
        this.camera.zoom = 2;
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