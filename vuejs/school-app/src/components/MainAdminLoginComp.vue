<template>
  <div id="admin_login">
    <HeaderComp></HeaderComp>
    <Header2Comp></Header2Comp>
    <div class="acc_log">
      <label for="phone">ورود مدیران</label>
      <div class="phone_div">
        <i class="fa fa-user"></i>
        <input type="text" placeholder="نام کاربری" name="username" ref="username" />
      </div>
      <div class="phone_div">
        <i class="fa fa-lock"></i>
        <input
          type="password"
          placeholder="پسورد"
          name="password"
          ref="password"
        />
      </div>
      <div class="end">
        <input id="sub" type="submit" value="ورود" @click="login">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from 'sweetalert';
import HeaderComp from "./HeaderComp.vue";
import Header2Comp from "./Header2Comp.vue";

export default {
    name: "MainAdminLoginComp",
    data() {
        return {
            username: null,
            password: null,
        };
    },
    metaInfo: {
        title: "ورود ادمین",
    },
    methods: {
        login() {
            this.username = this.$refs.username.value;
            this.password = this.$refs.password.value;
            if (this.username == "admin" && this.password == "admin") {
                axios.post("http://localhost:1400/create_token", {
                    username: this.username,
                    password: this.password,
                })
                    .then((response) => {
                    this.$session.set("jwt", response.data);
                    window.location.href = "/admin";
                });
            }
            else {
                swal({
                    title: "خطا",
                    icon: "error",
                    text: "نام کاربری یا رمز عبور اشتباه است"
                });
            }
        },
    },
    components: { HeaderComp, Header2Comp }
};
</script>

<style>

 .acc_log {
  height: 300px;
  width: 500px;
  margin-right: 600px;
  margin-top: 80px;
}
.acc_log label {
  font-weight: 400;
  font-size: 14px;
  color: #1f1f1e;
}
.acc_log .phone_div {
  margin-top: 35px;
  width: 350px;
  height: 50px;
  position: relative;
}
.acc_log .phone_div i {
  position: absolute;
  left: 9px;
  top: 7px;
  font-size: 20px;
  padding: 10px;
}
 .acc_log .phone_div input {
  height: 50px;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 17px;
  color: black;
  width: 350px;
}
 .acc_log .end {
  height: 100px;
  margin-top: 30px;
  width: 350px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.acc_log .end a {
  color: blue;
}
 .acc_log .end span {
  font-size: 14px;
  font-weight: 400;
  margin-left: 15px;
  word-spacing: -2px;
  color: #1f1f1e;
}
 .acc_log .end .login_btn {
  height: 60px;
  width: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: yellow;
}
 .acc_log .end .login_btn:hover {
  transition: 0.2s;
  box-shadow: 0 0 15px rgb(232, 164, 68);
  scale: 1.1;
}
 .acc_log .end .login_btn i {
  font-weight: 400;
  font-size: 25px;
  cursor: pointer;
}
 .acc_log .end #sub{
  background-color: yellow;
  cursor: pointer;
  border: none;
  height: 50px;
  width: 200px;
  border-radius: 7px; 
}
.acc_log .end #sub:hover
{
  transition: 0.1s all;
  background-color: brown;
}
.acc_log .end #sub:hover 
{
  color: white;
}
</style>
