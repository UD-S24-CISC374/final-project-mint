import Phaser from "phaser";
export default class instructions extends Phaser.Scene {
    private scoreText?: Phaser.GameObjects.Text;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: "instructions" });
    }

    create() {
        this.add.image(2048, 857, "levelBackg");

        let graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(500, 475, 3250, 800);

        this.cursors = this.input.keyboard?.createCursorKeys();
        this.scoreText = this.add.text(1550, 500, "INSTRUCTIONS:", {
            fontSize: "125px",
            color: "#000",
        });
        this.scoreText = this.add.text(
            550,
            700,
            "1. Click buttons under “Menu” to see which Types and Items you have available.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            800,
            "2. Fill in the textboxes with the missing information.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            900,
            "3. Click Check Code” and rectify any errors that you see in the errors box.",
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
            "5. Pick up items in each level to make them available in your inventory under the 'Menu' on the loadout screen.",
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
