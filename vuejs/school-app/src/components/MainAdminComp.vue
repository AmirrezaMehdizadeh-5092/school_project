<template>
  <div id="admin">
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
    };
  },
  methods: {
    uplode() {
      document.getElementById("student").style.visibility = "hidden"
      document.getElementById("file").style.visibility = "visible";
    },
    open_student_form()
    {
      document.getElementById("file").style.visibility = "hidden"
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
        /*try
        {
          await axios.post("http://localhost:1400/upload", formData);
          this.message = "Uploaded!!";
          swal({
            title: "موفقیت آمیز",
            icon: "success",
            text: "عکس مورد نظر با موفقیت بارگذاری شد",
          }).then(()=>{
            window.location.reload();
          });
        } catch (err)
        {
          console.log(err);
          this.message = err.response.data.error;
          swal({
            title: "خطا",
            icon: "error",
            text: "مشکلی پیش آمد لطفا دوبار امتحان کنید",
          });
        }*/
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
  border-radius: 5px;
  padding: 5px 5px;
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
#admin .student 
{
  height: 250px;
  width: 300px;
  margin-top: -300px;
  margin-right: 650px;
  background-color: antiquewhite;
  visibility: hidden;
}
</style>
