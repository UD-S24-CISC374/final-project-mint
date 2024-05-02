import Phaser from "phaser";
export default class instructions extends Phaser.Scene {
    private scoreText?: Phaser.GameObjects.Text;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: "instructions" });
    }

    create() {
        this.add.image(2048, 857, "levelBackg");
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.scoreText = this.add.text(1550, 500, "INSTRUCTIONS:", {
            fontSize: "125px",
            color: "#000",
        });
        this.scoreText = this.add.text(
            550,
            700,
            "1. Click buttons under “Menu” to see what classes, types, and attributes you have unlocked.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            800,
            "2. Use the textboxes to fill in the missing components of each class using your unlocked items.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            900,
            "3. Click “Submit Code” and rectify any errors that you see in the errors box.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            1000,
            "4. Control your character with the up, left, and right arrow keys. Press space bar to fire weapon.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            1100,
            "5. Pick up items in each level to make them available in your inventory under the class 'Menu' on the loadout screen.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            1200,
            "6. Defeat all enemies and reach the checkpoint flag to progress.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );

        this.createClickableImage(2048, 1450, "begin_button", () => {
            this.scene.launch("LoadoutSceneTextboxInserts");
            this.scene.start("LoadoutSceneOne");
        });
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
        if (!this.cursors) {
            return;
        }
    }
}
