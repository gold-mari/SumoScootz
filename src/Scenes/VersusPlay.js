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
    }

    update() {
        this.driver1.update();
        this.driver2.update();
    }
}