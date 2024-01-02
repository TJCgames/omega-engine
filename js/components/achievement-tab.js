Vue.component('achievement-tab', {
    data: function ()
    {
        return {
            achievements: game.achievements
        }
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
<p>You have unlocked {{achievementsUnlocked}} / {{totalAchievements}} Achievements, giving a {{achievementBoost}}x multiplier to all generators</p>
<div class="achievements">
    <achievement v-for="(a, i) in achievements" :key="i" :achievement="a"></achievement>
</div>
</div>`
})