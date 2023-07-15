import { createApp } from 'vue'
import './style.less'
import App from './App.vue'

// 本地引入
import VerneyUI, {Waterfall} from '../packages/index';
// npm包引入
// import VerneyUI, {Waterfall} from 'vue3-verney-ui';
// import "vue3-verney-ui/style";

console.log(VerneyUI, Waterfall);

createApp(App)
.use(VerneyUI)
.mount('#app')
