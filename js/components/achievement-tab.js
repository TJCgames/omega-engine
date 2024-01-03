Vue.component('achievement-tab', {
    data: function ()
    {
        return {
            achievements: game.achievements
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    computed: {
        achievementsUnlocked: function() {
            return this.achievements.filter(ach => ach.isCompleted).length;
        },
        totalAchievements: function() {
            return this.achievements.length;
        },
        achievementBoost: function() {
            return game.achievementBoost()
        },
    },
    template: `<div class="achievement-tab">
<p>You have unlocked {{achievementsUnlocked}} / {{totalAchievements}} Achievements, giving a {{formatNumber(achievementBoost, 2, 3, 1e9)}}x multiplier to all generators</p>
<div class="achievements">
    <achievement v-for="(a, i) in achievements" :key="i" :achievement="a"></achievement>
</div>
</div>`
})