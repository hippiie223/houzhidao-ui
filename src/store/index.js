import Vue from 'vue'
import Vuex from 'vuex'

import head from './modules/head'
import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        head,
        app,
        user
    }
})
