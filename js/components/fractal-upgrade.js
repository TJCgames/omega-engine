Vue.component("fractal-upgrade", {
    props: ["upgrade"],
    methods: {
        getResourceName: function()
        {
            return '<img alt="F" class="inline" src="images/sierpinski.svg"/>';
        }
    },
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="getResourceName()"></resource-upgrade>`
});
