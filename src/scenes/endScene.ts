import Phaser from "phaser";
export default class endScene extends Phaser.Scene {
    private scoreText?: Phaser.GameObjects.Text;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: "endScene" });
    }

    create() {
        this.add.image(2048, 857, "levelBackg");
        this.cursors = this.input.keyboard?.createCursorKeys();

        let graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(1900, 800, 600, 300);

        this.scoreText = this.add.text(1948, 857, "Game End!", {
            fontSize: "60px",
            color: "#000",
        });
        this.scoreText = this.add.text(1948, 1000, "Space bar to start over!", {
            fontSize: "32px",
            color: "#000",
        });
    }

    update() {
        if (!this.cursors) {
            return;
        }
        if (this.cursors.space.isDown) {
            this.scene.start("TitleScreen");
        }
    }
}
