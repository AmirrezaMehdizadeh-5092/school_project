<template>
    <div id="header2">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>
        <div class="left">
            <router-link to="/">صفحه اصلی</router-link>
            <router-link to="/user">پنل دانش آموزان</router-link>
            <router-link to="/admin">پنل مدیران</router-link>
            <router-link to="/acc-student">دانش آموزان پذیرفته شده</router-link>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
  name: "Header2Comp",
};
</script>

<style>
#header2 
{
    height: 60px;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: red;
}
#header2 .left , #header2 .right
{
    height: 60px;
    padding: 0;
    width: 50%;
}
#header2 .left
{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
#header2 .left a 
{
    color: white;
}
#header2 .left a:hover
{
    scale: 1.1;
    font-weight: bold;
    transition: 0.2s all ease-in-out;
    color: black;

}
</style>