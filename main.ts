namespace SpriteKind {
    export const Shovel = SpriteKind.create()
    export const Gibblets = SpriteKind.create()
    export const Key = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Gelb.vy > 0) {
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
        Gelb.vy = -100
        if (BunnyAmount == 0) {
            music.play(music.createSong(assets.song`Found Key`), music.PlaybackMode.InBackground)
            if (Level == 1) {
                LVL1key = sprites.create(assets.image`Key`, SpriteKind.Key)
                LVL1key.setPosition(otherSprite.x, otherSprite.y)
                LVL1key.vy = -250
                LVL1key.ay = 400
                LVL1key.vx = 20
                animation.runImageAnimation(
                LVL1key,
                assets.animation`Key Spin`,
                100,
                true
                )
            }
        }
        sprites.destroy(otherSprite, effects.none, 0)
        music.setVolume(100)
    } else {
    	
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite, otherSprite) {
    if (otherSprite.vy == 0) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        HasKey = true
        sprites.destroy(otherSprite)
    }
})
function SetupLevel () {
    if (Level == 1) {
        color.setPalette(
        color.originalPalette
        )
        info.setScore(1)
        BunnyAmount = 1
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
            100,
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
            100,
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
    } else {
    	
    }
    info.setScore(sprites.allOfKind(SpriteKind.Enemy).length)
    BunnyAmount = sprites.allOfKind(SpriteKind.Enemy).length
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Shed Carrot`, function (sprite, location) {
    if (HasKey == true) {
        HasKey = false
        music.stopAllSounds()
        controller.moveSprite(Gelb, 0, 0)
        tiles.placeOnTile(Gelb, location)
        music.play(music.createSong(assets.song`Level End`), music.PlaybackMode.InBackground)
        timer.after(4000, function () {
            color.startFade(color.originalPalette, color.Black, 1000)
            Level += 1
            SetupLevel()
            color.startFade(color.Black, color.originalPalette, 1000)
        })
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Burrow`, function (sprite, location) {
    if (BunnyAmount == 0) {
        BunnyAmount = 1
        music.stopAllSounds()
        controller.moveSprite(Gelb, 0, 0)
        tiles.placeOnTile(Gelb, location)
        music.play(music.createSong(assets.song`Level End`), music.PlaybackMode.InBackground)
        timer.after(4000, function () {
            color.startFade(color.originalPalette, color.Black, 1000)
            Level += 1
            SetupLevel()
            color.startFade(color.Black, color.originalPalette, 1000)
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shovel, function (sprite, otherSprite) {
    music.setVolume(255)
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 5000, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite, effects.none, 0)
    music.setVolume(40)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Gelb.vy == 0) {
        Gelb.vy = -175
        music.play(music.createSoundEffect(WaveShape.Noise, 2140, 4160, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
})
info.onScore(0, function () {
	
})
let Bunny: Sprite = null
let ShovelCollectable: Sprite = null
let HasKey = false
let LVL1key: Sprite = null
let BunnyAmount = 0
let Gibblets: Sprite[] = []
let Gelb: Sprite = null
let Level = 0
Level = 1
Gelb = sprites.create(assets.image`Gelb R`, SpriteKind.Player)
controller.moveSprite(Gelb, 75, 0)
Gelb.ay = 400
scene.cameraFollowSprite(Gelb)
SetupLevel()
game.onUpdateInterval(randint(0, 2000), function () {
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
    }
})
game.onUpdate(function () {
    if (Gelb.vx > 0) {
        Gelb.setImage(assets.image`Gelb R`)
    } else if (Gelb.vx < 0) {
        Gelb.setImage(assets.image`Gelb L`)
    }
})
game.onUpdate(function () {
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
})
