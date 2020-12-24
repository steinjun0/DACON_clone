//--------------- Main Menu ---------------

var MainMenus = {
  props: { menus: Array },
  template: `
    <ul class="main-menu" id="main-menus">
      <li class="menu" v-for= "menu in menus">
        <a v-bind:href="menu.href"> {{menu.title}} </a>
      </li>

      <li class="menu-more">더보기</li>
    </ul>
  `,
};

var navigationMenu = {
  template: `
    <div class="main-menus">
      <main-menus v-bind:menus="menus"></main-menus>
    </div>
  `,
  components: { "main-menus": MainMenus },
  data: function () {
    return {
      menus: [
        { href: "competitions", title: "대회" },
        { href: "codeshare", title: "코드 공유" },
        { href: "forum", title: "포럼" },
        { href: "hackathon.html", title: "교육" },
        { href: "ranking.html", title: "랭킹" },
      ],
    };
  },
};

//--------------- Right Top ---------------
//--------------- DropDowns ---------------

var profileDropDown = {
  props: {
    userName: String,
  },
  template: `
    <div>
      <div> userName </div>
      <ul>
        <li><a href="myprofile.html">프로필</a></li>
        <li><a href="account.html">계정 관리</a></li>
        <li><a href="landing.html">로그아웃</a></li>
      </ul>
    </div>
  `,
};

var notificationDropDown = {
  props: {
    notificationCount: Number,
  },
  // style="cursor:pointer;" a 태그가 아니더라도 마우스 커서를 손 모양으로 변경
  template: `
    <div>
      <span>알림 {{notificationCount}}</span>
      <ul style="cursor:pointer;">
        <li v-on:click = "$emit('check-all')">모두 읽음</li>
        <li v-on:click = "$emit('delete-all')">모두 삭제</li>
        <li v-on:click = "$emit('switch-notificationDropDown')">닫기</li>
      </ul>
    </div>
  `,
};

//--------------- Right Top Composition ---------------

var Private = {
  data: function () {
    return {
      notificationDropDownOpen: false,
      profileDropDownOpen: false,
      unread: 2,
      notification: [
        {
          content: "데이콘에 가입하신 것을 진심으로 환경합니다.",
          time: "1달전",
          isRead: 0,
        },
        {
          content: "컴퓨터 비전 학습 경진대회 대회종료가 임박하였습니다.",
          time: "2주전",
          isRead: 0,
        },
      ],
    };
  },
  // img의 확장자가 현재 없음. 하지만 img태그 내부이기 때문에 작동함. (site 에서 받아올 때 확장자가 없음)
  template: `
  <span>
    <img src="src/notification-icon.svg" alt="search" style="cursor:pointer;"
    v-on:click="controlNotiAndProfile('notification')"/>
    <img src="src/profile-img" alt="search" style="width:40px;height:40px;cursor:pointer;"
    v-on:click="controlNotiAndProfile('profile')"/> 
    <notification-drop-down 
      v-on:check-all="checkAll"
      v-on:delete-all="deleteAll"
      v-on:switch-notificationDropDown="notificationDropDownOpen = !notificationDropDownOpen"
      v-show="notificationDropDownOpen"
    ></notification-drop-down>
    <profile-drop-down
      v-show="profileDropDownOpen"
    ></profile-drop-down>
  </span>
  `,
  components: {
    "notification-drop-down": notificationDropDown,
    "profile-drop-down": profileDropDown,
  },

  methods: {
    checkAll: function () {
      unread = 0;
    },
    deleteAll: function () {
      notification = [];
    },
    switchNotificationDropDown: function () {
      this.notificationDropDownOpen = !this.notificationDropDownOpen;
    },
    switchProfileDropDown: function () {
      this.profileDropDownOpen = !this.profileDropDownOpen;
    },
    controlNotiAndProfile: function (flag) {
      console.log(flag);

      if (flag == "notification") {
        if (
          // noti: Off, profile: On => on, Off
          this.notificationDropDownOpen == false &&
          this.profileDropDownOpen == true
        ) {
          this.notificationDropDownOpen = true;
          this.profileDropDownOpen = false;
        } else if (
          // noti: On, profile: Off => Off, Off
          this.notificationDropDownOpen == true &&
          this.profileDropDownOpen == false
        ) {
          this.notificationDropDownOpen = false;
          this.profileDropDownOpen = false;
        } else if (
          // noti: Off, profile: Off => On, Off
          this.notificationDropDownOpen == false &&
          this.profileDropDownOpen == false
        ) {
          this.notificationDropDownOpen = true;
          this.profileDropDownOpen = false;
        }
      } else if (flag == "profile") {
        if (
          // noti: Off, profile: On => Off, Off
          this.notificationDropDownOpen == false &&
          this.profileDropDownOpen == true
        ) {
          this.notificationDropDownOpen = false;
          this.profileDropDownOpen = false;
        } else if (
          // noti: On, profile: Off => Off, On
          this.notificationDropDownOpen == true &&
          this.profileDropDownOpen == false
        ) {
          this.notificationDropDownOpen = false;
          this.profileDropDownOpen = true;
        } else if (
          // noti: Off, profile: Off => Off, On
          this.notificationDropDownOpen == false &&
          this.profileDropDownOpen == false
        ) {
          this.notificationDropDownOpen = false;
          this.profileDropDownOpen = true;
        }
      }
    },
  },
};

var navigationSearchAndPrivate = {
  template: `
  <div class="navigation-search-and-private">
    <a href="search.html">
      <img src="src/search-icon.svg" alt="search" />
    </a>
    <private></private>
  </div>
  `,
  components: { private: Private },
};

var navigationVue = new Vue({
  el: "#navigation",
  components: {
    "navigation-search-and-private": navigationSearchAndPrivate,
    "navigation-menu": navigationMenu,
  },
  data: {
    notificationDropDownOpen: false,
    profileDropDownOpen: false,
  },
});
