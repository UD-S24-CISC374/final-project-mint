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

    beta: boolean = false;
    errFeed: Phaser.GameObjects.Text | null = null;

    ponchoUnlocked: boolean = false;
    vestUnlocked: boolean = false;
    springsUnlocked: boolean = false;
    wheelsUnlocked: boolean = false;
    closeUnlocked: boolean = false;
    eagleUnlocked: boolean = false;
    speedUnlocked: boolean = false;
    drumUnlocked: boolean = false;
    minigunUnlocked: boolean = false;

    constructor() {
        super({ key: "LoadoutSceneTextboxInserts", active: true });
    }

    create() {
        this.classOneDef = false;
        this.classTwoDef = false;
        this.attrOneTopDef = false;
        this.attrTwoTopDef = false;
        this.attrOneBotDef = false;
        this.attrTwoBotDef = false;

        this.cOD = undefined;
        this.cTD = undefined;
        this.aOT = undefined;
        this.aTT = undefined;
        this.aOB = undefined;
        this.aTB = undefined;

        // Check status of unlocked items
        this.ponchoUnlocked = this.game.registry.get("ponchoUnlocked");
        this.vestUnlocked = this.game.registry.get("vestUnlocked");
        this.springsUnlocked = this.game.registry.get("springsUnlocked");
        this.wheelsUnlocked = this.game.registry.get("wheelsUnlocked");
        this.closeUnlocked = this.game.registry.get("closeUnlocked");
        this.eagleUnlocked = this.game.registry.get("eagleUnlocked");
        this.speedUnlocked = this.game.registry.get("speedUnlocked");
        this.drumUnlocked = this.game.registry.get("drumUnlocked");
        this.minigunUnlocked = this.game.registry.get("minigunUnlocked");

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
                newValue == "none:scope;" ||
                newValue == "none: scope;" ||
                newValue == "none :scope;" ||
                ((newValue == "close:scope;" ||
                    newValue == "close: scope;" ||
                    newValue == "close :scope;") &&
                    this.closeUnlocked) ||
                ((newValue == "eagle:scope;" ||
                    newValue == "eagle: scope;" ||
                    newValue == "eagle :scope;") &&
                    this.eagleUnlocked) ||
                newValue == "none:magazine;" ||
                newValue == "none: magazine;" ||
                newValue == "none :magazine;" ||
                ((newValue == "speed:magazine;" ||
                    newValue == "speed: magazine;" ||
                    newValue == "speed :magazine;") &&
                    this.speedUnlocked) ||
                ((newValue == "drum:magazine;" ||
                    newValue == "drum: magazine;" ||
                    newValue == "drum :magazine;") &&
                    this.drumUnlocked) ||
                ((newValue == "minigun:magazine;" ||
                    newValue == "minigun: magazine;" ||
                    newValue == "minigun :magazine;") &&
                    this.minigunUnlocked)
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
                newValue == "none:scope;" ||
                newValue == "none: scope;" ||
                newValue == "none :scope;" ||
                ((newValue == "close:scope;" ||
                    newValue == "close: scope;" ||
                    newValue == "close :scope;") &&
                    this.closeUnlocked) ||
                ((newValue == "eagle:scope;" ||
                    newValue == "eagle: scope;" ||
                    newValue == "eagle :scope;") &&
                    this.eagleUnlocked) ||
                newValue == "none:magazine;" ||
                newValue == "none: magazine;" ||
                newValue == "none :magazine;" ||
                ((newValue == "speed:magazine;" ||
                    newValue == "speed: magazine;" ||
                    newValue == "speed :magazine;") &&
                    this.speedUnlocked) ||
                ((newValue == "drum:magazine;" ||
                    newValue == "drum: magazine;" ||
                    newValue == "drum :magazine;") &&
                    this.drumUnlocked) ||
                ((newValue == "minigun:magazine;" ||
                    newValue == "minigun: magazine;" ||
                    newValue == "minigun :magazine;") &&
                    this.minigunUnlocked)
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
                newValue == "none:shirt;" ||
                newValue == "none: shirt;" ||
                newValue == "none :shirt;" ||
                ((newValue == "poncho:shirt;" ||
                    newValue == "poncho: shirt;" ||
                    newValue == "poncho :shirt;") &&
                    this.ponchoUnlocked) ||
                ((newValue == "vest:shirt;" ||
                    newValue == "vest: shirt;" ||
                    newValue == "vest :shirt;") &&
                    this.vestUnlocked) ||
                newValue == "none:shoes;" ||
                newValue == "none: shoes;" ||
                newValue == "none :shoes;" ||
                ((newValue == "springs:shoes;" ||
                    newValue == "springs: shoes;" ||
                    newValue == "springs :shoes;") &&
                    this.springsUnlocked) ||
                ((newValue == "wheels:shoes;" ||
                    newValue == "wheels: shoes;" ||
                    newValue == "wheels :shoes;") &&
                    this.wheelsUnlocked)
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
                newValue == "none:shirt;" ||
                newValue == "none: shirt;" ||
                newValue == "none :shirt;" ||
                ((newValue == "poncho:shirt;" ||
                    newValue == "poncho: shirt;" ||
                    newValue == "poncho :shirt;") &&
                    this.ponchoUnlocked) ||
                ((newValue == "vest:shirt;" ||
                    newValue == "vest: shirt;" ||
                    newValue == "vest :shirt;") &&
                    this.vestUnlocked) ||
                newValue == "none:shoes;" ||
                newValue == "none: shoes;" ||
                newValue == "none :shoes;" ||
                ((newValue == "springs:shoes;" ||
                    newValue == "springs: shoes;" ||
                    newValue == "springs :shoes;") &&
                    this.springsUnlocked) ||
                ((newValue == "wheels:shoes;" ||
                    newValue == "wheels: shoes;" ||
                    newValue == "wheels :shoes;") &&
                    this.wheelsUnlocked)
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

        this.createClickableImage(1950, 1600, "example_button", () => {
            this.scene.start("LoadoutExample");
        });

        this.createClickableImage(1950, 1450, "submit_button", () => {
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
                        `Invalid class name: ${this.cOD}\nInput is case sensitive.`,
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
                        `Invalid Gun variable: "${this.aOT.substring(
                            0,
                            this.aOT.length - 1
                        )}"\nMake sure ATTRIBUTE and TYPE exist in\nthe Menu under the "Gun" class, are\nof the format "ATTRIBUTE:TYPE;",\nand are all lowercase.`,
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
                        `Invalid Gun variable: "${this.aOB.substring(
                            0,
                            this.aOB.length - 1
                        )}"\nMake sure ATTRIBUTE and TYPE exist in\nthe Menu under the "Gun" class, are\nof the format "ATTRIBUTE:TYPE;",\nand are all lowercase.`,
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
                        `Invalid class name: ${this.cTD}\nInput is case sensitive.`,
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
                        )}\nMake sure ATTRIBUTE and TYPE exist in\nthe Menu under the "Clothes" class, are\nof the format "ATTRIBUTE:TYPE;",\nand are all lowercase.`,
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
                        )}\nMake sure ATTRIBUTE and TYPE exist in\nthe Menu under the "Clothes" class, are\nof the format "ATTRIBUTE:TYPE;",\nand are all lowercase.`,
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
                if (this.aOT?.substring(0, this.aOT.indexOf(":")) == "none") {
                    if (this.aOT.includes("scope")) {
                        this.game.registry.set("bulletSpeed", 1500);
                        this.game.registry.set("fireRateModifier", 1000);
                    } else {
                        this.game.registry.set("reloadModifier", 3000);
                        this.game.registry.set("magazine", 5);
                    }
                } else if (
                    this.aOT?.substring(0, this.aOT.indexOf(":")) == "close"
                ) {
                    this.game.registry.set("bulletSpeed", 1200);
                    this.game.registry.set("fireRateModifier", 200);
                } else if (
                    this.aOT?.substring(0, this.aOT.indexOf(":")) == "eagle"
                ) {
                    this.game.registry.set("bulletSpeed", 3000);
                    this.game.registry.set("fireRateModifier", 1750);
                } else if (
                    this.aOT?.substring(0, this.aOT.indexOf(":")) == "drum"
                ) {
                    this.game.registry.set("reloadModifier", 5000);
                    this.game.registry.set("magazine", 15);
                } else if (
                    this.aOT?.substring(0, this.aOT.indexOf(":")) == "speed"
                ) {
                    this.game.registry.set("reloadModifier", 1000);
                    this.game.registry.set("magazine", 4);
                } else if (
                    this.aOT?.substring(0, this.aOT.indexOf(":")) == "minigun"
                ) {
                    this.game.registry.set("reloadModifier", 10000);
                    this.game.registry.set("magazine", 55);
                }

                if (this.aOB?.substring(0, this.aOB.indexOf(":")) == "none") {
                    if (this.aOB.includes("scope")) {
                        this.game.registry.set("bulletSpeed", 1500);
                        this.game.registry.set("fireRateModifier", 1000);
                    } else {
                        this.game.registry.set("reloadModifier", 3000);
                        this.game.registry.set("magazine", 5);
                    }
                } else if (
                    this.aOB?.substring(0, this.aOB.indexOf(":")) == "close"
                ) {
                    this.game.registry.set("bulletSpeed", 1000);
                    this.game.registry.set("fireRateModifier", 200);
                } else if (
                    this.aOB?.substring(0, this.aOB.indexOf(":")) == "eagle"
                ) {
                    this.game.registry.set("bulletSpeed", 3000);
                    this.game.registry.set("fireRateModifier", 1500);
                } else if (
                    this.aOB?.substring(0, this.aOB.indexOf(":")) == "drum"
                ) {
                    this.game.registry.set("reloadModifier", 5000);
                    this.game.registry.set("magazine", 15);
                } else if (
                    this.aOB?.substring(0, this.aOB.indexOf(":")) == "speed"
                ) {
                    this.game.registry.set("reloadModifier", 1000);
                    this.game.registry.set("magazine", 4);
                } else if (
                    this.aOB?.substring(0, this.aOB.indexOf(":")) == "minigun"
                ) {
                    this.game.registry.set("reloadModifier", 10000);
                    this.game.registry.set("magazine", 55);
                }

                if (this.aTT?.substring(0, this.aTT.indexOf(":")) == "none") {
                    if (this.aTT.includes("shirt")) {
                        this.game.registry.set("speedModifier", 160);
                        this.game.registry.set("jumpModifier", -550);
                    } else {
                        this.game.registry.set("shieldModifier", 1);
                        this.game.registry.set("playerWeight", 2);
                    }
                } else if (
                    this.aTT?.substring(0, this.aTT.indexOf(":")) == "poncho"
                ) {
                    this.game.registry.set("shieldModifier", 3);
                    this.game.registry.set("playerWeight", 3);
                } else if (
                    this.aTT?.substring(0, this.aTT.indexOf(":")) == "vest"
                ) {
                    this.game.registry.set("shieldModifier", 2);
                    this.game.registry.set("playerWeight", 2);
                } else if (
                    this.aTT?.substring(0, this.aTT.indexOf(":")) == "wheels"
                ) {
                    this.game.registry.set("speedModifier", 300);
                    this.game.registry.set("jumpModifier", -550);
                } else if (
                    this.aTT?.substring(0, this.aTT.indexOf(":")) == "springs"
                ) {
                    this.game.registry.set("jumpModifier", -750);
                    this.game.registry.set("speedModifier", 160);
                }

                if (this.aTB?.substring(0, this.aTB.indexOf(":")) == "none") {
                    if (this.aTB.includes("shirt")) {
                        this.game.registry.set("speedModifier", 160);
                        this.game.registry.set("jumpModifier", -550);
                    } else {
                        this.game.registry.set("shieldModifier", 1);
                        this.game.registry.set("playerWeight", 2);
                    }
                } else if (
                    this.aTB?.substring(0, this.aTB.indexOf(":")) == "poncho"
                ) {
                    this.game.registry.set("shieldModifier", 3);
                    this.game.registry.set("playerWeight", 3);
                } else if (
                    this.aTB?.substring(0, this.aTB.indexOf(":")) == "vest"
                ) {
                    this.game.registry.set("shieldModifier", 2);
                    this.game.registry.set("playerWeight", 2);
                } else if (
                    this.aTB?.substring(0, this.aTB.indexOf(":")) == "wheels"
                ) {
                    this.game.registry.set("speedModifier", 300);
                    this.game.registry.set("jumpModifier", -550);
                } else if (
                    this.aTB?.substring(0, this.aTB.indexOf(":")) == "springs"
                ) {
                    this.game.registry.set("jumpModifier", -750);
                    this.game.registry.set("speedModifier", 160);
                }

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
                this.scene.start("levelScreen");
            }
        });

        // dev button to skip to level
        if (this.beta) {
            this.createClickableTextAndSize(
                0,
                0,
                "50px",
                "cheat (devs only)",
                "#ffffff",
                "#ff0000",
                () => {
                    this.game.registry.set("levelTwoUnlocked", true);
                    this.game.registry.set("levelThreeUnlocked", true);
                    this.scene.start("levelScreen"); ///Sibyl
                }
            );
            this.game.registry.set("ponchoUnlocked", true);
            this.game.registry.set("vestUnlocked", true);
            this.game.registry.set("springsUnlocked", true);
            this.game.registry.set("wheelsUnlocked", true);

            this.game.registry.set("closeUnlocked", true);
            this.game.registry.set("eagleUnlocked", true);
            this.game.registry.set("minigunUnlocked", true);
            this.game.registry.set("speedUnlocked", true);
            this.game.registry.set("drumUnlocked", true);
        }

        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(350, 1355, 1000, 350);

        this.add.text(375, 1370, "Error Feedback:", {
            font: "60px Arial",
            color: "#ffffff",
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
