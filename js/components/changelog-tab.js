Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v0.5</template>
    <template v-slot:text>- Bugfixed the entirety of the layer naming system<br>
    - Removed a "0." from the version number (if love2d can do it i can do it)<br>
    - A few more news tickers<br>
    - Slightly changed generator naming<br>
    <s>- Content is approaching</s>
    </template>
    </guide-item>

    <guide-item>
    <template v-slot:title>v0.0.4</template>
    <template v-slot:text>- More colours to layer names<br>- Compacted layer names (hope this works)
    </template>
    </guide-item>

    <guide-item>
    <template v-slot:title>v0.0.3</template>
    <template v-slot:text>- Added Russian layer names<br>- Fixed some achivements that didnt work as intended
    </template>
    </guide-item>

    <guide-item>
    <template v-slot:title>v0.0.2</template>
    <template v-slot:text>- Add a lot of achivements
    </template>
    </guide-item>

    <guide-item>
    <template v-slot:title>v0.0.1</template>
    <template v-slot:text>- Add 6 extra infinities<br>- Add area layer names<br>- Add some achivements
    </template>
    </guide-item>
</div>`
})
