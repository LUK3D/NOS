import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({

    theme: {
        themes: {
          light: {
            bg: '#262739',
            fg: '#2B2F42',
            white: '#FAFCFC',
            error: '#b71c1c',
            primary: '#02D8A7',
          },
        },
      },
});
