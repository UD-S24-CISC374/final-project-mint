import Phaser from "phaser";
import FpsText from "../objects/fpsText";

export default class LoadoutScene extends Phaser.Scene {
    fpsText: FpsText;

    constructor() {
        super({ key: "LoadoutScene" });
    }

    create() {
        this.add.image(2048, 857, "LoadoutMenu");

        this.fpsText = new FpsText(this);

        const message = `Phaser v${Phaser.VERSION}`;
        this.add
            .text(this.cameras.main.width - 15, 15, message, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);
    }

    update() {
        this.fpsText.update();
    }
}