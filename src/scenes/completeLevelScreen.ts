import Phaser from "phaser";
//import PhaserLogo from "../objects/phaserLogo";
//import FpsText from "../objects/fpsText";

export default class CompleteLevelScreen extends Phaser.Scene {
    levelTwoUnlocked: boolean = false;
    levelThreeUnlocked: boolean = false;
    previousLevel: number = 0;

    constructor() {
        super({ key: "CompleteLevelScreen" });
    }

    create() {
        this.add.image(2048, 857, "cleared_level");
        this.levelTwoUnlocked = this.game.registry.get("levelTwoUnlocked");
        this.levelThreeUnlocked = this.game.registry.get("levelThreeUnlocked");
        this.previousLevel = this.game.registry.get("previousLevel");

        if (this.previousLevel == 3) {
            this.createClickableImage(
                2000,
                1500,
                "level_3_button",
                false,
                () => {}
            );
        } else if (this.previousLevel == 2) {
            this.createClickableImage(
                2100,
                1400,
                "level_2_button",
                false,
                () => {}
            );
        } else {
            this.createClickableImage(
                2100,
                1400,
                "level_1_button",
                false,
                () => {}
            );
        }

        if (this.previousLevel == 1 || this.previousLevel == 2) {
            this.createClickableImage(
                3400,
                1500,
                "return_to_loadout_button",
                true,
                () => {
                    this.game.registry.get("codingMusic").play();
                    this.scene.launch("LoadoutSceneTextboxInserts");
                    this.scene.start("LoadoutSceneOne");
                }
            );
        } else {
            this.createClickableImage(
                3400,
                1500,
                "complete_game_button",
                true,
                () => {
                    this.scene.start("endScene");
                }
            );
        }
    }

    createClickableImage(
        x: number,
        y: number,
        imageName: string,
        unlocked: boolean,
        onClick: () => void
    ) {
        const button = this.add.image(x, y, imageName).setInteractive();

        button.setScale(2);

        if (unlocked) {
            button.on("pointerover", () => {
                this.tweens.add({
                    targets: button,
                    scale: { from: 2, to: 2.25 },
                    duration: 200,
                    ease: "Linear",
                });
            });

            button.on("pointerout", () => {
                this.tweens.add({
                    targets: button,
                    scale: { from: 2.25, to: 2 },
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
