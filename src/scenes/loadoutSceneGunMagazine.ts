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
            2950,
            250,
            "Magazine ATTRIBUTES:",
            "#BB00BB",
            "#00000000",
            () => {}
        );

        this.createClickableImage(3350, 500, "none_button", false, () => {});

        if (this.speedUnlocked) {
            this.createClickableImage(
                3350,
                700,
                "speed_button",
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

        if (this.drumUnlocked) {
            this.createClickableImage(
                3350,
                900,
                "drum_button",
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

        if (this.minigunUnlocked) {
            this.createClickableImage(
                3350,
                1100,
                "minigun_button",
                false,
                () => {}
            );
        } else {
            this.createClickableImage(
                3350,
                1100,
                "locked_button",
                false,
                () => {}
            );
        }

        this.createClickableImage(3150, 1300, "go_back_button", true, () => {
            this.scene.start("LoadoutSceneGun");
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
