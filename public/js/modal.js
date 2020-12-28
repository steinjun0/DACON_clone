var modalTemplate = `    
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
                <img src="D:/Programming/WEB/dacon-clone/src/img/cancel.svg" class="modal-default-button"  v-on:click="$emit('close')">
                </img>
              </div>

              <div class="modal-body">
                <slot name="title">
                  default title
                </slot>
                <slot name="content">
                  default content
                </slot>
              </div>

            </div>
          </div>
        </div>
      </transition>
`;

// register modal component
Vue.component("modal", {
  template: modalTemplate,
});

// start app
var modalVue = new Vue({
  el: ".footer-wrap",
  data: {
    personalInfoShow: false,
    policyShow: false,
  },
});
