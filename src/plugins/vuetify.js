import Vue from "vue";
import Vuetify from "vuetify/lib";
import it from "vuetify/es5/locale/it";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#607d8b",
        accent: "#cddc39",
        error: "#ff5722",
        warning: "#ffc107",
        info: "#795548",
        success: "#4caf50",
        background: "#212121"
      }
    }
  },
  lang: {
    locales: { it },
    current: "it"
  },
  icons: {
    iconfont: "md"
  }
});
