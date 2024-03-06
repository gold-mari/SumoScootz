class VersusPlay extends Phaser.Scene {
    constructor() {
        super('versusPlayScene');
    }

    init() {
        
    }

    preload() {
        
    }

    create() {
        this.driver1 = new Driver(this, game.config.width/2, game.config.height/2, "car", 0, {
            leftKey: "D",
            rightKey: "A",
            upKey: "W",
            downKey: "S",
            upshiftKey: "E",
            downshiftKey: "Q"
        });
    }

    update() {
        this.driver1.update();
    }
}