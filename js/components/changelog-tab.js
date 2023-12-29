Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v0.0.1</template>
    <template v-slot:text>
        - Added volatility automator
        - Made all automators on by default
    </template>
    </guide-item>
</div>`
})