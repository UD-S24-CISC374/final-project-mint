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
            2650,
            250,
            "Shoes Items:",
            "#BB00BB",
            "#00000000",
            "100px",
            () => {}
        );

        // Create Type setup text
        this.createClickableText(
            2650,
            400,
            "type Shoes =",
            "#000000",
            "#00000000",
            "65px",
            () => {}
        );

        this.createClickableText(
            3300,
            400,
            "|                       |                  ;",
            "#000000",
            "#00000000",
            "65px",
            () => {}
        );

        this.createClickableText(
            3050,
            400,
            '"none"         "springs"       "wheels"',
            "#00BB00",
            "#00000000",
            "65px",
            () => {}
        );

        this.createClickableImage(3050, 600, 2, "none_button", false, () => {});

        if (this.springsUnlocked) {
            this.createClickableImage(
                3050,
                800,
                2,
                "springs_button",
                false,
                () => {}
            );
            this.createClickableText(
                3300,
                735,
                "+ 5 jump height",
                "#00bb00",
                "#00000000",
                "50px",
                () => {}
            );
        } else {
            this.createClickableImage(
                3050,
                800,
                2,
                "locked_button",
                false,
                () => {}
            );
            this.createClickableImage(
                3525,
                435,
                1.25,
                "locked_button",
                false,
                () => {}
            );
        }

        if (this.wheelsUnlocked) {
            this.createClickableImage(
                3050,
                1000,
                2,
                "wheels_button",
                false,
                () => {}
            );
            this.createClickableText(
                3300,
                935,
                "+ 5 movement speed",
                "#00bb00",
                "#00000000",
                "50px",
                () => {}
            );
        } else {
            this.createClickableImage(
                3050,
                1000,
                2,
                "locked_button",
                false,
                () => {}
            );
            this.createClickableImage(
                3925,
                435,
                1.25,
                "locked_button",
                false,
                () => {}
            );
        }

        this.createClickableImage(
            2950,
            1400,
            2.75,
            "go_back_button",
            true,
            () => {
                this.scene.start("LoadoutSceneClothes");
            }
        );
    }

    createClickableText(
        x: number,
        y: number,
        text: string,
        textColor: string,
        backdrop: string,
        size: string,
        onClick: () => void
    ): void {
        // Predefined style for all clickable text instances
        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: size,
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
        scaler: number,
        imageName: string,
        goBack: boolean,
        onClick: () => void
    ) {
        const button = this.add.image(x, y, imageName).setInteractive();

        button.setScale(scaler);

        if (goBack) {
            button.on("pointerover", () => {
                this.tweens.add({
                    targets: button,
                    scale: { from: scaler, to: scaler + 0.25 },
                    duration: 200,
                    ease: "Linear",
                });
            });

            button.on("pointerout", () => {
                this.tweens.add({
                    targets: button,
                    scale: { from: scaler + 0.25, to: scaler },
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
