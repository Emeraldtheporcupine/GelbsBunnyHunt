// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile13 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile12 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`4000100000000005050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000000005050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000706000000000005000000000000000005050500000000050000000000000000000000000000000000000000000000000000000000000000000000000000000001020000000700000000000600000005000000000000050005000000000505000000000000000000000000000000000000000000000000000000000000000000000000000003020000000302070700000000000006070000000000070000000500000000050505000005050505000000000000000000000000000000000000000000000000000000000000040101010200000000030200000003010102000000000706000000000007070707000600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000301010200000003010101010101020000000005000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040404040404040401010200000500000000000500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040404040404020000070006000000050500000000000000000000000000000000000000000000000005000000050005050000000000000000000000000000000000000000000000000301010102000000000505000000000000000000000000000000000000000500000000000000000000000000000000000000050000000500000005000000000000040404040101020505000000000000000000000505050500000000050000000703010101010200000500000000000000000000000000000000000005000000000000000000000505000300000005050500000000000000000000000006000301040404040404020700000500000505000007030101010102070000000000000505050000000005070304000000090a0000000000070000000000000003010404040404040404040200000000000000000003040404040404010102000005000007000000000000030404000007080b000600030101010102000003010404040404040404040404040102000007060000030404040404040404040402000700030102000600030104040401010101010101010404040404040101040404040404040404040404040404040101010101010404040404040404040404040101010404040101010404040404`, img`
................................................................
................................................................
................................................................
22..............................................................
.....22...22....................................................
............2222....22...2222...................................
................................2222...22222222.................
.......................................22222222222..............
............................................2222222.............
.....................................................22222......
......................................................2222222...
......................222222...................................2
....................22......2...........222222................2.
..................22.........2.........2......222............2..
........222222..22............22......2..........2...222...22...
22222222......22................222222............222...222.....
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4,myTiles.tile5,myTiles.tile13,myTiles.tile6,myTiles.tile9,myTiles.tile10,myTiles.tile11,myTiles.tile12], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "LVL1-1":
            case "tile1":return tile1;
            case "LVL1-2":
            case "tile2":return tile2;
            case "LVL1-3":
            case "tile3":return tile3;
            case "LVL1-4":
            case "tile4":return tile4;
            case "myTile11":
            case "tile13":return tile13;
            case "Carrot 1":
            case "tile6":return tile6;
            case "Shovel goes here":
            case "tile5":return tile5;
            case "Shed LeftTop0":
            case "tile10":return tile10;
            case "Shed Carrot0":
            case "tile9":return tile9;
            case "Shed RightTop":
            case "tile11":return tile11;
            case "Shed Carrot":
            case "tile12":return tile12;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
