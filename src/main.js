// 👾 Make the Fake: Finished Game [♾️ hours]
// Dylan Mahler - Sumo Scootz (Adventure Time, 2013)
// CMPM 120, Winter 2024
// ================
// Phaser core components used:
//  1. Arcade physics systems
//  2. Animation manager
//  3. Particle effects (exhaust, collisions, fireworks)
//  4. Sound manager (some SFX change pitch for variety)
//  5. Tweens (for the falling-down animation)
//  6. Timers (for delayed function calls and the ending fireworks)
// ================
// Things I'm proud of:
//  * I'm an audio person by trade, so I was pleasantly surprised to find out 
//    Phaser has some good audio tools. I wanted to make engine noises, but I'm
//    really happy with my dynamic impact sounds which change depending on 
//    which gear you're in. I'd like to revisit this project and add more to it
//    outside of class!
//  * You can move around in the results screen! I think it's a fun little 
//    sandbox to mess around with the movement code.
//  * All sprites for the drivers are stored on one sheet, and are procedurally
//    turned into animations in Load.js, taking advantage of some handy naming
//    conventions. This makes it very easy to access them from within Driver.js.
//  * In Adventure Time, Sumo Scootz is played on BMO, a robot character who
//    can sometimes act like a video game console. I picked the page background
//    color (#56af9b) and the game background color (#cbffdb) to match BMO's
//    color scheme. :3c
//  * Try quitting the game!
// ================

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
        mode: Phaser.Scale.FIT
    },
    scene: [ Load, KeyDef, Menu, HowToPlay, Credits, VersusPlay, Results ]
}

const game = new Phaser.Game(config)
const SHOW_STAGE_COLLIDER = false
const SPRITE_SCALE = 1