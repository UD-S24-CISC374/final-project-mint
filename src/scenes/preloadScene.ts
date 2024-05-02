import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        //Loading images for the levels
        this.load.image("WildWest", "assets/img/WildWest.jpeg");
        this.load.image(
            "levelBackg",
            "assets/img/LevelImg/level_background.jpg"
        );
        this.load.image("ground", "assets/img/LevelImg/groundV3.png");
        this.load.image("platform", "assets/img/LevelImg/platformV3.png");
        //this.load.image("tiles", "assets/img/tilemap_packed.png");
        //this.load.tilemapTiledJSON("tilemap", "assets/levelOneMap.json");
        //Characters, rewards, enemys
        this.load.image("baddie1", "assets/img/LevelImg/baddie1.png");
        this.load.image("baddie2", "assets/img/LevelImg/baddie2.png");
        this.load.image("ground2", "assets/img/LevelImg/platformV2.png");
        this.load.image("checkpoint", "assets/img/LevelImg/checkpoint.png");
        this.load.image("star", "assets/img/star.png");
        this.load.image("bomb", "assets/img/bomb.png");
        this.load.image("heart", "assets/img/LevelImg/heart.png");

        this.load.image("LoadoutExample", "assets/img/LoadoutExample.png");

        this.load.image(
            "minigun_item",
            "assets/img/LevelImg/Items/minigun_item.png"
        );
        this.load.image(
            "speed_item",
            "assets/img/LevelImg/Items/speed_item.png"
        );
        this.load.image("drum_item", "assets/img/LevelImg/Items/drum_item.png");
        this.load.image(
            "close_item",
            "assets/img/LevelImg/Items/close_item.png"
        );
        this.load.image(
            "eagle_item",
            "assets/img/LevelImg/Items/eagle_item.png"
        );
        this.load.image(
            "poncho_item",
            "assets/img/LevelImg/Items/poncho_item.png"
        );
        this.load.image("vest_item", "assets/img/LevelImg/Items/vest_item.png");
        this.load.image(
            "springs_item",
            "assets/img/LevelImg/Items/spring_item.png"
        );
        this.load.image(
            "wheels_item",
            "assets/img/LevelImg/Items/wheels_item.png"
        );

        this.load.image("gun_button", "assets/img/buttons/gun/button_gun.png");
        this.load.image(
            "clothes_button",
            "assets/img/buttons/clothes/button_clothes.png"
        );

        this.load.image(
            "example_button",
            "assets/img/buttons/button_example.png"
        );
        this.load.image(
            "close_button",
            "assets/img/buttons/gun/button_close.png"
        );
        this.load.image(
            "drum_button",
            "assets/img/buttons/gun/button_drum.png"
        );
        this.load.image(
            "eagle_button",
            "assets/img/buttons/gun/button_eagle.png"
        );
        this.load.image(
            "magazine_button",
            "assets/img/buttons/gun/button_magazine.png"
        );
        this.load.image(
            "minigun_button",
            "assets/img/buttons/gun/button_minigun.png"
        );
        this.load.image(
            "scope_button",
            "assets/img/buttons/gun/button_scope.png"
        );
        this.load.image(
            "speed_button",
            "assets/img/buttons/gun/button_speed.png"
        );
        this.load.image(
            "poncho_button",
            "assets/img/buttons/clothes/button_poncho.png"
        );
        this.load.image(
            "shirt_button",
            "assets/img/buttons/clothes/button_shirt.png"
        );
        this.load.image(
            "shoes_button",
            "assets/img/buttons/clothes/button_shoes.png"
        );
        this.load.image(
            "springs_button",
            "assets/img/buttons/clothes/button_springs.png"
        );
        this.load.image(
            "vest_button",
            "assets/img/buttons/clothes/button_vest.png"
        );
        this.load.image(
            "wheels_button",
            "assets/img/buttons/clothes/button_wheels.png"
        );
        this.load.image(
            "submit_button",
            "assets/img/buttons/button_submit_code.png"
        );
        this.load.image(
            "go_back_button",
            "assets/img/buttons/button_go_back.png"
        );
        this.load.image("none_button", "assets/img/buttons/button_none.png");
        this.load.image(
            "locked_button",
            "assets/img/buttons/button_locked.png"
        );

        this.load.spritesheet("dude", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("cowboy", "assets/img/LevelImg/Cowboy_15x1.png", {
            frameWidth: 160,
            frameHeight: 160,
        });
        this.load.spritesheet(
            "baddieGun",
            "assets/img/LevelImg/Baddie_Gun1x15.png",
            {
                frameWidth: 160,
                frameHeight: 160,
            }
        );
        this.load.spritesheet(
            "baddieKnife",
            "assets/img/LevelImg/Baddie_Knife1x15.png",
            {
                frameWidth: 160,
                frameHeight: 160,
            }
        );
        this.load.spritesheet("boss", "assets/img/LevelImg/boss.png", {
            frameWidth: 256,
            frameHeight: 256,
        });

        // Loadout Menu Screen background
        this.load.image("LoadoutMenu", "assets/img/LoadoutMenu.png");
    }

    create() {
        // Make all global variables to be edited between scenes
        /* NOTES:
         * To access these, use:
         *          this.game.registry.get("variable-name");
         *
         * To update these, use:
         *          this.game.registry.set("variable-name", this.game.registry.get("variable-name") + number)
         *
         * OR update with something like this (prob more useful for what we are doing):
         *         let var = this.game.registry.get("variable-name");
         *         this.game.registry.set("variable-name", var + number);
         */
        this.game.registry.set("speedModifier", 160); // Left - Right movement velocity
        this.game.registry.set("jumpModifier", -550); // Jump velocity
        this.game.registry.set("sheildModifier", 100); //how many bullets it takes to loose a life orignal number 1
        this.game.registry.set("fireRateModifier", 100); // Shots per second original number 1000
        this.game.registry.set("reloadModifier", 3000); // Reload time in milliseconds
        this.game.registry.set("magazine", 500); //sets the number of bullets user has original number 5

        // Global variables for Clothes and Gun Unlocks
        this.game.registry.set("ponchoUnlocked", false);
        this.game.registry.set("vestUnlocked", false);
        this.game.registry.set("springsUnlocked", false);
        this.game.registry.set("wheelsUnlocked", false);

        this.game.registry.set("closeUnlocked", false);
        this.game.registry.set("eagleUnlocked", false);
        this.game.registry.set("minigunUnlocked", false);
        this.game.registry.set("speedUnlocked", false);
        this.game.registry.set("drumUnlocked", false);

        //Global variables indecating whether a level is unlocked or not
        this.game.registry.set("levelTwoUnlocked", true);
        this.game.registry.set("levelThreeUnlocked", true);

        // Start First Scene
        this.scene.stop("LoadoutSceneTextboxInserts");
        this.scene.start("instructions");
    }
}
