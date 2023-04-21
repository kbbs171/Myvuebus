<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入司机姓名..." v-model="queryForm.name" clearable></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initUserList">搜索</el-button>
    </el-row>

    <el-button type="primary" @click="handleCreate">新增</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="#ID" width="80" />
      <el-table-column prop="account" label="账号" width="150" />
      <el-table-column prop="password" label="密码" width="150"/>
      <el-table-column prop="name" label="姓名" width="150"/>
      <el-table-column prop="sex" label="性别" width="150" />
      <el-table-column prop="phone" label="电话" width="150" />
      <el-table-column prop="address" label="地址" width="150" />
      <el-table-column prop="create_time" label="创建时间" width="200" />
      <el-table-column prop="isOnline" label="是否在线" width="150" />

      <el-table-column label="操作" fixed="right" width="100">
        <template v-slot="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete( scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--    弹窗-->
    <el-dialog :title="createForm.id ? '编辑用户' : '新增用户'" v-model="createDialogVisible" width="800px">
      <el-form :model="createForm" :rules="Rules" ref="create_form">
        <el-form-item label="账号" prop="account">
          <el-input v-model.lazy="createForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.lazy="createForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.lazy="createForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model.lazy="createForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.lazy="createForm.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model.lazy="createForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCreateCancel">取消</el-button>
        <el-button type="primary" :loading="false" @click.native="handleCreateConfirm(createForm.flag)">确认</el-button>
      </div>
    </el-dialog>


    <el-pagination
        v-model:current-page="queryForm.currentPage"
        v-model:page-size="queryForm.pageSize"
        :page-sizes="[10, 20, 30, 40, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import {Search} from '@element-plus/icons-vue'
import { ref } from 'vue'

import axios from '@/util/axios'

//司机新增

//1
const handleCreate = () => {
  createDialogVisible.value = true;
};
const handleUpdate = (row) => {
  createDialogVisible.value = true;
  createForm.value.id=row.id
  createForm.value.account=row.account;
  createForm.value.password=row.password;
  createForm.value.name=row.name;
  createForm.value.sex=row.sex;
  createForm.value.phone=row.phone;
  createForm.value.address=row.address;
  createForm.value.flag=true;
};
const createDialogVisible = ref(false);
const createForm = ref({
  id:"",
  account: "",
  password: "",
  name: "",
  sex: "",
  phone: "",
  address: "",
  flag:false,
});

const Rules = {
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  phone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    { pattern: /^1[3456789]\d{9}$/, message: "手机号码格式有误，请重新输入", trigger: "blur" },
  ],
  address: [{ required: true, message: "请输入地址", trigger: "blur" }],
};

const handleCreateConfirm = async (flag) => {
  try {
    console.log(flag)
    if(flag==false){
      await axios.post("driver/insert", createForm.value);
    }else{
      await axios.post("driver/update", createForm.value);
      createForm.value.flag=false;
    }
    createDialogVisible.value = false;
    initUserList();
    ElMessage.success("新增成功！");
  } catch (error) {
    ElMessage.error("新增失败，请稍后再试！");
  }
};

const handleCreateCancel = () => {
  createDialogVisible.value = false;
  resetForm(createForm);
};

const resetForm = (form) => {
  for (let key in form.value) {
    form.value[key] = "";
  }
};

const queryForm=ref({
  name:'',
  currentPage:1,
  pageSize:10
})

const total=ref(0)

const tableData =ref([])

const initUserList=async()=>{
  const res = await axios.get("driver/page",queryForm.value)
  console.log(res.data.data)
  tableData.value=res.data.data.records;
  total.value=res.data.data.size;
}

initUserList();

const handleSizeChange=(pageSize)=>{
  queryForm.value.currentPage=1;
  queryForm.value.pageSize=pageSize;
  initUserList();
}

const handleCurrentChange=(currentPage)=>{
  queryForm.value.currentPage=pageNum;
  initUserList();
}

const handleDelete=async (id) => {
  console.log(id)
  const res = await axios.get("driver/delete", {id})
  initUserList();
}
</script>


<style lang="scss" scoped>
.header{
  padding-bottom: 16px;
  box-sizing: border-box;
}
.el-pagination{
  padding-top: 15px;
  box-sizing: border-box;
}
.el-button+.el-button{
  margin-left: 0px;
  margin-top: 5px;
}
.el-button{
  margin-top: 5px;
  margin-right: 10px;
}

</style>
