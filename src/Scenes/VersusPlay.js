class VersusPlay extends Phaser.Scene {
    constructor() {
        super("versusPlayScene");
    }

    init() {
        this.DELAY_AFTER_END = 2000;
        this.SPRITE_SCALE = 5;
        this.BODY_RADIUS = 5;
        this.BODY_OFFSET = new Phaser.Math.Vector2(3,9);

        this.FRONTDRIVER_DEPTH = 20;
        this.BACKDRIVER_DEPTH = 10;
        this.BACKGROUND_DEPTH = 0;
    }

    preload() {
        
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;
        this.gameOver = false;
        game.settings = {
            winner: 0
        };

        // Drivers ====================
        this.driver1 = new Driver("driver1", this, game.config.width*0.333, game.config.height/2, "driver1", 0, {
            leftKey: this.KEYS.p1_Left,
            rightKey: this.KEYS.p1_Right,
            upKey: this.KEYS.p1_Up,
            downKey: this.KEYS.p1_Down,
            upshiftKey: this.KEYS.p1_Upshift,
            downshiftKey: this.KEYS.p1_Downshift
        }).setScale(this.SPRITE_SCALE).setCircle(this.BODY_RADIUS,this.BODY_OFFSET.x,this.BODY_OFFSET.y);

        this.driver2 = new Driver("driver2", this, game.config.width*0.667, game.config.height/2, "driver2", 0, {
            leftKey: this.KEYS.p2_Left,
            rightKey: this.KEYS.p2_Right,
            upKey: this.KEYS.p2_Up,
            downKey: this.KEYS.p2_Down,
            upshiftKey: this.KEYS.p2_Upshift,
            downshiftKey: this.KEYS.p2_Downshift
        }).setScale(this.SPRITE_SCALE).setCircle(this.BODY_RADIUS,this.BODY_OFFSET.x,this.BODY_OFFSET.y);

        this.physics.add.collider(this.driver1, this.driver2, null, null, this);

        // Bounds ====================
        this.stageBounds = new Phaser.Geom.Ellipse(game.config.width/2, game.config.height/2, 600, 400);

        // Ellipse rendering code from https://labs.phaser.io/view.html?src=src\geom\ellipse\adjust%20size.js .
        if (SHOW_STAGE_COLLIDER || game.config.physics.arcade.debug) {
            const graphics = this.add.graphics({ 
                lineStyle: { 
                    width: 2, 
                    color: 0x00aaaa 
                }
            });
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
                // adjust their depths.
                if (this.driver1.y > this.driver2.y) {
                    this.driver1.setDepth(this.FRONTDRIVER_DEPTH);
                    this.driver2.setDepth(this.BACKDRIVER_DEPTH);
                } else {
                    this.driver1.setDepth(this.BACKDRIVER_DEPTH);
                    this.driver2.setDepth(this.FRONTDRIVER_DEPTH);
                }
            } else {
                // if driver 1 fell out...
                if (!this.stageBounds.contains(this.driver1.x, this.driver1.y)) {
                    // mark driver 1 as a loser and driver 2 as a winner.
                    this.driver1.lost();
                    this.driver2.won();
                    game.settings.winner = 2;
                }
                // if driver 2 fell out...
                if (!this.stageBounds.contains(this.driver2.x, this.driver2.y)) {
                    // mark driver 1 as a winner and driver 2 as a loser.
                    this.driver1.won();
                    this.driver2.lost();
                    game.settings.winner = 1;
                }

                this.sound.play("fall");
                this.gameOver = true;
                this.time.delayedCall(this.DELAY_AFTER_END, () => {
                    this.scene.start("resultsScene");
                });
            }
        }
    }
}