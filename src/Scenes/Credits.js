class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    init() {
        this.TEXT_WIDTH = 0.5;
        this.SCROLL_SPEED = 1.5;
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;

        this.background = this.add.sprite(game.config.width/2, game.config.height/2, "background").
            setScale(SPRITE_SCALE*4);

        this.credits = this.add.sprite(game.config.width*this.TEXT_WIDTH, game.config.height*0.75, "credits", 0).
            setScale(SPRITE_SCALE);

        this.credits.topHeight = game.config.height*0.75;
        this.credits.bottomHeight = game.config.height*0.25;
        
        // Scroll arrows
        this.upArrow = this.add.sprite(game.config.width*0.9, game.config.height*0.1, "cursor")
            .setScale(SPRITE_SCALE).setRotation(-0.5*Math.PI);
        this.downArrow = this.add.sprite(game.config.width*0.9, game.config.height*0.9, "cursor")
            .setScale(SPRITE_SCALE).setRotation(0.5*Math.PI);

        this.cursor = this.add.sprite(game.config.width*0.25, game.config.height*0.85, "cursor")
            .setScale(SPRITE_SCALE);
        this.cursor.yOffset = this.cursor.y-this.credits.bottomHeight;
        this.cursor.anims.play("cursor");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.menu_Primary)) {
            this.sound.play("confirm");
            this.scene.start("menuScene");
        }
        
        // Animate scrolling
        if (this.input.keyboard.checkDown(this.KEYS.p1_Down) || this.input.keyboard.checkDown(this.KEYS.p2_Down)) {
            this.credits.y -= this.SCROLL_SPEED;
        }

        if (this.input.keyboard.checkDown(this.KEYS.p1_Up) || this.input.keyboard.checkDown(this.KEYS.p2_Up)) {
            this.credits.y += this.SCROLL_SPEED;
        }

        // Clamping
        if (this.credits.y > this.credits.topHeight) {
            this.credits.y = this.credits.topHeight;
            this.upArrow.setAlpha(0.5);
        } else {
            this.upArrow.setAlpha(1);
        }

        // Arrow 'greying out'
        if (this.credits.y <= this.credits.bottomHeight) {
            this.credits.y = this.credits.bottomHeight;
            this.downArrow.setAlpha(0.5);
        } else {
            this.downArrow.setAlpha(1);
        }

        // Move! That! Cursor!
        this.cursor.y = this.credits.y+this.cursor.yOffset;
    }
}