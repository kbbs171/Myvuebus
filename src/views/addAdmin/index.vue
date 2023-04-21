<template>
  <el-card>
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="150px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认添加</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import axios from '@/util/axios'

const form=ref({
  username:"",
  password:"",
  confirmPassword:""
})

const rules=ref({
  username:[
    { required: true,message:'请输入用户名！'}
  ],
  password:[
    { required: true,message:'请输入密码！'}
  ],
  confirmPassword:[
    { required: true,message:'请确认密码！'}
  ]
})

const formRef=ref(null)

const onSubmit=()=>{
  formRef.value.validate(async(valid)=>{
    if(valid){
      console.log("success")
      if(form.value.password!==form.value.confirmPassword){
        ElMessage.error("两次密码填写不一致！")
      }else{
        try{
          let result=await axios.post("admin/addAdmin", form.value);
          let data=result.data;
          if(data.code==0){
            ElMessage.success("管理员添加成功！")
            formRef.value.resetFields();
          }else{
            ElMessage.error(data.message)
          }
        }catch (err) {
          ElMessage.error("系统运行出错，请联系管理员")
        }
      }
    }else{
      console.log("fail")
    }
  })
}

</script>

<style lang="scss" scoped>

.el-input{
  width: 300px;
}
</style>