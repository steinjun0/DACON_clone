var statusElement = {
  props: {
    className: String,
    iconSrc: String,
    number: Number,
    title: String,
  },
  template: `
    <li v-bind:class='className'>
      <img :src="iconSrc" style="width:1.2rem;height:1.2rem;">
      <span class="number" v-if="className=='competition-count'">{{numberComma}}개</span>
      <span class="number" v-else-if="className=='team-count'">{{numberComma}}</span>
      <span class="number" v-else-if="className=='prize-money'">{{number.toString()[0]}}억 {{number.toString().slice(1)}}만원</span>
      <span class="title">{{title}}</span>
    </li>
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
    <ul class="status-list">
      <status-element
        v-bind:className="'competition-count'"
        v-bind:iconSrc="'D:/Programming/WEB/dacon-clone/src/img/throphy.svg'"
        v-bind:number="49"
        v-bind:title="'대회 개최'"
      ></status-element>
      <status-element
        v-bind:className="'team-count'"
        v-bind:iconSrc="'D:/Programming/WEB/dacon-clone/src/img/team.svg'"
        v-bind:number="34599"
        v-bind:title="'팀 참여'"
      ></status-element>
      <status-element
        v-bind:className="'prize-money'"
        v-bind:iconSrc="'D:/Programming/WEB/dacon-clone/src/img/money-pack.svg'"
        v-bind:number="37050"
        v-bind:title="'상금'"
      ></status-element>
    </ul>
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
