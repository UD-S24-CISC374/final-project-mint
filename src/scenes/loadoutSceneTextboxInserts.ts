import Phaser from "phaser";

export default class LoadoutSceneTextboxInserts extends Phaser.Scene {
    textInput: HTMLInputElement;
    textbox: Phaser.GameObjects.DOMElement;

    constructor() {
        super({ key: "LoadoutSceneTextboxInserts", active: true });
    }

    create() {
        this.createEditableText(
            100,
            200,
            "Click to edit...",
            "#000000",
            "transparent",
            "16px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
            }
        );
        this.createEditableText(
            500,
            700,
            "Try again...",
            "#000000",
            "transparent",
            "16px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
            }
        );

        // Create Phaser DOMElement from input
        this.textbox = new Phaser.GameObjects.DOMElement(
            this,
            100,
            100,
            this.textInput
        );

        // Make the textbox clickable
        this.textbox.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, 200, 30),
            Phaser.Geom.Rectangle.Contains
        );

        // Add the textbox to the scene
        this.add.existing(this.textbox);

        // Handle pointerdown event
        this.textbox.on("pointerdown", () => {
            this.textInput.focus();
        });
    }

    createEditableText(
        x: number,
        y: number,
        initialText: string,
        textColor: string,
        backdrop: string,
        textSize: string,
        onChange: (newValue: string) => void
    ): void {
        // Adjusts the method for creating editable text elements, focusing on integration with the overlay.
        const globalInputText =
            (this.registry.get("gameInputText") as string) || initialText;

        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: textSize,
            color: textColor,
            align: "center",
            backgroundColor: backdrop,
            padding: { left: 5, right: 5, top: 5, bottom: 5 },
        };

        const textObject = this.add
            .text(x, y, globalInputText, style)
            .setInteractive();

        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = globalInputText;
        inputElement.style.position = "fixed";
        inputElement.style.left = "-9999px";
        inputElement.style.top = "0px";
        document.body.appendChild(inputElement);

        const syncTextObject = () => {
            textObject.setText(inputElement.value || initialText);
            onChange(inputElement.value);
        };

        inputElement.oninput = syncTextObject;

        textObject.on("pointerdown", () => {
            inputElement.value =
                textObject.text === initialText ? "" : textObject.text;
            inputElement.focus();
            inputElement.setSelectionRange(
                inputElement.value.length,
                inputElement.value.length
            );
        });

        inputElement.addEventListener("input", syncTextObject);

        this.events.once("shutdown", () =>
            document.body.removeChild(inputElement)
        );
    }

    update() {}
}
