/* eslint-disable vue/multi-word-component-names */
<template>
  <div v-if="step == 0">
    <Post 
      :인스타데이터="인스타데이터[i]" 
      v-for="(data,i) in 인스타데이터" 
      :key="i"
    />
  </div>  
  <!-- 필터선택페이지 -->
  <div 
    v-else-if="step == 1"
  >
    <div 
      :class="gram" 
      class="upload-image" 
      :style="`background-image : url(${이미지})`"
    >
    </div>
    <div class="filters">
      <FilterBox 
        :이미지="이미지"
        :필터="필터"
        v-for="(필터,i) in 필터들"
        :key="i"
      >{{ 필터 }}
      </FilterBox>
    </div>
  </div>

  <!-- 글작성페이지 -->
  <div v-else-if="step == 2">
    <div 
      :class="gram" 
      class="upload-image" 
      :style="`background-image : url(${이미지})`"
    >
    </div>
    <div class="write">
      <textarea class="write-box" @input="$emit('load',$event.target.value)">write!</textarea>
    </div>
  </div>
  <div v-else-if="step == 3">
    <MyPage :one="'1'"></MyPage>  
  </div>
</template>

<script>
import Post from './Post.vue';
import MyPage from './MyPage.vue';
import FilterBox from './FilterBox.vue';
import filters from '@/filters'

export default {
  components: {
    Post,
    FilterBox,
    MyPage
  },
  props: {
    인스타데이터: Array,
    step: Number,
    이미지: String,
  },
  data() {
    return {
      필터들 : filters,
      gram : "",
    }
  },
  mounted(){
    this.emitter.on('filte', (a)=> {
      this.gram = a;
    })
  }
}
</script>

<style>
.upload-image{
width: 100%;
height: 450px;
background: cornflowerblue;
background-size : cover;
}
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-1 {
width: 100px;
height: 100px;
background-color: cornflowerblue;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
}
.filters::-webkit-scrollbar {
height: 5px;
}
.filters::-webkit-scrollbar-track {
background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
background: #888; 
border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
background: #555; 
}
.write-box {
border: none;
width: 90%;
height: 100px;
padding: 15px;
margin: auto;
display: block;
outline: none;
}
</style>