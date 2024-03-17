// Make the Fake: Sumo Scootz
// Name: Dylan Mahler

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 400,
    height: 300,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, KeyDef, VersusPlay, Results ]
}

const game = new Phaser.Game(config)
const SHOW_STAGE_COLLIDER = false