class HowToPlay extends Phaser.Scene {
    constructor() {
        super("howToPlayScene");
    }

    init() {
        this.TEXT_WIDTH = 0.525;
    }

    preload() {
        
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;

        this.background = this.add.sprite(game.config.width/2, game.config.height/2, "background").
            setScale(SPRITE_SCALE*4);

        this.versusText = this.add.sprite(game.config.width*this.OPTION_WIDTH, game.config.height*0.62, "menu-options", 0).
            setScale(SPRITE_SCALE);
        
        this.cursor = this.add.sprite(game.config.width*0.375, this.versusText.y+1, "cursor").
            setScale(SPRITE_SCALE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.menu_Primary)) {
            this.scene.start("menuScene");
        }
    }
}