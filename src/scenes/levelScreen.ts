import Phaser from "phaser";
//import PhaserLogo from "../objects/phaserLogo";
//import FpsText from "../objects/fpsText";

export default class levelScreen extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super({ key: "levelScreen" });
    }

    create() {
        this.add.image(2048, 857, "levelBackg");
    }
}
