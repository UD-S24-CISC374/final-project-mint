import Phaser from "phaser";

export default class LoadoutSceneClothesShoes extends Phaser.Scene {
    constructor() {
        super({ key: "LoadoutSceneClothesShoes" });
    }

    springsUnlocked: boolean = false;
    wheelsUnlocked: boolean = false;

    create() {
        this.add.image(2048, 857, "LoadoutMenu");

        this.springsUnlocked = this.game.registry.get("springsUnlocked");
        this.wheelsUnlocked = this.game.registry.get("wheelsUnlocked");

        // Create Menu Textboxes
        this.createClickableText(
            2950,
            250,
            "Shoes ATTRIBUTES:",
            "#BB00BB",
            "#00000000",
            () => {}
        );

        this.createClickableImage(3350, 500, "none_button", false, () => {});

        if (this.springsUnlocked) {
            this.createClickableImage(
                3350,
                700,
                "springs_button",
                false,
                () => {}
            );
        } else {
            this.createClickableImage(
                3350,
                700,
                "locked_button",
                false,
                () => {}
            );
        }

        if (this.wheelsUnlocked) {
            this.createClickableImage(
                3350,
                900,
                "wheels_button",
                false,
                () => {}
            );
        } else {
            this.createClickableImage(
                3350,
                900,
                "locked_button",
                false,
                () => {}
            );
        }

        this.createClickableImage(3150, 1300, "go_back_button", true, () => {
            this.scene.start("LoadoutSceneClothes");
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
        goBack: boolean,
        onClick: () => void
    ) {
        const button = this.add.image(x, y, imageName).setInteractive();

        button.setScale(2.5);

        if (goBack) {
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
        }

        button.on("pointerdown", onClick);
    }

    update() {
        // Update logic
    }
}
