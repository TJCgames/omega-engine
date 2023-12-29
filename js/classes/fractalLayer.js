class FractalLayer {
    constructor() {
    }
    get fractalPoints() {
        return new Decimal(game.layers.length)
    }
    set fractalPoints(to) {
        to = new Decimal(to).toNumber()
        if (to < game.layers.length) {
            game.layers = game.layers.slice(0, to)
        } else {
            for (i = game.layers.length; i < to; i ++) {
                game.layers.push(new PrestigeLayer(new Decimal(i), functions.generateLayer(i)))
            }
        }
    }
    reduceLayers(count) {
        count = new Decimal(count).toNumber()
        game.layers = game.layers.slice(0, game.layers.length - count)
    }
}