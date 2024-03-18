class Results extends Phaser.Scene {
    constructor() {
        super("resultsScene");
    }

    init() {
        this.FIREWORKS_DELAY = 3000;   
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;

        this.music = this.sound.add("victory");
        this.music.play();

        // Text =======================
        this.winnerText = this.add.sprite(game.config.width/2, game.config.height*0.31, "winner").
            setScale(SPRITE_SCALE).setDepth(100);
        this.winnerText.anims.play("winner");

        this.menuText = this.add.sprite(game.config.width/2, game.config.height*0.75, "menu").
            setScale(SPRITE_SCALE).setDepth(0).setTintFill(0x55ff55);
        this.cursor = this.add.sprite(game.config.width*0.41, this.menuText.y+1, "cursor").
            setScale(SPRITE_SCALE).setDepth(0).setTintFill(0x55ff55);
        this.cursor.anims.play("cursor");

        // Winner Driver stuffs =======
        this.driverTouching = false;
        this.winnerDriver = undefined;
        this.paintWinner(game.settings.winner);

        // Particles ==================
        this.fireworks = this.add.particles(0, 0, "confetto", {
            frame: 0,
            angle: { min: 0, max: 360 },
            color: [0xff0000, 0xffff00, 0xffff00, 0xffff00],
            scale: { random: false, start: 1, end: 0 },
            speed: { min: 50, max: 100 },
            gravityY: 120,
            frequency: -1,
            lifespan: 1500
        }).setDepth(200);
        this.fireworksSound = this.sound.add("firework");
        
        this.fireworksTimer = this.time.addEvent({
            delay: this.FIREWORKS_DELAY,
            loop: true,
            callbackScope: this,
            callback: () => {
                let x = Phaser.Math.FloatBetween(0.2, 0.8);
                let y = Phaser.Math.FloatBetween(0.2, 0.8);
                let rate = Phaser.Math.FloatBetween(0.9, 1.1)
                this.fireworksSound.rate = rate;
                this.fireworksSound.play();
                // 1150 is a bit of a magic number- the boom of the fireworks SFX happens 1.15 seconds in.
                this.time.delayedCall(1150*rate, () => {
                    this.fireworks.explode(50, game.config.width*x, game.config.height*y);
                }, this);

                this.fireworksTimer.delay = this.FIREWORKS_DELAY * Phaser.Math.FloatBetween(0.8, 1.2);
            }
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.menu_Primary)) {
            this.sound.play("confirm");
            this.fireworksSound.stop();
            this.music.stop();
            this.scene.start("menuScene");
        }

        if (this.winnerDriver != undefined) {
            this.winnerDriver.update();

            // If we WERE touching the bounds but no longer are...
            if (this.driverTouching && this.winnerDriver.body.blocked.none) {
                this.driverTouching = false;
            }
        }
    }

    paintWinner(winner) {
        switch (winner) {
            case 1:
                this.winnerDriver = new Driver("driver1", this, game.config.width/2, game.config.height*0.55, "drivers", 0, {
                    leftKey: this.KEYS.p1_Left,
                    rightKey: this.KEYS.p1_Right,
                    upKey: this.KEYS.p1_Up,
                    downKey: this.KEYS.p1_Down,
                    shiftKey: this.KEYS.p1_Shift
                }).anims.play("driver1-win-slow");
                break;
            case 2:
                this.winnerDriver = new Driver("driver2", this, game.config.width/2, game.config.height*0.55, "drivers", 8, {
                    leftKey: this.KEYS.p2_Left,
                    rightKey: this.KEYS.p2_Right,
                    upKey: this.KEYS.p2_Up,
                    downKey: this.KEYS.p2_Down,
                    shiftKey: this.KEYS.p2_Shift
                }).anims.play("driver2-win-slow");
                break;
            default:    // No winner, both players fell out at once.
                this.winnerText.anims.play("draw");
                this.winnerText.y = game.config.height*0.45;
                this.menuText.y = game.config.height*0.6;
                this.cursor.y = this.menuText.y+1;
                return;
        }

        this.winnerDriver.setOrigin(0.5).setScale(SPRITE_SCALE).setDepth(50);
        this.winnerDriver.body.collideWorldBounds = true;
        this.winnerDriver.body.onWorldBounds = true;
        this.physics.world.on("worldbounds", this.handleCollision, this);
        this.bumpSound = this.sound.add("bump-slow");
    }

    handleCollision()
    {
        if (!this.driverTouching) {
            this.bumpSound.rate = Phaser.Math.FloatBetween(0.9, 1.1);
            this.bumpSound.play();
            this.driverTouching = true;
        }
    }
}