Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v0.0.4j</template>
    <template v-slot:text>- Change the version number from the default to the actual version number<br>- Be confused about why it took so long
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.0.4i</template>
    <template v-slot:text>- Hopefully fix changelog tab
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.0.4b-h</template>
    <template v-slot:text>- Fix layer names
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
    <template v-slot:text>- Add 6 extra infinities<br>- Add area<br>- Add some achivements
    </template>
    </guide-item>
</div>`
})
