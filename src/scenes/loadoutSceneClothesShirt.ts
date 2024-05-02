import Phaser from "phaser";

export default class LoadoutSceneClothesShirt extends Phaser.Scene {
    constructor() {
        super({ key: "LoadoutSceneClothesShirt" });
    }

    ponchoUnlocked: boolean = false;
    vestUnlocked: boolean = false;

    create() {
        this.add.image(2048, 857, "LoadoutMenu");

        this.ponchoUnlocked = this.game.registry.get("ponchoUnlocked");
        this.vestUnlocked = this.game.registry.get("vestUnlocked");

        // Create Menu Textboxes
        this.createClickableText(
            2950,
            250,
            "Shirt ATTRIBUTES:",
            "#BB00BB",
            "#00000000",
            "100px",
            () => {}
        );

        this.createClickableImage(3350, 500, "none_button", false, () => {});

        if (this.ponchoUnlocked) {
            this.createClickableImage(
                3350,
                700,
                "poncho_button",
                false,
                () => {}
            );
            this.createClickableText(
                3600,
                635,
                "+ 1 bullet resistance",
                "#00bb00",
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

        if (this.vestUnlocked) {
            this.createClickableImage(
                3350,
                900,
                "vest_button",
                false,
                () => {}
            );
            this.createClickableText(
                3600,
                835,
                "+ 2 bullet resistance",
                "#00bb00",
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
            this.scene.start("LoadoutSceneClothes");
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
