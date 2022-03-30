<template>
  <div style="padding : 10px">
    <div style="padding : 10px">
      <h4>팔로워</h4>
      <input placeholder="검색" @input="search($event.target.value)" />
      <div 
        class="post-header" 
        v-for="(item, i) in follower" 
        :key="i"
      >
        <div 
          class="profile" 
          :style="`background-image : url(${item.image})`"
        ></div>
        <span class="profile-name">
          {{ item.name }}
        </span>
    </div>
  </div>
  </div>
</template>

<script>
import { onMounted, ref, toRefs } from 'vue';
import axios from 'axios'

export default {
  props: {
    one: Number
  },
  setup(props) {
    const follower = ref([])
    let followerOriginal = ref([]);

    const { one } = toRefs(props)
    console.log(one.value);

    const search = (e) => {
      const newFollower = followerOriginal.value.filter((a) => {
        return a.name.indexOf(e) != -1
      });
      follower.value = [...newFollower]
    }

    onMounted (()=> {
    axios.get('/follower.json')
    .then((a)=> {
        follower.value = a.data
        followerOriginal.value = [...a.data];
     }).catch((err)=> {
        console.log(err);
    })
    })

    return {
      follower,
      search,
    }
  }
}
</script>

<style>

</style>