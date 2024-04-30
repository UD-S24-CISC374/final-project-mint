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
            2950,
            250,
            "Classes:",
            "#BB00BB",
            "#00000000",
            () => {}
        );

        this.createClickableImage(3350, 500, "gun_button", () => {
            this.scene.start("LoadoutSceneGun");
            this.scene.bringToTop("LoadoutSceneTextboxInserts");
        });

        this.createClickableImage(3350, 700, "clothes_button", () => {
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
            fontSize: "100px",
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

        button.setScale(2.5);

        button.on("pointerover", () => {
            this.tweens.add({
                targets: button,
                scale: { from: 2.5, to: 2.75 },
                duration: 200,
                ease: "Linear",
            });
        });

        button.on("pointerout", () => {
            this.tweens.add({
                targets: button,
                scale: { from: 2.75, to: 2.5 },
                duration: 200,
                ease: "Linear",
            });
        });

        button.on("pointerdown", onClick);
    }

    update() {}
}
