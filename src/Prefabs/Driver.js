class Driver extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, controls) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);           // add object to existing, displayList, updateList
        scene.physics.add.existing(this);   // add to physics

        this.leftKey = controls.leftKey;
        this.rightKey = controls.rightKey;
        this.upKey = controls.upKey;
        this.downKey = controls.downKey;
        this.upshiftKey = controls.upshiftKey;
        this.downshiftKey = controls.downshiftKey;

        for(var key in controls){ 
            console.log(controls[key]);
        }
    }

    update() {
    }
}