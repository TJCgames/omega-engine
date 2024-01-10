const game = {
    timeSaved: Date.now(),
    layers: [],
    highestLayer: 0,
    highestUpdatedLayer: 0,
    automators: {
        autoAuto: new Automator("Auto Automators", "Automatically Max All Automators (except this)", () =>
        {
            game.automators.autoMaxAll.upgrade.buyMax()
            game.automators.autoPrestige.upgrade.buyMax()
            game.automators.autoAleph.upgrade.buyMax()
            game.automators.autoVolatility.upgrade.buyMax()
        }, new DynamicLayerUpgrade(level => level + 7, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(10).toNumber()) * 10),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 500 : Infinity, null, {
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
        autoVolatility: new Automator("Auto Volatility", "Automatically buy all Volatility upgrades", () =>
        {
            game.volatility.layerVolatility.buyMax()
            game.volatility.autoMaxAll.buyMax()
            game.volatility.prestigePerSecond.buyMax()
        }, new DynamicLayerUpgrade(level => level + 6, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(5).toNumber()) * 0.8),
            level => level.gt(0) ? Math.pow(0.8, level.toNumber() - 1) * 150 : Infinity, null, {
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
        new Achievement("Guiding light", "Open the guide", '<img alt="G" class="inline" src="images/information-circle.svg"/>', () => game.settings.tab == "Guide"),
        new Achievement("Onward and upward!", "Beta prestige", 'β', () => game.layers.length >= 2 && game.layers[1].timesReset >= 1),
        new Achievement("Minecraft create mod", "Purchase an automator", '<img alt="Au" class="inline" src="images/hardware-chip.svg"/>', () => Object.values(game.automators).some(value => value.upgrade.level.gt(0))),
        new Achievement("Secondary storage", "Purchase the first volatility upgrade", '<img alt="V" class="inline" src="images/save.svg"/>', () => Object.values(game.volatility).some(value => value.level.gt(0))),
        new Achievement("Challenging!", "Comlete a challenge", 'γ', () => game.layers.filter(value => value.hasChallenges()).some(value => value.challenges.some(value2 => value2.level > 0))),
        new Achievement("Aleph-0", "Start gaining aleph", "&aleph;", () => game.alephLayer.isUnlocked()),
        new Achievement("Aleph-1", "Have 1e75 aleph", "&aleph;<sub>1</sub>", () => game.alephLayer.aleph.gte("1e75")),
        new Achievement("Aleph-2", "Have 1e200 aleph", "&aleph;<sub>2</sub>", () => game.alephLayer.aleph.gte("1e200")),
        new Achievement("Aleph-3", "Have 1.8e308 aleph", "&aleph;<sub>3</sub>", () => game.alephLayer.aleph.gte("1.8e308")),
        new Achievement("Sierpinski", "Purchase a fractal upgrade and quietly weep", '<img alt="F" class="inline" src="images/sierpinski.svg"/>', () => Object.values(game.fractalLayer.upgrades).some(value => value.level.gt(0))),
        new Achievement("Stacking up", "Do a restack and restart your progress", '<img alt="R" class="inline" src="images/layercoin.svg"/>', () => game.restackLayer.timesReset > 0),
        new Achievement("Upgradalicious", "Max all the non-meta upgrades", "↑<sub>↑<sub>↑</sub></sub>", () => (Object.values(game.restackLayer.permUpgrades).every(value => value.level.gte(2)))),
        new Achievement("Idle^2", "Buy the meta upgrade", "↑<sub>2<sub>", () => game.restackLayer.metaUpgrade.level.gte(1)),
        new Achievement("No turning back", "Go meta and be reborn", "&Omega;", () => game.metaLayer.active),
        new Achievement("Endgame", "Reach layer 1.8e308 and finish "+mod.primaryName+mod.secondaryName, "Ʊ", () => game.metaLayer.layer.gte(mod.Infinities[0])),
    ],
    achievementBoost() {
        return Decimal.pow(1.2, game.achievements.filter(value => value.isCompleted).length)
    },
    secretAchievements: [
        
    ],
    alephLayer: new AlephLayer(),
    fractalLayer: new FractalLayer(),
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
