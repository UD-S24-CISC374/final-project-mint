import Phaser from "phaser";

export default class LoadoutSceneTextboxInserts extends Phaser.Scene {
    textInput: HTMLInputElement;
    textbox: Phaser.GameObjects.DOMElement;

    classOneDef: boolean = false;
    attrOneTopDef: boolean = false;
    attrOneBotDef: boolean = false;

    classTwoDef: boolean = false;
    attrTwoTopDef: boolean = false;
    attrTwoBotDef: boolean = false;

    cOD: string | undefined;
    cTD: string | undefined;
    aOT: string | undefined;
    aOB: string | undefined;
    aTT: string | undefined;
    aTB: string | undefined;

    alpha: boolean = true;
    errFeed: Phaser.GameObjects.Text | null = null;

    constructor() {
        super({ key: "LoadoutSceneTextboxInserts", active: true });
    }

    create() {
        this.createEditableText(1100, 485, 400, 100, 60, (newValue: string) => {
            console.log("Text input updated to:", newValue);
            this.cOD = newValue;
            if (newValue == "Gun") {
                console.log("Set continue to true");
                this.classOneDef = true;
            } else {
                this.classOneDef = false;
            }
        });
        this.createEditableText(875, 650, 750, 100, 60, (newValue: string) => {
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
        });
        this.createEditableText(875, 825, 750, 100, 60, (newValue: string) => {
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
        });

        this.createEditableText(2135, 475, 400, 100, 60, (newValue: string) => {
            console.log("Text input updated to:", newValue);
            this.cTD = newValue;
            if (newValue == "Clothes") {
                console.log("Set continue to true");
                this.classTwoDef = true;
            } else {
                this.classTwoDef = false;
            }
        });
        this.createEditableText(1900, 650, 750, 100, 60, (newValue: string) => {
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
        });
        this.createEditableText(1900, 825, 750, 100, 60, (newValue: string) => {
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
        });

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

        this.createClickableImage(1950, 1500, "submit_button", () => {
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
                this.aOT?.substring(
                    this.aOT.indexOf(":"),
                    this.aOT.length - 1
                ) ==
                this.aOB?.substring(this.aOB.indexOf(":"), this.aOB.length - 1)
            ) {
                this.errFeed?.destroy();
                this.errFeed = this.add.text(
                    425,
                    1450,
                    `Cannot apply multiple attributes\n of type "${this.aOT?.substring(
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
                this.aTT?.substring(
                    this.aTT.indexOf(":"),
                    this.aTT.length - 1
                ) ==
                this.aTB?.substring(this.aTB.indexOf(":"), this.aTB.length - 1)
            ) {
                this.errFeed?.destroy();
                this.errFeed = this.add.text(
                    425,
                    1450,
                    `Cannot apply multiple attributes\n of type "${this.aTT?.substring(
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
                this.classOneDef =
                    this.attrOneBotDef =
                    this.attrOneTopDef =
                    this.classTwoDef =
                    this.attrTwoBotDef =
                    this.attrTwoTopDef =
                        false;
                this.cOD =
                    this.cTD =
                    this.aOT =
                    this.aTT =
                    this.aOB =
                    this.aTB =
                        undefined;
                this.scene.start("levelOne");
            }
        });

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

    createEditableText(
        xLoc: number,
        yLoc: number,
        width: number,
        height: number,
        fontSize: number,
        readInput: (inputValue: string) => void // Adding the callback function parameter
    ): void {
        const userInput = document.createElement("input");
        userInput.type = "text";
        userInput.style.width = `${width}px`;
        userInput.style.height = `${height}px`;
        userInput.style.border = "2px solid red";
        userInput.style.color = "#000";
        userInput.style.fontSize = `${fontSize}px`;
        userInput.placeholder = "Type Here!!";

        // Event listener to handle input changes
        userInput.addEventListener("input", () => {
            readInput(userInput.value); // Call the callback function with the current input value
        });

        this.add.dom(xLoc, yLoc, userInput);
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

    update() {}
}
