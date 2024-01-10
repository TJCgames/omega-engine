Vue.component("fractal-tab", {
    data: function()
    {
        return {
            fractal: game.fractalLayer
        }
    },
    computed: {
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    template: `<div class="fractal-tab">
        <div class="resource">
            <p>You have <span class="fractal">{{formatNumber(fractal.fractalPoints, 0, 0, 1e9)}}</span> <img alt="F" class="inline" src="images/sierpinski.svg"/></p>
        </div>
        <div class="upgrades">
            <fractal-upgrade v-for="(u, i) in fractal.upgrades" :upgrade="u" :key="i"></fractal-upgrade>
        </div>
    </div>`
});
