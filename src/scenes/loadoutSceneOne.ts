import Phaser from "phaser";

export default class LoadoutSceneOne extends Phaser.Scene {
    textInput: HTMLInputElement;
    textbox: Phaser.GameObjects.DOMElement;

    constructor() {
        super({ key: "LoadoutSceneOne" });
    }

    create() {
        this.add.image(2048, 857, "LoadoutMenu");

        // Create Menu Textboxes

        this.createClickableText(
            2650,
            280,
            "Click the buttons below to\nview your unlocked items:",
            "#BB00BB",
            "#00000000",
            () => {}
        );

        this.createClickableImage(3325, 600, "gun_button", () => {
            this.scene.start("LoadoutSceneGun");
            this.scene.bringToTop("LoadoutSceneTextboxInserts");
        });

        this.createClickableImage(3325, 900, "clothes_button", () => {
            this.scene.start("LoadoutSceneClothes");
            this.scene.bringToTop("LoadoutSceneTextboxInserts");
        });
    }

    createClickableText(
        x: number,
        y: number,
        text: string,
        textColor: string,
        backdrop: string,
        onClick: () => void
    ): void {
        // Predefined style for all clickable text instances
        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: "60px",
            color: textColor,
            align: "center",
            backgroundColor: backdrop,
        };

        const textObject = this.add.text(x, y, text, style).setInteractive();
        textObject.on("pointerdown", onClick);
    }

    createClickableImage(
        x: number,
        y: number,
        imageName: string,
        onClick: () => void
    ) {
        const button = this.add.image(x, y, imageName).setInteractive();

        button.setScale(3);

        button.on("pointerover", () => {
            this.tweens.add({
                targets: button,
                scale: { from: 3, to: 3.25 },
                duration: 200,
                ease: "Linear",
            });
        });

        button.on("pointerout", () => {
            this.tweens.add({
                targets: button,
                scale: { from: 3.25, to: 3 },
                duration: 200,
                ease: "Linear",
            });
        });

        button.on("pointerdown", onClick);
    }

    update() {}
}
