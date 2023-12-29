const mod = {
    primaryName: "Ʊ",
    secondaryName: "L",
    version: "0.6",
    engineVer: "1.0.1", //DO NOT MODIFY
    debugMode: false,
    Infinities: [new Decimal(65536), new Decimal("1e12"), new Decimal("1e100"), new Decimal(2).pow(1024), new Decimal("1.8e30008"), new Decimal("1.8e300000008"), new Decimal("ee38"), new Decimal("ee100"), new Decimal(2).pow(new Decimal(2).pow(1024)), new Decimal("ee535")],
    themes: [
        ["Dark", "css/themes/dark.css"],
        ["Dark Alt (by Jeehan2561)", "css/themes/darkalt.css"],
        ["Modern", "css/themes/modern.css"],
        ["Light", "css/themes/light.css"],
        ["Neon", "css/themes/neon.css"],
        ["Godot Blue", "css/themes/darkblue.css"],
        ["Halloween", "css/themes/spooky.css"],
        ["eXPerience", "css/themes/experience.css"]
    ],
    layerNames: [
        ["Greek",
        [
            "αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ",
            "ψϝϛͱϻϙͳϸ",
            ["Ʊ<sub>0</sub>", "Ʊ<sub>1</sub>", "Ʊ<sub>2</sub>", "Ʊ<sub>3</sub>", "Ʊ<sub>4</sub>", "Ʊ<sub>5</sub>", "Ʊ<sub>6</sub>", "Ʊ<sub>7</sub>", "Ʊ<sub>8</sub>", "Ʊ<sub>9</sub>"]
        ]],
        ["Latin",
        [
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "ðþȝƿəŋſÐÞȜǷƏŊ",
            "æœĳǉǝÆŒĲǇƎ"
        ]],
        ["Alphabet",
        [
            "abcdefghijklmnopqrstuvwxyz",
            "123456789",
            "ABCDEFGHIJ"
        ]],
        ["Symbols",
        [
            '!"£$%^&*;:@',
            "<,[{}].>",
            "+-×÷^_=#`?"
        ]],
        ["Binary",
        [
            '01',
            "01",
            "23456789AB"
        ]],
        ["Random",
        [
            Utils.createRandomWord(10, new Random(Date.now()).nextInt()),
            Utils.createRandomWord(10, new Random(Math.floor(Date.now()/2)).nextInt()),
            [Utils.createRandomWord(2, new Random(Math.floor(Date.now()/3)).nextInt()),Utils.createRandomWord(3, new Random(Math.floor(Date.now()/4)).nextInt()),Utils.createRandomWord(4, new Random(Math.floor(Date.now()/5)).nextInt()),Utils.createRandomWord(5, new Random(Math.floor(Date.now()/6)).nextInt())]
        ]],
        ["Area",
        [
            ["1 ym²", "10 ym²", "100 ym²", "1000 ym²", "10,000 ym²", "100,000 ym²", "1 zm²", "10 zm²", "100 zm²", "1000 zm²", "10,000 zm²", "100,000 zm²",
             "1 am²", "10 am²", "100 am²", "1000 am²", "10,000 am²", "100,000 am²", "1 fm²", "10 fm²", "100 fm²", "1000 fm²", "10,000 fm²", "100,000 fm²",
             "1 pm²", "10 pm²", "100 pm²", "1000 pm²", "1 Å²", "10 Å²", "1 nm²", "10 nm²", "100 nm²", "1000 nm²", "10,000 nm²", "100,000 nm²",
             "1 µm²", "10 µm²", "100 µm²", "1000 µm²", "10,000 µm²", "100,000 µm²", "1 mm²", "10 mm²", "1 cm²", "10 cm²", "1 dm²", "10 dm²",
             "1 m²", "10 m²", "1 dam²", "10 dam²", "1 ha", "10 ha", "1 km²", "10 km²", "100 km²", "1000 km²", "10,000 km²", "100,000 km²",
             "1 Mm²", "10 Mm²", "100 Mm²", "1000 Mm²", "10,000 Mm²", "100,000 Mm²", "1 Gm²", "10 Gm²", "100 Gm²", "1000 Gm²", "10,000 Gm²", "100,000 Gm²",
             "1 Tm²", "10 Tm²", "100 Tm²", "1000 Tm²", "10,000 Tm²", "100,000 Tm²", "1 Pm²", "10 Pm²", "100 Pm²", "1000 Pm²", "10,000 Pm²", "100,000 Pm²",
             "1 Em²", "10 Em²", "100 Em²", "1000 Em²", "10,000 Em²", "100,000 Em²", "1 Zm²", "10 Zm²", "100 Zm²", "1000 Zm²", "10,000 Zm²", "100,000 Zm²",
             "1 Ym²", "10 Ym²", "100 Ym²", "1000 Ym²", "10,000 Ym²", "100,000 Ym²", "1 Rm²", "10 Rm²", "100 Rm²", "1000 Rm²", "10,000 Rm²", "100,000 Rm²",
             "1 Qm²", "10 Qm²", "100 Qm²", "1000 Qm²", "10,000 Qm²", "100,000 Qm²"
            ],
            "",
            ["1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D"] 
        ]],
        ["Nomifactory",
        [
            [
             "Electric furnace", "Macerator", "Alloy smelter", "Arc furnace", "Assembling machine",
             "Autoclave", "Bending machine", "Brewery", "Canning machine", "Centrifuge",
             "Chemical bath", "Chemical reactor", "Compressor", "Cutting machine", "Distillery",
             "Electrolyzer", "Electromagnetic separator", "Extractor", "Extruder", "Fermenter",
             "Fluid heater", "Fluid solidifier", "Forge hammer", "Forming press", "Lathe", "Mxer",
             "Ore washing plant", "Packager", "Gas collector", "Polarizer",
             "Precision laser engraver", "Sifting machine", "Thermal centrifuge", "Wiremill",
             "Circuit assembler", "Rock breaker", "Miner", "Combustion generator", "Steam turbine",
             "Gas turbine", "Item collector", "Fisher", "Pump"
            ],
            [
             "Aluminium", "Beryllium", "Cobalt", "Copper", "Gold", "Iron", "Lead", "Lithium",
             "Molybdenum", "Neodynium", "Nickel", "Palladium", "Platinum", "Plutonium 239",
             "Silver", "Sulfur", "Thorium", "Tin", "Naquadah", "Certus quartz", "Almandite",
             "Asbestos", "Banded iron", "Blue topaz", "Brown limonite", "Calcite", "Cassiterite",
             "Cassiterite sand", "Chalcopyrite", "Chromite", "Cinnabar", "Coal", "Cobaltite",
             "Sheldonite", "Diamond", "Emerald", "Galena", "Garnierite", "Green sapphire",
             "Grossular", "Ilmenite", "Bauxite", "Lazurite", "Magnesite", "Magnetite",
             "Molybdenite", "Powellite", "Pyrite", "Pyrolusite", "Pyrope", "Rock salt", "Ruby",
             "Salt", "Saltpeter", "Sapphire", "Scheelite", "Sodalite", "Tantalite", "Spesartine",
             "Sphalertite", "Stibnite", "Tetrahedrite", "Topaz", "Tungstate", "Urainite",
             "Wulfenite", "Yellow limonite", "Nether quartz", "Quartzite", "Graphite", "Bornite",
             "Chalcocite", "Realgar", "Bastnasite", "Pentlandite", "Spodumene", "Lepidolite",
             "Glauconite", "Malachite", "Mica", "Barite", "Alunite", "Talc", "Soapstone",
             "Kyanite", "Pyrochlore", "Oilsands", "Olivine", "Opal", "Amethyst", "Lapis",
             "Apatite", "Tricalcium phosphate", "Red garnet", "Yellow garnet",
             "Vanadium Magnetite", "Pollucite", "Bentonite", "Fullers earth", "Pitchblende",
             "Monazite", "Trona", "Gypsium", "Zeolite", "Redstone", "Electrotine", "Diatomite",
             "Granatic mineral sand", "Garnet sand", "Basaltic mineral sand", "Draconium",
             "Osmiridium 80/20", "Iridosmine 80/20", "Kaemanite", "Fluorite", "Snowchestite",
             "Darmstadtite", "Dulysite"
            ],
            [
             "Ultra low voltage", "Low voltage", "Medium voltage", "High voltage",
             "Extreme voltage", "Insane voltage", "Ludicrous voltage", "Zero point module",
             "Ultimate voltage", "Ultra high voltage"
            ] 
        ]],
        ["Russian",
        [
            "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
            "ѕѯѱѡѫѧѭѩЅѮѰѠѪѦѬѨ",
            "іѣѳѵꙗІѢѲѴꙖ"
        ]]
    ],
    layerNamePlaceholder: "𐌒",
    fonts: [
        ["Monospace Typewriter", "css/fonts/typespace.css"],
        ["Source Code Pro", "css/fonts/scp.css"],
        ["Comic Sans", "css/fonts/comic.css"],
        ["Arial", "css/fonts/arial.css"],
        ["Roboto", "css/fonts/roboto.css"],
        ["Ubuntu", "css/fonts/ubuntu.css"],
        ["Comfortaa", "css/fonts/comfortaa.css"],
        ["Minecraft", "css/fonts/minecraft.css"],
    ],
    saves: [
        ["Save 1", ""],
        ["Save 2", "2"],
        ["Save 3", "3"],
        ["Save 4", "4"],
    ],
    debugClasses: []
}

//DO NOT MODIFY CODE PAST THIS POINT AS IT IS NEEDED (unless your a pro coder then do some experimenting)

mod.layerNames.push(["Refresh Names", "refresh"])

document.getElementById("superImportantTitle").innerHTML = "<span class='omega'>"+mod.primaryName+"</span>"+mod.secondaryName
