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
    },
    mounted () {
      this.$refs.calendar.checkChange();
    },
    methods: {
      linkCreatePage() {
        window.location.href='./new';
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
        fetch(`http://localhost/housekeeping-book/public/index.php/data/housekeeps?year=${this.year}&month=${this.month}`)
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
              color: this.colors[this.rnd(0, this.colors.length - 1)],
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
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      linkEditPage() {
        window.location.href=`./edit/${this.nowId}`;
      },
    }
  })
