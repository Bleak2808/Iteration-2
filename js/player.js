class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(x, y, texture, scene) {
        super(scene, x, y, texture, 0);
        this.health = 20;
        //TODO - double jump
        this.scene.input.on('pointerdown', this.handlePointerDown, this);
        this.scene.input.on('pointerup', this.handlePointerUp, this);
        this.isTouching = false;
        this.touchData = {};
    }
    handlePointerDown(pointer) {
        this.touchData.startX = pointer.x;
        this.touchData.startY = pointer.y;
    }
    handlePointerUp(pointer) {
        this.touchData.endX = pointer.x;
        this.touchData.endY = pointer.y;
        this.handleTouch();
    }
    handleTouch() {
        const distX = this.touchData.endX - this.touchData.startX;
        const distY = this.touchData.endY - this.touchData.startY;
        this.touchData = {};
        const tolerance = 5;
        if (distX > 0 + tolerance) {
            this.moveRight = true;
        } else if (distX < 0 - tolerance) {
            this.moveLeft = true;
        }
        if (distY < 0 - tolerance) {
            this.jumpUp = true;
        }
    }
    update() {
        const xForce = 0.1;
        const yForce = 0.1;
        if (this.moveRight) {
            this.sprite.applyForce({
                x: xForce,
                y: 0
            });
        } else if (this.moveLeft) {
            this.sprite.applyForce({
                x: -xForce,
                y: 0
            });
        }
        if (this.jumpUp) {
            this.sprite.applyForce({
                x: 0,
                y: -yForce
            });
        }
        // clamp velocity
        const clamp = 5;
        if (this.sprite.body.velocity.x > clamp) {
            this.sprite.setVelocityX(clamp);
        } else if (this.sprite.body.velocity.x < -clamp) {
            this.sprite.setVelocityX(-clamp);
        }
        this.moveLeft = this.moveRight = this.jumpUp = false;
    }
}