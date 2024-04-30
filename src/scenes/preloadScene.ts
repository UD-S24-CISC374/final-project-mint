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
        this.load.image("baddie0", "assets/img/LevelImg/baddie_2.png");
        this.load.image("baddie2", "assets/img/LevelImg/baddie2.png");
        this.load.image("ground2", "assets/img/LevelImg/platformV2.png");
        this.load.image("checkpoint", "assets/img/LevelImg/checkpoint.png");
        this.load.image("star", "assets/img/star.png");
        this.load.image("bomb", "assets/img/bomb.png");

        this.load.image("gun_button", "assets/img/buttons/gun/button_gun.png");
        this.load.image(
            "clothes_button",
            "assets/img/buttons/clothes/button_clothes.png"
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

        // Loadout Menu Screen background
        this.load.image("LoadoutMenu", "assets/img/LoadoutMenu.png");
    }

    create() {
        // Start First Scene
        this.scene.stop("LoadoutSceneTextboxInserts");
        this.scene.start("instructions");
    }
}
