class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init() {
        this.OPTION_WIDTH = 0.53;
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;

        this.background = this.add.sprite(game.config.width/2, game.config.height/2, "background").
            setScale(SPRITE_SCALE*4);
        this.logo = this.add.sprite(game.config.width/2, game.config.height*0.31, "logo").
            setScale(SPRITE_SCALE);

        this.versusText = this.add.sprite(game.config.width*this.OPTION_WIDTH, game.config.height*0.59, "menu-options", 0).
            setScale(SPRITE_SCALE);
        this.howToPlayText = this.add.sprite(game.config.width*this.OPTION_WIDTH, game.config.height*0.68, "menu-options", 1).
            setScale(SPRITE_SCALE);
        this.creditsText = this.add.sprite(game.config.width*this.OPTION_WIDTH, game.config.height*0.77, "menu-options", 2).
            setScale(SPRITE_SCALE);
        this.quitText = this.add.sprite(game.config.width*this.OPTION_WIDTH, game.config.height*0.86, "menu-options", 3).
            setScale(SPRITE_SCALE);

        this.cursor = this.add.sprite(game.config.width*0.36, this.versusText.y+1, "cursor").
            setScale(SPRITE_SCALE);
        this.cursor.anims.play("cursor");
        this.spacebar = this.add.sprite(game.config.width*0.25, this.versusText.y+1, "spacebar").
            setScale(SPRITE_SCALE);

        this.options = [this.versusText, this.howToPlayText, this.creditsText, this.quitText];
        this.cursor.index = 0;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.p1_Down) || Phaser.Input.Keyboard.JustDown(this.KEYS.p2_Down)) {
            this.cursor.index = (this.cursor.index+1)%this.options.length;
            this.cursor.y = this.options[this.cursor.index].y + 1;
            this.spacebar.y = this.cursor.y;
            this.sound.play("select");
        }

        if (Phaser.Input.Keyboard.JustDown(this.KEYS.p1_Up) || Phaser.Input.Keyboard.JustDown(this.KEYS.p2_Up)) {
            this.cursor.index--;
            if (this.cursor.index < 0) this.cursor.index = this.options.length-1;
            this.cursor.y = this.options[this.cursor.index].y + 1;
            this.spacebar.y = this.cursor.y;
            this.sound.play("select");
        }

        if (Phaser.Input.Keyboard.JustDown(this.KEYS.menu_Primary)) {
            this.sound.play("confirm");
            switch (this.cursor.index) {
                case 0: {   // Play
                    this.scene.start("versusPlayScene");
                    break;
                }
                case 1: {   // How To Play
                    this.scene.start("howToPlayScene");
                    break;
                }
                case 2: {   // Credits
                    this.scene.start("creditsScene");
                    break;
                }
                case 3: {   // Quit
                    game.destroy(true, true);
                    document.getElementById("game").innerHTML = 
                        `<img src="./assets/quit/boom.gif">
                        <audio autoplay source src="./assets/quit/boom.mp3" type="audio/mpeg">`
                    break;
                }
            }
        }
    }
}