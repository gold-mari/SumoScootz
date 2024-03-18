class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    init() {
        
    }

    preload() {
        // Art ========================
        this.load.image("background", "./assets/background.png");
        this.load.image("logo", "./assets/logo.png");
        this.load.spritesheet("menu-options", "./assets/menu-options.png",  {
            frameWidth: 42,
            frameHeight: 6
        });
        this.load.spritesheet("cursor", "./assets/cursor.png", {
            frameWidth: 5,
            frameHeight: 5
        });
        this.load.image("spacebar", "./assets/spacebar.png");

        this.load.image("credits", "./assets/credits.png");

        this.load.spritesheet("drivers", "./assets/drivers.png",  {
            frameWidth: 18,
            frameHeight: 21
        });

        this.load.image("background", "./assets/background.png");
        this.load.image("clouds", "./assets/clouds.png");
        this.load.image("stage", "./assets/stage.png");

        // Sound ======================
        this.load.audio("fall", "./assets/sound/fall-sfx.mp3");

        this.load.on('complete', function () {
            console.log('complete');
            this.scene.start("keyDefScene");
        }, this);
    }

    create() {
        // Misc anims ========================
        this.anims.create({
            key: "cursor",
            frames: this.anims.generateFrameNumbers("cursor", { 
                start: 0, 
                end: 1
            }),
            repeat: -1,
            frameRate: 3
        });

        // Driver anims ======================
        let drivers = ["driver1", "driver2"];
        let directions = ["up", "left", "right", "down", "win"];
        let gears = ["slow", "fast"];

        let framesPerAnim = 1;
        let i = 0;

        for (let gear of gears) {
            for (let driver of drivers) {
                for (let direction of directions) {
                    if (direction == "win") {
                        framesPerAnim = 2;
                    }

                    this.anims.create({
                        key: `${driver}-${direction}-${gear}`,
                        frames: this.anims.generateFrameNumbers("drivers", { 
                            start: i, 
                            end: i+(1*framesPerAnim) - 1 
                        }),
                        repeat: -1,
                        frameRate: 3
                    });

                    if (direction == "win") {
                        framesPerAnim = 1;  // Reset.
                        i += 2;
                    } else {
                        i += 1;
                    }
                }
            }
        }
    }
}