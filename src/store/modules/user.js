const state = {
    path: '/user/home',
    info: {
        id: 111,
        pic: require('@/assets/images/icon.jpg'),
        name: '正在进化的程序猿丶',
        attendNum: 123,
        questionNum: 12,
        answerNum: 1
    }
}

const mutations = {
    SET_PATH: (state, newPath) => {
        state.path = newPath
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