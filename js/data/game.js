const game = {
    version: "1.1",
    timeSaved: Date.now(),
    layers: [],
    highestLayer: 0,
    highestUpdatedLayer: 0,
    automators: {
        autoMaxAll: new Automator("Auto Max All", "Automatically buys max on all Layers", () =>
        {
            for(let i = Math.max(0, game.volatility.autoMaxAll.apply().toNumber()); i < game.layers.length; i++)
            {
                game.layers[i].maxAll();
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 3) + 1, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.toNumber()) * [0.2, 0.5, 0.8][level.toNumber() % 3]),
            level => level.gt(0) ? Math.pow(0.8, level.toNumber() - 1) * 10 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoPrestige: new Automator("Auto Prestige", "Automatically prestiges all Layers", () =>
        {
            for(let i = 0; i < game.layers.length - 1; i++)
            {
                if(game.layers[game.layers.length - 2].canPrestige() && !game.settings.autoPrestigeHighestLayer)
                {
                    break;
                }
                if(game.layers[i].canPrestige() && !game.layers[i].isNonVolatile())
                {
                    game.layers[i].prestige();
                }
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 2) + 2, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * (level.toNumber() % 2 === 0 ? 0.25 : 0.75)),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 30 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAleph: new Automator("Auto Aleph", "Automatically Max All Aleph Upgrades", () =>
        {
            game.alephLayer.maxAll();
        }, new DynamicLayerUpgrade(level => level + 3, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(3).toNumber()) * 0.7),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 60 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAuto: new Automator("Auto Automators", "Automatically Max All Automators (except this)", () =>
        {
            for(let i = 0; i < game.automators.length - 2; i++)
            {
                game.automators[i].upgrade.buyMax()
            }
        }, new DynamicLayerUpgrade(level => level + 7, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(10).toNumber()) * 10),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 500 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
    },
    volatility: {
        layerVolatility: new DynamicLayerUpgrade(level => level + 1, level => level,
            function()
            {
                return "Make the next Layer non-volatile";
            }, level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(1).toNumber())), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    const val1 = this.level.eq(0) ? "None" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    const val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
        prestigePerSecond: new DynamicLayerUpgrade(level => Math.round(level * 1.3) + 3, level => null,
            () => "Boost the Prestige Reward you get per second",
            function(level)
            {
                const max = PrestigeLayer.getPrestigeCarryOverForLayer(Math.round(level.toNumber() * 1.3) + 3);
                return Decimal.pow(10, new Random(level.toNumber() * 10 + 10).nextDouble() * max).round();
            }, level => new Decimal(0.5 + 0.1 * level), null, {
                getEffectDisplay: effectDisplayTemplates.percentStandard(0)
            }),
        autoMaxAll: new DynamicLayerUpgrade(level => level + 2, level => level,
            function()
            {
                return "The next Layer is maxed automatically each tick";
            }, level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * 0.125), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    const val1 = this.level.eq(0) ? "None" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    const val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
    },
    achievements: [
        new Achievement("Alpha", "'A journey of a thousand miles begins with a single step' - Chinese proverb", "α", () => (game.layers[0] && game.layers[0].resource.gte(1))),
        new Achievement("Easy alpha", "Get your first generator", 'α<sub>1</sub>', () => (game.layers[0] && game.layers[0].generators[0].bought.gt(0))),
        new Achievement("Easier alpha", "Get your second generator", 'α<sub>2</sub>', () => (game.layers[0] && game.layers[0].generators[1].bought.gt(0))),
        new Achievement("Easiest alpha", "Get your fifth generator", 'α<sub>5</sub>', () => (game.layers[0] && game.layers[0].generators[4].bought.gt(0))),
        new Achievement("Upgrade", "Get an alpha upgrade", '↑<sub>α<sub>', () => (game.layers[0] && game.layers[0].upgrades[0].level.gt(0))),
        new Achievement("Upgradier", "Prestige to get a β", "β", () => game.highestLayer >= 2),
        new Achievement("Empowered", "Get β power", 'β<sub>1</sub>', () => (game.layers[1] && game.layers[1].powerGenerators[0].bought.gt(0))),
        new Achievement("Upgradiest", "Prestige to get a γ", "γ", () => game.highestLayer >= 3),
        new Achievement("Out of RAM?", "Make layer α non-volatile", '<img src="images/save.svg" alt="S">', () => (game.volatility.layerVolatility.level.gt(0))),
        new Achievement("Challenging", "Beat your first challenge", 'γ<sub>C</sub>', () => (game.layers[2] && game.layers[2].challenges[0].level > 0)),
        new Achievement("Aleph-0", "Start gaining aleph", "ℵ", () => (game.alephLayer && game.alephLayer.isUnlocked())),
        new Achievement("Aleph-1", "Have 1e75 aleph", 'ℵ<sub>1</sub>', () => (game.alephLayer.aleph.gte("1e75"))),
        new Achievement("Aleph-2", "Have 1e200 aleph", 'ℵ<sub>2</sub>', () => (game.alephLayer.aleph.gte("1e200"))),
        new Achievement("Aleph-3", "Have 1.8e308 aleph", 'ℵ<sub>3</sub>', () => (game.alephLayer.aleph.gte("1.8e308"))),
        new Achievement("Stacking up", "Do a restack and restart your progress", "κ", () => (game.restackLayer.timesReset > 0)),
        new Achievement("Upgradalicious", "Max all the non-meta upgrades", '↑<sub>↑<sub>↑</sub></sub>', () => (Object.values(game.restackLayer.permUpgrades).filter(u => u.level.gt(0)).length + Object.values(game.restackLayer.permUpgrades).filter(u => u.level.gt(1)).length) == 12),
        new Achievement("Idle^2", "Buy the meta upgrade", '↑<sub>2<sub>', () => game.restackLayer.metaUpgrade.level.gte(1)),
        new Achievement("No turning back", "Go meta and be reborn", "Ω", () => game.metaLayer.active),
        new Achievement("Me, myself and I", "Reach layer nif", "Μ", () => game.metaLayer.layer.gte(mod.Infinities[0])),
        new Achievement("This is new", "Reach layer 65,536 and find the first tier of infinity", "Ʊ", () => game.metaLayer.layer.gte(mod.Infinities[0])),
        new Achievement("Teralayers", "Reach layer 1 trillion and find the second tier of infinity", "ƱƱ", () => game.metaLayer.layer.gte(mod.Infinities[1])),
        new Achievement("Chrome", "Reach layer googol and find the third tier of infinity", "ƱƱƱ", () => game.metaLayer.layer.gte(mod.Infinities[2])),
        new Achievement("A bit more familiar", "Reach layer 2^1024 and find the fourth tier of infinity", "4Ʊ", () => game.metaLayer.layer.gte(mod.Infinities[3])),
        new Achievement("The end. Or is it...", "Reach layer ee535 and find the tenth tier of infinity", "10Ʊ", () => game.metaLayer.layer.gte(mod.Infinities[9])),
    ],
    secretAchievements: [
        new Achievement("A very long wait...", "Have a game with over 3 months of time", "...", () => game.timeSpent > 50803200),
        new Achievement("Aleph-π", "Have πe314 aleph", 'ℵ<sub>π</sub>', () => game.alephLayer.aleph.gte("3.141e314")),
        new Achievement("Meta sucks!", "Get ω without meta", "Ω'", () => game.highestLayer >= 47 && !game.metaLayer.active),
        new Achievement("Restack sucks!", "Get υ without restacking", "υ", () => game.highestLayer >= 20 && game.restackLayer.timesReset == 0),
        new Achievement("Volatility sucks!", "Get ε without layer volatility upgrade", 'ε<sub>0</sub>', () => game.highestLayer >= 5 && game.volatility.layerVolatility.level.eq(0)),
    ],
    alephLayer: new AlephLayer(),
    restackLayer: new ReStackLayer(),
    metaLayer: new MetaLayer(),
    currentLayer: null,
    currentChallenge: null,
    notifications: [],
    timeSpent: 0,
    settings: {
        tab: "Layers",
        showAllLayers: true,
        showMinLayers: 5,
        showMaxLayers: 5,
        showLayerOrdinals: true,
        layerTickSpeed: 1,
        buyMaxAlways10: true,
        disableBuyMaxOnHighestLayer: false,
        resourceColors: true,
        resourceGlow: true,
        newsTicker: true,
        autoMaxAll: true,
        autoPrestigeHighestLayer: true,
        notifications: true,
        saveNotifications: true,
        confirmations: true,
        offlineProgress: true,
        titleStyle: 2,
        theme: mod.themes[0][1],
        layerNames: mod.layerNames[0][1],
        font: mod.fonts[0][1],
        saveInfo: "i have no idea"
    },
};
const initialGame = functions.getSaveString();
