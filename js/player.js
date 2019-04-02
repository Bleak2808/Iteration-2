class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(x, y, texture, scene) {
        super(scene, x, y, texture, 0);
        this.health = 20;
        //TODO - double jump
    }
    update() {

    }
}