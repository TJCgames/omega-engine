Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v0.1.0</template>
    <template v-slot:text>
        - ADDED A FRACTAL UPGRADE!!!!!
        - The gimmick with fractal upgrades is that buying them actually removes layers from you, however they also provide massive bonuses
        - Still needs balancing
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.0.2</template>
    <template v-slot:text>
        - Added framework for a layer working on the number of layers you have
        - Pushed restack back to layer 25 (Α)
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.0.1</template>
    <template v-slot:text>
        - Added volatility automator
        - Made all automators on by default
    </template>
    </guide-item>
</div>`
})