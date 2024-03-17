class Driver extends Phaser.Physics.Arcade.Sprite {
    constructor(ID, scene, x, y, texture, frame, controls) {
        super(scene, x, y, texture, frame);

        this.ID = ID;

        scene.add.existing(this);           // add object to existing, displayList, updateList
        scene.physics.add.existing(this);   // add to physics

        this.SPEEDS = [100, 500];
        this.DRAGS = [0.01, 0.9];
        this.BOUNCES = [0.5, 1];

        // Controls ===================
        this.leftKey = controls.leftKey;
        this.rightKey = controls.rightKey;
        this.upKey = controls.upKey;
        this.downKey = controls.downKey;
        this.upshiftKey = controls.upshiftKey;
        this.downshiftKey = controls.downshiftKey;

        // State ======================
        this.direction = new Phaser.Math.Vector2(0);
        this.directionName = "down";
        this.currentSpeed = this.SPEEDS[0];
        this.currentDrag = this.DRAGS[0];
        this.currentBounce = this.BOUNCES[0];

        this.setDrag(this.currentDrag);
        this.setBounce(this.currentBounce);
        this.setDamping(true);
        // this.tint = 0x0000ff;

        // Label ======================
        this.labelHeightFactor = 4;
        this.label = this.scene.add.text(this.x, this.y-(this.height*this.labelHeightFactor), `${ID}\n▼`, { 
            color: "#ffff00",
            fontFamily: "Trebuchet MS",
            fontSize: "20px",
            align: "center"
        }).setOrigin(0.5).setDepth(100);
    }

    update() {
        // ACCELERATION =======================================================
        this.direction = new Phaser.Math.Vector2(0);

        if (this.leftKey.isDown)    this.direction.x -= 1;
        if (this.rightKey.isDown)  this.direction.x += 1;
        if (this.upKey.isDown)     this.direction.y -= 1;
        if (this.downKey.isDown)   this.direction.y += 1;

        // GEAR SHIFTING ======================================================
        if (Phaser.Input.Keyboard.JustDown(this.upshiftKey)) {
            this.currentSpeed = this.SPEEDS[1];
            this.currentDrag = this.DRAGS[1];
            this.currentBounce = this.BOUNCES[1];
            this.setDrag(this.currentDrag);
            // this.tint = 0xff0000;
        }    
        if (Phaser.Input.Keyboard.JustDown(this.downshiftKey)) {
            this.currentSpeed = this.SPEEDS[0];
            this.currentDrag = this.DRAGS[0];
            this.currentBounce = this.BOUNCES[0];
            this.setDrag(this.currentDrag);
            // this.tint = 0x0000ff;
        }

        // MOVEMENT ======================================================
        this.direction.normalize();
        this.setAcceleration(this.currentSpeed * this.direction.x, this.currentSpeed * this.direction.y);

        // LABEL ======================================================
        this.label.x = this.x;
        this.label.y = this.y-(this.height*this.labelHeightFactor)

        // ANIMATION ======================================================
        this.updateDirectionName(this.direction);
        this.anims.play(`${this.ID}-${this.directionName}`, true)
    }

    updateDirectionName(direction) {
        // Prioritize vertical directions first.
        if (direction.y == 1) this.directionName = "down";
        if (direction.y == -1) this.directionName = "up";

        if (direction.x == 1) this.directionName = "right";
        if (direction.x == -1) this.directionName = "left";

        // Otherwise, return the most recent value.
        return this.directionName;
    }

    won() {
        this.setAcceleration(0);
        this.setVelocity(0);
    }

    lost() {
        this.setAcceleration(0);
        this.setAlpha(0.5);

        this.label.setAlpha(0.5);
        this.label.text = `${this.ID}\n☠`
    }
}