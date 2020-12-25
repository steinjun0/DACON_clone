//--------------- Main Menu ---------------

var MainMenus = {
  props: { menus: Array },
  template: `
    <ul class="main-menu" id="main-menus">
      <li class="menu" v-for= "menu in menus">
        <a v-bind:href="menu.href"> {{menu.title}} </a>
      </li>
      <li class="menu">
        <span id="menu-more">더보기</span>
      </li>
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
    <div class="profile-drop-down">
      <div class="profile-drop-down-top"> {{userName}} </div>
      <ul class="profile-drop-down-bottom">
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
  data: function () {
    return {
      unread: 2,
      notifications: [
        {
          content: "데이콘에 가입하신 것을 진심으로 환경합니다.",
          time: "1달전",
          isRead: true,
        },
        {
          content: "컴퓨터 비전 학습 경진대회 대회종료가 임박하였습니다.",
          time: "2주전",
          isRead: true,
        },
      ],
    };
  },
  // style="cursor:pointer;" a 태그가 아니더라도 마우스 커서를 손 모양으로 변경
  template: `

  <div class="notification-drop-down">
    <div class="notification-drop-down-top">
      <div class="notification-top-left">
        <span>알림</span>
        <span id="notification-count">{{notificationCount}}</span>
      </div>

      <ul style="cursor:pointer;" class="list">
        <li v-on:click = "$emit('check-all')">모두 읽음</li>
        <li v-on:click = "$emit('delete-all')">모두 삭제</li>
        <li v-on:click = "$emit('switch-notification-drop-down')">닫기</li>
      </ul>

    </div>

    <div class="notification-contents">
      <div class="notification-content" v-for = "notification in notifications">
        <div class="comment-and-time">
          <span class="notification-comment" v-if="!notification.isRead" style="color: --dacon-color;">{{notification.content}}</span>
          <span class="notification-time" v-if="!notification.isRead" style="color: --dacon-color;">{{notification.time}}</span>
          <span class="notification-comment" v-if="notification.isRead" style="color: --light-gray;">{{notification.content}}</span>
          <span class="notification-time" v-if="notification.isRead" style="color: --light-gray;">{{notification.time}}</span>
        </div>
        <img class="times-solid" src="src/img/times-solid.svg" style="color: --dacon-color; height: 0.8rem; width: 0.8rem;">
      </div>
    </div>
  </div>

  `,
};

//--------------- Right Top Composition ---------------

var navigationSearchAndPrivate = {
  data: function () {
    return {
      notificationDropDownOpen: false,
      profileDropDownOpen: false,
    };
  },
  // img의 확장자가 현재 없음. 하지만 img태그 내부이기 때문에 작동함. (site 에서 받아올 때 확장자가 없음)
  template: `
  
  <div class="right-top">
  
    <div class="navigation-search-and-private">
      <div class="member">
        <a href="search.html">
          <img id="search" src="src/img/search-icon.svg" alt="search" />
        </a>
      </div>
      <div class="member">
        <img src="src/img/notification-icon.svg" alt="search" style="cursor:pointer;"
        v-on:click="controlNotiAndProfile('notification')"/>
      </div>
      <div class="member">
        <img src="src/img/profile-img" alt="search" style="width:40px;height:40px;cursor:pointer;"
        v-on:click="controlNotiAndProfile('profile')"/> 
      </div>
    </div>
    <div class="dropdown">
      <notification-drop-down 
        v-on:check-all="checkAll"
        v-on:delete-all="deleteAll"
        v-on:switch-notification-drop-down="notificationDropDownOpen = !notificationDropDownOpen"
        v-show="notificationDropDownOpen"
        v-bind:notificationCount="2"
      ></notification-drop-down>
      <profile-drop-down
        v-show="profileDropDownOpen"
        v-bind:userName="'junyoung'"
      ></profile-drop-down>
    </div>
  </div>
  `,
  components: {
    "notification-drop-down": notificationDropDown,
    "profile-drop-down": profileDropDown,
  },

  methods: {
    checkAll: function () {
      this.unread = 0;
    },
    deleteAll: function () {
      this.notification = [];
    },
    switchnotificationDropDown: function () {
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

var navigationVue = new Vue({
  el: "#navigation",
  components: {
    "navigation-search-and-private": navigationSearchAndPrivate,
    "navigation-menu": navigationMenu,
  },
});
