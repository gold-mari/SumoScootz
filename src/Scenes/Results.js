class Results extends Phaser.Scene {
    constructor() {
        super("resultsScene");
    }

    init() {
        
    }

    preload() {
        
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;

        // Text =======================
        this.winnerText = this.add.sprite(game.config.width/2, game.config.height*0.31, "winner").
            setScale(SPRITE_SCALE).setDepth(100);
        this.winnerText.anims.play("winner");

        this.paintWinner(game.settings.winner);
        
        this.menuText = this.add.sprite(game.config.width/2, game.config.height*0.75, "menu").
            setScale(SPRITE_SCALE).setDepth(0).setTintFill(0x55ff55);
        this.cursor = this.add.sprite(game.config.width*0.36, this.menuText.y, "cursor").
            setScale(SPRITE_SCALE).setDepth(0).setTintFill(0x55ff55);
        this.cursor.anims.play("cursor");

        this.winnerDriver.setDepth(50);
        this.driverTouching = false;
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

            console.log(this.driverTouching);
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
                // return "Nobody won? I didn't know that was possible!"
                console.log("no winner");
                break;
        }

        this.winnerDriver.setOrigin(0.5).setScale(SPRITE_SCALE);
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