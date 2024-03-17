class Results extends Phaser.Scene {
    constructor() {
        super("resultsScene");
    }

    init() {
        this.FLASH_DELAY = 300;
    }

    preload() {
        
    }

    create() {
        this.KEYS = this.scene.get("keyDefScene").KEYS;

        // Text =======================
        this.headerText = this.add.text(game.config.width/2, game.config.height*0.3, "WINNER", {
            color: "#ffffff",
            fontFamily: "Trebuchet MS",
            fontSize: "35px"
        }).setOrigin(0.5).setTint(0xffff00);

        this.time.addEvent({
            delay: this.FLASH_DELAY,
            loop: true,
            callbackScope: this,
            callback: () => {
                let nextTint = (this.headerText.tint == 0xffff00) ? 0xff0000 : 0xffff00;
                this.headerText.setTint(nextTint);
            }
        });

        this.add.text(game.config.width/2, game.config.height*0.5, this.getWinnerText(game.settings.winner), { 
            color: "#00ffff",
            fontFamily: "Trebuchet MS",
            fontSize: "20px"
        }).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height*0.7, "Press space to replay.", { 
            color: "#ffff00",
            fontFamily: "Trebuchet MS",
            fontSize: "10px"
        }).setOrigin(0.5);        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.KEYS.menu_Primary)) {
            this.scene.start("versusPlayScene");
        }
    }

    getWinnerText(winner) {
        switch (winner) {
            case 1:
                return "Player One won! Good going!";
            case 2:
                return "Player Two won! Nice one!";
            default:
                return "Nobody won? I didn't know that was possible!"
        }
        
    }
}