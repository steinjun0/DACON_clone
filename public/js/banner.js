Vue.component("banner-content", {
  props: {
    title: String,
    subtitle: String,
    buttonMessage: String,
    bannerIndex: Number,
  },
  template: `
    <div class = "banner-content">
      <img src="/img/left-move-button-icon.svg" id="banner-left-button" class="banner-move-button"  v-on:click="$emit('move-left')"></img>
      <div class="banner-text">
        <div class="banner-title">{{title}}</div>
        <div class="banner-subtitle">{{subtitle}}</div>
        <button class="participation-button">{{buttonMessage}}</button> 
        <div class="index-icons">
        <transition name="banner-index" mode="out-in">
          <div
            class="on"
            id="banner-index-0-on"
            v-if="bannerIndex == 0"
            key="on"
            v-on:click="$emit('change-index', 0)"
          ></div>
          <div v-on:click="$emit('change-index', 0)" class="off" id="banner-index-0-off" v-else key="off"></div>
        </transition>
        <transition name="banner-index" mode="out-in">
          <div
            class="on"
            id="banner-index-1-on"
            v-if="bannerIndex == 1"
            key="on"
            v-on:click="$emit('change-index', 1)"
          ></div>
          <div v-on:click="$emit('change-index', 1)" class="off" id="banner-index-1-off" v-else key="off"></div>
        </transition>
        <transition name="banner-index" mode="out-in">
          <div
            class="on"
            id="banner-index-2-on"
            v-if="bannerIndex == 2"
            key="on"
            v-on:click="$emit('change-index', 2)"
          ></div>
          <div v-on:click="$emit('change-index', 2)" class="off" id="banner-index-2-off" v-else key="off"></div>
        </transition>
        <transition name="banner-index" mode="out-in">
          <div
            class="on"
            id="banner-index-3-on"
            v-if="bannerIndex == 3"
            key="on"
            v-on:click="$emit('change-index', 3)"
          ></div>
          <div v-on:click="$emit('change-index', 3)" class="off" id="banner-index-3-off" v-else key="off"></div>
        </transition>
        </div>
      </div>
      <img src="/img/right-move-button-icon.svg" id="banner-right-button" class="banner-move-button"  v-on:click="$emit('move-right')">
    </div>
  `,
});

var bannerContentsTemplate =
  // 1. property에서 변수를 사용하려면 v-bind를 사용해야하기 때문에 아래의 형식으로 작성해야한다.
  // https://stackoverflow.com/questions/35242272/vue-js-data-bind-style-backgroundimage-not-working
  // bannerContents[bannerIndex].imgSrc의 값도 일반적인 값과는 다르다. 아래 참고
  // 2. button-message를 props에서 받을 때는 buttonMessage로 받는다. kebab, paskal 변환 조심
  `
    <div class="banner-contents" :style="{backgroundImage: 'url(' + bannerContents[bannerIndex].imgSrc + ')' }">
      <banner-content
        v-bind:title="bannerContents[bannerIndex].title"
        v-bind:subtitle="bannerContents[bannerIndex].subtitle"
        v-bind:button-message="bannerContents[bannerIndex].buttonMessage"
        v-bind:banner-index="bannerIndex"
        v-on:move-left="$emit('move-left')"
        v-on:move-right="$emit('move-right')"
        v-on:change-index="$emit('change-index',$event)">
        </banner-content>
    </div>
  `;

var bannerVue = new Vue({
  el: "#banner-wrap",
  components: {
    banner0: {
      // 1. 반복되는 코드이지만 사진이 달라지고 dynamic components를
      //    사용하려니 중복 코드가 생길수 밖에 없다.
      // 2. vue 객체 내부 components 선언에서 사용할 component는
      //      전역으로 선언하지 않으면 오류가 발생한다
      //      <banner-content>
      props: {
        bannerContents: Array,
        bannerIndex: Number,
      },
      // 같은 객체 내에 있지만 현재 영역은 component의 영역이므로
      // vue 객체의 data에 접근할 수 없다.
      // 따라서 현 component를 선언할 때 v-bind를 사용해
      // 데이터를 전달하여 props로 사용해야 한다.

      template: bannerContentsTemplate,
      // 반복으로 인해 변수로 변경
      // 다시 상기하자면, transition이 dynamic component를 필요로 하여서
      // 같은 내용의 banner component를 여러번 선언하는 것이다.
    },
    banner1: {
      props: {
        bannerContents: Array,
        bannerIndex: Number,
      },
      template: bannerContentsTemplate,
    },
    banner2: {
      props: {
        bannerContents: Array,
        bannerIndex: Number,
      },
      template: bannerContentsTemplate,
    },
    banner3: {
      props: {
        bannerContents: Array,
        bannerIndex: Number,
      },
      template: bannerContentsTemplate,
    },
  },
  data: {
    bannerComponent: "banner0", //"banner"는 components의 banner. 진짜 문자열이다!
    bannerComponents: ["banner0", "banner1", "banner2", "banner3"], // 이것도 문자열 리스트!!
    bannerContents: [
      {
        // 변수로 사용하니 기본 탐색경로가 지정되지 않고 D:/src/img... 와 같이 전달되어서 절대경로로 설정해줌
        imgSrc: "/img/space-information-banner.png",
        title: "공간정보 탐색적 데이터 분석 경진대회",
        subtitle: "국토도시 빅데이터 인터스쿨 | 국토연구원 | 시각화 | 유저평가",
        buttonMessage: "대회 참여",
      },
      {
        imgSrc: "/img/solar-power-plant-banner.png",
        title: "태양광 발전량 예측 AI 경진대회",
        subtitle:
          "지역의 기상 데이터와 과거 발전량 데이터를 활용하여, 시간대별 태양광 발전량을 예측",
        buttonMessage: "대회 참여",
      },
      {
        imgSrc: "/img/dacon-cup-banner.png",
        title: "2020 DACON CUP",
        subtitle: "월간 데이콘 | 시계열 | 정형 | 데이콘 데이터",
        buttonMessage: "대회 참여",
      },
      {
        imgSrc: "/img/recruit-banner.png",
        title: "데이콘에서 개발자를 채용합니다.",
        subtitle: "데이콘에서 vue.js + nuxt.js 개발자를 채용합니다.",
        buttonMessage: "더보기",
      },
    ],
    bannerIndex: 0,
    autoTimer: null,
  },
  methods: {
    moveLeft: function () {
      if (this.bannerIndex == 0) {
        this.bannerIndex = 3;
        this.bannerComponent = this.bannerComponents[this.bannerIndex];
      } else {
        this.bannerComponent = this.bannerComponents[--this.bannerIndex];
      }
    },
    moveRight: function () {
      if (this.bannerIndex == 3) {
        this.bannerIndex = 0;
        this.bannerComponent = this.bannerComponents[this.bannerIndex];
      } else {
        this.bannerComponent = this.bannerComponents[++this.bannerIndex];
      }
    },
    autoMove: function () {
      this.autoTimer = setInterval(() => {
        this.moveRight();
      }, 5000);
    },
    changeIndex: function (index) {
      this.bannerIndex = index;
      this.bannerComponent = this.bannerComponents[index];
      clearInterval(this.autoTimer);
      this.autoMove();
    },
  },
  created: function () {
    this.autoMove();
  },
});
