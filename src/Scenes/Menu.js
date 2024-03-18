class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init() {
        this.OPTION_WIDTH = 0.525;
    }

    preload() {
        
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;

        this.background = this.add.sprite(game.config.width/2, game.config.height/2, "background").
            setScale(SPRITE_SCALE*4);
        this.logo = this.add.sprite(game.config.width/2, game.config.height*0.34, "logo").
            setScale(SPRITE_SCALE);

        this.versusText = this.add.sprite(game.config.width*this.OPTION_WIDTH, game.config.height*0.62, "menu-options", 0).
            setScale(SPRITE_SCALE);
        this.creditsText = this.add.sprite(game.config.width*this.OPTION_WIDTH, game.config.height*0.71, "menu-options", 1).
            setScale(SPRITE_SCALE);
        this.quitText = this.add.sprite(game.config.width*this.OPTION_WIDTH, game.config.height*0.80, "menu-options", 2).
            setScale(SPRITE_SCALE);

        this.cursor = this.add.sprite(game.config.width*0.375, this.versusText.y+1, "cursor").
            setScale(SPRITE_SCALE);

        this.options = [this.versusText, this.creditsText, this.quitText];
        this.cursor.index = 0;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.p1_Down) || Phaser.Input.Keyboard.JustDown(this.KEYS.p2_Down) ) {
            this.cursor.index = (this.cursor.index+1)%this.options.length;
            this.cursor.y = this.options[this.cursor.index].y + 1;
        }

        if (Phaser.Input.Keyboard.JustDown(this.KEYS.p1_Up) || Phaser.Input.Keyboard.JustDown(this.KEYS.p2_Up) ) {
            this.cursor.index--;
            if (this.cursor.index < 0) this.cursor.index = this.options.length-1;
            this.cursor.y = this.options[this.cursor.index].y + 1;
        }

        if (Phaser.Input.Keyboard.JustDown(this.KEYS.menu_Primary)) {
            switch (this.cursor.index) {
                case 0: {   // Play
                    this.scene.start("versusPlayScene");
                    break;
                }
                case 1: {   // Credits
                    console.log("GOING TO CREDITS.");
                    this.scene.start("versusPlayScene");
                    break;
                }
                case 2: {   // Quit
                    game.destroy(true, false);
                    document.getElementById("game").innerHTML = 
                        `<img src="./assets/quit/boom.gif">
                        <audio autoplay source src="./assets/quit/boom.mp3" type="audio/mpeg">`
                    break;
                }
            }
        }
    }
}