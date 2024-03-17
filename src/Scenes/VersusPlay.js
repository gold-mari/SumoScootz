class VersusPlay extends Phaser.Scene {
    constructor() {
        super("versusPlayScene");
    }

    init() {
        this.SPRITE_SCALE = 3;
        this.CAMERA_ZOOM = 1;

        this.DELAY_AFTER_END = 2000;
        this.BODY_RADIUS = 4;
        this.BODY_OFFSET = new Phaser.Math.Vector2(4,10);

        this.CLOUD_SCROLL_AMOUNT = 0.1;

        this.FRONTDRIVER_DEPTH = 20;
        this.BACKDRIVER_DEPTH = 10;
        this.BACKGROUND_DEPTH = 0;

        this.WHO_IS_ON_TOP = "driver1";
    }

    preload() {
        
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;
        this.gameOver = false;
        game.settings = {
            winner: 0
        };

        this.cameras.main.zoom = this.CAMERA_ZOOM;

        // Drivers ====================
        this.driver1 = new Driver("driver1", this, game.config.width*0.333, game.config.height/2, "driver1", 0, {
            leftKey: this.KEYS.p1_Left,
            rightKey: this.KEYS.p1_Right,
            upKey: this.KEYS.p1_Up,
            downKey: this.KEYS.p1_Down,
            upshiftKey: this.KEYS.p1_Upshift,
            downshiftKey: this.KEYS.p1_Downshift
        }).setOrigin(0.5).setScale(this.SPRITE_SCALE).setCircle(this.BODY_RADIUS,this.BODY_OFFSET.x,this.BODY_OFFSET.y);

        this.driver2 = new Driver("driver2", this, game.config.width*0.667, game.config.height/2, "driver2", 0, {
            leftKey: this.KEYS.p2_Left,
            rightKey: this.KEYS.p2_Right,
            upKey: this.KEYS.p2_Up,
            downKey: this.KEYS.p2_Down,
            upshiftKey: this.KEYS.p2_Upshift,
            downshiftKey: this.KEYS.p2_Downshift
        }).setOrigin(0.5).setScale(this.SPRITE_SCALE).setCircle(this.BODY_RADIUS,this.BODY_OFFSET.x,this.BODY_OFFSET.y);

        this.physics.add.collider(this.driver1, this.driver2, null, null, this);

        // Backround =================
        this.background = this.add.sprite(game.config.width/2, game.config.height/2, "background").
            setScale(this.SPRITE_SCALE*4).setDepth(this.BACKGROUND_DEPTH-3);
        this.clouds = this.add.tileSprite(game.config.width/2, game.config.height/2, 1600, 1600, "clouds").
            setScale(this.SPRITE_SCALE).setDepth(this.BACKGROUND_DEPTH-2);
        this.stage = this.add.sprite(game.config.width/2, game.config.height*0.51, "stage").
            setScale(this.SPRITE_SCALE).setDepth(this.BACKGROUND_DEPTH-1);

        // Bounds ====================
        this.stageBounds = new Phaser.Geom.Ellipse(game.config.width/2, game.config.height*0.51, 310, 210);

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
        this.clouds.tilePositionX += this.CLOUD_SCROLL_AMOUNT;

        if (!this.gameOver) {
            if (this.stageBounds.contains(this.driver1.x, this.driver1.y) && 
                this.stageBounds.contains(this.driver2.x, this.driver2.y)) {
                // if both drivers remain, keep sending them both updates.
                this.driver1.update();
                this.driver2.update();
                // adjust their depths if the relative positions have changed.
                if (this.driver1.depth != this.BACKDRIVER_DEPTH && this.driver1.y < this.driver2.y) {
                    this.driver1.setDepth(this.BACKDRIVER_DEPTH);
                    this.driver2.setDepth(this.FRONTDRIVER_DEPTH);
                }
                else if (this.driver1.depth != this.FRONTDRIVER_DEPTH && this.driver1.y > this.driver2.y) {
                    this.driver1.setDepth(this.FRONTDRIVER_DEPTH);
                    this.driver2.setDepth(this.BACKDRIVER_DEPTH);
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