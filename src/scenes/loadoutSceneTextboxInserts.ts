import Phaser from "phaser";

export default class LoadoutSceneTextboxInserts extends Phaser.Scene {
    textInput: HTMLInputElement;
    textbox: Phaser.GameObjects.DOMElement;

    attrOneTopDef: boolean = false;
    attrOneBotDef: boolean = false;

    attrTwoTopDef: boolean = false;
    attrTwoBotDef: boolean = false;

    aOT: string | undefined;
    aOB: string | undefined;
    aTT: string | undefined;
    aTB: string | undefined;

    beta: boolean = true;
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
        this.attrOneTopDef = false;
        this.attrTwoTopDef = false;
        this.attrOneBotDef = false;
        this.attrTwoBotDef = false;

        this.aOT = undefined;
        this.aTT = undefined;
        this.aOB = undefined;
        this.aTB = undefined;

        // dev button to skip to level
        if (this.beta) {
            this.game.registry.set("levelTwoUnlocked", true);
            this.game.registry.set("levelThreeUnlocked", true);
            this.game.registry.set("ponchoUnlocked", true);
            this.game.registry.set("vestUnlocked", true);
            this.game.registry.set("springsUnlocked", true);
            this.game.registry.set("wheelsUnlocked", true);

            this.game.registry.set("closeUnlocked", true);
            this.game.registry.set("eagleUnlocked", true);
            this.game.registry.set("minigunUnlocked", true);
            this.game.registry.set("speedUnlocked", true);
            this.game.registry.set("drumUnlocked", true);

            this.createClickableTextAndSize(
                0,
                0,
                "50px",
                "cheat (devs only)",
                "#ffffff",
                "#ff0000",
                () => {
                    this.scene.start("levelScreen"); ///Sibyl
                }
            );
        }

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

        this.createEditableText(2005, 995, 400, 100, 60, (newValue: string) => {
            console.log("Text input updated to:", newValue);
            this.aOB = newValue;
            if (
                newValue == "none" ||
                (newValue == "close" && this.closeUnlocked) ||
                (newValue == "eagle" && this.eagleUnlocked)
            ) {
                console.log("Set continue to true");
                this.attrOneBotDef = true;
            } else {
                this.attrOneBotDef = false;
            }
        });
        this.createEditableText(1445, 995, 400, 100, 60, (newValue: string) => {
            console.log("Text input updated to:", newValue);
            this.aOT = newValue;
            if (
                newValue == "none" ||
                (newValue == "speed" && this.speedUnlocked) ||
                (newValue == "drum" && this.drumUnlocked) ||
                (newValue == "minigun" && this.minigunUnlocked)
            ) {
                console.log("Set continue to true");
                this.attrOneTopDef = true;
            } else {
                this.attrOneTopDef = false;
            }
        });

        this.createEditableText(
            2040,
            1165,
            400,
            100,
            60,
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                this.aTT = newValue;
                if (
                    newValue == "none" ||
                    (newValue == "poncho" && this.ponchoUnlocked) ||
                    (newValue == "vest" && this.vestUnlocked)
                ) {
                    console.log("Set continue to true");
                    this.attrTwoTopDef = true;
                } else {
                    this.attrTwoTopDef = false;
                }
            }
        );
        this.createEditableText(
            1480,
            1165,
            400,
            100,
            60,
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                this.aTB = newValue;
                if (
                    newValue == "none" ||
                    (newValue == "springs" && this.springsUnlocked) ||
                    (newValue == "wheels" && this.wheelsUnlocked)
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

        this.createClickableImage(1500, 1500, "example_button", () => {
            this.scene.start("LoadoutExample");
        });

        this.createClickableImage(2150, 1500, "submit_button", () => {
            // Conditionals for individual boxes

            // ********************************** WEAPON CLASS **********************************

            if (!this.attrOneTopDef) {
                this.errFeed?.destroy();
                if (!this.aOT) {
                    this.errFeed = this.add.text(
                        225,
                        1450,
                        `Cannot leave left myWeapon field blank`,
                        {
                            font: "45px Arial",
                            color: "#ffffff",
                        }
                    );
                } else {
                    this.errFeed = this.add.text(
                        225,
                        1450,
                        `Unrecognized Magazine: "${this.aOT}"\nEnsure you have the Magazine\nunlocked by checking the menu.\nInputs are case sensitive.`,
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
                        225,
                        1450,
                        `Cannot leave right myWeapon field blank`,
                        {
                            font: "45px Arial",
                            color: "#ffffff",
                        }
                    );
                } else {
                    this.errFeed = this.add.text(
                        225,
                        1450,
                        `Unrecognized Scope: "${this.aOB}"\nEnsure you have the Scope\nunlocked by checking the menu.\nInputs are case sensitive.`,
                        {
                            font: "45px Arial",
                            color: "#ffffff",
                        }
                    );
                }
            }

            // ********************************** APPAREL CLASS **********************************
            else if (!this.attrTwoBotDef) {
                this.errFeed?.destroy();
                if (!this.aTB) {
                    this.errFeed = this.add.text(
                        225,
                        1450,
                        `Cannot leave left myOutfit field blank`,
                        {
                            font: "45px Arial",
                            color: "#ffffff",
                        }
                    );
                } else {
                    this.errFeed = this.add.text(
                        225,
                        1450,
                        `Unrecognized Shoes: ${this.aTB}\nEnsure you have the Shirt\nunlocked by checking the menu.\nInputs are case sensitive.`,
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
                        225,
                        1450,
                        `Cannot leave right myOutfit field blank`,
                        {
                            font: "45px Arial",
                            color: "#ffffff",
                        }
                    );
                } else {
                    this.errFeed = this.add.text(
                        225,
                        1450,
                        `Unrecognized Shirt: ${this.aTT}\nEnsure you have the Shoes\nunlocked by checking the menu.\nInputs are case sensitive.`,
                        {
                            font: "45px Arial",
                            color: "#ffffff",
                        }
                    );
                }
            }

            // IF ALL CONDITIONS ARE MET: Start Level
            else {
                if (this.aOB == "none") {
                    this.game.registry.set("reloadModifier", 3000);
                    this.game.registry.set("magazine", 5);
                } else if (this.aOB == "close") {
                    this.game.registry.set("bulletSpeed", 1200);
                    this.game.registry.set("fireRateModifier", 200);
                } else if (this.aOB == "eagle") {
                    this.game.registry.set("bulletSpeed", 3000);
                    this.game.registry.set("fireRateModifier", 1750);
                }

                if (this.aOT == "none") {
                    this.game.registry.set("reloadModifier", 3000);
                    this.game.registry.set("magazine", 5);
                } else if (this.aOT == "drum") {
                    this.game.registry.set("reloadModifier", 5000);
                    this.game.registry.set("magazine", 15);
                } else if (this.aOT == "speed") {
                    this.game.registry.set("reloadModifier", 1000);
                    this.game.registry.set("magazine", 4);
                } else if (this.aOT == "minigun") {
                    this.game.registry.set("reloadModifier", 10000);
                    this.game.registry.set("magazine", 55);
                }

                if (this.aTT == "none") {
                    this.game.registry.set("shieldModifier", 1);
                    this.game.registry.set("playerWeight", 2);
                } else if (this.aTT == "poncho") {
                    this.game.registry.set("shieldModifier", 3);
                    this.game.registry.set("playerWeight", 3);
                } else if (this.aTT == "vest") {
                    this.game.registry.set("shieldModifier", 2);
                    this.game.registry.set("playerWeight", 2);
                }

                if (this.aTB == "none") {
                    this.game.registry.set("speedModifier", 160);
                    this.game.registry.set("jumpModifier", -550);
                } else if (this.aTB == "wheels") {
                    this.game.registry.set("speedModifier", 300);
                    this.game.registry.set("jumpModifier", -550);
                } else if (this.aTB == "springs") {
                    this.game.registry.set("jumpModifier", -750);
                    this.game.registry.set("speedModifier", 160);
                }

                this.attrOneBotDef =
                    this.attrOneTopDef =
                    this.attrTwoBotDef =
                    this.attrTwoTopDef =
                        false;
                this.aOT = this.aTT = this.aOB = this.aTB = undefined;
                this.scene.start("levelScreen");
            }
        });

        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(150, 1355, 1000, 350);

        this.add.text(175, 1370, "Error Feedback:", {
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
