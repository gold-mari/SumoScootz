// Make the Fake: Sumo Scootz
// Name: Dylan Mahler

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ VersusPlay ]
}

const game = new Phaser.Game(config)