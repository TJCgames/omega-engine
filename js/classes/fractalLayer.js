class FractalLayer {
    constructor() {
        this.spentFractals = new Decimal(0)
        this.upgrades = {
            globalBoost: new FractalLayerUpgrade("Boost all generator production by 5x",
                level => Decimal.pow(2, level).mul(2),
                level => Decimal.pow(5, level)
            ),
            layerBoost: new LayeredFractalLayerUpgrade("Boost all generator production by 2x per layer above",
                level => Decimal.pow(2, level).mul(2),
                (level, layer) => Decimal.sub(game.layers.length, layer).sub(1).mul(level).pow_base(2)
            ),
            costDivide: new LayeredFractalLayerUpgrade("Divide the cost of all layer upgrades by /1.2 per layer above",
                level => Decimal.pow(2, level).mul(2),
                (level, layer) => Decimal.sub(game.layers.length, layer).sub(1).mul(level).pow_base(1.2), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(2, "/")
                }),
            challengeEffect: new FractalLayerUpgrade("Raise all in-challenge effects by ^0.95",
                level => Decimal.pow(2, level).mul(2),
                level => Decimal.pow(0.95, level), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                }),
        }
    }
    get fractalPoints() {
        if (game.layers[game.layers.length - 1].timesReset == 0)
            return Decimal.max(game.layers.length - 2, 0).sub(this.spentFractals)
        return Decimal.sub(game.layers.length - 1, this.spentFractals)
    }
    #safeLoadUpg(name, upgs) {
        if (typeof upgs[name] !== undefined) {
            this.upgrades[name].level = new Decimal(upgs[name])
        } else {
            this.upgrades[name].level = new Decimal(0)
        }
    }
    load(save) {
        if (save === undefined) { return }
        if (save.upgrades !== undefined) {
            this.#safeLoadUpg("globalBoost", save.upgrades)
            this.#safeLoadUpg("layerBoost", save.upgrades)
            this.#safeLoadUpg("costDivide", save.upgrades)
            this.#safeLoadUpg("challengeEffect", save.upgrades)
        }
    }
    save() {
        return {
            upgrades: {
                globalBoost: this.upgrades.globalBoost.level,
                layerBoost: this.upgrades.layerBoost.level,
                costDivide: this.upgrades.costDivide.level,
                challengeEffect: this.upgrades.challengeEffect.level,
            }
        }
    }
}