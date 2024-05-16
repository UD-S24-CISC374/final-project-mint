import Phaser from "phaser";

export default class LoadoutSceneGunScope extends Phaser.Scene {
    constructor() {
        super({ key: "LoadoutSceneGunScope" });
    }

    closeUnlocked: boolean = false;
    eagleUnlocked: boolean = false;

    create() {
        this.add.image(2048, 857, "LoadoutMenu");

        this.closeUnlocked = this.game.registry.get("closeUnlocked");
        this.eagleUnlocked = this.game.registry.get("eagleUnlocked");

        // Create Menu Textboxes
        this.createClickableText(
            2650,
            250,
            "Scope Items:",
            "#BB00BB",
            "#00000000",
            "100px",
            () => {}
        );

        this.createClickableText(
            2650,
            400,
            "type Scope =",
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
            ' "none"         "close"           "eagle"',
            "#00BB00",
            "#00000000",
            "65px",
            () => {}
        );

        this.createClickableImage(3050, 600, 2, "none_button", false, () => {});

        if (this.closeUnlocked) {
            this.createClickableImage(
                3050,
                800,
                2,
                "close_button",
                false,
                () => {}
            );
            this.createClickableText(
                3300,
                735,
                "+ 5 fire rate",
                "#00bb00",
                "#00000000",
                "50px",
                () => {}
            );
            this.createClickableText(
                3300,
                795,
                "- 2 shot distance",
                "#bb0000",
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

        if (this.eagleUnlocked) {
            this.createClickableImage(
                3050,
                1000,
                2,
                "eagle_button",
                false,
                () => {}
            );
            this.createClickableText(
                3300,
                935,
                "+ 10 shot distance",
                "#00bb00",
                "#00000000",
                "50px",
                () => {}
            );
            this.createClickableText(
                3300,
                995,
                "- 5 fire rate",
                "#bb0000",
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
                this.scene.start("LoadoutSceneGun");
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
