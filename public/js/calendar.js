new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        isWeekSummary: false,
        focus: '',
        absolute: true,
        overlay: false,
        type: 'month',
        typeToLabel: {
            month: 'Month',
            week: 'Week',
            day: 'Day',
            '4day': '4 Days',
        },
        koreanCharacterTypeToLabel: {
            month: '월',
            week: '주',
            day: '일',
            '4day': '4 일'
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        colors: ['orange', 'cyan', 'blue', 'indigo', 'deep-purple', 'green', 'grey darken-1'],
        BASE_URL: 'http://localhost/housekeeping-book/public/index.php'
    },
    mounted() {
        this.$refs.calendar.checkChange();
    },
    methods: {
        linkCreatePage() {
            window.location.href = `${this.BASE_URL}/home/new`;
        },
        viewDay({
            date
        }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor(event) {
            return event.color
        },
        setToday() {
            this.focus = ''
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
        showEvent({
            nativeEvent,
            event
        }) {
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
        updateRange({
            start,
            end
        }) {
            fetch(`${this.BASE_URL}/data/housekeeps/${start.date}/${end.date}`)
                .then(res => {
                    if (res.ok) {
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
                            color: this.colors[element.spent_type % this.colors.length],
                            timed: false,
                            id: element.id,
                            name: element.description,
                            price: element.price,
                            spentType: element.spent_type,
                        });
                    });
                    this.events = events;
                })
                .catch(error => {
                    console.log(error)
                });
        },
        requestDeleteData() {
            if (confirm('Are you sure deleting this housekeeping data')) {
                axios.delete(`${this.BASE_URL}/data/delete/${this.nowId}`)
                    .then(res => {
                        const events = [];
                        this.events.forEach(element => {
                            if (element.id != res.data.id) {
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
            window.location.href = `${this.BASE_URL}/home/edit/${this.nowId}`;
        },
        sumOfMoney() {
            let sum = 0;
            this.events.forEach(element => {
                if (element.spentType == 0) {
                    sum += Number(element.price);
                } else {
                    sum -= Number(element.price);
                }
            });

            return sum;
        },
        sumOfSpentMoney() {
            let sum = 0;
            this.events.forEach(element => {
                if (!(element.spentType == 0)) {
                    sum += Number(element.price);
                }
            });

            return sum;
        },
        sumOfIncomeMoney() {
            let sum = 0;
            this.events.forEach(element => {
                if (element.spentType == 0) {
                    sum += Number(element.price);
                }
            });

            return sum;
        },
        sumOfWeekPayment() {
            const result = {
                0: [0, 0],
                1: [0, 0],
                2: [0, 0],
                3: [0, 0],
                4: [0, 0],
            };

            this.events.forEach(element => {
                const date = new Date(Date.parse(element.start)).getDate();
                const spentType = element.spentType;
                result[parseInt(Math.floor((date - 1) / 7))][spentType] += Number(element.price);
            });

            return result;
        }
    }
})