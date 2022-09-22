import Vue from 'nativescript-vue'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'
import {store} from "./store";

Vue.use(RadSideDrawer)

import App from './components/App'
store.dispatch("init");
Vue.config.silent = !__DEV__
new Vue({
  store:store,
  render: h => h(App)
}).$start()
