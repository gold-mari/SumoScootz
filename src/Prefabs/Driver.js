class Driver extends Phaser.Physics.Arcade.Sprite {
    constructor(ID, scene, x, y, texture, frame, controls) {
        super(scene, x, y, texture, frame);

        this.ID = ID;

        scene.add.existing(this);           // add object to existing, displayList, updateList
        scene.physics.add.existing(this);   // add to physics


        // Controls ===================
        this.leftKey = controls.leftKey;
        this.rightKey = controls.rightKey;
        this.upKey = controls.upKey;
        this.downKey = controls.downKey;
        this.upshiftKey = controls.upshiftKey;
        this.downshiftKey = controls.downshiftKey;

        // Direction ==================
        this.direction = new Phaser.Math.Vector2(0);
    }

    update() {
        // MOVEMENT ===========================================================
        this.direction = new Phaser.Math.Vector2(0);

        if (this.leftKey.isDown)    this.direction.x -= 1;
        if (this.rightKey.isDown)  this.direction.x += 1;
        if (this.upKey.isDown)     this.direction.y -= 1;
        if (this.downKey.isDown)   this.direction.y += 1;

        this.direction.normalize()
        this.setVelocity(250 * this.direction.x, 250 * this.direction.y)

        // if (Phaser.Input.Keyboard.JustDown(this.upshiftKey)) console.log(`${this.ID} upshift`);
        // if (Phaser.Input.Keyboard.JustDown(this.downshiftKey)) console.log(`${this.ID} downshift`);
    }
}