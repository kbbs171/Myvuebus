<template>
  <el-card>

    <el-button type="primary" @click="handleCreate">新增</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="busId" label="公交id" width="120" />
      <el-table-column prop="busTemp" label="温度" width="120" />
      <el-table-column prop="busHum" label="湿度" width="120"/>
      <el-table-column prop="busAir" label="空气质量" width="120"/>
      <el-table-column prop="busBeep" label="是否报警" width="100" />
      <el-table-column prop="busLatitude" label="经度" width="120" />
      <el-table-column prop="busNS" label="N/S" width="80" />
      <el-table-column prop="busLongitude" label="纬度" width="120" />
      <el-table-column prop="busEW" label="E/W" width="80" />
      <el-table-column prop="busSpeed" label="速度" width="100" />

      <el-table-column label="操作" fixed="right" width="100">
        <template v-slot="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete( scope.row.busId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    弹窗-->
    <el-dialog :title="createForm.busId ? '编辑用户' : '新增用户'" v-model="createDialogVisible" width="800px">
      <el-form :model="createForm" :rules="Rules" ref="create_form">
          <el-form-item label="busId" prop="busId">
            <el-input v-model="createForm.busId" placeholder="请输入公交车id"></el-input>
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


// import { ref, onMounted, onUnmounted } from 'vue'
import axios from '@/util/axios'

//司机新增

//1
const handleCreate = () => {
  createDialogVisible.value = true;
};
const handleUpdate = (row) => {
  createForm.value.bId=row.busId
  createDialogVisible.value = true
  createForm.value.busId=row.busId
  createForm.value.flag=true;


};
const createDialogVisible = ref(false);
const createForm = ref({
  busId:"",
  flag:false,
  bId:"",
});

const Rules = {
  account: [{ required: true, message: "请输入公交id", trigger: "blur" }],
};

const handleCreateConfirm = async (flag) => {
  try {
    console.log(flag)
    if(flag==false){
      await axios.post("bus/insert", createForm.value);
      ElMessage.success("新增成功！");
    }else{
      let busId = createForm.value.busId;
      let bId = createForm.value.bId
      console.log(createForm.value.busId);
      console.log(createForm.value.bId);
      await axios.get("bus/updateId", {busId,bId});
      ElMessage.success("更新成功！");
      createForm.value.flag=false;
    }
    createDialogVisible.value = false;
    initUserList();

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
  const res = await axios.get("bus/page",queryForm.value)
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


let timerId;
window.addEventListener("focus", () => {

  // 在页面被激活时重新启动定时器
  timerId = setInterval(() => {
    initUserList();
  }, 2000);
});

window.addEventListener("blur", () => {
  // 在页面失去焦点时清除定时器
  clearInterval(timerId);
});


const handleDelete=async (id) => {
  console.log(id)
  const res = await axios.get("bus/delete", {id})
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
