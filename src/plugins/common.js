export default {
    install(Vue, options) {
        /**
         * 日期格式化
         */
        Vue.prototype.$dateformat =  (s) => {
            return s?new Date(s).toLocaleString():''
        }
    }
}

