import Phaser from "phaser";
//import PhaserLogo from "../objects/phaserLogo";
//import FpsText from "../objects/fpsText";

export default class levelScreen extends Phaser.Scene {
    levelTwoUnlocked: boolean = false;
    levelThreeUnlocked: boolean = false;

    constructor() {
        super({ key: "levelScreen" });
    }

    create() {
        this.levelTwoUnlocked = this.game.registry.get("levelTwoUnlocked");
        this.add.image(2048, 857, "levelBackg");
        this.createClickableText(
            2950,
            250,
            "Level Screen: ",
            "#BB00BB",
            "#00000000",
            () => {}
        );
        this.createClickableImage(3350, 500, "magazine_button", false, () => {
            this.scene.start("levelOne");
        });

        if (this.levelTwoUnlocked) {
            this.createClickableImage(3350, 700, "poncho_button", false, () => {
                this.scene.start("levelTwo");
            });
        } else {
            this.createClickableImage(
                3350,
                700,
                "locked_button",
                false,
                () => {}
            );
        }
        if (this.levelThreeUnlocked) {
            this.createClickableImage(3350, 900, "poncho_button", false, () => {
                this.scene.start("levelThree");
            });
        } else {
            this.createClickableImage(
                3350,
                900,
                "locked_button",
                false,
                () => {}
            );
        }
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

    update() {}
}
