Vue.component("layer-colored-text", {
    props: ["text", "layer", "layerid"],
    computed: {
        textColor: function()
        {
            const lid = new Decimal(this.getLayerId());
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(mod.Infinities[9]))
            {
                return "#ffffff";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(mod.Infinities[8]))
            {
                return "#ffff00";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(mod.Infinities[7]))
            {
                return "#ff9100";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(mod.Infinities[6]))
            {
                return "#00ffb7";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(mod.Infinities[5]))
            {
                return "#c0c0c0";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(mod.Infinities[4]))
            {
                return "#8080ff";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(mod.Infinities[3]))
            {
                return "#ff0000";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(mod.Infinities[2]))
            {
                return "#808000";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(mod.Infinities[1]))
            {
                return "#0000ff";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().gte(mod.Infinities[0]))
            {
                return "#004000";
            }
            if(this.getLayerId() instanceof Decimal && this.getLayerId().lt(0))
            {
                return "#000000";
            }
            let h = 33 * Math.min(lid.toNumber(), 10000);
            let s = Math.min(100, 10 * this.getLayerId());
            if(lid.gt(10000))
            {
                h += Decimal.log10(lid.div(10000)).toNumber() * 600;
            }
            return "hsl(" + h + ", " + s + "%, 50%)";
        },
        textGlow: function()
        {
            const thickness = 0.025 * this.getLayerId();
            const t = [Math.max(0, Math.min(0.7, thickness)), Math.max(0, Math.min(0.7, thickness / 2)),
                Math.max(0, Math.min(0.7, Math.max(0, thickness - 0.3) / 4))];
            const color = "currentcolor";
            return "0px 0px " + t[0] + "em currentcolor"+
                ",0px 0px " + t[1] + "em currentcolor"+
                ",0px 0px " + t[2] + "em currentcolor";
        }
    },
    methods:
    {
        getLayerId: function()
        {
            return this.layerid;
        },
        getStyle: function()
        {
            const styles = {};
            if(game.settings.resourceColors)
            {
                styles.color = this.textColor;
            }
            if(game.settings.resourceGlow)
            {
                styles.textShadow = this.textGlow;
            }
            return styles;
        }
    },
    template: `<span :style="getStyle()"><slot></slot></span>`
})
