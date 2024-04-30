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
    private stars?: Phaser.Physics.Arcade.Group;
    private checkpoint: Phaser.Physics.Arcade.StaticGroup;
    bullets?: Bullets;
    private colliderInitialized = false;

    private baddieGun?: Phaser.Physics.Arcade.Sprite;
    private lastBaddieGDirection: string | null = null;
    private counterGun: number = 0;
    private baddiKnife?: Phaser.Physics.Arcade.Sprite;
    private lastBaddieKDirection: string | null = null;
    private lastDirectionChangeTime: number; //= this.time.now;

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
        /*this.stars = this.physics.add.group({
            key: "star",
            repeat: 15,
            setXY: { x: 30, y: 0, stepX: 250 },
        });

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
        this.makeBaddieGun;
        this.physics.add.collider(this.baddieGun, this.platforms);
        this.baddieGun.setBounce(0.2);
        this.baddieGun.setCollideWorldBounds(true);

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
        //this.baddie = this.physics.add.group();

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
            this.baddie!,
            (bullet, baddie) => {
                this.handleKillBaddie(
                    bullet as Bullet,
                    baddie as Phaser.Physics.Arcade.Sprite
                );
            },
            undefined,
            this
            /*(bullet, baddie) => {
                bullet.destroy();
                baddie.destroy();
            }*/
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
            this.baddie,
            this.handleHitBaddie,
            undefined,
            this
        );
        /*this.baddie.create(
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

        this.physics.add.collider(
            this.player,
            this.checkpoint,
            this.handleHitCheckpoint,
            undefined,
            this
        );
        this.physics.add.overlap(
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
            /*(bullet, baddie) => {
                bullet.destroy();
                baddie.destroy();
            }*/
        );
        this.physics.add.overlap(this.bullets!, this.platforms!, (bullet) => {
            bullet.destroy();
        });
    }
    /*private shoot() {
        const currentTime = this.time.now;

        if (
            currentTime - this.lastShotTime < this.shootDelay ||
            !this.canShoot
        ) {
            return;
        }

        const bullet = this.add.image(
            this.player?.x || 0,
            this.player?.y || 0,
            "stars"
        );
        bullet.setOrigin(0.5, 0.5); // Set the origin to the center of the image

        let bulletVelocityX = 0;

        if (this.player?.anims.currentAnim?.key === "left") {
            bulletVelocityX = -1000;
        } else if (this.player?.anims.currentAnim?.key === "right") {
            bulletVelocityX = 1000;
        } else {
            bulletVelocityX =
                this.lastPlayerDirection === "left" ? -1000 : 1000;
        }

        this.tweens.add({
            targets: bullet,
            x: bullet.x + bulletVelocityX,
            duration: 500, // Adjust the duration as needed
            onComplete: () => {
                bullet.destroy();
            },
        });

        this.lastShotTime = currentTime;
        this.canShoot = false;

        this.time.delayedCall(this.shootDelay, () => {
            this.canShoot = true;
        });
    }*/

    private handleHitCheckpoint() {
        this.scene.start("endScene");
    }
    private handleKillBaddie(
        bullet: Bullet,
        baddie: Phaser.Physics.Arcade.Sprite
    ) {
        bullet.destroy();
        baddie.destroy();
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
    private makeBaddieGun() {
        this.baddieGun?.setBounce(0.2);
        this.baddieGun?.setCollideWorldBounds(true);

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
    }

    update() {
        //this loads cursors so they work
        if (!this.cursors) {
            return;
        }
        //this creates the players movement
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
                this.bullets.fireBullet(this.player.x, this.player.y, -1500); // Fire left
            } else if (this.lastPlayerDirection === "right") {
                this.bullets.fireBullet(this.player.x, this.player.y, 1500); // Fire right
            } else {
                // If player direction is unknown, default to firing right
                this.bullets.fireBullet(this.player.x, this.player.y, 1500);
            }
        }
        //This is having the baddies move left and right
        const walkDuration = 1500; // Duration for walking in one direction (in milliseconds)
        const standStillDuration = 500; // Duration for standing still (in milliseconds)

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

            // Check if it's time to change direction
            if (this.time.now - this.lastDirectionChangeTime > walkDuration) {
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
