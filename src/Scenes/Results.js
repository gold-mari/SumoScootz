class Results extends Phaser.Scene {
    constructor() {
        super("resultsScene");
    }

    init() {
        this.FIREWORKS_DELAY = 2000;   
    }

    preload() {
        
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;

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
            frequency: -1
        }).setDepth(200);

        this.fireworksTimer = this.time.addEvent({
            delay: this.FIREWORKS_DELAY,
            loop: true,
            callbackScope: this,
            callback: () => {
                let x = Phaser.Math.FloatBetween(0.2, 0.8);
                let y = Phaser.Math.FloatBetween(0.2, 0.8);
                this.fireworks.explode(50, game.config.width*x, game.config.height*y);
            }
        });

        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.menu_Primary)) {
            this.scene.start("menuScene");
        }

        if (this.winnerDriver != undefined) {
            this.winnerDriver.update();

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
            default:
                this.winnerText.anims.play("draw");
                this.winnerText.y = game.config.height*0.45;
                this.menuText.y = game.config.height*0.6;
                this.cursor.y = this.menuText.y;
                return;
        }

        this.winnerDriver.setOrigin(0.5).setScale(SPRITE_SCALE).setDepth(50);
        this.winnerDriver.body.collideWorldBounds = true;
        this.winnerDriver.body.onWorldBounds = true;
        this.physics.world.on("worldbounds", this.handleCollision, this);
    }

    handleCollision()
    {
        if (!this.driverTouching) {
            this.sound.play("bump-slow");
            this.driverTouching = true;
        }
    }
}