<template>
    <div id="header">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            </head>
        <div class="left">
            <div class="subleft">
                <router-link to="/user"><i class="fa fa-user"></i></router-link>
                <router-link to="/user"><span>ورود کاربران</span></router-link>
            </div>
        </div>
        <div class="right">
            <a href="/"><h2>نام مدرسه</h2></a>
        </div>
    </div>
</template>

<script>
export default {
  name: "HeaderComp",
};
</script>

<style>
#header 
{
    height: 100px;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#header .left , #header .right
{
    width: 50%;
    height: 100px;
}
#header .left
{
    display: flex;
    justify-content: center;
    align-items: center;
}
#header .left .subleft
{
    width: 20%;
    height: 100px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
#header .left .subleft i 
{
    color: red;
}
#header .left .subleft i:hover
{
    scale: 1.5;
    color: brown;
    transition: 0.2s all ;
}
#header .left .subleft span
{
    color: red;
}
#header .left .subleft span:hover
{
    color: rgb(33, 13, 13);
    transition: 0.2s all ;
    
}
#header .right
{
    display: flex;
    justify-content: center;
    align-items: center;
}
#header .right h2
{
    color: #717171;
}
</style>