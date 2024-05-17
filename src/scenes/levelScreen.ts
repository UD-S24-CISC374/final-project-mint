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
        this.levelThreeUnlocked = this.game.registry.get("levelThreeUnlocked");
        this.add.image(2048, 857, "level_select_screen");
        this.createClickableImage(1200, 475, "level_1_button", true, () => {
            this.scene.start("levelOne");
        });

        if (this.levelTwoUnlocked) {
            this.createClickableImage(2700, 475, "level_2_button", true, () => {
                this.scene.start("levelTwo");
            });
        } else {
            this.createClickableImage(
                2775,
                475,
                "level_locked_button",
                false,
                () => {}
            );
        }
        if (this.levelThreeUnlocked) {
            this.createClickableImage(
                2800,
                1450,
                "level_3_button",
                true,
                () => {
                    this.scene.start("levelThree");
                }
            );
        } else {
            this.createClickableImage(
                2800,
                1495,
                "level_locked_button",
                false,
                () => {}
            );
        }

        this.createClickableImage(1100, 1450, "go_back_button", true, () => {
            this.scene.launch("LoadoutSceneTextboxInserts");
            this.scene.start("LoadoutSceneOne");
        });
    }
    createClickableImage(
        x: number,
        y: number,
        imageName: string,
        unlocked: boolean,
        onClick: () => void
    ) {
        const button = this.add.image(x, y, imageName).setInteractive();

        button.setScale(1.5);

        if (unlocked) {
            button.on("pointerover", () => {
                this.tweens.add({
                    targets: button,
                    scale: { from: 1.5, to: 1.75 },
                    duration: 200,
                    ease: "Linear",
                });
            });

            button.on("pointerout", () => {
                this.tweens.add({
                    targets: button,
                    scale: { from: 1.75, to: 1.5 },
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
