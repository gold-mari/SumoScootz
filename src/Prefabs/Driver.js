class Driver extends Phaser.Physics.Arcade.Sprite {
    constructor(ID, scene, x, y, texture, frame, controls) {
        super(scene, x, y, texture, frame);

        this.ID = ID;

        scene.add.existing(this);           // add object to existing, displayList, updateList
        scene.physics.add.existing(this);   // add to physics

        this.SPEEDS = [100, 500];
        this.DRAGS = [0.01, 0.9];

        // Controls ===================
        this.leftKey = controls.leftKey;
        this.rightKey = controls.rightKey;
        this.upKey = controls.upKey;
        this.downKey = controls.downKey;
        this.upshiftKey = controls.upshiftKey;
        this.downshiftKey = controls.downshiftKey;

        // State ======================
        this.direction = new Phaser.Math.Vector2(0);
        this.currentSpeed = this.SPEEDS[0];
        this.currentDrag = this.DRAGS[0];

        this.setDrag(this.currentDrag);
        this.setDamping(true);
        this.tint = 0x0000ff;
    }

    update() {
        // ACCELERATION =======================================================
        this.direction = new Phaser.Math.Vector2(0);

        if (this.leftKey.isDown)    this.direction.x -= 1;
        if (this.rightKey.isDown)  this.direction.x += 1;
        if (this.upKey.isDown)     this.direction.y -= 1;
        if (this.downKey.isDown)   this.direction.y += 1;

        this.direction.normalize();
        this.setAcceleration(this.currentSpeed * this.direction.x, this.currentSpeed * this.direction.y);

        // GEAR SHIFTING ======================================================
        if (Phaser.Input.Keyboard.JustDown(this.upshiftKey)) {
            this.currentSpeed = this.SPEEDS[1];
            this.currentDrag = this.DRAGS[1];
            this.setDrag(this.currentDrag);
            this.tint = 0xff0000;
        }    
        if (Phaser.Input.Keyboard.JustDown(this.downshiftKey)) {
            this.currentSpeed = this.SPEEDS[0];
            this.currentDrag = this.DRAGS[0];
            this.setDrag(this.currentDrag);
            this.tint = 0x0000ff;
        }
    }
}