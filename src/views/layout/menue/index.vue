<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#9A2B1EFF"
      class="el-menu-vertical-demo"
      default-active="home"
      text-color="#fff"
      router
  >
    <el-menu-item index="home">
      <el-icon><home-filled /></el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-menu-item index="notification">
      <el-icon><bell /></el-icon>
      <span>公告管理</span>
    </el-menu-item>

    <el-menu-item index="driver">
      <el-icon><user /></el-icon>
      <span>司机管理</span>
    </el-menu-item>

    <el-menu-item index="bus">
      <el-icon><message-box /></el-icon>
      <span>公交车管理</span>
    </el-menu-item>

    <el-menu-item index="route">
      <el-icon><message-box /></el-icon>
      <span>路线管理</span>
    </el-menu-item>

    <el-menu-item index="schedule">
      <el-icon><message-box /></el-icon>
      <span>公交调度</span>
    </el-menu-item>
    <el-menu-item index="history">
      <el-icon><message-box /></el-icon>
      <span>历史记录</span>
    </el-menu-item>

    <el-menu-item index="chat">
      <el-icon><tickets /></el-icon>
      <span>交流</span>
    </el-menu-item>


  </el-menu>
</template>

<script setup>
import {
  HomeFilled,
    Bell,
    User,
    MessageBox,
    Tickets,
    Management,
    Edit,
    Plus
}from '@element-plus/icons-vue'

import { useStore } from 'vuex'
const store=useStore();
const logout=()=>{
  store.dispatch('logout')
}

</script>

<style lang="scss" scoped>

</style>