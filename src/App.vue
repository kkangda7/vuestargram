<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li 
        v-if="step == 1" 
        @click="step++"
      >
        Next
      </li>
      <li 
        v-if="step == 2" 
        @click="publish"
      >
        Next
      </li>
    </ul>
    <img 
      src="./assets/logo.png" 
      class="logo" 
    />
  </div>
  <!-- <h4>안녕 {{ $store.state.name }}</h4>
  <h4>{{ $store.state.age }} </h4>
  <button @click="$store.commit('이름변경')">버튼</button>
  <button @click="$store.commit('나이먹기', -1)">나이먹기</button>
  <button @click="$store.dispatch('getData')">더보기버튼</button> -->
  <Container 
    :인스타데이터="인스타데이터"
    :step="step"
    :이미지="이미지"
    @load="작성한글 = $event"
  />
  <button v-if="step == 0" @click="more">
    더보기
  </button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input 
        @change="upload" 
        type="file" 
        id="file" 
        class="inputfile" 
      />
      <label 
        for="file" 
        class="input-plus"
      >
        +
      </label>
    </ul>
 </div>
</template>

<script>
import data from './vuestar'
import Container from './components/Container.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Container
  },
  data() {
    return {
      step: 3,
      인스타데이터: data,
      더보기: 0,
      이미지: "",
      작성한글: "",
      gram: "",
    }
  },
  methods: {
    more() {
      axios.get(`https://codingapple1.github.io/vue/more${this.더보기}.json`)
      .then((res) => {
        this.인스타데이터.push(res.data)
        this.더보기++;
      }).catch((err)=>{
        console.log(err);
      })
    },
    upload(e) {
      let 파일 = e.target.files;
      let url = URL.createObjectURL(파일[0]);
      this.이미지 = url;
      this.step++
    },
    publish() {
      var 내게시물 = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.이미지,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.작성한글,
        filter: this.gram,
      };
      this.인스타데이터.unshift(내게시물);
      this.step = 0;
    },
  },
  computed: {
    name() {
      return this.$store.state.name
    },
    ...mapState(['name','likes','age']),
    ...mapState({ 내이름 : 'name' })
  },
  mounted(){
    this.emitter.on('filte', (a)=> {
      this.gram = a;
    })
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
