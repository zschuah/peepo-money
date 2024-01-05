// Create our number formatter.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 4,
  // maximumFractionDigits: 0,
});

// Setting new Date to midnight before putting into app
var newDateMidnight = new Date();
newDateMidnight.setHours(0, 0, 0, 0);

const app = Vue.createApp({
  data() {
    return {
      bankAmount: 10000,
      savingsPerMonth: 3000,
      dateToday: new Date(),
      datePicked: newDateMidnight,
    };
  },
  computed: {
    savingsPerDay() {
      return Math.round((this.savingsPerMonth / 30) * 100) / 100;
    },
    savingsPerSecond() {
      return this.savingsPerMonth / 30 / 24 / 60 / 60;
    },
    diffInSeconds() {
      return (this.dateToday.getTime() - this.datePicked.getTime()) / 1000;
    },
    diffInSecondsFormatted() {
      return Math.round(this.diffInSeconds).toLocaleString();
    },
    amountGained() {
      return this.diffInSeconds * this.savingsPerSecond;
    },
    amountNow() {
      return formatter.format(this.bankAmount + this.amountGained);
    },
    datePickedFormatted() {
      return this.datePicked.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  methods: {
    changeDatePicked(event) {
      console.log("change date picked");
      console.log(event.target.value);
      this.datePicked = new Date(event.target.value);
      this.datePicked.setHours(0, 0, 0, 0);
    },
  },
  mounted() {
    console.log("App mounted!");

    setInterval(() => {
      this.dateToday = new Date();
    }, 1000);
  },
});

app.mount("#vue-mount");

// To unhide section after script is loaded
const section = document.querySelector("section");
section.hidden = false;
