class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init() {
        
    }

    preload() {
        
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;

        this.background = this.add.sprite(game.config.width/2, game.config.height/2, "background").
            setScale(SPRITE_SCALE*4);
        this.clouds = this.add.sprite(game.config.width/2, game.config.height/2, "logo").
            setScale(SPRITE_SCALE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.menu_Primary)) {
            this.scene.start("versusPlayScene");
        }
    }
}