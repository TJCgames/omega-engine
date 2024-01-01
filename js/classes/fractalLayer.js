class FractalLayer {
    constructor() {
        this.upgrades = {
            globalBoost: new FractalLayerUpgrade("Boost all generator production by 5x",
                level => Decimal.pow(2, level).mul(2),
                level => Decimal.pow(5, level)
            ),
            layerBoost: new LayeredFractalLayerUpgrade("Boost all generator production by 2x per layer above",
                level => Decimal.pow(2, level).mul(2),
                (level, layer) => Decimal.sub(game.layers.length, layer).sub(1).mul(level).pow_base(2)
            )
        }
    }
    get fractalPoints() {
        if (game.layers[game.layers.length - 1].timesReset == 0)
            return Decimal.max(game.layers.length - 2, 0)
        return new Decimal(game.layers.length - 1)
    }
    reduceLayers(count) {
        count = new Decimal(count).toNumber()
        if (game.layers.length - count - 1 < 0) {
            console.warn("Oh no! You are about to remove the last layer!")
            return
        }
        game.layers = game.layers.slice(0, game.layers.length - count - 1)
        game.volatility.layerVolatility.level = game.volatility.layerVolatility.level.min(game.layers.length - 1)
        game.volatility.autoMaxAll.level = game.volatility.autoMaxAll.level.min(game.layers.length - 1)
        if (game.layers[game.layers.length - 1].canGenerateNextLayer())
            functions.generateLayer(game.layers.length)
    }
    load(save) {
        if (save === undefined) { return }
        if (save.upgrades !== undefined) {
            if (typeof save.upgrades.globalBoost !== undefined) {
                this.upgrades.globalBoost.level = new Decimal(save.upgrades.globalBoost)
            } else {
                this.upgrades.globalBoost.level = new Decimal(0)
            }
            if (typeof save.upgrades.layerBoost !== undefined) {
                this.upgrades.layerBoost.level = new Decimal(save.upgrades.layerBoost)
            } else {
                this.upgrades.layerBoost.level = new Decimal(0)
            }
        }
    }
    save() {
        return {
            upgrades: {
                globalBoost: this.upgrades.globalBoost.level,
                layerBoost: this.upgrades.layerBoost.level,
            }
        }
    }
}