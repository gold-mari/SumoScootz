class KeyDef extends Phaser.Scene {
    constructor() {
        super("keyDefScene");
    }

    init() {
        
    }

    preload() {
        
    }

    create() {
        this.KEYS = {
            p1_Left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            p1_Right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            p1_Up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            p1_Down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            p1_Upshift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            p1_Downshift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            
            p2_Left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
            p2_Right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L),
            p2_Up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I),
            p2_Down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
            p2_Upshift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O),
            p2_Downshift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U)
        }

        this.scene.launch("versusPlayScene");   
    }
}