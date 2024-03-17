class Driver extends Phaser.Physics.Arcade.Sprite {
    constructor(ID, scene, x, y, texture, frame, controls) {
        super(scene, x, y, texture, frame);

        this.ID = ID;

        scene.add.existing(this);           // add object to existing, displayList, updateList
        scene.physics.add.existing(this);   // add to physics

        this.SPEEDS = [100, 500];
        this.DRAGS = [0.001, 0.9];
        this.BOUNCES = [0.5, 1];

        // Controls ===================
        this.leftKey = controls.leftKey;
        this.rightKey = controls.rightKey;
        this.upKey = controls.upKey;
        this.downKey = controls.downKey;
        this.shiftKey = controls.shiftKey;

        // State ======================
        this.direction = new Phaser.Math.Vector2(0);
        this.directionName = "down";

        this.gearName = "slow";

        this.currentSpeed = this.SPEEDS[0];
        this.currentDrag = this.DRAGS[0];
        this.currentBounce = this.BOUNCES[0];

        this.setDrag(this.currentDrag);
        this.setBounce(this.currentBounce);
        this.setDamping(true);

        this.updateAnimation();
    }

    update() {
        // ACCELERATION =======================================================
        this.direction = new Phaser.Math.Vector2(0);
        let moving = false;

        if (this.leftKey.isDown) {
            this.direction.x -= 1;
            moving = true;
        }
        if (this.rightKey.isDown) {
            this.direction.x += 1;
            moving = true;
        }
        if (this.upKey.isDown) {
            this.direction.y -= 1;
            moving = true;
        }
        if (this.downKey.isDown) {
            this.direction.y += 1;
            moving = true;
        }

        // GEAR SHIFTING ======================================================
        if (Phaser.Input.Keyboard.JustDown(this.shiftKey)) {
            if (this.gearName == "fast") {
                this.gearName = "slow";

                this.currentSpeed = this.SPEEDS[0];
                this.currentDrag = this.DRAGS[0];
                this.currentBounce = this.BOUNCES[0];
                this.setDrag(this.currentDrag);
            
                this.updateAnimation();
            }
            else if (this.gearName == "slow") {
                this.gearName = "fast";

                this.currentSpeed = this.SPEEDS[1];
                this.currentDrag = this.DRAGS[1];
                this.currentBounce = this.BOUNCES[1];
                this.setDrag(this.currentDrag);

                this.updateAnimation();
            }
        }

        // MOVEMENT ======================================================
        this.direction.normalize();
        this.setAcceleration(this.currentSpeed * this.direction.x, this.currentSpeed * this.direction.y);

        // ANIMATION ======================================================
        let newDirectionName = this.updateDirectionName(this.direction, this.directionName);
        if (newDirectionName != this.directionName) {
            this.directionName = newDirectionName;
            this.updateAnimation();
        }
        
    }

    updateAnimation() {
        this.anims.play(`${this.ID}-${this.directionName}-${this.gearName}`, true);
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