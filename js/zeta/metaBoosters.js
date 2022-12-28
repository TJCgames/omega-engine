class MetaBoosters {
    constructor() {
        this.boostPoints = new Decimal(0)
        this.nextLayer = new Decimal(0)
        this.genBoost = new Decimal(1)
        this.totalBoost = new Decimal(1)
        this.updateTotalBoost = function () {
            this.totalBoost = this.genBoost.mul(Decimal(2).pow(this.upgrades[1].count))
        }
        this.generators = [{
                "count": new Decimal(0),
                "total": new Decimal(0),
                "cost": new Decimal(2),
                "increaseCost": function () { this.cost = this.cost.pow(Decimal(2)) },
                "buy": function () {
                    if (game.metaBoosters.boostPoints.gte(this.cost)) {
                        this.count = this.count.add(1)
                        game.metaBoosters.boostPoints = game.metaBoosters.boostPoints.sub(this.cost)
                        this.increaseCost()
                    }
                }, "generate": function () {
                    game.metaBoosters.genBoost = game.metaBoosters.genBoost.add(this.count.mul(Decimal(0.01)).mul(Decimal(1.5).pow(game.metaBoosters.upgrades[0].count)))
                    this.updateTotalBoost()
                }
            }, {
                "count": new Decimal(0),
                "total": new Decimal(0),
                "cost": new Decimal(10),
                "increaseCost": function () { this.cost = this.cost.pow(Decimal(2)).mul(2) },
                "buy": function () {
                    if (game.metaBoosters.boostPoints.gte(this.cost)) {
                        this.count = this.count.add(1)
                        game.metaBoosters.boostPoints = game.metaBoosters.boostPoints.sub(this.cost)
                        this.increaseCost()
                    }
                }, "generate": function () {
                    game.metaBoosters.generators[0].count = game.metaBoosters.generators[0].count.add(this.count.mul(Decimal(0.01).mul(Decimal(1.5).mul(game.metaBoosters.upgrades[0].count))))
                }
            }, {
                "count": new Decimal(0),
                "total": new Decimal(0),
                "cost": new Decimal(25),
                "increaseCost": function () { this.cost = this.cost.pow(Decimal(2)).mul(3) },
                "buy": function () {
                    if (game.metaBoosters.boostPoints.gte(this.cost)) {
                        this.count = this.count.add(1)
                        game.metaBoosters.boostPoints = game.metaBoosters.boostPoints.sub(this.cost)
                        this.increaseCost()
                    }
                }, "generate": function () {
                    game.metaBoosters.generators[1].count = game.metaBoosters.generators[1].count.add(this.count.mul(Decimal(0.01).mul(Decimal(1.5).mul(game.metaBoosters.upgrades[0].count))))
                }
        }]
        this.upgrades = [{
                "count": new Decimal(0),
                "cost": new Decimal(100),
                "increaseCost": function () { this.cost = this.cost.mul(100) },
                "buy": function () {
                    if (game.metaBoosters.boostPoints.gte(this.cost)) {
                        this.count = this.count.add(1)
                        game.metaBoosters.boostPoints = game.metaBoosters.boostPoints.sub(this.cost)
                        this.increaseCost()
                    }
                },
                "text": "Increase boost generator speed by 50%"
            }, {
                "count": new Decimal(0),
                "cost": new Decimal(200),
                "increaseCost": function () { this.cost = this.cost.mul(125) },
                "buy": function () {
                    if (game.metaBoosters.boostPoints.gte(this.cost)) {
                        this.count = this.count.add(1)
                        game.metaBoosters.boostPoints = game.metaBoosters.boostPoints.sub(this.cost)
                        this.increaseCost()
                        this.updateTotalBoost()
                    }
                },
                "text": "Double boost"
            }
        ]
    }

    tick(dt) {
        this.generators[0].generate()
        this.generators[1].generate()
        this.generators[2].generate()
    }

    load(obj) {
        this.boostPoints = obj.points
        this.nextLayer = obj.next
        this.genBoost = obj.gBoost
        this.totalBoost = obj.tBoost
        this.generators = obj.generators
        this.upgrades = obj.upgrades
    }
}