<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//import axios from 'axios';

export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
  }
};
</script>

<style>
@font-face {
  font-family: iran;
  src: url(./assets/font/iran-yekan-700.ttf);
}

* {
  direction: rtl;
  box-sizing: border-box;
  font-family: iran;
}

body {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
}
:root
{
  --bgcolor : #f5f5f9;
}
</style>
