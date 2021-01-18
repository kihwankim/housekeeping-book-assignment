new Vue({ 
    el: '#app',
    vuetify: new Vuetify(),
    data: {
      year: '',
      month: '',
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      BASE_URL: 'http://localhost/housekeeping-book/public/index.php'
    },
    mounted () {
      this.$refs.calendar.checkChange();
    },
    methods: {
      linkCreatePage() {
        window.location.href=`${this.BASE_URL}/home/new`;
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        this.nowId = event.id;
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }
        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        const firstDay = new Date(start.date);
        const year = firstDay.getFullYear();
        const month = firstDay.getMonth() + 1;
        console.log(month);
        fetch(`${this.BASE_URL}/data/housekeeps`)
        .then(res => {
          if(res.ok){
            return res.json();
          }
          throw new Error("Network reponse was not ok");
        })
        .then(json => {
          const events = [];
          json.events.forEach(element => {
            events.push({
              start: element.use_at,
              end: element.use_at,
              color: this.colors[element.id % this.colors.length],
              timed: false,
              id: element.id,
              name: element.description,
              price: element.price 
            });
          });
          this.events = events;
        })
        .catch(error => {console.log(error)});
      },
      requestDeleteData() {
        if(confirm('Are you super deleting this housekeeping data')){
        axios.delete(`${this.BASE_URL}/data/delete/${this.nowId}`)
          .then(res => {
            const events = [];
            this.events.forEach(element => {
              if(element.id != res.data.id){
                events.push(element);
              }
            })
            this.events = events;
            this.selectedOpen = false;
          })
          .catch(error => {
            alert("It can not be deleted");
          });
        }
      },
      linkEditPage() {
        window.location.href=`${this.BASE_URL}/home/edit/${this.nowId}`;
      },
    }
  })
