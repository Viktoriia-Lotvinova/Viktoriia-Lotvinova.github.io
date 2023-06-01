import { createApp } from 'vue'
import App from './App.vue'


import './assets/main.css'


import { languages } from './i18n'
import { defaultLocale } from './i18n'
import {createI18n, useI18n} from 'vue-i18n'

const messages = Object.assign(languages);

const localStorageLang = localStorage.getItem('lang');

const  i18n = createI18n({
    legacy:false,
    locale: localStorageLang || defaultLocale,
    fallbackLocale:'en',
    messages
})

 createApp(App,{
    setup(){
        const { t } = useI18n()
        return {t}
    }
 }).use(i18n).mount('#app')
