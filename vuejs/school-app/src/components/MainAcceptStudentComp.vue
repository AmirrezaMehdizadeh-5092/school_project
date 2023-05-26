<template>
  <div id="accept">
    <HeaderComp></HeaderComp>
    <Header2Comp></Header2Comp>
    <br />
    <br />
    <select v-model="selected" id="select">
      <option v-bind:value="{ id: 1 }">همه</option>
      <option v-bind:value="{ id: 1401 }">1401</option>
      <option v-bind:value="{ id: 1400 }">1400</option>
      <option v-bind:value="{ id: 1399 }">1399</option>
      <option v-bind:value="{ id: 1398 }">1398</option>
      <option v-bind:value="{ id: 1397 }">1397</option>
      <option v-bind:value="{ id: 1396 }">1396</option>
      <option v-bind:value="{ id: 1395 }">1395</option>
    </select>
    <button id="show" v-on:click="select_fun">نمایش</button>
    <br />
    <br />
    <div class="student">
      <div class="list" v-for="i in data" :key="i._id">
        <div class="img">
          <img
            :src="
              require(`D://Web Project/school/nodejs/uploads/student_image/${i.image}`)
            "
            alt=""
          />
        </div>
        <div class="info">
          <div class="part_info">
            <h3>{{ i.first_name }} {{ i.last_name }}</h3>
          </div>
          <div class="part_info">
            <h3>{{ i.reshte }}</h3>
          </div>
          <div class="part_info">
            <h3>{{ i.university }}</h3>
          </div>
          <div class="part_info">
            <h4>سال ورود : {{ i.year }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeaderComp from "./HeaderComp.vue";
import Header2Comp from "./Header2Comp.vue";
export default {
  name: "MainAcceptStudentComp.vue",
  metaInfo: {
    title: "دانش آموزان پذیرفته شده",
  },
  data() {
    return {
      data: null,
      selected: { id: 1401 },
    };
  },
  components: { HeaderComp, Header2Comp },
  methods: 
  {
    select_fun() 
    {
      if (this.selected.id == 1) {
        axios.get("http://localhost:1400/accept_student").then((response) => {
          this.data = response.data;
        });
      }
      else
      {
        axios
        .post("http://localhost:1400/filter_accept_student", {
          sel: this.selected.id,
        })
        .then((response) => {
          this.data = response.data;
        });
      }
    },
  },
  mounted() {
    axios.get("http://localhost:1400/accept_student").then((response) => {
      this.data = response.data;
    });
  },
};
</script>

<style>
#accept select {
  height: 40px;
  margin-right: 60px;
  width: 200px;
}
#accept button {
  height: 40px;
  width: 100px;
  background-color: blue;
  color: white;
  cursor: pointer;
}
#accept .student {
  width: 100%;
  display: flex;
  justify-content: start;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
#accept .student .list {
  height: 550px;
  width: 33.3%;
  margin-bottom: 2px;
}
#accept .student .list .img {
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#accept .student .list .img img {
  height: 290px;
  width: 300px;
  border-radius: 50%;
}
#accept .student .list .info {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
#accept .student .list .info .part_info {
  width: 100%;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
