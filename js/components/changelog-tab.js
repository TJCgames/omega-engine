Vue.component("changelog-tab", {
    data: function() {
        return {
            debugEnabled: mod.debugMode
        }
    },
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v0.3.1</template>
    <template v-slot:text>
        - Added 2 more fractal upgrades.<br>
        - Fixed a couple of bug.<br>
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.3.0</template>
    <template v-slot:text>
        - Removed the recently added layer naming scheme.<br>
        - Added actually useful guides.<br>
        - Added more achievements :).<br>
        - Gave achievements an actual effect.<br>
        - Changed the order of automators in the code.<br>
        - Adjusted keybinds.
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.2.1</template>
    <template v-slot:text>
        - Fixed a couple of bugs with the fractal layer.<br>
        - Made the auto volatility cheaper.<br>
        - Made the auto volatility only visible after you unlock volatility.<br>
        - Made the fractal layer easier to reach.<br>
        - Added a layer naming scheme.<br>
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.2.0</template>
    <template v-slot:text>
        - Added another fractal upgrade. This one scales with your layer count.<br>
        - Fixed some rendering stuff to do with affected layers.<br>
        - Altered the code of which layer power generators affect.<br>
        - Made the fractal upgrades <i>actually</i> affect power generators.<br>
        <div v-if="debugEnabled">- Added a "remove layer" button to the debug menu.</div>
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.1.0</template>
    <template v-slot:text>
        - ADDED A FRACTAL UPGRADE!!!!!<br>
        - The gimmick with fractal upgrades is that buying them actually removes layers from you, however they also provide massive bonuses.<br>
        - Still needs balancing.
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.0.2</template>
    <template v-slot:text>
        - Added framework for a layer working on the number of layers you have.<br>
        - Pushed restack back to layer 24 (ω).
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.0.1</template>
    <template v-slot:text>
        - Added volatility automator.<br>
        - Made all automators on by default.
    </template>
    </guide-item>
</div>`
})