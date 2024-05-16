import Phaser from "phaser";

export default class LoadoutExample extends Phaser.Scene {
    textInput: HTMLInputElement;
    textbox: Phaser.GameObjects.DOMElement;

    constructor() {
        super({ key: "LoadoutExample" });
    }

    create() {
        this.add.image(2048, 857, "LoadoutExample");

        this.createClickableImage(2025, 1550, "go_back_button", () => {
            this.scene.start("LoadoutSceneTextboxInserts");
        });
    }

    createClickableImage(
        x: number,
        y: number,
        imageName: string,
        onClick: () => void
    ) {
        const button = this.add.image(x, y, imageName).setInteractive();

        button.setScale(3.5);

        button.on("pointerover", () => {
            this.tweens.add({
                targets: button,
                scale: { from: 3.5, to: 3.75 },
                duration: 200,
                ease: "Linear",
            });
        });

        button.on("pointerout", () => {
            this.tweens.add({
                targets: button,
                scale: { from: 3.75, to: 3.5 },
                duration: 200,
                ease: "Linear",
            });
        });

        button.on("pointerdown", onClick);
    }

    update() {}
}
