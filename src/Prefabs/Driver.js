class Driver extends Phaser.GameObjects.Sprite {
    constructor(ID, scene, x, y, texture, frame, controls) {
        super(scene, x, y, texture, frame);

        this.ID = ID;

        scene.add.existing(this);           // add object to existing, displayList, updateList
        scene.physics.add.existing(this);   // add to physics

        this.leftKey = controls.leftKey;
        this.rightKey = controls.rightKey;
        this.upKey = controls.upKey;
        this.downKey = controls.downKey;
        this.upshiftKey = controls.upshiftKey;
        this.downshiftKey = controls.downshiftKey;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.leftKey)) console.log(`${this.ID} left`);
        if (Phaser.Input.Keyboard.JustDown(this.rightKey)) console.log(`${this.ID} right`);
        if (Phaser.Input.Keyboard.JustDown(this.upKey)) console.log(`${this.ID} up`);
        if (Phaser.Input.Keyboard.JustDown(this.downKey)) console.log(`${this.ID} down`);
        if (Phaser.Input.Keyboard.JustDown(this.upshiftKey)) console.log(`${this.ID} upshift`);
        if (Phaser.Input.Keyboard.JustDown(this.downshiftKey)) console.log(`${this.ID} downshift`);
    }
}