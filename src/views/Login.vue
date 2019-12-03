<template>
  <div id="box">
    <div id="container">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: '请输入用户名!' }] }
            ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码!' }] }
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true
              }
            ]"
          >
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href="">
            忘记密码？
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>

          <a href="">
            去注册!
          </a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { UserLogin } from "@/api/login";

export default {
  name: "login",
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values;
          // console.log("Received values of form: ", values);
        }
      });
      UserLogin({ user: "hello" })
        .then(res => {
          this.$router.push("about")
          //获取token,进行页面跳转
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelectChange(value) {
      // console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    }
  }
};
</script>

<style scoped>
  #box { display: flex; justify-content: center}
  #container { width: 300px; margin-top: 100px;}
  #components-form-demo-normal-login .login-form { max-width: 300px; }
  #components-form-demo-normal-login .login-form-forgot { float: right; }
  #components-form-demo-normal-login .login-form-button { width: 100%; }
</style>
