import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Categories from "../components/Menu/Categories";
import Tag from "../components/Menu/Tag";
import Allergen from "../components/Menu/Allergen";
import Items from "../components/Menu/Items/Items";
import Settings from "../views/Settings";
import Media from "../views/Media";
import AddMedia from "../views/AddMedia";
import Orders from "../components/Orders";
import Base from "../components/Base";
import MediaPicker from "../components/Media/MediaPicker";
import AddItem from "../components/Menu/Items/AddItem";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "orders",
        component: Orders,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "categories",
        name: "menu-categories",
        component: Categories,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "tags",
        name: "menu-tags",
        component: Tag,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "items",
        name: "menu-items",
        component: Items,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "add-item",
        name: "add-item",
        component: AddItem,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "edit-item/:id",
        name: "edit-item",
        component: AddItem,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "allergens",
        name: "menu-allergens",
        component: Allergen,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "media",
        component: Base,
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: "",
            name: "media",
            component: Media,
            meta: {
              requiresAuth: true
            }
          },
          {
            path: "add",
            name: "add-media",
            component: AddMedia,
            meta: {
              requiresAuth: true
            }
          },
          {
            path: "picker",
            name: "media-picker",
            component: MediaPicker,
            meta: {
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: "settings",
        name: "settings",
        component: Settings,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  {
    path: "/login",
    name: "Login",
    meta: {
      guest: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("user-token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("user-token") == null) {
      next();
    } else {
      next({ name: "Dashboard" });
    }
  } else {
    next();
  }
});

export default router;
