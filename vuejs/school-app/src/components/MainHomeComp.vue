<template>
    <div id="home">
        <HeaderComp></HeaderComp>
        <Header2Comp></Header2Comp>
        <br>
        <br>
        <div class="img" v-for="i in data" :key="i._id">
            <img  :src="
            require(`D://Web Project/school/nodejs/uploads/gallery/${i.image}`)
          " alt="">
            <div class="caption">
                <span>{{i.caption}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import HeaderComp from "./HeaderComp.vue";
import Header2Comp from "./Header2Comp.vue";
export default {
    name: "MainHomeComp",
    metaInfo: {
        title: "صفحه اصلی",
    },
    data() {
        return {
            data : null
        }
    },
    components: { HeaderComp, Header2Comp },
    mounted() {
        axios.get("http://localhost:1400/gallery").then((response)=>{
            this.data = response.data;
        })
    },
};
</script>

<style>
#home .img 
{
    height: 550px;
    width: 650px;
    margin-top: 25px;
    margin-left: auto;
    margin-right: auto;
}
#home .img img
{
    height: 500px;
    width: 650px;
}
#home .caption 
{
    width: 650px;
    height: 50px;
    margin-top: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>