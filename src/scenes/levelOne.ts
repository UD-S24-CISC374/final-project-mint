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
    private lastFiredTime: number;

    constructor(
        world: Phaser.Physics.Arcade.World,
        scene: Phaser.Scene,
        fireRate: number
    ) {
        super(world, scene);
        this.fireRate = fireRate;
        this.lastFiredTime = 0;
    }

    fireBullet(x: number, y: number, vel: number) {
        const currentTime = this.scene.time.now;
        if (currentTime - this.lastFiredTime > this.fireRate) {
            const bullet = new Bullet(this.scene, x, y);
            this.add(bullet);
            bullet.fire(x, y, vel);
            this.lastFiredTime = currentTime;
        }
    }
}

export default class levelOne extends Phaser.Scene {
    //fpsText: FpsText;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private lastPlayerDirection: string | null = null;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars?: Phaser.Physics.Arcade.StaticGroup;
    private checkpoint: Phaser.Physics.Arcade.StaticGroup;
    private bullets?: Bullets;
    private colliderInitialized = false;

    private baddieGun?: Phaser.Physics.Arcade.Sprite;
    private lastBaddieGDirection: string | null = null;
    private badBullets?: Bullets;
    private baddiKnife?: Phaser.Physics.Arcade.Sprite;
    private lastBaddieKDirection: string | null = null;
    private lastDirectionChangeTime: number; //= this.time.now;
    private baddieGunAlive: boolean;

    private lives: number;

    //private score = 0;
    //private scoreText?: Phaser.GameObjects.Text;

    private baddie?: Phaser.Physics.Arcade.Group;

    private gameOver = false;

    private canShoot = true;
    private shootDelay = 500; // Delay in milliseconds between shots
    private lastShotTime = 0;
    private numBaddies = 6;

    constructor() {
        super({ key: "levelOne" });
    }

    create() {
        this.lastDirectionChangeTime = this.time.now;
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

        this.platforms.create(600, 800, "platform");
        this.platforms.create(50, 1200, "platform");
        this.platforms.create(1000, 400, "platform");
        this.platforms.create(3400, 900, "platform");
        this.platforms.create(2000, 1100, "platform");
        this.platforms.create(3000, 1200, "platform");

        this.player = this.physics.add.sprite(100, 450, "cowboy");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.lives = 4; //The number of lives the player has

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

        // ORIGINAL CODE FOR ADDING STARS TO OG PHASER GAME (UNUSED)
        this.stars = this.physics.add.staticGroup({
            key: "star",
            repeat: this.lives,
            setXY: { x: 200, y: 0, stepX: 100 },
        });
        /*
        this.stars.children.iterate((c) => {
            const child = c as Phaser.Physics.Arcade.Image;
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });*/

        /*this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(
            this.player,
            this.stars,
            this.handleCollectStar,
            undefined,
            this
        );*/

        /*this.scoreText = this.add.text(16, 16, "score: 0", {
            fontSize: "32px",
            color: "#000",
        });*/

        this.bullets = new Bullets(this.physics.world, this, 1000); //this is what changes the fire speed
        //creating badies
        this.baddieGun = this.physics.add.sprite(1500, 100, "baddieGun");
        this.physics.add.collider(this.baddieGun, this.platforms);
        this.baddieGun.setBounce(0.2);
        this.baddieGun.setCollideWorldBounds(true);
        this.badBullets = new Bullets(this.physics.world, this, 500); //this is what changes the fire speed
        this.baddieGunAlive = true;

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
            this.baddieGun!,
            (bullet, baddieGun) => {
                this.handleKillBaddie(
                    bullet as Bullet,
                    baddieGun as Phaser.Physics.Arcade.Sprite
                );
            },
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.baddieGun,
            this.handleHitBaddie,
            undefined,
            this
        );
        //this.baddie = this.physics.add.group();
        /*
        this.baddie = this.physics.add.group({
            key: "baddie1",
            repeat: 2,
            setXY: { x: 1500, y: 0, stepX: 1000 },
        });

        this.baddie.children.iterate((c) => {
            const child = c as Phaser.Physics.Arcade.Image;
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });

        this.physics.add.collider(this.baddie, this.platforms);
        this.physics.add.collider(
            this.player,
            this.baddie,
            this.handleHitBaddie,
            undefined,
            this
        );
        this.physics.add.overlap(
            this.bullets!,
            this.baddieGun!,
            (bullet, baddieGun) => {
                this.handleKillBaddie(
                    bullet as Bullet,
                    baddieGun as Phaser.Physics.Arcade.Sprite
                );
            },
            undefined,
            this
        );

        this.baddie = this.physics.add.group({
            key: "baddie2",
            repeat: 2,
            setXY: { x: 1000, y: 0, stepX: 1000 },
        });

        this.baddie.children.iterate((c) => {
            const child = c as Phaser.Physics.Arcade.Image;
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });

        this.physics.add.collider(this.baddie, this.platforms);
        this.physics.add.collider(
            this.player,
            this.baddieGun,
            this.handleHitBaddie,
            undefined,
            this
        );
        this.baddie.create(
            4000,
            1250,
            "baddie1"
        ) as Phaser.Physics.Arcade.Sprite;*/

        /*this.physics.add.collider(
            this.bullets!,
            this.baddie!,
            (bullet, enemy) => {
                // When a bullet hits an enemy, disable both bullet and enemy
                bullet.destroy();
                enemy.destroy();
            },
            undefined,
            this
        );
        this.physics.add.collider(
            this.bullets!,
            this.platforms,
            (bullet) => {
                // When a bullet hits a platform, disable it
                bullet.destroy();
            },
            undefined,
            this
        );*/
        /*this.physics.add.overlap(
            this.bullets!,
            this.baddie!,
            (bullet, baddie) => {
                this.handleKillBaddie(
                    bullet as Bullet,
                    baddie as Phaser.Physics.Arcade.Sprite
                );
            },
            undefined,
            this
        );*/
        this.physics.add.collider(
            this.player,
            this.checkpoint,
            this.handleHitCheckpoint,
            undefined,
            this
        );
        this.physics.add.overlap(this.bullets!, this.platforms!, (bullet) => {
            bullet.destroy();
        });
        this.physics.add.overlap(
            this.player,
            this.badBullets,
            (bullet) => {
                this.handlePlayerHit(
                    this.player as Phaser.Physics.Arcade.Sprite,
                    bullet as Bullet
                );
            },
            undefined,
            this
        );
    }

    private handleBulletPlayer() {}

    private handleHitCheckpoint() {
        this.scene.start("endScene");
    }
    private handleKillBaddie(
        bullet: Bullet,
        baddie: Phaser.Physics.Arcade.Sprite
    ) {
        bullet.destroy();
        baddie.setVisible(false);
        this.baddieGunAlive = false;
        //baddie.disableBody(true, true); // Disables the baddie sprite
        this.numBaddies--;
        if (this.numBaddies == 0) {
            this.checkpoint.create(
                4000,
                1450,
                "checkpoint"
            ) as Phaser.Physics.Arcade.Sprite;
        }
    }

    private handleHitBaddie() {
        this.physics.pause();
        this.player?.setTint(0xff0000);
        this.player?.anims.play("turn");

        this.gameOver = true;

        this.scene.start("instructions");
    }
    private handlePlayerHit(
        player: Phaser.Physics.Arcade.Sprite,
        bullet: Bullet
    ) {
        // Assuming you have a reference to the star group
        const starToDisappear = this.stars?.getFirstAlive(
            true
        ) as Phaser.Physics.Arcade.Sprite;
        this.makeStarDisappear(starToDisappear);

        // Destroy the bullet
        bullet.destroy();
        this.lives--;
        if (this.lives === 0) {
            this.handleHitBaddie;
        }
        // Handle any other logic for player getting hit
    }
    private makeStarDisappear(star: Phaser.Physics.Arcade.Sprite) {
        // Tween the star's alpha to fade it out gradually
        star.scene.tweens.add({
            targets: star,
            alpha: 0,
            duration: 1000, // Adjust the duration as needed
            onComplete: () => {
                // Move the star to the back of the screen
                star.setX(-100); // Move the star off-screen on the left side
                star.setY(-100); // Move the star off-screen on the top
                star.setActive(false); // Deactivate the star
                star.setVisible(false); // Make the star invisible
            },
        });
    }

    /*private handleCollectStar(
        player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ) {
        const star = s as Phaser.Physics.Arcade.Image;
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText?.setText(`Score: ${this.score}`);

        if (this.stars?.countActive(true) === 0) {
            this.stars.children.iterate((c) => {
                const child = c as Phaser.Physics.Arcade.Image;
                child.enableBody(true, child.x, 0, true, true);
                return true;
            });

            /*if (this.player) {
                const x =
                    this.player.x < 400
                        ? Phaser.Math.Between(400, 800)
                        : Phaser.Math.Between(0, 400);

                const baddie1: Phaser.Physics.Arcade.Image =
                    this.baddie?.create(x, 16, "baddie1");
                baddie1.setBounce(1);
                baddie1.setCollideWorldBounds(true);
                baddie1.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
            this.checkpoint.create(
                4000,
                1250,
                "checkpoint"
            ) as Phaser.Physics.Arcade.Sprite;
        }
    }*/

    update() {
        //this loads cursors so they work
        if (!this.cursors) {
            return;
        }
        //this creates the players movement
        if (this.lives != 0) {
            if (this.cursors.left.isDown) {
                this.player?.setVelocityX(-160);
                this.player?.anims.play("left", true);
                this.lastPlayerDirection = "left";
            } else if (this.cursors.right.isDown) {
                this.player?.setVelocityX(160);
                this.player?.anims.play("right", true);
                this.lastPlayerDirection = "right";
            } else {
                this.player?.setVelocityX(0);
                this.player?.anims.play("turn");
            }
            if (this.cursors.up.isDown && this.player?.body?.touching.down) {
                this.player.setVelocityY(-550);
            }
            //This is how the player fires its bullets
            if (this.cursors.space.isDown && this.player && this.bullets) {
                if (this.lastPlayerDirection === "left") {
                    this.bullets.fireBullet(
                        this.player.x,
                        this.player.y,
                        -1500
                    ); // Fire left
                } else if (this.lastPlayerDirection === "right") {
                    this.bullets.fireBullet(this.player.x, this.player.y, 1500); // Fire right
                } else {
                    // If player direction is unknown, default to firing right
                    this.bullets.fireBullet(this.player.x, this.player.y, 1500);
                }
            }
        }

        //This is having the baddies move left and right
        const walkDuration = 1500; // Duration for walking in one direction (in milliseconds)
        const standStillDuration = 500; // Duration for standing still (in milliseconds)
        if (this.baddieGunAlive) {
            if (
                this.lastBaddieGDirection === "right" ||
                this.lastBaddieGDirection === "left"
            ) {
                // If currently walking, continue in the same direction
                if (this.lastBaddieGDirection === "right") {
                    this.baddieGun?.setVelocityX(160);
                    this.baddieGun?.anims.play("right1", true);
                } else {
                    this.baddieGun?.setVelocityX(-160);
                    this.baddieGun?.anims.play("left1", true);
                }
                if (this.baddieGun) {
                    if (this.lastBaddieGDirection === "left") {
                        this.badBullets?.fireBullet(
                            this.baddieGun.x,
                            this.baddieGun.y,
                            -1500
                        ); // Fire left
                    } else {
                        this.badBullets?.fireBullet(
                            this.baddieGun.x,
                            this.baddieGun.y,
                            1500
                        ); // Fire right
                    }
                }
                // Check if it's time to change direction
                if (
                    this.time.now - this.lastDirectionChangeTime >
                    walkDuration
                ) {
                    // If enough time has passed, change direction
                    if (this.lastBaddieGDirection === "right") {
                        this.lastBaddieGDirection = "left";
                    } else {
                        this.lastBaddieGDirection = "right";
                    }
                    this.lastDirectionChangeTime = this.time.now; // Update the last direction change time
                }
                //this.lastDirectionChangeTime = this.time.now; // Update the last direction change time
            } else {
                // If standing still, play the turn animation
                this.baddieGun?.setVelocityX(0);
                this.baddieGun?.anims.play("turn1", true);

                // Check if it's time to start walking or continue standing still
                if (
                    this.time.now - this.lastDirectionChangeTime >
                    standStillDuration
                ) {
                    // If enough time has passed, start walking in a random direction
                    this.lastBaddieGDirection = Phaser.Math.RND.pick([
                        "right",
                        "left",
                    ]);
                    this.lastDirectionChangeTime = this.time.now; // Update the last direction change time
                }
            }
        }
    }
}
