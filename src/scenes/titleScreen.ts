import Phaser from "phaser";

export default class TitleScreen extends Phaser.Scene {
    textInput: HTMLInputElement;
    textbox: Phaser.GameObjects.DOMElement;

    constructor() {
        super({ key: "TitleScreen" });
    }

    create() {
        this.add.image(2048, 857, "title_screen");

        this.createClickableImage(2000, 1130, "start_game_button", () => {
            this.scene.start("instructions");
        });
    }

    createClickableImage(
        x: number,
        y: number,
        imageName: string,
        onClick: () => void
    ) {
        const button = this.add.image(x, y, imageName).setInteractive();

        button.setScale(2.5);

        this.tweens.add({
            targets: button,
            scale: { from: 2.5, to: 2.75 },
            duration: 1000,
            ease: "Linear",
            yoyo: true,
            repeat: -1, // Repeat forever
        });

        button.on("pointerdown", onClick);
    }

    update() {}
}
