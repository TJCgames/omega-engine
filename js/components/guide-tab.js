Vue.component("guide-tab", {
    computed: {
        alephUnlocked: () => game.alephLayer.isUnlocked() || game.metaLayer.active,
        restackUnlocked: () => game.restackLayer.isUnlocked() || game.metaLayer.active,
        metaUnlocked: () => game.metaLayer.active,
        powererUnlocked: () => game.metaLayer.active && game.restackLayer.upgradeTree[0][0].level.gt(1),
        won: () => game.achievements[game.achievements.length-1].isCompleted
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        layerUnlocked: layer => game.metaLayer.active || game.highestLayer >= layer,
    },
    template: `<div class="guide-tab">
    <guide-item>
        <template v-slot:title>The beginning</template>
        <template v-slot:text>
            Welcome to <b>Phi Layers</b>! This guide will give you information on mechanics in the original game, and added features in this mod.<br><br>
            To start, go to the <b>layers</b> tab and click the button to gain α.
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>QoL hotkeys</template>
        <template v-slot:text>
            This game also comes with hotkeys you can use to navigate with just your keyboard.<br>
            These are:<br><ul>
                <li>L: Layers tab</li>
                <li>A: Achievements tab</li>
                <li>G: Guide tab</li>
                <li>S: Settings tab</li>
                <li>C: φL changelog tab</li>
                <li v-if="layerUnlocked(1)">Arrows: Switch layer</li>
                <li v-if="layerUnlocked(1)">P: Prestige</li>
                <li v-if="layerUnlocked(1)">U: Automators</li>
                <li v-if="layerUnlocked(2)">V: Volatility tab</li>
                <li v-if="alephUnlocked">Q: Aleph tab</li>
                <li v-if="layerUnlocked(9)">F: Fractal tab</li>
                <li v-if="restackUnlocked">R: Restack tab</li>
                <li v-if="!restackUnlocked">And more you haven't unlocked!</li>
            </ul>
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>Generators and you</template>
        <template v-slot:text>
            <b>Generators</b> are the main mechanic of Omega Layers. You buy them, and they generate stuff.<br>
            Your first generator will generate α directly, but most generators instead generate other generators.
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>Ain't an incremental without upgrades</template>
        <template v-slot:text>
            If you feel your α generation dwindling, it may be because you need to buy an <b>upgrade</b>. Go to the second tab of the α layer.<br>
            Upgrades can be used to boost specific generators or whole layers. They also can be bought infinitely, just like generators. Remember to buy them.
        </template>
    </guide-item>
    <guide-item v-if="layerUnlocked(1)">
        <template v-slot:title>Of course there's prestiges</template>
        <template v-slot:text>
            You may have seen a new thing on the layers tab. Reach 1e24 α and <b>prestige</b> to get a β. It <i>is</i>, however, recommended to wait until 1.68e31 α to get 2 β.
        </template>
    </guide-item>
    <guide-item v-if="layerUnlocked(1)">
        <template v-slot:title>Power generators and you</template>
        <template v-slot:text>
            <b>Power generators</b> are similar to generators - one generates resource, and the other generate generators.<br>
            However, the lowest power generator actually generates layer power, which boosts other layers' generators.
        </template>
    </guide-item>
    <guide-item v-if="layerUnlocked(1)">
        <template v-slot:title>Helpers help, help them</template>
        <template v-slot:text>
            You may have seen that you also unlocked a new subtab has been unlocked. These are <b>automators</b>, which can... automate things (shocker).
        </template>
    </guide-item>
    <guide-item v-if="layerUnlocked(2)">
        <template v-slot:title>Challenged challenges to challenge you</template>
        <template v-slot:text>
            It seems like you have made enough β to prestige on that layer to get γ. The γ layer also has a new type of layer feature: <b>challenges</b>.<br>
            Challenges have a goal condition and some negative modifiers while you're in them, however they also give relatively large boosts for completing them.
        </template>
    </guide-item>
    <guide-item v-if="layerUnlocked(2)">
        <template v-slot:title>Virtual memory?</template>
        <template v-slot:text>
            You can see that you have also now unlocked the <b>volatility</b> tab.<br>
            The main volatility upgrade makes some layers not reset, which does wonders to your progression speed. Please, for your sanity, use it.<br>
            I would actually reccomend prioritising it over prestiges.
        </template>
    </guide-item>
    <guide-item v-if="alephUnlocked">
        <template v-slot:title>That's hebrew.</template>
        <template v-slot:text>
            With the δ layer you unlocked, you also get yet another subtab. <b>Aleph</b> is a resource that never resets, and passively increases based off of how may layers you have unlocked. Yes, it's another thing to check, but some of the aleph upgrades are quite powerful.
        </template>
    </guide-item>
    <guide-item v-if="layerUnlocked(4)">
        <template v-slot:title>Tree(3)</template>
        <template v-slot:text>
            You have now unlocked the final layer feature, <b>upgrade trees</b>. Upgrade trees are quite a bit more strict than other features - you can only buy 1 type of upgrade on each row. Also, most of these are time-based, so waiting is actually the key here.
        </template>
    </guide-item>
    <guide-item v-if="layerUnlocked(8)">
        <template v-slot:title>Fractallization</template>
        <template v-slot:text>
            You might see that you have unlocked yet another subtab.<br>
            The <b>fractal</b> layer has <i>extremely</i> powerful upgrades, but they come at a cost. To buy them, you need to destroy your highest layers.<br>
            This is a careful balancing game between being able to progress quickly enough and getting a good amount of fractal upgrades. Don't worry, however, you <i>should</i> never be able to lose your α layer.
        </template>
    </guide-item>
    <guide-item v-if="restackUnlocked">
        <template v-slot:title>Knock it all down.</template>
        <template v-slot:text>
            If you thought a mechanic couldn't get harsher than fractal, allow me to introduce you to <b>restacking</b>. Restacking is the prestige to overpower all prestiges, resetting everything before it for monumental upgrades.<br>
            I'm sorry.
        </template>
    </guide-item>
    <guide-item v-if="metaUnlocked">
        <template v-slot:title>The endgame</template>
        <template v-slot:text>
            Hello. You have surpassed the trials of the layers.<br><br>
            However, we aren't gonna let you beat the game that easily.<br><br>
            We have created another monument to overcome: <b><b><b>meta</b></b></b>.<br><br>
            We have condensed all your layers into one, which multiplies every second. This multiplication can be accelerated with <b>resource multipliers</b> and restack. These have a cost of all of your layers. This, however, can be reduced to just a static numebr of layers with a <b>restack tree</b> upgrade.
        </template>
    </guide-item>
    <guide-item v-if="metaUnlocked">
        <template v-slot:title>The final tree</template>
        <template v-slot:text>
            The Restack Tree has absolutely bajonkers bonuses, if you can aquire enough restacks to reach them. Like layer upgrade trees, you can only buy 1 type per row, however every other layer converges to an important upgrade to your QoL. I have decreased the restack layer requirement to κ, as well, to make your life slightly easier.
        </template>
    </guide-item>
    <guide-item v-if="powererUnlocked">
        <template v-slot:title>Empowering</template>
        <template v-slot:text>
            <b>Resource powerers</b> are similar to resource multipliers, however they instead raise your resource to the power of a number. These are a lot stronger than resource multipliers, buy them.
        </template>
    </guide-item>
    <guide-item v-if="won">
        <template v-slot:title>Victorious</template>
        <template v-slot:text>
            You have done it.<br><br>
            You have beat every challenge I could throw at you.<br><br>
            Give yourself a pat on the back - you've earned it.
        </template>
    </guide-item>
</div>`
})
