class HowToPlay extends Phaser.Scene {
    constructor() {
        super("howToPlayScene");
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;

        this.background = this.add.sprite(game.config.width/2, game.config.height/2, "background").
            setScale(SPRITE_SCALE*4);

        this.instructions = this.add.sprite(game.config.width*0.5, game.config.height*0.5, "howtoplay", 0).
            setScale(SPRITE_SCALE);
        
        this.cursor = this.add.sprite(game.config.width*0.41, game.config.height*0.88, "cursor").
            setScale(SPRITE_SCALE);
        this.cursor.anims.play("cursor");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.menu_Primary)) {
            this.sound.play("confirm");
            this.scene.start("menuScene");
        }
    }
}