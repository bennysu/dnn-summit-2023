import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import moment from 'moment-timezone';
import { IonicVue } from '@ionic/vue';

/* Tailwind Styles */
import './theme/tailwind.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';


const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.config.globalProperties.$format = {
  momentEST(value: any, formatStr: string) {
    return moment.tz(value, 'America/New_York').format(formatStr)
  },
  moment(value: any, formatStr: string) {
    return moment(value).format(formatStr)
  }
}

router.isReady().then(() => {
  app.mount('#app');
});