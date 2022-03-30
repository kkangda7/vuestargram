import {
  createStore
} from 'vuex'
import axois from 'axios'
import data from './vuestar'

const store = createStore({
  state() {
    return {
      name: "kim",
      age: 40,
      likes: 30,
      좋아요눌렀니: false,
      more: {},
      더보기: 0,
      인스타데이터: data,
    }
  },
  mutations: {
    이름변경(state) {
      state.name = "park"
    },
    나이먹기(state, data) {
      state.age += data
    },
    increaseLike(state) {
      if (state.좋아요눌렀니 == false) {
        state.likes++
        state.좋아요눌렀니 = true;
      } else {
        state.likes--
        state.좋아요눌렀니 = false;
      }
    },
    setMore(state,data) {
      state.more = data;
      state.인스타데이터.push(data)
    }
  },
  actions: {
    getData(context) {
      axois.get('https://codingapple1.github.io/vue/more0.json')
        .then((res) => {
          context.commit('setMore', res.data)
        }).catch((err) => {
          console.log(err);
        })
    }
  }
})

export default store