class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    init() {
        
    }

    preload() {
        this.load.image("car", "./assets/car.png", 0);
    }

    create() {
        this.scene.start("versusPlayScene");   
    }
}