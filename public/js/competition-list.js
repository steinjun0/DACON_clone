var competitionList = {
  props: {
    listData: Array,
  },
  // !!!! 주의: src와 같이 string 데이터를 넣어줄 때는 꼭 따옴표로 한번 더 감싸줘야한다. !!!!
  template: `
    <ul class="competition-list">
      <li class="competition-list-element-full" v-for="listElement in listData">
        <img class="competition-img" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo_cpt.jpeg'">
        <div class="element-left">
          <div class="competition-name">{{listElement.name}}</div>
          <div class="competition-keyword">{{listElement.keyword}}</div>
          <ul class="sponsor-logo-list">
            <img class="sponsor-logo" v-if="listElement.logo1 == 1" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo1.jpeg'">
            <img class="sponsor-logo" v-if="listElement.logo2 == 1" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo2.jpeg'">
            <img class="sponsor-logo" v-if="listElement.logo3 == 1" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo3.jpeg'">
            <img class="sponsor-logo" v-if="listElement.logo4 == 1" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo4.jpeg'">
            <img class="sponsor-logo" v-if="listElement.logo5 == 1" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo5.jpeg'">
          </ul>
        </div>
        <ul class="element-right">
          <li>
            <div class="light-and-text">
              <div class="status-light">
              </div>
              <div class="status-text">미참가</div>
            </div>
          <li class="dday-and-participants">
            <span v-if="listElement.period_dday != -1">D-{{listElement.period_dday}} ·</span>
            <span>{{listElement.participants}}팀</span>
          </li>
          <!-- prize -->
          <li v-if="listElement.prize_info == '' && listElement.prize !== ''" class="prize-info">{{listElement.prize}}만원</li>
          <!-- prize_info -->
          <li v-else-if="listElement.prize_info !== '' && listElement.prize_info.length >= 20 " style="font-size:1rem;" class="prize-info">{{listElement.prize_info}}</li>
          <li v-else-if="listElement.prize_info !== '' && listElement.prize_info.length < 20 " class="prize-info">{{listElement.prize_info}}</li>
        </ul>
      </li>
      <li class="competition-list-element-mobile" v-for="listElement in listData">
        <img class="competition-img" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo_cpt.jpeg'">
        <div class="element-text">
          <div class="competition-name" v-if="listElement.name.length < 24 " style="font-size:1.1rem;">{{listElement.name}}</div>
          <div class="competition-name" v-else-if="listElement.name.length >= 24 && listElement.name.length < 27" style="font-size:0.9rem;">{{listElement.name}}</div>
          <div class="competition-name" v-else-if="listElement.name.length >= 27 && listElement.name.length < 30" style="font-size:0.85rem;">{{listElement.name}}</div>
          <div class="competition-name" v-else-if="listElement.name.length >= 27" style="font-size:0.8rem;">{{listElement.name}}</div>
          <div class="competition-keyword">{{listElement.keyword}}</div>
          <ul class="sponsor-logo-list">
            <img class="sponsor-logo" v-if="listElement.logo1 == 1" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo1.jpeg'">
            <img class="sponsor-logo" v-if="listElement.logo2 == 1" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo2.jpeg'">
            <img class="sponsor-logo" v-if="listElement.logo3 == 1" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo3.jpeg'">
            <img class="sponsor-logo" v-if="listElement.logo4 == 1" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo4.jpeg'">
            <img class="sponsor-logo" v-if="listElement.logo5 == 1" v-bind:src="'https://dacon.s3.ap-northeast-2.amazonaws.com/competition/'+listElement.cpt_id+'/logo5.jpeg'">
          </ul>
        
          <ul class="element-detail">
            <li class="basic-detail">
              <div class="light-and-text">
                <div class="status-light">
                </div>
                <div class="status-text">미참가</div>
              </div>
              <div class="divider">|</div>
              <div class="dday-and-participants">
                <span v-if="listElement.period_dday != -1">D-{{listElement.period_dday}} ·</span>
                <span>{{listElement.participants}}팀</span>
              </div>
            </li>
            <!-- prize -->
            <li v-if="listElement.prize_info == '' && listElement.prize !== ''" class="prize-info">{{listElement.prize}}만원</li>
            <!-- prize_info -->
            <li v-else-if="listElement.prize_info !== '' && listElement.prize_info.length >= 25 " style="font-size:0.6rem;" class="prize-info">{{listElement.prize_info}}</li>
            <li v-else-if="listElement.prize_info !== '' && listElement.prize_info.length < 25 " class="prize-info">{{listElement.prize_info}}</li>
          </ul>
        </div>
      </li>
    </ul>
  `,
};

var listAPIUrl_v = "https://newapi.dacon.io/main/public_list_all_scroll/0";
var listData_v = [];

var competitionListVue;

var requestMoreListFunction = function requestMoreList() {
  const promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      "https://newapi.dacon.io/main/public_list_all_scroll/" +
        competitionListVue._data.listAPIUrlIndex,
      true
    );
    xhr.responseType = "json";
    xhr.onload = function () {
      var status = xhr.status;

      if (status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.response);
      }
    };
    xhr.send();
  });

  promise.then((listApiResponse) => {
    if (listApiResponse.data.length == 10) {
      competitionListVue._data.listData = competitionListVue._data.listData.concat(
        listApiResponse.data
      );

      competitionListVue._data.listAPIUrlIndex += 10;
    } else if (listApiResponse.data.length < 10) {
      competitionListVue._data.listData = competitionListVue._data.listData.concat(
        listApiResponse.data
      );

      competitionListVue._data.listAPIUrlIndex += listApiResponse.data.length;
      competitionListVue._data.moreButtonShow = false;
    }
    if (listApiResponse.data.length == 0) {
      competitionListVue._data.moreButtonShow = false;
    }
  });
};

// competitions list 정보를 받아온 후에 화면을 구성해야 하기 떄문에
// promise를 사용하고, resolve.then에서 vue를 생성한다.
// competitions list는 dacon api 주소를 통해 받아온다.

const promise = new Promise((resolve, reject) => {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", listAPIUrl_v, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      resolve(xhr.response);
    } else {
      reject(xhr.response);
    }
  };
  xhr.send();
});

promise.then((listApiResponse) => {
  competitionListVue = new Vue({
    el: "#competition-list-wrap",
    components: {
      "competition-list": competitionList,
    },
    data: {
      listData: listApiResponse.data,
      listAPIUrlIndex: 10,
      moreButtonShow: true,
    },

    created: function () {
      //console.log(this.listData);
    },
    methods: {
      requestMoreList: requestMoreListFunction,
    },
  });
  //console.log(competitionListVue);
});
