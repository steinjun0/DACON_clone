var statusElement = {
  props: {

  },
  template: `
  `,
  data: function () {
    return {
      numberComma: "",
    };
  },
  methods: {
    AddComma: function () {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      this.numberComma = this.number.toString().replace(regexp, ",");
    },
  },
  created: function () {
    this.AddComma();
  },
};

var daconStatus = {
  template: `
  `,
  components: {
    "status-element": statusElement,
  },
};

new Vue({
  el: "#dacon-status-wrap",
  components: {
    "dacon-status": daconStatus,
  },
});
