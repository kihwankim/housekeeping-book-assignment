new Vue({ 
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        valid: false,
        price: '',
        description: '',
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        inputRules: [
            v => v.length >= 2 || 'Minimum length is 3 character'
        ],
        isPriceRule: [
            v => (/^[0-9]*$/.test(v) && !isNaN(v) && parseInt(v) >= 0) || 'Please insert Number'
        ],
    },
})
