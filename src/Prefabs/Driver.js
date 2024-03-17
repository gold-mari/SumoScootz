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

        this.anims.play(`${this.ID}-${this.directionName}`, true);
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
        }    
        if (Phaser.Input.Keyboard.JustDown(this.downshiftKey)) {
            this.currentSpeed = this.SPEEDS[0];
            this.currentDrag = this.DRAGS[0];
            this.currentBounce = this.BOUNCES[0];
            this.setDrag(this.currentDrag);
        }

        // MOVEMENT ======================================================
        this.direction.normalize();
        this.setAcceleration(this.currentSpeed * this.direction.x, this.currentSpeed * this.direction.y);

        // ANIMATION ======================================================
        let newDirectionName = this.updateDirectionName(this.direction, this.directionName);
        if (newDirectionName != this.directionName) {
            this.anims.play(`${this.ID}-${newDirectionName}`, true);
            console.log("changing direction");
            this.directionName = newDirectionName;
        }
        
    }

    updateDirectionName(directionVector, oldName) {
        let newName = oldName;
        // Prioritize vertical directions first.
        if (directionVector.y != 0) {
            if (directionVector.y == 1) newName = "down";
            if (directionVector.y == -1) newName = "up";
        } else {
            if (directionVector.x == 1) newName = "right";
            if (directionVector.x == -1) newName = "left";
        }
        
        return newName;
    }

    won() {
        this.setAcceleration(0);
        this.setVelocity(0);
    }

    lost() {
        this.setAcceleration(0);
        this.setAlpha(0.5);
    }
}