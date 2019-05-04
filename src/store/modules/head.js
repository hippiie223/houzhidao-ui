const state = {
    tabName: 'home'
}

const mutations = {
    SET_TABNAME:(state, newTabName) => {
        state.tabName = newTabName
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}