class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    init() {
        
    }

    preload() {
        // Art ========================
        this.load.image("car", "./assets/car.png", 0);
        this.load.spritesheet("driver1", "./assets/drivers.png",  {
            frameWidth: 16,
            frameHeight: 19,
            startFrame: 0,
            endFrame: 3
        });
        this.load.spritesheet("driver2", "./assets/drivers.png",  {
            frameWidth: 16,
            frameHeight: 19,
            startFrame: 4,
            endFrame: 7
        });

        // Sound ======================
        this.load.audio("fall", "./assets/sound/fall-sfx.mp3");
    }

    create() {
        // Anims ======================
        this.anims.create({
            key: "driver1-up",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("driver1", { start: 0, end: 0 })
        });
        this.anims.create({
            key: "driver1-left",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("driver1", { start: 1, end: 1 })
        });
        this.anims.create({
            key: "driver1-right",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("driver1", { start: 2, end: 2 })
        });
        this.anims.create({
            key: "driver1-down",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("driver1", { start: 3, end: 3 })
        });

        this.anims.create({ 
            key: "driver2-up",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("driver2", { start: 0, end: 0 })
        });
        this.anims.create({
            key: "driver2-left",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("driver2", { start: 1, end: 1 })
        });
        this.anims.create({
            key: "driver2-right",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("driver2", { start: 2, end: 2 })
        });
        this.anims.create({
            key: "driver2-down",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("driver2", { start: 3, end: 3 })
        });

        this.scene.start("keyDefScene"); 
    }
}