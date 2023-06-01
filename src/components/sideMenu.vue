<template>    
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <ElButton v-if="isCollapse" @click="toggleMenu" :style="{margin: 0, width: '100%', 'border-radius': 0,'border-right': 'none'}"><el-icon><Expand /></el-icon></ElButton>
      <ElButton v-else  @click="toggleMenu" :style="{margin: 0, width: '100%', 'border-radius': 0,'border-right': 'none'}"><el-icon><Fold /></el-icon></ElButton>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>{{ $t('settings') }}</span>
        </template>
          <el-sub-menu index="1-1">
            <template #title><span>{{ $t('lang') }}</span></template>
            <language @emitEventToChild="emitEventToChild"></language>
          </el-sub-menu>
          <el-sub-menu index="1-2">
            <template #title><span>{{ $t('background') }}</span></template>
          <el-sub-menu index="2-1">
            <template #title><span>{{ $t('colors') }}</span></template>
            <backgrounds @setBackground="setBackground"/>
          </el-sub-menu>
          <el-sub-menu index="2-2">
            <template #title><span>{{ $t('images') }}</span></template>
            <images @setBackgroundImg="setBackgroundImg"/>
          </el-sub-menu>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script setup>
  import { ref,reactive, defineEmits, watch,onMounted  } from 'vue';
  import { Expand, Fold, Setting } from '@element-plus/icons-vue';
  import { ElIcon, ElButton, ElSubMenu, ElMenu } from 'element-plus';
  import backgrounds from './backgrounds.vue';
  import images from './images.vue';
  import language from './language.vue';
  
  const isCollapse = ref(true);
  
  function toggleMenu() {
    isCollapse.value = !isCollapse.value;
  }
  
  const emit = defineEmits(['forseReRender']);
  
  const emitEventToChild = () => {
  emit('forseReRender');
};

  let bgUrl = reactive({
    value: ''
  });

  let bgColor = reactive({
    value: ''
  });

  function  setBackground(color){
    if(localStorage.bg){
      localStorage.bgColor = '';
    }
    bgColor.value = color;
    bgUrl.value = ' ';
    localStorage.bg = ' ';
  }

  function  setBackgroundImg(img){
    if(localStorage.bg){
      localStorage.bg = '';
    }
    bgUrl.value = `url(` + img + ')';
    bgColor.value = ' ';
    localStorage.bgColor = ' ';
  }

  watch(bgColor, (newVal) => {

  if(newVal.value == ' '){
      return;
  }

  document.body.style.cssText = `background-color: ${newVal.value} !important`;
  localStorage.bgColor = newVal.value;

  });

watch(bgUrl, (newVal) => {

  if(newVal.value == ' '){
      return;
  }

  document.body.style.cssText = `background-image: ${newVal.value} !important`;   
  localStorage.bg =  newVal.value;
            
  });

  onMounted(() => {

    if (localStorage.bg) {
    bgUrl.value = localStorage.bg;
    }
  
    if (localStorage.bgColor) {
      bgColor.value = localStorage.bgColor;
    }

});
</script>
  
  
  
<style>

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu{
  background-color: rgba(255, 255, 255,0.5);
}

.el-menu > .el-button{
  background-color: rgba(255, 255, 255,0.5);
}

.el-menu-vertical-demo:not(.el-menu--collapse){
  background-color: rgb(255, 255, 255);
}

</style>
  