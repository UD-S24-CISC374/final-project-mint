import Phaser from "phaser";

export default class LoadoutSceneGunMagazine extends Phaser.Scene {
    constructor() {
        super({ key: "LoadoutSceneGunMagazine" });
    }

    speedUnlocked: boolean = false;
    drumUnlocked: boolean = false;
    minigunUnlocked: boolean = false;

    create() {
        this.add.image(2048, 857, "LoadoutMenu");

        this.speedUnlocked = this.game.registry.get("speedUnlocked");
        this.drumUnlocked = this.game.registry.get("drumUnlocked");
        this.minigunUnlocked = this.game.registry.get("minigunUnlocked");

        // Create Menu Textboxes
        this.createClickableText(
            2650,
            250,
            "Magazine Items:",
            "#BB00BB",
            "#00000000",
            "100px",
            () => {}
        );

        // Create Type setup text
        this.createClickableText(
            2650,
            410,
            "type Magazine =",
            "#000000",
            "#00000000",
            "55px",
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
            '  "none"       "speed"           "drum"',
            "#00BB00",
            "#00000000",
            "65px",
            () => {}
        );

        this.createClickableImage(3050, 600, 2, "none_button", false, () => {});

        if (this.speedUnlocked) {
            this.createClickableImage(
                3050,
                800,
                2,
                "speed_button",
                false,
                () => {}
            );
            this.createClickableText(
                3300,
                735,
                "- 1 reload time",
                "#00bb00",
                "#00000000",
                "50px",
                () => {}
            );
            this.createClickableText(
                3300,
                795,
                "- 1 bullet",
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

        if (this.drumUnlocked) {
            this.createClickableImage(
                3050,
                1000,
                2,
                "drum_button",
                false,
                () => {}
            );
            this.createClickableText(
                3300,
                935,
                "+ 5 bullets",
                "#00bb00",
                "#00000000",
                "50px",
                () => {}
            );
            this.createClickableText(
                3300,
                995,
                "+ 1 reload time",
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

        if (this.minigunUnlocked) {
            this.createClickableImage(
                3050,
                1200,
                2,
                "minigun_button",
                false,
                () => {}
            );
            this.createClickableText(
                3300,
                1135,
                "+ 50 bullets",
                "#00bb00",
                "#00000000",
                "50px",
                () => {}
            );
            this.createClickableText(
                3300,
                1195,
                "+ 10 reload time",
                "#bb0000",
                "#00000000",
                "50px",
                () => {}
            );
        } else {
            /*this.createClickableImage(
                3050,
                1200,
                2,
                "locked_button",
                false,
                () => {}
            );*/
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
