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
        combboxData:['earn', 'pay'],
        comboResult: '',
        rules: {
          minLengthOfStr: v => v.length >= 1 || 'Minimum length is 1 character',
          maxLengthOfStr: v => v.length <= 150 || 'Exceeded maximum length description',
          isPriceRule: v => (/^[0-9]*$/.test(v) && !isNaN(v) && parseInt(v) >= 0) || 'Please insert Number', 
        },
        BASE_URL: 'http://localhost/housekeeping-book/public/index.php'
    },
    created: function() {
        
        const data = location.pathname.split('/');
        const id = data[data.length - 1];
        fetch(`${this.BASE_URL}/data/housekeep/${id}`)
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
            this.comboResult = this.combboxData[json.housekeep.spent_type];
          })
          .catch(error => {console.log(error)});
      const day = new Date();
      this.time = day.getHours() + ":" + day.getMinutes();
    },
    methods: {
      editHouseKeepData() {
        const form = new FormData();
        form.append("spent_type", this.comboResult === 'earn' ? 0 : 1)
        form.append("id", this.id);
        form.append("price", this.price);
        form.append("use_at", this.date);
        form.append("time", this.time);
        form.append("description", this.description);
        axios.post(`${this.BASE_URL}/data/edit`, form)
          .then(res => {
            window.location.href = `${this.BASE_URL}/home`;
          })
          .catch(error => {
            alert("error for adding new board");
          });
    }
  }
})
