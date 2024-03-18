// Make the Fake: Sumo Scootz
// Name: Dylan Mahler

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 150,
    height: 100,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, KeyDef, Menu, VersusPlay, Results ]
}

const game = new Phaser.Game(config)
const SHOW_STAGE_COLLIDER = false
const SPRITE_SCALE = 1