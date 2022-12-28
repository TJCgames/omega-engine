Vue.component("meta-booster", {
    data: function() {
        return {
            metaBoosters: game.metaBoosters
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    template: `<div class="meta-booster">
        <div class="resource">
            <p>You have {{formatNumber(metaBoosters.resource, 2, 0, 1e9)}} boost points</p><br>
            <p>You have a {{formatNumber(metaBoosters.totalBoost, 2, 0, 1e9)}}x boost on Meta</p>
            <p>You get a{{formatNumber(this.count.mul(Decimal(0.01)).mul(Decimal(1.5).pow(metaBoosters.upgrades[0].count)).mul(Decimal(2).pow(metaBoosters.upgrades[1].count)), 2, 2, 1e9)}}x higher boost every second</p>
        </div> <div class="generators">
            <span style="font-size: 120%;">Generators</span>
            <thead>
                <th>Generator</th>
                <th>Amount</th>
                <th>Buy</th>
            </thead>
            <tr>
                <td>Boost generator 0</td>
                <td>{{metaBoosters.generators[0].count}} <span style="font-size: 70%;">({{metaBoosters.generators[0].total}})</span></td>
                <td><button :disabled="metaBoosters.boostPoints.gte(metaBoosters.generators[0].cost)" @click="metaBoosters.generators[0].buy()">{{formatNumber(metaBoosters.generators[0].cost, 2, 0, 1e6)}} boost points</button><td>
            </tr><br>
            <tr>
                <td>Boost generator 1</td>
                <td>{{metaBoosters.generators[1].count}} <span style="font-size: 70%;">({{metaBoosters.generators[1].total}})</span></td>
                <td><button :disabled="metaBoosters.boostPoints.gte(metaBoosters.generators[1].cost)" @click="metaBoosters.generators[1].buy()">{{formatNumber(metaBoosters.generators[1].cost, 2, 0, 1e6)}} boost points</button><td>
            </tr><br>
            <tr>
                <td>Boost generator 2</td>
                <td>{{metaBoosters.generators[2].count}} <span style="font-size: 70%;">({{metaBoosters.generators[2].total}})</span></td>
                <td><button :disabled="metaBoosters.boostPoints.gte(metaBoosters.generators[2].cost)" @click="metaBoosters.generators[2].buy()">{{formatNumber(metaBoosters.generators[2].cost, 2, 0, 1e6)}} boost points</button><td>
            </tr><br>
        </div> <div class="">
            <span style="font-size: 120%;">Upgrades</span>
            <div class="upgrade-container">
                <tr> <button :disabled="metaBoosters.boostPoints.gte(metaBoosters.upgrades[0].cost)" @click="metaBoosters.upgrades[0].buy()" class="upgrade">
                    {{metaBoosters.upgrades[0].text}}<br>
                    {{metaBoosters.upgrades[0].cost}} boost points
                </button> </tr>
                <tr> <button :disabled="metaBoosters.boostPoints.gte(metaBoosters.upgrades[1].cost)" @click="metaBoosters.upgrades[1].buy()" class="upgrade">
                    {{metaBoosters.upgrades[1].text}}<br>
                    {{metaBoosters.upgrades[1].cost}} boost points
                </button> </tr>
            </div>
        </div>
    </div>`
})