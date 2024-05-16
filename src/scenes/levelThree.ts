import Phaser from "phaser";
//import PhaserLogo from "../objects/phaserLogo";
//import FpsText from "../objects/fpsText";
class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "bomb");
        scene.add.existing(this);
    }

    fire(x: number, y: number, vel: number) {
        this.enableBody(true, x, y, true, true);
        this.setVelocityX(vel); // Adjust bullet speed as needed
    }

    onWorldBounds() {
        this.destroy();
    }
}

class Bullets extends Phaser.Physics.Arcade.Group {
    private readonly fireRate: number;
    private readonly maxBullets: number;
    private readonly timeDelay: number;
    private lastFiredTime: number;
    private bulletsFired: number;

    constructor(
        world: Phaser.Physics.Arcade.World,
        scene: Phaser.Scene,
        fireRate: number,
        maxBullets: number,
        timeDelay: number
    ) {
        super(world, scene);
        this.fireRate = fireRate;
        this.lastFiredTime = 0;
        this.maxBullets = maxBullets;
        this.timeDelay = timeDelay;
        this.bulletsFired = 0;
    }

    fireBullet(x: number, y: number, vel: number) {
        const currentTime = this.scene.time.now;
        if (
            currentTime - this.lastFiredTime > this.fireRate &&
            this.bulletsFired < this.maxBullets
        ) {
            const bullet = new Bullet(this.scene, x, y);
            this.add(bullet);
            bullet.fire(x, y, vel);
            this.lastFiredTime = currentTime;
            this.bulletsFired++;

            if (this.bulletsFired >= this.maxBullets) {
                this.scene.time.delayedCall(this.timeDelay, () => {
                    this.bulletsFired = 0;
                });
            }
        }
    }
}

export default class levelThree extends Phaser.Scene {
    //fpsText: FpsText;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private lastPlayerDirection: string | null = null;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars: Phaser.Physics.Arcade.StaticGroup;
    private hearts: Phaser.Physics.Arcade.StaticGroup;
    private checkpoint: Phaser.Physics.Arcade.StaticGroup;
    private bullets?: Bullets;
    private colliderInitialized = false;
    private bulletsHitCount: number;
    private bulletsBeforeLifeLoss: number; // Number of bullets before losing a life

    private baddieGun1?: Phaser.Physics.Arcade.Sprite;
    private lastBaddieGDirection1: string | null = null;
    private baddieGun2?: Phaser.Physics.Arcade.Sprite;
    private lastBaddieGDirection2: string | null = null;
    private baddieGun3?: Phaser.Physics.Arcade.Sprite;
    private lastBaddieGDirection3: string | null = null;
    private baddieGun4?: Phaser.Physics.Arcade.Sprite;
    private lastBaddieGDirection4: string | null = null;
    private baddieGunAlive1: boolean;
    private baddieGunAlive2: boolean;
    private baddieGunAlive3: boolean;
    private baddieGunAlive4: boolean;
    private badBullets1?: Bullets;
    private badBullets2?: Bullets;
    private badBullets3?: Bullets;
    private badBullets4?: Bullets;

    private boss?: Phaser.Physics.Arcade.Sprite;
    private lastBossDirection: string | null = null;
    private bossAlive1: boolean;
    private badBullets5?: Bullets;
    private bulletsHit: number;

    private baddieKnife1?: Phaser.Physics.Arcade.Sprite;
    private baddieKnife2?: Phaser.Physics.Arcade.Sprite;
    private baddieKnifeAlive1: boolean;
    private baddieKnifeAlive2: boolean;

    private lastBaddieKDirection: string | null = null;
    private lastDirectionChangeTime1: number;
    private lastDirectionChangeTime2: number;
    private lastDirectionChangeTime3: number;
    private lastDirectionChangeTime4: number;
    private lastDirectionChangeTime5: number;
    private lastDirectionChangeTime6: number;
    private lastDirectionChangeTime7: number;

    private lives: number;

    //private score = 0;
    //private scoreText?: Phaser.GameObjects.Text;

    private baddie?: Phaser.Physics.Arcade.Group;

    private gameOver: boolean;

    private canShoot = true;
    private shootDelay = 500; // Delay in milliseconds between shots
    private lastShotTime = 0;
    private numBaddies: number;

    //Initializing all of the global variables being used
    private playerVel: number;
    private jump: number;
    private fireRate: number;
    private reload: number;
    private numBullets: number;
    private bulletSpeed: number;
    private poncho: boolean; // already part
    private vest: boolean;
    private springs: boolean;
    private wheels: boolean; // already part
    private close: boolean; // already part
    private eagle: boolean;
    private minigun: boolean;
    private drum: boolean;

    constructor() {
        super({ key: "levelThree" });
    }

    create() {
        //initializing the global variables
        this.playerVel = this.game.registry.get("speedModifier");
        this.jump = this.game.registry.get("jumpModifier");
        this.fireRate = this.game.registry.get("fireRateModifier");
        this.reload = this.game.registry.get("reloadModifier");
        this.numBullets = this.game.registry.get("magazine");
        this.numBaddies = 6;
        this.bulletSpeed = this.game.registry.get("bulletSpeed");
        //initalizing all the variables used in the game
        this.bulletsHitCount = 0;
        this.bulletsBeforeLifeLoss = this.game.registry.get("shieldModifier"); // Number of bullets before losing a life

        this.gameOver = false;
        this.lastDirectionChangeTime1 = this.time.now;
        this.lastDirectionChangeTime2 = this.time.now;
        this.lastDirectionChangeTime3 = this.time.now;
        this.lastDirectionChangeTime4 = this.time.now;
        this.lastDirectionChangeTime5 = this.time.now;
        this.lastDirectionChangeTime6 = this.time.now;
        this.lastDirectionChangeTime7 = this.time.now;
        this.add.image(2048, 857, "levelBackg");
        //this.add.image(3072, 857, "levelBackg");
        this.platforms = this.physics.add.staticGroup();
        this.checkpoint = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            2048,
            1700,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();

        this.platforms.create(50, 1200, "platform");
        this.platforms.create(1300, 400, "platform");
        this.platforms.create(1300, 1200, "platform");
        this.platforms.create(3000, 400, "platform");
        this.platforms.create(3000, 1200, "platform");
        this.platforms.create(2200, 800, "platform");

        this.player = this.physics.add.sprite(100, 450, "cowboy");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.lives = 3; //The number of lives the player has

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("cowboy", {
                start: 6,
                end: 0,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "cowboy", frame: 7 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("cowboy", {
                start: 8,
                end: 14,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.hearts = this.physics.add.staticGroup({
            key: "heart",
            repeat: 2,
            setXY: { x: 200, y: 100, stepX: 200 },
        });

        this.bullets = new Bullets(
            this.physics.world,
            this,
            this.fireRate,
            this.numBullets,
            this.reload
        ); //this is what changes the fire speed\
        this.physics.add.overlap(this.bullets!, this.platforms!, (bullet) => {
            bullet.destroy();
        });
        //creating 4 gun badies
        this.baddieGun1 = this.physics.add.sprite(2000, 100, "baddieGun");
        this.physics.add.collider(this.baddieGun1, this.platforms);
        this.baddieGun1.setBounce(0.2);
        this.baddieGun1.setCollideWorldBounds(true);
        this.baddieGunAlive1 = true;
        this.badBullets1 = new Bullets(this.physics.world, this, 500, 500, 0); //this is what changes the fire speed
        this.physics.add.overlap(
            this.badBullets1!,
            this.platforms!,
            (bullet) => {
                bullet.destroy();
            }
        );
        this.baddieGunAlive1 = true;

        this.baddieGun2 = this.physics.add.sprite(1000, 100, "baddieGun");
        this.physics.add.collider(this.baddieGun2, this.platforms);
        this.baddieGun2.setBounce(0.2);
        this.baddieGun2.setCollideWorldBounds(true);
        this.baddieGunAlive2 = true;
        this.badBullets2 = new Bullets(this.physics.world, this, 500, 500, 0); //this is what changes the fire speed
        this.physics.add.overlap(
            this.badBullets1!,
            this.platforms!,
            (bullet) => {
                bullet.destroy();
            }
        );
        this.baddieGunAlive2 = true;

        this.baddieGun3 = this.physics.add.sprite(2500, 100, "baddieGun");
        this.physics.add.collider(this.baddieGun3, this.platforms);
        this.baddieGun3.setBounce(0.2);
        this.baddieGun3.setCollideWorldBounds(true);
        this.baddieGunAlive3 = true;
        this.badBullets3 = new Bullets(this.physics.world, this, 500, 500, 0); //this is what changes the fire speed
        this.physics.add.overlap(
            this.badBullets3!,
            this.platforms!,
            (bullet) => {
                bullet.destroy();
            }
        );
        this.baddieGunAlive3 = true;

        this.baddieGun4 = this.physics.add.sprite(1600, 100, "baddieGun");
        this.physics.add.collider(this.baddieGun4, this.platforms);
        this.baddieGun4.setBounce(0.2);
        this.baddieGun4.setCollideWorldBounds(true);
        this.baddieGunAlive4 = true;
        this.badBullets4 = new Bullets(this.physics.world, this, 500, 500, 0); //this is what changes the fire speed
        this.physics.add.overlap(
            this.badBullets4!,
            this.platforms!,
            (bullet) => {
                bullet.destroy();
            }
        );
        this.baddieGunAlive4 = true;

        this.boss = this.physics.add.sprite(2000, 100, "boss");
        this.physics.add.collider(this.boss, this.platforms);
        this.boss.setBounce(0.2);
        this.boss.setCollideWorldBounds(true);
        this.badBullets5 = new Bullets(this.physics.world, this, 500, 500, 0); //this is what changes the fire speed
        this.physics.add.overlap(
            this.badBullets5!,
            this.platforms!,
            (bullet) => {
                bullet.destroy();
            }
        );
        this.bossAlive1 = false;
        this.bulletsHit = 10; //how many bullets it takes to kill the boss;
        this.boss.setVisible(false);
        this.boss.setActive(false);

        this.anims.create({
            key: "left3",
            frames: this.anims.generateFrameNumbers("boss", {
                start: 0,
                end: 2,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "right3",
            frames: this.anims.generateFrameNumbers("boss", {
                start: 3,
                end: 5,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.overlap(
            this.boss!,
            this.bullets!,
            (boss, bullet) => {
                this.handleHitBoss(bullet as Bullet);
            },
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.boss,
            this.handleRunIntoBoss,
            undefined,
            this
        );
        //this.boss.setVisible(false);

        //creating the animations for the gun

        this.anims.create({
            key: "left1",
            frames: this.anims.generateFrameNumbers("baddieGun", {
                start: 6,
                end: 0,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn1",
            frames: [{ key: "baddieGun", frame: 7 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right1",
            frames: this.anims.generateFrameNumbers("baddieGun", {
                start: 8,
                end: 14,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.overlap(
            this.bullets!,
            this.baddieGun1!,
            (bullet, baddieGun) => {
                this.handleKillBaddie(
                    bullet as Bullet,
                    baddieGun as Phaser.Physics.Arcade.Sprite,
                    1
                );
            },
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.baddieGun1,
            this.handleHitBaddie,
            undefined,
            this
        );
        this.physics.add.overlap(
            this.bullets!,
            this.baddieGun2!,
            (bullet, baddieGun) => {
                this.handleKillBaddie(
                    bullet as Bullet,
                    baddieGun as Phaser.Physics.Arcade.Sprite,
                    2
                );
            },
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.baddieGun2,
            this.handleHitBaddie,
            undefined,
            this
        );
        this.physics.add.overlap(
            this.bullets!,
            this.baddieGun3!,
            (bullet, baddieGun) => {
                this.handleKillBaddie(
                    bullet as Bullet,
                    baddieGun as Phaser.Physics.Arcade.Sprite,
                    5
                );
            },
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.baddieGun3,
            this.handleHitBaddie,
            undefined,
            this
        );
        this.physics.add.overlap(
            this.bullets!,
            this.baddieGun4!,
            (bullet, baddieGun) => {
                this.handleKillBaddie(
                    bullet as Bullet,
                    baddieGun as Phaser.Physics.Arcade.Sprite,
                    6
                );
            },
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.baddieGun4,
            this.handleHitBaddie,
            undefined,
            this
        );

        //Knife baddie
        this.baddieKnife1 = this.physics.add.sprite(1500, 100, "baddieKnife");
        this.physics.add.collider(this.baddieKnife1, this.platforms);
        this.baddieKnife1.setBounce(0.2);
        this.baddieKnife1.setCollideWorldBounds(true);
        this.baddieKnifeAlive1 = true;

        this.baddieKnife2 = this.physics.add.sprite(3000, 100, "baddieKnife");
        this.physics.add.collider(this.baddieKnife2, this.platforms);
        this.baddieKnife2.setBounce(0.2);
        this.baddieKnife2.setCollideWorldBounds(true);
        this.baddieKnifeAlive2 = true;

        this.anims.create({
            key: "left2",
            frames: this.anims.generateFrameNumbers("baddieKnife", {
                start: 6,
                end: 0,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn2",
            frames: [{ key: "baddieKnife", frame: 7 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right2",
            frames: this.anims.generateFrameNumbers("baddieKnife", {
                start: 8,
                end: 14,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.overlap(
            this.bullets!,
            this.baddieKnife1!,
            (bullet, baddieKnife) => {
                this.handleKillBaddie(
                    bullet as Bullet,
                    baddieKnife as Phaser.Physics.Arcade.Sprite,
                    3
                );
            },
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.baddieKnife1,
            this.handleHitBaddie,
            undefined,
            this
        );
        this.physics.add.overlap(
            this.bullets!,
            this.baddieKnife2!,
            (bullet, baddieKnife) => {
                this.handleKillBaddie(
                    bullet as Bullet,
                    baddieKnife as Phaser.Physics.Arcade.Sprite,
                    4
                );
            },
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.baddieKnife2,
            this.handleHitBaddie,
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.checkpoint,
            this.handleHitCheckpoint,
            undefined,
            this
        );

        this.physics.add.overlap(
            this.player!,
            this.badBullets1!,
            (player, bullet) => {
                this.handlePlayerHit(bullet as Bullet);
            },
            undefined,
            this
        );
        this.physics.add.overlap(
            this.player!,
            this.badBullets2!,
            (player, bullet) => {
                this.handlePlayerHit(bullet as Bullet);
            },
            undefined,
            this
        );
        this.physics.add.overlap(
            this.player!,
            this.badBullets3!,
            (player, bullet) => {
                this.handlePlayerHit(bullet as Bullet);
            },
            undefined,
            this
        );
        this.physics.add.overlap(
            this.player!,
            this.badBullets4!,
            (player, bullet) => {
                this.handlePlayerHit(bullet as Bullet);
            },
            undefined,
            this
        );
        this.physics.add.overlap(
            this.player!,
            this.badBullets5!,
            (player, bullet) => {
                this.handlePlayerHit(bullet as Bullet);
            },
            undefined,
            this
        );

        // ---------------------------------------------------------------------------------------
        // @Sibyl here is where I added the example I was talking about
        if (!this.game.registry.get("drumUnlocked")) {
            const item1 = this.createItem(1300, 280, "drum_item");
            this.physics.add.collider(
                this.player,
                item1,
                (player, item) => {
                    this.handleItemCollect(item as Phaser.GameObjects.Image, 9);
                },
                undefined,
                this
            );
        }
        if (!this.game.registry.get("vestUnlocked")) {
            const item2 = this.createItem(3000, 280, "vest_item");
            this.physics.add.collider(
                this.player,
                item2,
                (player, item) => {
                    this.handleItemCollect(item as Phaser.GameObjects.Image, 2);
                },
                undefined,
                this
            );
        }
        // ---------------------------------------------------------------------------------------
    }

    private handleHitCheckpoint() {
        this.game.registry.set("minigunUnlocked", true);
        this.game.registry.set("previousLevel", 3);
        this.scene.start("CompleteLevelScreen");
    }
    private handleKillBaddie(
        bullet: Bullet,
        baddie: Phaser.Physics.Arcade.Sprite,
        type: number
    ) {
        bullet.destroy();
        if (type === 3) {
            this.baddieKnifeAlive1 = false;
        } else if (type === 1) {
            this.baddieGunAlive1 = false;
        } else if (type === 2) {
            this.baddieGunAlive2 = false;
        } else if (type === 4) {
            this.baddieKnifeAlive2 = false;
        } else if (type === 5) {
            this.baddieGunAlive3 = false;
        } else if (type === 6) {
            this.baddieGunAlive4 = false;
        } else if (type === 7) {
            this.bossAlive1 = false;
        }
        baddie.setVisible(false);
        baddie.body = null;
        //baddie.disableBody(true, true); // Disables the baddie sprite
        this.numBaddies--;
        if (this.numBaddies <= 0) {
            this.bossAlive1 = true;
            this.boss?.setVisible(true);
            this.boss?.setActive(true);
        }
    }
    handleHitBoss(bullet: Bullet) {
        if (this.bossAlive1) {
            bullet.destroy();
            this.bulletsHit--;

            if (this.bulletsHit <= 0) {
                this.bossAlive1 = false;
            }
            if (!this.bossAlive1) {
                this.boss?.setVisible(false);
                this.checkpoint.create(
                    4000,
                    1450,
                    "checkpoint"
                ) as Phaser.Physics.Arcade.Sprite;
            }
        }
    }

    private handleHitBaddie() {
        this.physics.pause();
        this.player?.setTint(0xff0000);
        this.player?.anims.play("turn");
        this.gameOver = true;
        this.time.delayedCall(
            2000,
            () => {
                // Resume the game after the delay
                this.scene.launch("LoadoutSceneTextboxInserts");
                this.scene.start("LoadoutSceneOne");
            },
            [],
            this
        );
    }
    private handleRunIntoBoss() {
        if (this.bossAlive1) {
            this.physics.pause();
            this.player?.setTint(0xff0000);
            this.player?.anims.play("turn");
            this.gameOver = true;
            this.time.delayedCall(
                2000,
                () => {
                    // Resume the game after the delay
                    this.scene.launch("LoadoutSceneTextboxInserts");
                    this.scene.start("LoadoutSceneOne");
                },
                [],
                this
            );
        }
    }

    /*private handlePlayerHit(bullet: Bullet) {
        // Destroy the bullet
        bullet.destroy();
        this.hideNextObject(this.hearts);

        this.lives--;
        if (this.lives === 0) {
            this.physics.pause();
            this.player?.setTint(0xff0000);
            this.player?.anims.play("turn");
            this.gameOver = true;
            this.time.delayedCall(
                2000,
                () => {
                    // Resume the game after the delay
                    this.scene.launch("LoadoutSceneTextboxInserts");
                    this.scene.start("LoadoutSceneOne");
                },
                [],
                this
            );
        }
        // Handle any other logic for player getting hit
    }*/
    private handlePlayerHit(bullet: Bullet) {
        // Destroy the bullet
        bullet.destroy();

        // Increment the bullets hit count
        this.bulletsHitCount++;

        // Check if the player should lose a life
        if (this.bulletsHitCount >= this.bulletsBeforeLifeLoss) {
            // Reset the bullets hit count
            this.bulletsHitCount = 0;

            // Hide the next heart
            this.hideNextObject(this.hearts);

            // Decrease lives
            this.lives--;

            if (this.lives === 0) {
                this.physics.pause();
                this.player?.setTint(0xff0000);
                this.player?.anims.play("turn");
                this.gameOver = true;

                // Delay before restarting the scene
                this.time.delayedCall(
                    2000,
                    () => {
                        this.scene.launch("LoadoutSceneTextboxInserts");
                        this.scene.start("LoadoutSceneOne");
                    },
                    [],
                    this
                );
            }
        }
    }

    private hideNextObject(group: Phaser.Physics.Arcade.StaticGroup) {
        // Get the first active object in the group
        const objectToHide = group.getFirstAlive(
            true
        ) as Phaser.Physics.Arcade.Sprite;
        // If there's an active object, hide it
        objectToHide.setVisible(false);
        objectToHide.setActive(false);
        objectToHide.disableBody(true, true); // Disable physics body if applicable
    }

    // ----------------------------------------------------------------------------------------------------------

    // ADDED BY JAKE - @Sibyl you can use this function to place each item in the level. I added 1 example already:
    //        this.createItem(500, 500, "wheels_item")
    // DO NOT UNCOMMENT THAT ^, that's just an example, see beginning of create for applied example.

    createItem(x: number, y: number, imageName: string) {
        const item = this.physics.add.image(x, y, imageName);

        // Disable gravity for the item to prevent it from falling
        item.body.setAllowGravity(false);

        // Correctly setting the tween to oscillate around the initial position
        this.tweens.add({
            targets: item,
            y: { from: y - 10, to: y + 10 }, // Move up and down by 10 pixels around the initial y position
            yoyo: true, // Make the tween go back and forth
            repeat: -1, // Repeat forever
            duration: 1000, // Duration of one full cycle up and back down
            ease: "Sine.easeInOut", // Smooth easing function for natural movement
        });
        return item;
    }
    handleItemCollect(item: Phaser.GameObjects.Image, num: number) {
        item.destroy();
        if (num === 1) {
            this.game.registry.set("ponchoUnlocked", true);
        } else if (num === 2) {
            this.game.registry.set("vestUnlocked", true);
        } else if (num === 3) {
            this.game.registry.set("springsUnlocked", true);
        } else if (num === 4) {
            this.game.registry.set("wheelsUnlocked", true);
        } else if (num === 5) {
            this.game.registry.set("closeUnlocked", true);
        } else if (num === 6) {
            this.game.registry.set("eagleUnlocked", true);
        } else if (num === 7) {
            this.game.registry.set("minigunUnlocked", true);
        } else if (num === 8) {
            this.game.registry.set("speedUnlocked", true);
        } else if (num === 9) {
            this.game.registry.set("drumUnlocked", true);
        }
    }

    // ----------------------------------------------------------------------------------------------------------

    update() {
        //this loads cursors so they work
        if (!this.cursors) {
            return;
        }
        //this creates the players movement
        if (!this.gameOver) {
            if (this.cursors.left.isDown) {
                this.player?.setVelocityX(-this.playerVel);
                this.player?.anims.play("left", true);
                this.lastPlayerDirection = "left";
            } else if (this.cursors.right.isDown) {
                this.player?.setVelocityX(this.playerVel);
                this.player?.anims.play("right", true);
                this.lastPlayerDirection = "right";
            } else {
                this.player?.setVelocityX(0);
                this.player?.anims.play("turn");
            }
            if (this.cursors.up.isDown && this.player?.body?.touching.down) {
                this.player.setVelocityY(this.jump);
            }
            //This is how the player fires its bullets
            if (this.cursors.space.isDown && this.player && this.bullets) {
                if (this.lastPlayerDirection === "left") {
                    this.bullets.fireBullet(
                        this.player.x,
                        this.player.y,
                        -1 * this.bulletSpeed
                    ); // Fire left
                } else if (this.lastPlayerDirection === "right") {
                    this.bullets.fireBullet(
                        this.player.x,
                        this.player.y,
                        this.bulletSpeed
                    ); // Fire right
                } else {
                    // If player direction is unknown, default to firing right
                    this.bullets.fireBullet(
                        this.player.x,
                        this.player.y,
                        this.fireRate
                    );
                }
            }
        }
        //This is having the baddies move left and right
        const walkDuration = 1500; // Duration for walking in one direction (in milliseconds)
        const walkDurationk = 3000; // Duration for walking in one direction (in milliseconds)
        const standStillDuration = 500; // Duration for standing still (in milliseconds)
        if (this.baddieGunAlive1) {
            if (
                this.lastBaddieGDirection1 === "right" ||
                this.lastBaddieGDirection1 === "left"
            ) {
                // If currently walking, continue in the same direction
                if (this.lastBaddieGDirection1 === "right") {
                    this.baddieGun1?.setVelocityX(160);
                    this.baddieGun1?.anims.play("right1", true);
                } else {
                    this.baddieGun1?.setVelocityX(-160);
                    this.baddieGun1?.anims.play("left1", true);
                }
                if (this.baddieGun1) {
                    if (this.lastBaddieGDirection1 === "left") {
                        this.badBullets1?.fireBullet(
                            this.baddieGun1.x,
                            this.baddieGun1.y,
                            -1500
                        ); // Fire left
                    } else {
                        this.badBullets1?.fireBullet(
                            this.baddieGun1.x,
                            this.baddieGun1.y,
                            1500
                        ); // Fire right
                    }
                }

                // Check if it's time to change direction
                if (
                    this.time.now - this.lastDirectionChangeTime1 >
                    walkDuration
                ) {
                    // If enough time has passed, change direction
                    if (this.lastBaddieGDirection1 === "right") {
                        this.lastBaddieGDirection1 = "left";
                    } else {
                        this.lastBaddieGDirection1 = "right";
                    }
                    this.lastDirectionChangeTime1 = this.time.now; // Update the last direction change time
                }
                //this.lastDirectionChangeTime = this.time.now; // Update the last direction change time
            } else {
                // If standing still, play the turn animation
                this.baddieGun1?.setVelocityX(0);
                this.baddieGun1?.anims.play("turn1", true);

                // Check if it's time to start walking or continue standing still
                if (
                    this.time.now - this.lastDirectionChangeTime1 >
                    standStillDuration
                ) {
                    // If enough time has passed, start walking in a random direction
                    this.lastBaddieGDirection1 = Phaser.Math.RND.pick([
                        "right",
                        "left",
                    ]);
                    this.lastDirectionChangeTime1 = this.time.now; // Update the last direction change time
                }
            }
        }
        if (this.baddieGunAlive2) {
            if (
                this.lastBaddieGDirection2 === "right" ||
                this.lastBaddieGDirection2 === "left"
            ) {
                // If currently walking, continue in the same direction
                if (this.lastBaddieGDirection2 === "right") {
                    this.baddieGun2?.setVelocityX(160);
                    this.baddieGun2?.anims.play("right1", true);
                } else {
                    this.baddieGun2?.setVelocityX(-160);
                    this.baddieGun2?.anims.play("left1", true);
                }
                if (this.baddieGun2) {
                    if (this.lastBaddieGDirection2 === "left") {
                        this.badBullets2?.fireBullet(
                            this.baddieGun2.x,
                            this.baddieGun2.y,
                            -1500
                        ); // Fire left
                    } else {
                        this.badBullets2?.fireBullet(
                            this.baddieGun2.x,
                            this.baddieGun2.y,
                            1500
                        ); // Fire right
                    }
                }

                // Check if it's time to change direction
                if (
                    this.time.now - this.lastDirectionChangeTime2 >
                    walkDuration
                ) {
                    // If enough time has passed, change direction
                    if (this.lastBaddieGDirection2 === "right") {
                        this.lastBaddieGDirection2 = "left";
                    } else {
                        this.lastBaddieGDirection2 = "right";
                    }
                    this.lastDirectionChangeTime2 = this.time.now; // Update the last direction change time
                }
                //this.lastDirectionChangeTime = this.time.now; // Update the last direction change time
            } else {
                // If standing still, play the turn animation
                this.baddieGun2?.setVelocityX(0);
                this.baddieGun2?.anims.play("turn1", true);

                // Check if it's time to start walking or continue standing still
                if (
                    this.time.now - this.lastDirectionChangeTime2 >
                    standStillDuration
                ) {
                    // If enough time has passed, start walking in a random direction
                    this.lastBaddieGDirection2 = Phaser.Math.RND.pick([
                        "right",
                        //"left",
                    ]);
                    this.lastDirectionChangeTime2 = this.time.now; // Update the last direction change time
                }
            }
        }
        if (this.baddieGunAlive3) {
            if (
                this.lastBaddieGDirection3 === "right" ||
                this.lastBaddieGDirection3 === "left"
            ) {
                // If currently walking, continue in the same direction
                if (this.lastBaddieGDirection1 === "right") {
                    this.baddieGun3?.setVelocityX(160);
                    this.baddieGun3?.anims.play("right1", true);
                } else {
                    this.baddieGun3?.setVelocityX(-160);
                    this.baddieGun3?.anims.play("left1", true);
                }
                if (this.baddieGun3) {
                    if (this.lastBaddieGDirection1 === "left") {
                        this.badBullets3?.fireBullet(
                            this.baddieGun3.x,
                            this.baddieGun3.y,
                            -1500
                        ); // Fire left
                    } else {
                        this.badBullets3?.fireBullet(
                            this.baddieGun3.x,
                            this.baddieGun3.y,
                            1500
                        ); // Fire right
                    }
                }

                // Check if it's time to change direction
                if (
                    this.time.now - this.lastDirectionChangeTime3 >
                    walkDuration
                ) {
                    // If enough time has passed, change direction
                    if (this.lastBaddieGDirection3 === "right") {
                        this.lastBaddieGDirection3 = "left";
                    } else {
                        this.lastBaddieGDirection3 = "right";
                    }
                    this.lastDirectionChangeTime3 = this.time.now; // Update the last direction change time
                }
                //this.lastDirectionChangeTime = this.time.now; // Update the last direction change time
            } else {
                // If standing still, play the turn animation
                this.baddieGun3?.setVelocityX(0);
                this.baddieGun3?.anims.play("turn1", true);

                // Check if it's time to start walking or continue standing still
                if (
                    this.time.now - this.lastDirectionChangeTime3 >
                    standStillDuration
                ) {
                    // If enough time has passed, start walking in a random direction
                    this.lastBaddieGDirection3 = Phaser.Math.RND.pick([
                        "right",
                        "left",
                    ]);
                    this.lastDirectionChangeTime3 = this.time.now; // Update the last direction change time
                }
            }
        }
        if (this.baddieGunAlive4) {
            if (
                this.lastBaddieGDirection4 === "right" ||
                this.lastBaddieGDirection4 === "left"
            ) {
                // If currently walking, continue in the same direction
                if (this.lastBaddieGDirection4 === "right") {
                    this.baddieGun4?.setVelocityX(160);
                    this.baddieGun4?.anims.play("right1", true);
                } else {
                    this.baddieGun4?.setVelocityX(-160);
                    this.baddieGun4?.anims.play("left1", true);
                }
                if (this.baddieGun4) {
                    if (this.lastBaddieGDirection4 === "left") {
                        this.badBullets4?.fireBullet(
                            this.baddieGun4.x,
                            this.baddieGun4.y,
                            -1500
                        ); // Fire left
                    } else {
                        this.badBullets4?.fireBullet(
                            this.baddieGun4.x,
                            this.baddieGun4.y,
                            1500
                        ); // Fire right
                    }
                }

                // Check if it's time to change direction
                if (
                    this.time.now - this.lastDirectionChangeTime4 >
                    walkDuration
                ) {
                    // If enough time has passed, change direction
                    if (this.lastBaddieGDirection4 === "right") {
                        this.lastBaddieGDirection4 = "left";
                    } else {
                        this.lastBaddieGDirection4 = "right";
                    }
                    this.lastDirectionChangeTime4 = this.time.now; // Update the last direction change time
                }
                //this.lastDirectionChangeTime = this.time.now; // Update the last direction change time
            } else {
                // If standing still, play the turn animation
                this.baddieGun4?.setVelocityX(0);
                this.baddieGun4?.anims.play("turn1", true);

                // Check if it's time to start walking or continue standing still
                if (
                    this.time.now - this.lastDirectionChangeTime4 >
                    standStillDuration
                ) {
                    // If enough time has passed, start walking in a random direction
                    this.lastBaddieGDirection4 = Phaser.Math.RND.pick([
                        "right",
                        "left",
                    ]);
                    this.lastDirectionChangeTime4 = this.time.now; // Update the last direction change time
                }
            }
        }
        if (this.baddieKnifeAlive1) {
            if (
                this.lastBaddieKDirection === "right" ||
                this.lastBaddieKDirection === "left"
            ) {
                // If currently walking, continue in the same direction
                if (this.lastBaddieKDirection === "right") {
                    this.baddieKnife1?.setVelocityX(160);
                    this.baddieKnife1?.anims.play("right2", true);
                } else {
                    this.baddieKnife1?.setVelocityX(-160);
                    this.baddieKnife1?.anims.play("left2", true);
                }
                // Check if it's time to change direction
                if (
                    this.time.now - this.lastDirectionChangeTime3 >
                    walkDurationk
                ) {
                    // If enough time has passed, change direction
                    if (this.lastBaddieKDirection === "right") {
                        this.lastBaddieKDirection = "left";
                    } else {
                        this.lastBaddieKDirection = "right";
                    }
                    this.lastDirectionChangeTime3 = this.time.now; // Update the last direction change time
                }
                //this.lastDirectionChangeTime = this.time.now; // Update the last direction change time
            } else {
                // If standing still, play the turn animation
                this.baddieKnife1?.setVelocityX(0);
                this.baddieKnife1?.anims.play("turn2", true);

                // Check if it's time to start walking or continue standing still
                if (
                    this.time.now - this.lastDirectionChangeTime3 >
                    standStillDuration
                ) {
                    // If enough time has passed, start walking in a random direction
                    this.lastBaddieKDirection = Phaser.Math.RND.pick([
                        "right",
                        //"left",
                    ]);
                    this.lastDirectionChangeTime3 = this.time.now; // Update the last direction change time
                }
            }
        }
        if (this.baddieKnifeAlive2) {
            if (
                this.lastBaddieKDirection === "right" ||
                this.lastBaddieKDirection === "left"
            ) {
                // If currently walking, continue in the same direction
                if (this.lastBaddieKDirection === "right") {
                    this.baddieKnife2?.setVelocityX(160);
                    this.baddieKnife2?.anims.play("right2", true);
                } else {
                    this.baddieKnife2?.setVelocityX(-160);
                    this.baddieKnife2?.anims.play("left2", true);
                }
                // Check if it's time to change direction
                if (
                    this.time.now - this.lastDirectionChangeTime3 >
                    walkDurationk
                ) {
                    // If enough time has passed, change direction
                    if (this.lastBaddieKDirection === "right") {
                        this.lastBaddieKDirection = "left";
                    } else {
                        this.lastBaddieKDirection = "right";
                    }
                    this.lastDirectionChangeTime3 = this.time.now; // Update the last direction change time
                }
                //this.lastDirectionChangeTime = this.time.now; // Update the last direction change time
            } else {
                // If standing still, play the turn animation
                this.baddieKnife2?.setVelocityX(0);
                this.baddieKnife2?.anims.play("turn2", true);

                // Check if it's time to start walking or continue standing still
                if (
                    this.time.now - this.lastDirectionChangeTime3 >
                    standStillDuration
                ) {
                    // If enough time has passed, start walking in a random direction
                    this.lastBaddieKDirection = Phaser.Math.RND.pick([
                        "right",
                        //"left",
                    ]);
                    this.lastDirectionChangeTime3 = this.time.now; // Update the last direction change time
                }
            }
        }
        if (this.bossAlive1) {
            if (
                this.lastBossDirection === "right" ||
                this.lastBossDirection === "left"
            ) {
                // If currently walking, continue in the same direction
                if (this.lastBossDirection === "right") {
                    this.boss?.setVelocityX(160);
                    this.boss?.anims.play("right3", true);
                } else {
                    this.boss?.setVelocityX(-160);
                    this.boss?.anims.play("left3", true);
                }
                if (this.boss) {
                    if (this.lastBossDirection === "left") {
                        this.badBullets5?.fireBullet(
                            this.boss.x,
                            this.boss.y,
                            -1000
                        ); // Fire left
                    } else {
                        this.badBullets5?.fireBullet(
                            this.boss.x,
                            this.boss.y,
                            1000
                        ); // Fire right
                    }
                }

                // Check if it's time to change direction
                if (
                    this.time.now - this.lastDirectionChangeTime5 >
                    walkDurationk
                ) {
                    // If enough time has passed, change direction
                    if (this.lastBossDirection === "right") {
                        this.lastBossDirection = "left";
                    } else {
                        this.lastBossDirection = "right";
                    }
                    this.lastDirectionChangeTime5 = this.time.now; // Update the last direction change time
                }
                //this.lastDirectionChangeTime = this.time.now; // Update the last direction change time
            } else {
                // If standing still, play the turn animation
                this.boss?.setVelocityX(0);
                this.boss?.anims.play("turn1", true);

                // Check if it's time to start walking or continue standing still
                if (
                    this.time.now - this.lastDirectionChangeTime5 >
                    standStillDuration
                ) {
                    // If enough time has passed, start walking in a random direction
                    this.lastBossDirection = Phaser.Math.RND.pick([
                        "right",
                        "left",
                    ]);
                    this.lastDirectionChangeTime5 = this.time.now; // Update the last direction change time
                }
            }
        }
    }
}
