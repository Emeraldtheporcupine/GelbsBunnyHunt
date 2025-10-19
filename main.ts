namespace SpriteKind {
    export const Shovel = SpriteKind.create()
    export const Gibblets = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Gelb.vy > 0) {
        music.setVolume(255)
        music.play(music.createSoundEffect(WaveShape.Noise, 315, 286, 255, 255, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        Gibblets = [sprites.create(assets.image`Gibble`, SpriteKind.Gibblets)]
        for (let index = 0; index <= 40; index++) {
            Gibblets.unshift(sprites.create(assets.image`Gibble`, SpriteKind.Gibblets))
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
        Gelb.vy = -100
        sprites.destroy(otherSprite, effects.none, 0)
        music.setVolume(100)
    } else {
    	
    }
})
function SetupLevel () {
    if (Level == 1) {
        scene.setBackgroundImage(assets.image`LVL one`)
        Gelb = sprites.create(assets.image`Gelb R`, SpriteKind.Player)
        controller.moveSprite(Gelb, 75, 0)
        Gelb.ay = 400
        scene.cameraFollowSprite(Gelb)
        tiles.setCurrentTilemap(tilemap`level1`)
        tiles.placeOnTile(Gelb, tiles.getTileLocation(0, 14))
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
        scroller.setCameraScrollingMultipliers(0.1, 0.1)
        music.setVolume(50)
        music.play(music.createSong(assets.song`The Field`), music.PlaybackMode.LoopingInBackground)
        music.setVolume(100)
        for (let ShovelToBe of tiles.getTilesByType(assets.tile`myTile`)) {
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
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shovel, function (sprite, otherSprite) {
    music.setVolume(255)
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 5000, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite, effects.none, 0)
    info.changeScoreBy(1)
    music.setVolume(40)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Gelb.vy == 0) {
        Gelb.vy = -175
        music.play(music.createSoundEffect(WaveShape.Noise, 2140, 4160, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
})
let Bunny: Sprite = null
let ShovelCollectable: Sprite = null
let Gibblets: Sprite[] = []
let Gelb: Sprite = null
let Level = 0
Level = 1
SetupLevel()
game.onUpdateInterval(randint(0, 2000), function () {
    for (let BunnyToJump of sprites.allOfKind(SpriteKind.Enemy)) {
        if (sprites.readDataString(BunnyToJump, "Jump") == "Left") {
            if (BunnyToJump.vy == 0) {
                BunnyToJump.vy = -250
                BunnyToJump.vx = 100
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
