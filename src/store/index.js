import Vue from 'vue'
import Vuex from 'vuex'
import { info } from '../api/index'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        state: {},
    },
    mutations: {
        changeData (state, val) {  // store中的数据只能通过commit mutation来改变
            state.state = val
        }
    },
    actions: {
        getInfo (context) {
            info().then(res => {
                if (res.code !== 0) {
                    this.$message.error(res.message)
                } else {
                    context.commit('changeData', res.data)
                }
            }).catch(err => {
                console.log(err);
                
            });
        }
    }
})