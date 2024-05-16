import Phaser from "phaser";

export default class LoadoutSceneClothes extends Phaser.Scene {
    constructor() {
        super({ key: "LoadoutSceneClothes" });
    }

    create() {
        this.add.image(2048, 857, "LoadoutMenu");

        // Create Menu Textboxes
        this.createClickableText(
            2650,
            250,
            "Clothes Types:",
            "#BB00BB",
            "#00000000",
            () => {}
        );

        this.createClickableImage(3350, 600, "shirt_button", () => {
            this.scene.start("LoadoutSceneClothesShirt");
        });

        this.createClickableImage(3350, 900, "shoes_button", () => {
            this.scene.start("LoadoutSceneClothesShoes");
        });

        this.createClickableImage(2950, 1400, "go_back_button", () => {
            this.scene.start("LoadoutSceneOne");
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

        button.setScale(2.75);

        button.on("pointerover", () => {
            this.tweens.add({
                targets: button,
                scale: { from: 2.75, to: 3 },
                duration: 200,
                ease: "Linear",
            });
        });

        button.on("pointerout", () => {
            this.tweens.add({
                targets: button,
                scale: { from: 3, to: 2.75 },
                duration: 200,
                ease: "Linear",
            });
        });

        button.on("pointerdown", onClick);
    }

    update() {
        // Update logic
    }
}
