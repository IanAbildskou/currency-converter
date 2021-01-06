import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import { MdField, MdMenu, MdList, MdButton, MdAutocomplete } from 'vue-material/dist/components'
import * as lol from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
console.log(lol);
Vue.prototype.$http = axios
Vue.use(MdField)
Vue.use(MdAutocomplete)
Vue.use(MdMenu)
Vue.use(MdList)
Vue.use(MdButton)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
