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
            2950,
            250,
            "Scope ATTRIBUTES:",
            "#BB00BB",
            "#00000000",
            "100px",
            () => {}
        );

        this.createClickableImage(3350, 500, "none_button", false, () => {});

        if (this.closeUnlocked) {
            this.createClickableImage(
                3350,
                700,
                "close_button",
                false,
                () => {}
            );
            this.createClickableText(
                3600,
                635,
                "+ 5 fire rate",
                "#00bb00",
                "#00000000",
                "50px",
                () => {}
            );
            this.createClickableText(
                3600,
                695,
                "- 2 shot distance",
                "#bb0000",
                "#00000000",
                "50px",
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

        if (this.eagleUnlocked) {
            this.createClickableImage(
                3350,
                900,
                "eagle_button",
                false,
                () => {}
            );
            this.createClickableText(
                3600,
                835,
                "+ 10 shot distance",
                "#00bb00",
                "#00000000",
                "50px",
                () => {}
            );
            this.createClickableText(
                3600,
                895,
                "- 5 fire rate",
                "#bb0000",
                "#00000000",
                "50px",
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
            this.scene.start("LoadoutSceneGun");
        });
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
