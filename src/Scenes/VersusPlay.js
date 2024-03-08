class VersusPlay extends Phaser.Scene {
    constructor() {
        super("versusPlayScene");
    }

    init() {
        
    }

    preload() {
        
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;
        this.gameOver = false;

        // Drivers ====================
        this.driver1 = new Driver("Driver1", this, game.config.width*0.333, game.config.height/2, "car", 0, {
            leftKey: this.KEYS.p1_Left,
            rightKey: this.KEYS.p1_Right,
            upKey: this.KEYS.p1_Up,
            downKey: this.KEYS.p1_Down,
            upshiftKey: this.KEYS.p1_Upshift,
            downshiftKey: this.KEYS.p1_Downshift
        });

        this.driver2 = new Driver("Driver2", this, game.config.width*0.667, game.config.height/2, "car", 0, {
            leftKey: this.KEYS.p2_Left,
            rightKey: this.KEYS.p2_Right,
            upKey: this.KEYS.p2_Up,
            downKey: this.KEYS.p2_Down,
            upshiftKey: this.KEYS.p2_Upshift,
            downshiftKey: this.KEYS.p2_Downshift
        });

        this.physics.add.collider(this.driver1, this.driver2, null, null, this);

        // Bounds ====================
        this.stageBounds = new Phaser.Geom.Ellipse(game.config.width/2, game.config.height/2, 600, 400);
        if (SHOW_STAGE_COLLIDER || game.config.physics.arcade.debug) {
            const graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00aaaa } });
            graphics.strokeEllipseShape(this.stageBounds);
        }
    }

    update() {
        if (!this.gameOver) {
            if (this.stageBounds.contains(this.driver1.x, this.driver1.y) && 
                this.stageBounds.contains(this.driver2.x, this.driver2.y)) {
                // if both drivers remain, keep sending them both updates.
                this.driver1.update();
                this.driver2.update();
            } else {
                // if driver 1 fell out...
                if (!this.stageBounds.contains(this.driver1.x, this.driver1.y)) {
                    // mark driver 1 as a loser and driver 2 as a winner.
                    this.driver1.lost();
                    this.driver2.won();
                }
                // if driver 2 fell out...
                if (!this.stageBounds.contains(this.driver2.x, this.driver2.y)) {
                    // mark driver 1 as a winner and driver 2 as a loser.
                    this.driver1.won();
                    this.driver2.lost();
                }

                this.gameOver = true;
            }
        }
    }
}