<template>
  <div id="admin">
    <head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </head>
    <div class="head">
      <h1>پنل مدیران</h1>
    </div>
    <div id="head2">
      <div class="left">
        <span @click="uplode">آپلود عکس</span>
        <span @click="open_student_form">ثبت دانش آموزان پذیرفته شده</span>
      </div>
      <div class="right"></div>
    </div>
    <div class="file" id="file">
      <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <h3>عکس مورد نظر را انتخاب کنید</h3>
        <span style="color: red; font-size: 13px"
          >حداکثر سایز فایل 500 کیلوبایت است</span
        >
        <br />
        <br />
        <input type="file" ref="file" @change="onSelect" />
        <br />
        <input
          type="text"
          name="caption"
          ref="caption"
          placeholder="کپشن را وارد کنید"
        />
        <br />
        <button>بارگذاری</button>
      </form>
    </div>
    <div class="student" id="student">
      <form @submit.prevent="StudentSubmit" enctype="multipart/form-data">
        <div class="part1">
          <div class="phone_div">
            <i class="fa fa-close" @click="clear_input('fname')"></i>
            <input
              type="text"
              placeholder="نام"
              id="fname"
              name="fname"
              ref="fname"
              minlength="2"
            />
          </div>
          <div class="phone_div">
            <i class="fa fa-close" @click="clear_input('lname')"></i>
            <input
              type="text"
              placeholder="نام خانوادگی"
              id="lname"
              name="lname"
              ref="lname"
            />
          </div>
        </div>
        <div class="part1">
          <div class="phone_div">
            <i class="fa fa-close" @click="clear_input('code')"></i>
            <input
              type="text"
              placeholder="کد ملی"
              id="code"
              name="code"
              ref="code"
              minlength="10"
              maxlength="10"
            />
          </div>
          <div class="phone_div">
            <select name="sel" id="sel" v-model="selectedOption" >
              <option v-bind:value="{id : 1}">ریاضی-فیزیک</option>
              <option v-bind:value="{id : 2}">علوم تجربی</option>
              <option v-bind:value="{id : 3}">علوم انسانی</option>
            </select>
          </div>
        </div>
        <div class="part1">
          <div class="phone_div">
            <i class="fa fa-close" @click="clear_input('university')"></i>
            <input
              type="text"
              placeholder="دانشگاه پذیرفته شده"
              id="university"
              name="university"
              ref="university"
            />
          </div>
          <div class="phone_div">
            <i class="fa fa-close" @click="clear_input('reshte')"></i>
            <input
              type="text"
              id="reshte"
              placeholder="رشته پذیرفته شده"
              name="reshte"
              ref="reshte"
            />
          </div>
        </div>
        <div class="part1">
          <div class="phone_div">
            <i class="fa fa-close" @click="clear_input('year')"></i>
            <input
              type="text"
              id="year"
              placeholder="سال پذیرش"
              name="year"
              ref="year"
              minlength="4"
              maxlength="4"
            />
          </div>
          <div class="phone_div">
            <label for="image">عکس دانش آموز را وارد کنید</label>
            <input type="file" ref="file2" @change="select_image" />
          </div>
        </div>
        <div class="part1">
          <div class="end">
            <input id="sub" type="submit" value="ثبت" @click="login" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  name: "FileUpload",
  data() {
    return {
      file: "",
      message: "",
      caption: null,
      file2: null,
      fname : null,
      lname : null,
      code : null,
      university : null,
      reshte : null,
      year : null,
      selectedOption : {id : 2},
      reshte_diplom : null,
    };
  },
  methods: {
    uplode() {
      document.getElementById("student").style.visibility = "hidden";
      document.getElementById("file").style.visibility = "visible";
    },
    open_student_form() {
      document.getElementById("file").style.visibility = "hidden";
      document.getElementById("student").style.visibility = "visible";
    },
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
      }
      if (file.size > 500000) {
        this.message = "Too large, max size allowed is 500kb";
      }
    },
    async onSubmit() {
      this.caption = this.$refs.caption.value;
      const file = this.$refs.file.files[0];
      if (typeof file == "undefined") {
        swal({
          title: "خطا",
          icon: "error",
          text: "لطفا عکس مورد نظر را انتخاب کنید",
        });
      } else {
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("caption", this.caption);
        axios
          .post("http://localhost:1400/check_image", {
            name: this.file.name,
          })
          .then((response) => {
            if (response.data == "xx") {
              swal({
                title: "خطا",
                icon: "error",
                text: "چنین عکسی قبلا بارگذاری شده است",
              }).then(() => {
                window.location.reload();
              });
            } else if (response.data == "aa") {
              try {
                axios.post("http://localhost:1400/upload", formData);
                this.message = "Uploaded!!";
                swal({
                  title: "موفقیت آمیز",
                  icon: "success",
                  text: "عکس مورد نظر با موفقیت بارگذاری شد",
                }).then(() => {
                  window.location.reload();
                });
              } catch (err) {
                swal({
                  title: "خطا",
                  icon: "error",
                  text: "مشکلی پیش آمد لطفا دوبار امتحان کنید",
                });
              }
            }
          });
      }
    },
    clear_input(e) {
      document.getElementById(e).value = "";
    },
    select_image() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      this.file2 = this.$refs.file2.files[0];
      if (!allowedTypes.includes(this.file2.type)) {
        this.message = "Filetype is wrong!!";
      }
      if (this.file2.size > 500000) {
        this.message = "Too large, max size allowed is 500kb";
      }
    },
    async StudentSubmit(){
      if (this.selectedOption.id == 1)
      {
        this.reshte_diplom = "ریاضی-فیزیک"
      }
      else if (this.selectedOption.id == 2)
      {
        this.reshte_diplom = "علوم تجربی"
      }
      else if (this.selectedOption.id == 3)
      {
        this.reshte_diplom = "علوم انسانی"
      }
      this.fname = this.$refs.fname.value;
      this.lname = this.$refs.lname.value;
      this.code = this.$refs.code.value;
      this.university = this.$refs.university.value;
      this.reshte = this.$refs.reshte.value;
      this.year = this.$refs.year.value;
      this.file2 = this.$refs.file2.files[0];
      if(!this.fname || !this.lname || !this.code || !this.university || !this.reshte || !this.year)
      {
        swal({
          title: "خطا",
          icon: "error",
          text: "لطفا تمام فیلد ها را پر کنید",
        });
      }
      else if (typeof this.file2 == "undefined") {
        swal({
          title: "خطا",
          icon: "error",
          text: "لطفا عکس مورد نظر را انتخاب کنید",
        });
      }
      else 
      {
        const formData2 = new FormData();
        formData2.append("file2", this.file2);
        formData2.append("fname", this.fname);
        formData2.append("lname", this.lname);
        formData2.append("code", this.code);
        formData2.append("reshte_diplom", this.reshte_diplom);
        formData2.append("university", this.university);
        formData2.append("reshte", this.reshte);
        formData2.append("year", this.year);
        axios
          .post("http://localhost:1400/ckeck_image_student", {
            name: this.file2.name,
            code : this.code
          })
          .then((response) => {
            if (response.data == "PF") 
            {
              swal({
                title: "چنین دانش آموزی قبلا ثبت شده است",
                icon: "error",
                text: "خطای وجود عکس"
              });
            }
            else if (response.data == "CF")
            {
              swal({
                title: "چنین دانش آموزی قبلا ثبت شده است",
                icon: "error",
                text: "خطای وجود کد ملی",
              });
            } 
            else if (response.data == "aa") {
              try {
                axios.post("http://localhost:1400/set_student", formData2);
                this.message = "Uploaded!!";
                swal({
                  title: "موفقیت آمیز",
                  icon: "success",
                  text: "ثبت مشخصات با موفقیت انجام شد",
                }).then(() => {
                  window.location.reload();
                }).then((response)=>{
                  console.log(response)
                })
              }catch (err) {
                swal({
                  title: "خطا",
                  icon: "error",
                  text: "مشکلی پیش آمد لطفا دوبار امتحان کنید",
                });
              }
            }
          });
      }
    },
  },
  mounted() {
    this.token = this.$session.get("jwt");
    if (!this.token) {
      window.location.href = "/admin_login";
    }
  },
};
</script>
<style>
#admin .head {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#head2 {
  height: 60px;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: red;
}
#head2 .left,
#head2 .right {
  height: 60px;
  padding: 0;
  width: 50%;
}
#head2 .left {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#head2 .left span {
  color: white;
  cursor: pointer;
}
#head2 .left span:hover {
  scale: 1.1;
  font-weight: bold;
  transition: 0.2s all ease-in-out;
  color: black;
}
#admin .file {
  margin-top: 150px;
  margin-right: 675px;
  visibility: hidden;
}
#admin .file input {
  height: 35px;
  width: 210px;
  margin-top: 25px;
  padding: 5px 5px;
  outline: none;
}
#admin .file input:focus-within {
  border-radius: 10px;
  border: 2px solid red;
  outline: none;
}
#admin .file button {
  height: 35px;
  width: 150px;
  margin-top: 25px;
  background-color: aqua;
  border: 1px solid #e1e1e1;
  cursor: pointer;
}
#admin .file button:hover {
  transition: 0.2s all;
  background-color: rgb(19, 118, 118);
  color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px beige;
}
#admin .student {
  height: 500px;
  width: 800px;
  margin-left: auto;
  margin-top: -375px;
  margin-right: auto;
  visibility: hidden;
}
#admin .student .part1
{
  height: 100px;
  width: 800px;
  margin-bottom: 2px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#admin .student .part1 .phone_div {
  margin-top: 15px;
  width: 350px;
  height: 50px;
  position: relative;
}
#admin .student .part1 .phone_div i {
  position: absolute;
  left: 9px;
  top: 5px;
  font-size: 17px;
  padding: 10px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.587);
}
#admin .student .phone_div i:hover {
  transition: 0.1s all ease-in-out;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.893);
}
#admin .student .phone_div input {
  height: 45px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 17px;
  color: black;
  width: 350px;
}
#admin .student  select {
  height: 48px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 17px;
  color: black;
  width: 350px;
  margin-top: 0px;
}
#admin .student .phone_div input:focus-within {
  border-radius: 10px;
  border: 2px solid red;
  outline: none;
}
#admin .student .end {
  height: 100px;
  margin-top: 20px;
  width: 350px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#admin .student .end a {
  color: blue;
}
#admin .student .end span {
  font-size: 14px;
  font-weight: 400;
  margin-left: 15px;
  word-spacing: -2px;
  color: #1f1f1e;
}
#admin .student .end .login_btn {
  height: 60px;
  width: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: yellow;
}
#admin .student .end .login_btn:hover {
  transition: 0.2s;
  box-shadow: 0 0 15px rgb(232, 164, 68);
  scale: 1.1;
}
#admin .student .end .login_btn i {
  font-weight: 400;
  font-size: 25px;
  cursor: pointer;
}
#admin .student .end #sub {
  background-color: yellow;
  cursor: pointer;
  border: none;
  height: 50px;
  width: 200px;
  border-radius: 7px;
}
#admin .student .end #sub:hover {
  transition: 0.1s all;
  background-color: brown;
}
#admin .student .end #sub:hover {
  color: white;
}
</style>
