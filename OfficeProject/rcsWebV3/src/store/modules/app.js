import Cookies from 'js-cookie'
const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus'),
            withoutAnimation: false
        },
        device: 'desktop',
        isLoading: false,
        videoUrl:'',
        infoPushFlag:true,
        bus:{},
    },
    mutations: {
        UPDATE_LOADING_STATUS: (state, payload)=> {
            state.isLoading = payload.isLoading
        },
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 1)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },
        SET_VIDEO_URL: (state, videoUrl) => {
            state.videoUrl = videoUrl
        },
        SET_INFO_PUSH_FLAG: (state, flag) => {
            state.infoPushFlag = flag
        },
        UPDATE_BUS: (state, obj) => {
            state.bus = Object.assign({},state.bus,obj)
        }
    },
    actions: {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        },
        closeSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        toggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        },
    }
}

export default app
