class FractalLayer {
    constructor() {
        this.upgrades = {
            globalBoost: new FractalLayerUpgrade("Boost all generator production by 20x",
                level => Decimal.add(level, 1).pow(2).mul(2),
                level => Decimal.pow(20, level), {}
            )
        }
    }
    get fractalPoints() {
        return new Decimal(game.layers.length - 1)
    }
    reduceLayers(count) {
        count = new Decimal(count).toNumber()
        game.layers = game.layers.slice(0, game.layers.length - count)
    }
    load(save) {
        if (save === undefined) { return }
        if (save.upgrades !== undefined) {
            if (typeof save.upgrades.globalBoost !== undefined) {
                this.upgrades.globalBoost.level = new Decimal(save.upgrades.globalBoost)
            } else {
                this.upgrades.globalBoost.level = new Decimal(0)
            }
        }
    }
    save() {
        return {
            upgrades: {
                globalBoost: this.upgrades.globalBoost.level
            }
        }
    }
}