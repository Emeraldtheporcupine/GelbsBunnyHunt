namespace SpriteKind {
    export const Shovel = SpriteKind.create()
    export const Gibblets = SpriteKind.create()
    export const Key = SpriteKind.create()
    export const BEBE = SpriteKind.create()
    export const Screen = SpriteKind.create()
    export const Warp = SpriteKind.create()
    export const Beam = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const warper = SpriteKind.create()
    export const screenCenter = SpriteKind.create()
    export const FirstBeam = SpriteKind.create()
    export const oneHitter = SpriteKind.create()
}
namespace StatusBarKind {
    export const BossHealth = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.vy - 8 > 0) {
        music.setVolume(255)
        music.play(music.createSoundEffect(WaveShape.Noise, 315, 286, 255, 255, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        info.changeScoreBy(-1)
        Gibblets = [sprites.create(assets.image`Gibble`, SpriteKind.Gibblets)]
        BunnyAmount += -1
        for (let index = 0; index <= 30; index++) {
            Gibblets.unshift(sprites.create(assets.image`Gibble`, SpriteKind.Gibblets))
        }
        for (let index = 0; index <= 9; index++) {
            Gibblets.unshift(sprites.create(assets.image`Gibble Fur`, SpriteKind.Gibblets))
        }
        Gibblets.unshift(sprites.create(assets.image`EarPiece`, SpriteKind.Gibblets))
        for (let GibbletSprite of Gibblets) {
            GibbletSprite.setPosition(otherSprite.x, otherSprite.y)
            GibbletSprite.vy = randint(-150, -100)
            GibbletSprite.ay = 400
            GibbletSprite.vx = randint(-35, 35)
            scene.cameraShake(2, 200)
            timer.after(2500, function () {
                sprites.destroy(GibbletSprite, effects.none, 0)
            })
        }
        sprite.vy = -100
        if (BunnyAmount == 0) {
            if (Level < 4) {
                music.play(music.createSong(assets.song`Found Key`), music.PlaybackMode.InBackground)
            }
            music.setVolume(100)
            if (Level == 1) {
                LVL1key = sprites.create(assets.image`Key`, SpriteKind.Key)
                LVL1key.setPosition(otherSprite.x, otherSprite.y)
                LVL1key.vy = -100
                LVL1key.ay = 400
                LVL1key.vx = 20
                animation.runImageAnimation(
                LVL1key,
                assets.animation`Key Spin`,
                100,
                true
                )
            }
            if (Level == 4) {
                music.play(music.createSong(assets.song`Portal Open`), music.PlaybackMode.InBackground)
                scene.cameraFollowSprite(Portal)
                timer.after(4000, function () {
                    animation.runImageAnimation(
                    Portal,
                    assets.animation`sparkle`,
                    100,
                    true
                    )
                    music.play(music.createSoundEffect(WaveShape.Triangle, 2865, 5000, 255, 0, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
                    music.play(music.createSoundEffect(WaveShape.Triangle, 2865, 5000, 175, 0, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
                    music.play(music.createSoundEffect(WaveShape.Triangle, 2865, 5000, 125, 0, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
                    music.play(music.createSoundEffect(WaveShape.Triangle, 2865, 5000, 36, 0, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
                    timer.after(1000, function () {
                        WarpTime = true
                        scene.cameraFollowSprite(Gelb)
                    })
                })
            }
        }
        sprites.destroy(otherSprite, effects.none, 0)
        music.setVolume(100)
    } else {
    	
    }
})
function Fade (ms: number, NextLevel: number, FadeWhite: number) {
    timer.after(ms, function () {
        if (FadeWhite == 1) {
            color.startFade(color.originalPalette, color.White)
        } else {
            color.startFade(color.originalPalette, color.Black)
        }
        Level += NextLevel
        if (FadeWhite == 1) {
            timer.after(3000, function () {
                color.startFade(color.White, color.originalPalette)
                SetupLevel()
            })
        } else {
            timer.after(2000, function () {
                color.startFade(color.Black, color.originalPalette)
                SetupLevel()
            })
        }
    })
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.vx = -5
    sprite.vy = -100
    otherSprite.vx = 5
    otherSprite.vy = 100
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Warp, function (sprite, otherSprite) {
    if (WarpTime == true) {
        WarpTime = false
        tiles.placeOnTile(sprite, otherSprite.tilemapLocation())
        scene.cameraFollowSprite(otherSprite)
        controller.moveSprite(sprite, 0, 0)
        animation.runImageAnimation(
        otherSprite,
        assets.animation`sparkleNextLevel`,
        100,
        true
        )
        timer.after(1000, function () {
            sprite.ay = 0
            sprite.vy = -5
            Teleporter = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.FirstBeam)
            animation.runImageAnimation(
            Teleporter,
            assets.animation`Laser`,
            100,
            true
            )
            tiles.placeOnTile(Teleporter, sprite.tilemapLocation())
            Teleporter.y += -74
            Fade(2000, 1, 1)
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    if (BOSSTIME == true) {
        if (sprite.vy - 8 > 0) {
            music.setVolume(255)
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 1, 1, 255, 0, 200, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            BaddieHealth.value += -2
            Gibblets = [sprites.create(assets.image`Gibble`, SpriteKind.Gibblets)]
            for (let index = 0; index <= 5; index++) {
                Gibblets.unshift(sprites.create(assets.image`Gibble`, SpriteKind.Gibblets))
            }
            for (let index = 0; index <= 5; index++) {
                Gibblets.unshift(sprites.create(assets.image`Gibble Fur`, SpriteKind.Gibblets))
            }
            for (let GibbletSprite of Gibblets) {
                GibbletSprite.setPosition(otherSprite.x, otherSprite.y)
                GibbletSprite.vy = randint(-150, -100)
                GibbletSprite.ay = 400
                GibbletSprite.vx = randint(-35, 35)
                scene.cameraShake(2, 200)
                timer.after(2500, function () {
                    sprites.destroy(GibbletSprite, effects.none, 0)
                })
            }
            sprite.vy = -175
            music.setVolume(100)
        }
    } else {
        sprite.vy = -175
        sprite.vx = Direction * -200
    }
})
statusbars.onZero(StatusBarKind.BossHealth, function (status) {
    BOSSTIME = false
    music.stopAllSounds()
    controller.moveSprite(Gelb, 0, 0)
    sprites.destroy(BaddieHealth)
    bigBADbunbun.vx = 0
    scene.cameraFollowSprite(bigBADbunbun)
    timer.after(1000, function () {
        animation.runImageAnimation(
        bigBADbunbun,
        assets.animation`BigBadBUNLaugh`,
        100,
        false
        )
        music.play(music.createSoundEffect(WaveShape.Noise, 134, 329, 255, 255, 1000, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
        music.play(music.createSoundEffect(WaveShape.Noise, 327, 329, 255, 255, 3000, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
        animation.runImageAnimation(
        bigBADbunbun,
        assets.animation`BigBadBUNLaughEnd`,
        100,
        false
        )
        music.play(music.createSoundEffect(WaveShape.Noise, 306, 1, 255, 255, 1000, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
        timer.after(200, function () {
            animation.runImageAnimation(
            bigBADbunbun,
            assets.animation`BigBadBUNidle`,
            200,
            false
            )
            timer.after(500, function () {
                animation.runImageAnimation(
                bigBADbunbun,
                assets.animation`BigBadBUNidleL`,
                200,
                true
                )
                bigBADbunbun.ay = 0
                timer.after(1000, function () {
                    Teleporter = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.Beam)
                    animation.runImageAnimation(
                    Teleporter,
                    assets.animation`Laser`,
                    100,
                    true
                    )
                    tiles.placeOnTile(Teleporter, bigBADbunbun.tilemapLocation())
                    Teleporter.y += -110
                    Teleporter.x += -10
                    Teleporter.setScale(2, ScaleAnchor.BottomLeft)
                    timer.after(1000, function () {
                        sprites.destroy(bigBADbunbun)
                        timer.after(1000, function () {
                            scene.cameraFollowSprite(Gelb)
                            controller.moveSprite(Gelb, 75, 0)
                        })
                    })
                })
            })
        })
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile21`, function (sprite, location) {
    scene.cameraFollowSprite(mySprite)
    tiles.setTileAt(location, assets.tile`myTile6`)
    Gelb.setStayInScreen(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite, otherSprite) {
    if (otherSprite.vy == 0) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        HasKey = true
        sprites.destroy(otherSprite)
    }
})
info.onLifeZero(function () {
	
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Beam, function (sprite, otherSprite) {
    if (Level == 5) {
        otherSprite.setKind(SpriteKind.warper)
        controller.moveSprite(sprite, 0, 0)
        Fade(1000, 1, 1)
    }
})
function SetupLevel () {
    if (Level == 1) {
        HasKey = false
        scene.setBackgroundImage(assets.image`LVL one`)
        tiles.setCurrentTilemap(tilemap`level1`)
        tiles.placeOnTile(Gelb, tiles.getTileLocation(0, 14))
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
        scroller.setCameraScrollingMultipliers(0.1, 0.1)
        music.setVolume(50)
        music.play(music.createSong(assets.song`The Field`), music.PlaybackMode.LoopingInBackground)
        music.setVolume(100)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shovel)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        for (let ShovelToBe of tiles.getTilesByType(assets.tile`Shovel goes here`)) {
            ShovelCollectable = sprites.create(assets.image`Shovel`, SpriteKind.Shovel)
            tiles.placeOnTile(ShovelCollectable, ShovelToBe)
            tiles.setTileAt(ShovelToBe, assets.tile`transparency16`)
            animation.runImageAnimation(
            ShovelCollectable,
            assets.animation`Shovel Spin`,
            50,
            true
            )
        }
        for (let BunnySpawn of tiles.getTilesByType(assets.tile`myTile11`)) {
            Bunny = sprites.create(assets.image`The cutest bunny ever`, SpriteKind.Enemy)
            Bunny.ay = 400
            tiles.placeOnTile(Bunny, BunnySpawn)
            tiles.setTileAt(BunnySpawn, assets.tile`transparency16`)
            animation.runImageAnimation(
            Bunny,
            assets.animation`CUTE BUNBUN R`,
            200,
            true
            )
        }
    } else if (Level == 2) {
        HasKey = false
        controller.moveSprite(Gelb, 75, 0)
        scene.setBackgroundImage(assets.image`LVL two`)
        tiles.setCurrentTilemap(tilemap`level2`)
        tiles.placeOnTile(Gelb, tiles.getTileLocation(0, 14))
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
        scroller.setCameraScrollingMultipliers(0.1, 0.1)
        music.setVolume(50)
        music.play(music.createSong(assets.song`The Shed`), music.PlaybackMode.LoopingInBackground)
        music.setVolume(100)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shovel)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        for (let ShovelToBe of tiles.getTilesByType(assets.tile`Shovel goes here`)) {
            ShovelCollectable = sprites.create(assets.image`Shovel`, SpriteKind.Shovel)
            tiles.placeOnTile(ShovelCollectable, ShovelToBe)
            tiles.setTileAt(ShovelToBe, assets.tile`transparency16`)
            animation.runImageAnimation(
            ShovelCollectable,
            assets.animation`Shovel Spin`,
            50,
            true
            )
        }
        for (let BunnySpawn of tiles.getTilesByType(assets.tile`myTile11`)) {
            Bunny = sprites.create(assets.image`The cutest bunny ever`, SpriteKind.Enemy)
            Bunny.ay = 400
            tiles.placeOnTile(Bunny, BunnySpawn)
            tiles.setTileAt(BunnySpawn, assets.tile`transparency16`)
            animation.runImageAnimation(
            Bunny,
            assets.animation`CUTE BUNBUN R`,
            200,
            true
            )
        }
    } else if (Level == 3) {
        HasKey = false
        controller.moveSprite(Gelb, 75, 0)
        scene.setBackgroundImage(assets.image`The Tunnel`)
        tiles.setCurrentTilemap(tilemap`level3`)
        tiles.placeOnTile(Gelb, tiles.getTileLocation(0, 14))
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
        scroller.setCameraScrollingMultipliers(0.1, 0.1)
        music.setVolume(50)
        music.play(music.createSong(assets.song`The Burrow`), music.PlaybackMode.LoopingInBackground)
        music.setVolume(100)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shovel)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        for (let ShovelToBe of tiles.getTilesByType(assets.tile`Shovel goes here`)) {
            ShovelCollectable = sprites.create(assets.image`Shovel`, SpriteKind.Shovel)
            tiles.placeOnTile(ShovelCollectable, ShovelToBe)
            tiles.setTileAt(ShovelToBe, assets.tile`transparency16`)
            animation.runImageAnimation(
            ShovelCollectable,
            assets.animation`Shovel Spin`,
            50,
            true
            )
        }
        for (let BunnySpawn of tiles.getTilesByType(assets.tile`myTile11`)) {
            Bunny = sprites.create(assets.image`The cutest bunny ever`, SpriteKind.Enemy)
            Bunny.ay = 400
            tiles.placeOnTile(Bunny, BunnySpawn)
            tiles.setTileAt(BunnySpawn, assets.tile`transparency16`)
            animation.runImageAnimation(
            Bunny,
            assets.animation`CUTE BUNBUN R`,
            200,
            true
            )
        }
        for (let BabySpawn of tiles.getTilesByType(assets.tile`myTile`)) {
            Baby = sprites.create(assets.image`BABY BUN`, SpriteKind.BEBE)
            Baby.ay = 400
            tiles.placeOnTile(Baby, BabySpawn)
            tiles.setTileAt(BabySpawn, assets.tile`transparency16`)
            animation.runImageAnimation(
            Baby,
            assets.animation`BABY BUN R`,
            75,
            true
            )
        }
    } else if (Level == 4) {
        HasKey = false
        controller.moveSprite(Gelb, 75, 0)
        scene.setBackgroundImage(assets.image`Factory`)
        tiles.setCurrentTilemap(tilemap`level4`)
        tiles.placeOnTile(Gelb, tiles.getTileLocation(0, 14))
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
        scroller.setCameraScrollingMultipliers(0.1, 0.1)
        music.setVolume(50)
        music.play(music.createSong(assets.song`The Factory`), music.PlaybackMode.LoopingInBackground)
        music.setVolume(100)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shovel)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.BEBE)
        for (let ShovelToBe of tiles.getTilesByType(assets.tile`Shovel goes here`)) {
            ShovelCollectable = sprites.create(assets.image`Shovel`, SpriteKind.Shovel)
            tiles.placeOnTile(ShovelCollectable, ShovelToBe)
            tiles.setTileAt(ShovelToBe, assets.tile`transparency16`)
            animation.runImageAnimation(
            ShovelCollectable,
            assets.animation`Shovel Spin`,
            50,
            true
            )
        }
        for (let BunnySpawn of tiles.getTilesByType(assets.tile`myTile11`)) {
            Bunny = sprites.create(assets.image`The cutest bunny ever`, SpriteKind.Enemy)
            Bunny.ay = 400
            tiles.placeOnTile(Bunny, BunnySpawn)
            tiles.setTileAt(BunnySpawn, assets.tile`transparency16`)
            animation.runImageAnimation(
            Bunny,
            assets.animation`CUTE BUNBUN R`,
            200,
            true
            )
        }
        Portal = sprites.create(assets.image`blank`, SpriteKind.Warp)
        tiles.placeOnTile(Portal, tiles.getTileLocation(29, 10))
        tiles.setTileAt(tiles.getTileLocation(29, 10), assets.tile`transparency16`)
    } else if (Level == 5) {
        music.stopAllSounds()
        controller.moveSprite(Gelb, 75, 0)
        Gelb.vy = 0
        Gelb.ay = 400
        sprites.destroy(Portal)
        sprites.destroy(Teleporter)
        scene.cameraFollowSprite(Gelb)
        scene.setBackgroundImage(assets.image`Final Arena`)
        tiles.setCurrentTilemap(tilemap`level`)
        tiles.placeOnTile(Gelb, tiles.getTileLocation(8, 6))
        scroller.setBackgroundScrollOffset(-40, 0)
        scroller.setCameraScrollingMultipliers(0, 0)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shovel)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.BEBE)
        scroller.setCameraScrollingMultipliers(0.1, 0)
        timer.after(2000, function () {
            BOSSTIME = true
            music.setVolume(50)
            music.play(music.createSong(assets.song`Final Area`), music.PlaybackMode.LoopingInBackground)
            music.setVolume(100)
            bigBADbunbun = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Boss)
            tiles.placeOnTile(bigBADbunbun, tiles.getTileLocation(8, 0))
            bigBADbunbun.ay = 300
            animation.runImageAnimation(
            bigBADbunbun,
            assets.animation`BigBadBUNidle`,
            200,
            true
            )
            BaddieHealth = statusbars.create(20, 4, StatusBarKind.BossHealth)
            BaddieHealth.attachToSprite(bigBADbunbun, 5, 0)
        })
    } else if (Level == 6) {
        info.setLife(3)
        controller.moveSprite(Gelb, 75, 0)
        Gelb.vy = 0
        Gelb.ay = 400
        sprites.destroy(Teleporter)
        scene.cameraFollowSprite(Gelb)
        scene.setBackgroundImage(assets.image`RocketScroll`)
        tiles.setCurrentTilemap(tilemap`level6`)
        tiles.placeOnTile(Gelb, tiles.getTileLocation(12, 60))
        scroller.setCameraScrollingMultipliers(0, 3)
        scroller.scrollBackgroundWithSpeed(0, 250)
        mySprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.screenCenter)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 9))
        mySprite.x += -8
        music.play(music.createSong(assets.song`Spaceship Hijinx`), music.PlaybackMode.LoopingInBackground)
        for (let Spikes of tiles.getTilesByType(assets.tile`myTile22`)) {
            SpikerKill = sprites.create(assets.image`blank`, SpriteKind.oneHitter)
            tiles.placeOnTile(SpikerKill, Spikes)
            tiles.setTileAt(Spikes, assets.tile`myTile6`)
            animation.runImageAnimation(
            SpikerKill,
            assets.animation`Spikes`,
            100,
            true
            )
        }
    } else {
    	
    }
    info.setScore(sprites.allOfKind(SpriteKind.Enemy).length)
    BunnyAmount = sprites.allOfKind(SpriteKind.Enemy).length
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Title == true == (Rated == false)) {
        Fade(0, 1, 0)
        music.stopAllSounds()
        music.setVolume(255)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1014, 1018, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        music.setVolume(100)
        Title = false
        timer.after(2000, function () {
            PlayingTime = true
            sprites.destroy(TitleSprite)
            sprites.destroy(versionNumber)
            Gelb = sprites.create(assets.image`Gelb R`, SpriteKind.Player)
            controller.moveSprite(Gelb, 75, 0)
            Gelb.ay = 400
            scene.cameraFollowSprite(Gelb)
        })
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Shed Carrot`, function (sprite, location) {
    if (HasKey == true) {
        HasKey = false
        music.stopAllSounds()
        controller.moveSprite(Gelb, 0, 0)
        tiles.placeOnTile(Gelb, location)
        music.play(music.createSong(assets.song`Level End`), music.PlaybackMode.InBackground)
        Fade(4000, 1, 0)
    }
})
sprites.onOverlap(SpriteKind.BEBE, SpriteKind.BEBE, function (sprite, otherSprite) {
    sprite.vx = -35
    sprite.vy = -150
    otherSprite.vx = 35
    otherSprite.vy = -150
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Burrow`, function (sprite, location) {
    if (BunnyAmount == 0) {
        BunnyAmount = 1
        music.stopAllSounds()
        controller.moveSprite(Gelb, 0, 0)
        tiles.placeOnTile(Gelb, location)
        music.play(music.createSong(assets.song`Level End`), music.PlaybackMode.InBackground)
        Fade(4000, 1, 0)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shovel, function (sprite, otherSprite) {
    music.setVolume(255)
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 5000, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite, effects.none, 0)
    music.setVolume(40)
})
function Towards_Player () {
    if (Gelb.x > bigBADbunbun.x) {
        if (bigBADbunbun.vy == 0) {
            bigBADbunbun.vy = -200
            bigBADbunbun.vx = 100
            music.setVolume(255)
            music.play(music.createSoundEffect(WaveShape.Noise, 1, 4160, 255, 0, 1000, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            animation.runImageAnimation(
            bigBADbunbun,
            assets.animation`BigBadBUNidle`,
            200,
            true
            )
        }
    } else if (Gelb.x < bigBADbunbun.x) {
        if (bigBADbunbun.vy == 0) {
            bigBADbunbun.vy = -200
            bigBADbunbun.vx = -100
            music.setVolume(255)
            music.play(music.createSoundEffect(WaveShape.Noise, 1, 4160, 255, 0, 1000, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            animation.runImageAnimation(
            bigBADbunbun,
            assets.animation`BigBadBUNidleL`,
            200,
            true
            )
        }
    }
}
function Away_from_Player () {
    if (Gelb.x > bigBADbunbun.x) {
        if (bigBADbunbun.vy == 0) {
            bigBADbunbun.vy = -200
            bigBADbunbun.vx = -100
            music.setVolume(255)
            music.play(music.createSoundEffect(WaveShape.Noise, 1, 4160, 255, 0, 1000, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            animation.runImageAnimation(
            bigBADbunbun,
            assets.animation`BigBadBUNidleL`,
            200,
            true
            )
        }
    } else if (Gelb.x < bigBADbunbun.x) {
        if (bigBADbunbun.vy == 0) {
            bigBADbunbun.vy = -200
            bigBADbunbun.vx = 100
            music.setVolume(255)
            music.play(music.createSoundEffect(WaveShape.Noise, 1, 4160, 255, 0, 1000, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            animation.runImageAnimation(
            bigBADbunbun,
            assets.animation`BigBadBUNidle`,
            200,
            true
            )
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Title == false) {
        if (Gelb.vy == 0) {
            Gelb.vy = -175
            music.play(music.createSoundEffect(WaveShape.Noise, 2140, 4160, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Pillar End`, function (sprite, location) {
    if (BunnyAmount == 0) {
        BunnyAmount = 1
        music.stopAllSounds()
        controller.moveSprite(Gelb, 0, 0)
        tiles.placeOnTile(Gelb, location)
        music.play(music.createSong(assets.song`Level End`), music.PlaybackMode.InBackground)
        Fade(4000, 1, 0)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.oneHitter, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.setVolume(255)
    music.play(music.createSoundEffect(WaveShape.Noise, 1179, 286, 255, 255, 200, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    sprite.vx = Direction * -50
    sprite.vy = -150
    sprites.destroy(otherSprite, effects.none, 0)
    Gibblets = [sprites.create(assets.image`Gibble`, SpriteKind.Gibblets)]
    for (let index = 0; index <= 9; index++) {
        Gibblets.unshift(sprites.create(assets.image`Gibble`, SpriteKind.Gibblets))
    }
    for (let index = 0; index <= 5; index++) {
        Gibblets.unshift(sprites.create(assets.image`Gibble Skin`, SpriteKind.Gibblets))
    }
    for (let GibbletSprite of Gibblets) {
        GibbletSprite.setPosition(otherSprite.x, otherSprite.y)
        GibbletSprite.vy = randint(-150, -100)
        GibbletSprite.ay = 400
        GibbletSprite.vx = randint(-35, 35)
        scene.cameraShake(2, 200)
        timer.after(2500, function () {
            sprites.destroy(GibbletSprite, effects.none, 0)
        })
    }
    if (info.life() < 1) {
        music.stopAllSounds()
        music.setVolume(255)
        music.play(music.createSoundEffect(WaveShape.Noise, 1179, 286, 255, 255, 200, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
        Gibblets = [sprites.create(assets.image`Gibble`, SpriteKind.Gibblets)]
        for (let index = 0; index <= 30; index++) {
            Gibblets.unshift(sprites.create(assets.image`Gibble`, SpriteKind.Gibblets))
        }
        for (let index = 0; index <= 10; index++) {
            Gibblets.unshift(sprites.create(assets.image`Gibble Skin`, SpriteKind.Gibblets))
        }
        for (let GibbletSprite of Gibblets) {
            GibbletSprite.setPosition(otherSprite.x, otherSprite.y)
            GibbletSprite.vy = randint(-150, -100)
            GibbletSprite.ay = 400
            GibbletSprite.vx = randint(-35, 35)
            scene.cameraShake(2, 200)
            timer.after(2500, function () {
                sprites.destroy(GibbletSprite, effects.none, 0)
            })
        }
        sprites.destroy(sprite, effects.none, 0)
        music.setVolume(100)
        timer.after(4000, function () {
            game.gameOver(false)
        })
    }
})
info.onScore(0, function () {
	
})
let Randomizer = 0
let SpikerKill: Sprite = null
let Baby: Sprite = null
let Bunny: Sprite = null
let ShovelCollectable: Sprite = null
let HasKey = false
let mySprite: Sprite = null
let bigBADbunbun: Sprite = null
let Direction = 0
let BaddieHealth: StatusBarSprite = null
let Teleporter: Sprite = null
let Gelb: Sprite = null
let Portal: Sprite = null
let LVL1key: Sprite = null
let BunnyAmount = 0
let Gibblets: Sprite[] = []
let versionNumber: TextSprite = null
let TitleSprite: Sprite = null
let Title = false
let Rated = false
let Level = 0
let PlayingTime = false
let WarpTime = false
let BOSSTIME = false
BOSSTIME = false
WarpTime = false
PlayingTime = false
color.startFade(color.Black, color.originalPalette)
Level = 5
Rated = true
Title = true
let WARNING = sprites.create(assets.image`Rated PG13`, SpriteKind.Screen)
WARNING.changeScale(1, ScaleAnchor.Middle)
timer.after(4000, function () {
    color.startFade(color.originalPalette, color.Black)
    timer.after(2000, function () {
        Title = true
        Rated = false
        sprites.destroy(WARNING)
        color.startFade(color.Black, color.originalPalette)
        TitleSprite = sprites.create(assets.image`Title`, SpriteKind.Screen)
        TitleSprite.setPosition(80, 60)
        TitleSprite.changeScale(1, ScaleAnchor.Middle)
        animation.runImageAnimation(
        TitleSprite,
        assets.animation`Title Anim`,
        200,
        true
        )
        versionNumber = textsprite.create("v. 1.6.2")
        versionNumber.setPosition(25, 114)
        music.play(music.createSong(assets.song`TitleScreen`), music.PlaybackMode.InBackground)
    })
})
game.onUpdateInterval(randint(500, 2000), function () {
    if (PlayingTime == true) {
        for (let BunnyToJump of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataString(BunnyToJump, "Jump") == "Left") {
                if (BunnyToJump.vy == 0) {
                    BunnyToJump.vy = -250
                    BunnyToJump.vx = 100
                    music.play(music.createSoundEffect(WaveShape.Noise, 1, 4160, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                }
                animation.runImageAnimation(
                BunnyToJump,
                assets.animation`CUTE BUNBUN R`,
                200,
                true
                )
            } else if (sprites.readDataString(BunnyToJump, "Jump") == "Right") {
                if (BunnyToJump.vy == 0) {
                    BunnyToJump.vy = -250
                    BunnyToJump.vx = -100
                    music.play(music.createSoundEffect(WaveShape.Noise, 1, 4160, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                }
                animation.runImageAnimation(
                BunnyToJump,
                assets.animation`CUTE BUNBUN L`,
                200,
                true
                )
            }
            sprites.setDataString(BunnyToJump, "Jump", "")
            timer.after(500, function () {
                if (BunnyToJump.isHittingTile(CollisionDirection.Bottom) && BunnyToJump.vx != 0) {
                    BunnyToJump.vx = 0
                }
            })
        }
    }
})
game.onUpdateInterval(1350, function () {
    if (BOSSTIME == true) {
        Randomizer = randint(1, 2)
        if (Randomizer == 1) {
            Towards_Player()
        } else if (Randomizer == 2) {
            Away_from_Player()
        }
    }
})
game.onUpdate(function () {
    if (PlayingTime == true) {
        if (Gelb.vx > 0) {
            Direction = 1
            Gelb.setImage(assets.image`Gelb R`)
        } else if (Gelb.vx < 0) {
            Direction = -1
            Gelb.setImage(assets.image`Gelb L`)
        }
    }
})
game.onUpdate(function () {
    if (PlayingTime == true) {
        for (let BunnyToRun of sprites.allOfKind(SpriteKind.Enemy)) {
            if (Gelb.x - BunnyToRun.x < 50 && Gelb.x - BunnyToRun.x > 0) {
                if (Math.abs(Gelb.y - BunnyToRun.y) < 50 && true) {
                    sprites.setDataString(BunnyToRun, "Jump", "Right")
                }
            } else if (Gelb.x - BunnyToRun.x > -50 && Gelb.x - BunnyToRun.x < 0) {
                if (Math.abs(Gelb.y - BunnyToRun.y) < 50 && true) {
                    sprites.setDataString(BunnyToRun, "Jump", "Left")
                }
            }
        }
    }
})
game.onUpdateInterval(randint(100, 1000), function () {
    if (PlayingTime == true) {
        for (let BEBE_BUN_KILL of sprites.allOfKind(SpriteKind.BEBE)) {
            if (BEBE_BUN_KILL.vy == 0) {
                BEBE_BUN_KILL.vx = randint(-50, 50)
                BEBE_BUN_KILL.vy = -150
            }
        }
    }
})
