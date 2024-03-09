class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    init() {
        
    }

    preload() {
        // Art ========================
        this.load.image("car", "./assets/car.png", 0);

        // Sound ======================
        this.load.audio("fall", "./assets/sound/fall-sfx.mp3");
    }

    create() {
        this.scene.start("keyDefScene"); 
    }
}