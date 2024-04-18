import Phaser from "phaser";

export default class LoadoutSceneTextboxInserts extends Phaser.Scene {
    textInput: HTMLInputElement;
    textbox: Phaser.GameObjects.DOMElement;

    classOneDef: boolean = false;
    attrOneTopDef: boolean = false;
    attrOneBotDef: boolean = false;
    constrOneLeft: boolean = false;
    constrOneRight: boolean = false;
    constrOneTop: boolean = false;
    constrOneBot: boolean = false;

    classTwoDef: boolean = false;
    attrTwoTopDef: boolean = false;
    attrTwoBotDef: boolean = false;
    constrTwoLeft: boolean = false;
    constrTwoRight: boolean = false;
    constrTwoTop: boolean = false;
    constrTwoBot: boolean = false;

    cOD: string;
    aOT: string;
    aOB: string;
    cOL: string;
    cOR: string;
    cOT: string;
    cOB: string;

    cTD: string;
    aTT: string;
    aTB: string;
    cTL: string;
    cTR: string;
    cTT: string;
    cTB: string;

    alpha: boolean = true;
    errFeed: Phaser.GameObjects.Text | null = null;

    constructor() {
        super({ key: "LoadoutSceneTextboxInserts", active: true });
    }

    create() {
        this.createEditableText(
            890,
            292,
            "CLASS",
            "#000000",
            "transparent",
            "70px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                this.cOD = newValue;
                if (newValue == "Gun") {
                    console.log("Set continue to true");
                    this.classOneDef = true;
                } else {
                    this.classOneDef = false;
                }
            }
        );
        this.createEditableText(
            640,
            470,
            "ATTRIBUTE:TYPE;",
            "#000000",
            "transparent",
            "50px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                this.aOT = newValue;
                if (
                    newValue == "Close:Scope;" ||
                    newValue == "Close: Scope;" ||
                    newValue == "Close :Scope;" ||
                    newValue == "Eagle:Scope;" ||
                    newValue == "Eagle: Scope;" ||
                    newValue == "Eagle :Scope;" ||
                    newValue == "Speed:Magazine;" ||
                    newValue == "Speed: Magazine;" ||
                    newValue == "Speed :Magazine;" ||
                    newValue == "Drum:Magazine;" ||
                    newValue == "Drum: Magazine;" ||
                    newValue == "Drum :Magazine;"
                ) {
                    console.log("Set continue to true");
                    this.attrOneTopDef = true;
                } else {
                    this.attrOneTopDef = false;
                }
            }
        );
        this.createEditableText(
            640,
            650,
            "ATTRIBUTE:TYPE;",
            "#000000",
            "transparent",
            "50px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                this.aOB = newValue;
                if (
                    newValue == "Close:Scope;" ||
                    newValue == "Close: Scope;" ||
                    newValue == "Close :Scope;" ||
                    newValue == "Eagle:Scope;" ||
                    newValue == "Eagle: Scope;" ||
                    newValue == "Eagle :Scope;" ||
                    newValue == "Speed:Magazine;" ||
                    newValue == "Speed: Magazine;" ||
                    newValue == "Speed :Magazine;" ||
                    newValue == "Drum:Magazine;" ||
                    newValue == "Drum: Magazine;" ||
                    newValue == "Drum :Magazine;"
                ) {
                    console.log("Set continue to true");
                    this.attrOneBotDef = true;
                } else {
                    this.attrOneBotDef = false;
                }
            }
        );

        this.createEditableText(
            1920,
            292,
            "CLASS",
            "#000000",
            "transparent",
            "70px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                this.cTD = newValue;
                if (newValue == "Clothes") {
                    console.log("Set continue to true");
                    this.classTwoDef = true;
                } else {
                    this.classTwoDef = false;
                }
            }
        );
        this.createEditableText(
            1670,
            470,
            "ATTRIBUTE:TYPE;",
            "#000000",
            "transparent",
            "50px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                this.aTT = newValue;
                if (
                    newValue == "Poncho:Shirt;" ||
                    newValue == "Poncho: Shirt;" ||
                    newValue == "Poncho :Shirt;" ||
                    newValue == "Vest:Shirt;" ||
                    newValue == "Vest: Shirt;" ||
                    newValue == "Vest :Shirt;" ||
                    newValue == "Overalls:Pants;" ||
                    newValue == "Overalls: Pants;" ||
                    newValue == "Overalls :Pants;" ||
                    newValue == "Cargo:Pants;" ||
                    newValue == "Cargo: Pants;" ||
                    newValue == "Cargo :Pants;"
                ) {
                    console.log("Set continue to true");
                    this.attrTwoTopDef = true;
                } else {
                    this.attrTwoTopDef = false;
                }
            }
        );
        this.createEditableText(
            1670,
            650,
            "ATTRIBUTE:TYPE;",
            "#000000",
            "transparent",
            "50px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                this.aTB = newValue;
                if (
                    newValue == "Poncho:Shirt;" ||
                    newValue == "Poncho: Shirt;" ||
                    newValue == "Poncho :Shirt;" ||
                    newValue == "Vest:Shirt;" ||
                    newValue == "Vest: Shirt;" ||
                    newValue == "Vest :Shirt;" ||
                    newValue == "Overalls:Pants;" ||
                    newValue == "Overalls: Pants;" ||
                    newValue == "Overalls :Pants;" ||
                    newValue == "Cargo:Pants;" ||
                    newValue == "Cargo: Pants;" ||
                    newValue == "Cargo :Pants;"
                ) {
                    console.log("Set continue to true");
                    this.attrTwoBotDef = true;
                } else {
                    this.attrTwoBotDef = false;
                }
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

        this.createClickableTextAndSize(
            1565,
            1450,
            "100px",
            "SUBMIT CODE",
            "#000000",
            "#00ff00",
            () => {
                // Conditionals for individual boxes

                // ********************************** WEAPON CLASS **********************************
                if (!this.classOneDef) {
                    this.errFeed?.destroy();
                    if (!this.cOD) {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Cannot leave left CLASS field blank`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else if (this.cOD == "Clothes") {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Left CLASS definition must be your weapon,\nnot your apparel`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Invalid class name: ${this.cOD}`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    }
                } else if (!this.attrOneTopDef) {
                    this.errFeed?.destroy();
                    if (!this.aOT) {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Cannot leave Gun variable\n"ATTRIBUTE:TYPE;" field blank`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else if (!this.aOT.includes(":")) {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Missing colon in "${this.aOT}"\nto distinguish ATTRIBUTE from TYPE`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else if (this.aOT.charAt(this.aOT.length - 1) != ";") {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Missing semi-colon after "${this.aOT}"`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Invalid Gun variable: ${this.aOT.substring(
                                0,
                                this.aOT.length - 1
                            )}\n\nMake sure ATTRIBUTE and TYPE exist in\nthe Menu under the "Gun" class and are\nof the format ATTRIBUTE:TYPE;`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    }
                } else if (!this.attrOneBotDef) {
                    this.errFeed?.destroy();
                    if (!this.aOB) {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Cannot leave Gun variable\n"ATTRIBUTE:TYPE;" field blank`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else if (!this.aOB.includes(":")) {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Missing colon in "${this.aOB}"\nto distinguish ATTRIBUTE from TYPE`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else if (this.aOB.charAt(this.aOB.length - 1) != ";") {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Missing semi-colon after "${this.aOB}"`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Invalid Gun variable: ${this.aOB.substring(
                                0,
                                this.aOB.length - 1
                            )}\n\nMake sure ATTRIBUTE and TYPE exist in\nthe Menu under the "Gun" class and are\nof the format "ATTRIBUTE:TYPE;"`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    }
                } else if (
                    this.aOT.substring(
                        this.aOT.indexOf(":"),
                        this.aOT.length - 1
                    ) ==
                    this.aOB.substring(
                        this.aOB.indexOf(":"),
                        this.aOB.length - 1
                    )
                ) {
                    this.errFeed?.destroy();
                    this.errFeed = this.add.text(
                        425,
                        1450,
                        `Cannot apply multiple attributes\n of type "${this.aOT.substring(
                            this.aOT.indexOf(":"),
                            this.aOT.length - 1
                        )}"`,
                        {
                            font: "45px Arial",
                            color: "#ffffff",
                        }
                    );
                }

                // ********************************** APPAREL CLASS **********************************
                else if (!this.classTwoDef) {
                    this.errFeed?.destroy();
                    if (!this.cTD) {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Cannot leave right CLASS field blank`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else if (this.cTD == "Gun") {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Right CLASS definition must be your apparel,\nnot your weapon`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Invalid class name: ${this.cTD}`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    }
                } else if (!this.attrTwoTopDef) {
                    this.errFeed?.destroy();
                    if (!this.aTT) {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Cannot leave Clothes variable\n"ATTRIBUTE:TYPE;" field blank`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else if (!this.aTT.includes(":")) {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Missing colon in "${this.aTT}"\nto distinguish ATTRIBUTE from TYPE`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else if (this.aTT.charAt(this.aTT.length - 1) != ";") {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Missing semi-colon after "${this.aTT}"`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Invalid Clothes variable: ${this.aTT.substring(
                                0,
                                this.aTT.length - 1
                            )}\n\nMake sure ATTRIBUTE and TYPE exist in\nthe Menu under the "Clothes" class and are\nof the format ATTRIBUTE:TYPE;`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    }
                } else if (!this.attrTwoBotDef) {
                    this.errFeed?.destroy();
                    if (!this.aTB) {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Cannot leave Clothes variable\n"ATTRIBUTE:TYPE;" field blank`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else if (!this.aTB.includes(":")) {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Missing colon in "${this.aTB}"\nto distinguish ATTRIBUTE from TYPE`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else if (this.aTB.charAt(this.aTB.length - 1) != ";") {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Missing semi-colon after "${this.aTB}"`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    } else {
                        this.errFeed = this.add.text(
                            425,
                            1450,
                            `Invalid Clothes variable: ${this.aTB.substring(
                                0,
                                this.aTB.length - 1
                            )}\n\nMake sure ATTRIBUTE and TYPE exist in\nthe Menu under the "Clothes" class and are\nof the format "ATTRIBUTE:TYPE;"`,
                            {
                                font: "45px Arial",
                                color: "#ffffff",
                            }
                        );
                    }
                } else if (
                    this.aTT.substring(
                        this.aTT.indexOf(":"),
                        this.aTT.length - 1
                    ) ==
                    this.aTB.substring(
                        this.aTB.indexOf(":"),
                        this.aTB.length - 1
                    )
                ) {
                    this.errFeed?.destroy();
                    this.errFeed = this.add.text(
                        425,
                        1450,
                        `Cannot apply multiple attributes\n of type "${this.aTT.substring(
                            this.aTT.indexOf(":"),
                            this.aTT.length - 1
                        )}"`,
                        {
                            font: "45px Arial",
                            color: "#ffffff",
                        }
                    );
                }

                // IF ALL CONDITIONS ARE MET: Start Level
                else {
                    this.scene.start("levelOne");
                }
            }
        );

        // dev button to skip to level
        this.createClickableTextAndSize(
            0,
            0,
            "50px",
            "cheat (devs only)",
            "#ffffff",
            "#ff0000",
            () => {
                this.scene.start("levelOne");
            }
        );

        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(350, 1355, 1000, 350);

        this.add.text(375, 1370, "Error Feedback:", {
            font: "60px Arial",
            color: "#ffffff",
        });

        let weaponGraphic = this.add.graphics();
        weaponGraphic.fillStyle(0xffffff, 1);
        weaponGraphic.fillRect(575, 152, 525, 100);

        this.add.text(600, 167, "WEAPON CLASS", {
            font: "60px Arial",
            color: "#000000",
        });

        let apparelGraphic = this.add.graphics();
        apparelGraphic.fillStyle(0xffffff, 1);
        apparelGraphic.fillRect(1650, 152, 525, 100);

        this.add.text(1675, 167, "APPAREL CLASS", {
            font: "60px Arial",
            color: "#000000",
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

    createClickableTextAndSize(
        x: number,
        y: number,
        fsize: string,
        text: string,
        textColor: string,
        backdrop: string,
        onClick: () => void
    ): void {
        // Predefined style for all clickable text instances
        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: fsize,
            color: textColor,
            align: "center",
            backgroundColor: backdrop,
        };

        const textObject = this.add.text(x, y, text, style).setInteractive();
        textObject.on("pointerdown", onClick);
    }

    update() {}
}
