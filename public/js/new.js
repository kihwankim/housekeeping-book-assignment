new Vue({ 
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        valid: false,
        price: '',
        description: '',
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        menu2: false,
        time: null,
        menu3: false,
        rules: {
            minLengthOfStr: v => v.length >= 1 || 'Minimum length is 1 character',
            maxLengthOfStr: v => v.length <= 150 || 'Exceeded maximum length description',
            isPriceRule: v => (/^[0-9]*$/.test(v) && !isNaN(v) && parseInt(v) >= 0) || 'Please insert Number', 
        },
        BASE_URL: 'http://localhost/housekeeping-book/public/index.php'
    },
    created() {
        const day = new Date();
        this.time = day.getHours() + ":" + day.getMinutes();
    },
    methods: {
        createNewHouseKeepData() {
            const form = new FormData();
            form.append("price", this.price);
            form.append("use_at", this.date);
            form.append("time", this.time);
            form.append("description", this.description);
            axios.post(`${this.BASE_URL}/data/new`, form)
              .then(res => {
                window.location.href = `${this.BASE_URL}/home`;
              })
              .catch(error => {
                alert("error for adding new board");
              });
        }
    }
})
