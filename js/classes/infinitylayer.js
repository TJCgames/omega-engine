class InfinityLayer {
    constructor() {
        this.infinity = new Decimal(1);
        this.createGenerators();
    }

    isUnlocked() {
        return game.highestLayer >= Infinities[0]
    }

    createGenerators() {
        this.generators = [];
        for(let i = 0; i < 32; i ++) {
            const baseProd = i === 0 ? new Decimal(1) : new Decimal(0.2);
            this.generators.push(new Generator(this, i, i > 0 ? this.generators[i - 1] : this.infinity, i,
                Decimal.pow(10, i + 1 + Math.max(0, i - 3) + Math.max(0, i - 6)), Decimal.pow(10, i + 3 + Math.max(0, i - 2)), baseProd));
        }
    }
}