new Vue({ 
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        valid: false,
        id: '',
        price: '',
        description: '',
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        menu2: false,
        time: null,
        menu3: false,
        inputRules: [
            v => v.length >= 2 || 'Minimum length is 3 character'
        ],
        isPriceRule: [
            v => (/^[0-9]*$/.test(v) && !isNaN(v) && parseInt(v) >= 0) || 'Please insert Number'
        ],
    },
    created: function() {
        const data = location.pathname.split('/');
        const id = data[data.length - 1];
        fetch(`http://localhost/housekeeping-book/public/index.php/data/housekeep/${id}`)
          .then(res => {
            if(res.ok){
              return res.json();
            }
            throw new Error("Network reponse was not ok");
          })
          .then(json => {
            this.id = json.housekeep.id;
            this.price = json.housekeep.price;
            this.description = json.housekeep.description;
            const splitedDateAndTime = json.housekeep.use_at.split(" ");
            this.date = splitedDateAndTime[0];
            this.time = splitedDateAndTime[1];
          })
          .catch(error => {console.log(error)});
    }
})
