import en from './assets/idiomas/en.json'
import pt from './assets/idiomas/pt.json'

import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n);

window.i18n = VueI18n;

export default new VueI18n({
    locale: localStorage.lang || 'en',
    messages:{
        en:en,
        pt:pt
    }
})
