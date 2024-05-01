import Phaser from "phaser";

export default class LoadoutSceneGun extends Phaser.Scene {
    constructor() {
        super({ key: "LoadoutSceneGun" });
    }

    create() {
        this.add.image(2048, 857, "LoadoutMenu");

        // Create Menu Textboxes
        this.createClickableText(
            2950,
            250,
            "Gun TYPES:",
            "#BB00BB",
            "#00000000",
            () => {}
        );

        this.createClickableImage(3350, 500, "magazine_button", () => {
            this.scene.start("LoadoutSceneGunMagazine");
        });

        this.createClickableImage(3350, 700, "scope_button", () => {
            this.scene.start("LoadoutSceneGunScope");
        });

        this.createClickableImage(3150, 1300, "go_back_button", () => {
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

    update() {
        // Update logic
    }
}
