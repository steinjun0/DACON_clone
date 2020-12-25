new Vue({
  el: "#banner-wrap",
  components: {
    banner0: {
      template: `
        <div class="banner-contents">
          <div v-on:click="$emit('move-left')">left</div>
          <div>banner0</div>
          <div v-on:click="$emit('move-right')">right</div>
        </div>
      `,
    },
    banner1: {
      template: `
        <div class="banner-contents">
          <div v-on:click="$emit('move-left')">left</div>
          <div>banner1</div>
          <div v-on:click="$emit('move-right')">right</div>
        </div>
      `,
    },
    banner2: {
      template: `
        <div class="banner-contents">
          <div v-on:click="$emit('move-left')">left</div>
          <div>banner2</div>
          <div v-on:click="$emit('move-right')">right</div>
        </div>
      `,
    },
    banner3: {
      template: `
        <div class="banner-contents">
          <div v-on:click="$emit('move-left')">left</div>
          <div>banner3</div>
          <div v-on:click="$emit('move-right')">right</div>
        </div>
      `,
    },
  },
  data: {
    view: "v-a",
    banner: "banner0", //"banner"는 components의 banner. 진짜 문자열이다!
    banners: ["banner0", "banner1", "banner2", "banner3"], // 이것도 문자열 리스트!!
    i: 0,
  },
  methods: {
    moveLeft: function () {
      if (this.i == 0) {
        this.i = 3;
        this.banner = this.banners[this.i];
      } else {
        this.banner = this.banners[--this.i];
      }
    },
    moveRight: function () {
      if (this.i == 3) {
        this.i = 0;
        this.banner = this.banners[this.i];
      } else {
        this.banner = this.banners[++this.i];
      }
    },
  },
});
