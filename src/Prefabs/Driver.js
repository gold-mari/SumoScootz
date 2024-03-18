class Driver extends Phaser.Physics.Arcade.Sprite {
    constructor(ID, scene, x, y, texture, frame, controls) {
        super(scene, x, y, texture, frame);

        this.ID = ID;

        scene.add.existing(this);           // add object to existing, displayList, updateList
        scene.physics.add.existing(this);   // add to physics

        this.SPEEDS = [25, 125];
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

        // Visuals ====================
        this.updateAnimation();
        let lightColor = (ID == "driver1") ? 0x55ffff : 0xff55ff;
        let darkColor = (ID == "driver1") ? 0x00aaaa : 0xaa00aa;

        this.smoke = scene.add.particles(0, 0, "confetto", {
            frame: 0,
            scaleX: { random: false, start: 2, end: 0 },
            scaleY: { random: false, start: 1, end: 0 },
            angle: { min: 250, max: 290 },
            color: [lightColor, lightColor, lightColor, darkColor],
            speed: { min: 25, max: 50 },
            gravityX: -this.body.velocity.x,
            gravityY: -1,
            lifespan: 750,
        }).setDepth(this.depth-1).startFollow(this, 0, 5.5);
        this.smoke.stop();
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
                this.smoke.stop();

                this.currentSpeed = this.SPEEDS[0];
                this.currentDrag = this.DRAGS[0];
                this.currentBounce = this.BOUNCES[0];
                this.setDrag(this.currentDrag);
            
                this.updateAnimation();
            }
            else if (this.gearName == "slow") {
                this.gearName = "fast";
                this.smoke.start();

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
        this.anims.play(`${this.ID}-${"win"}-${this.gearName}`, true);
    }

    lost() {
        this.setAcceleration(0);
        let v = this.body.velocity;
        this.setVelocity(v.x*0.25, v.y*0.25);
        this.setAlpha(0.5);

        this.scene.tweens.add({
            targets: this,
            scale: {value: 0, duration: 1000, ease: "Linear"},            
            angle: {value: 180, duration: 1000, ease: "Linear"}
        });
    }
}