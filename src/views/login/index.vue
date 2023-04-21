<template>
  <div class="login-container">
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="login-form">
      <div class="title-container">
        <h3 class="title">BoxTrading管理平台</h3>
      </div>
      <el-form-item prop="account">
        <!--element-plus提供的图标组件-->
<!--        <el-icon :size="20" class="svg-container">-->
<!--          <Edit />-->
<!--        </el-icon>-->
        <!--自定义图标组件-->
        <svg-icon icon="user" class="svg-container"></svg-icon>
        <el-input v-model="form.account" placeholder="请输入用户名..."/>
      </el-form-item>
      <el-form-item prop="password">
        <svg-icon icon="password" class="svg-container"></svg-icon>
        <el-input v-model="form.password" type="password" placeholder="请输入密码..."/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import {ElMessage} from 'element-plus'
import axiosUtil from '../../util/axios'
import router from '../../router'

const form=ref({
  account:'',
  password:''
})

const rules=ref({
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ]
})

const formRef=ref(null);

const handleLogin=()=>{
  formRef.value.validate(async (valid)=>{
    if(valid){
      console.log("验证成功")
      // axios.post("http://localhost:8080/adminLogin",form.value)
      //     .then(response=>{
      //       console.log(response.data)
      //     }).catch(error=>{
      //       ElMessage.error('系统运行出错，请联系管理员')
      // })
      try{
        //axios后端请求工具类封装后使用
        let result = await axiosUtil.post("manage/login",form.value);
        //console.log(result.data);
        let data = result.data;
        if(data.status){
          ElMessage.success("登录成功");
          //console.log(data.data.token)
          window.sessionStorage.setItem("token",data.data);
          window.sessionStorage.setItem("userInfo",JSON.stringify(form.value))
          router.replace("/home")
        }else{
          ElMessage.error("登录失败，"+data.message);
        }
      }catch(err){
        console.log("error:"+err);
        ElMessage.error("系统运行出错，请联系管理员");
      }

    }else{
      console.log("验证失败")
    }
  })
}

</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-form-item__content) {
      color: #454545;
      background: rgba(0,0,0,0.1);
    }

    :deep(.el-input__wrapper) {
      display: block;
      color: #454545;
      background: rgb(36,47,60);
      box-shadow: none;
      padding: 0px 11px;
    }

    :deep(.el-input) {
      display: inline-block;
      background: rgb(36,47,60);
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .login-button {
      width: 100%;
      box-sizing: border-box;
    }
  }



  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    :deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>