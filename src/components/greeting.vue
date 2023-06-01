<template>
  <ElRow>
    <ElCol :span="12" class="greeting__wrap">
      <div class="wrap">
        <template v-if="!name">
          <h1 class="heading">{{ $t('greeting') }} </h1>
          <input type="text" v-model.lazy="name" :placeholder="$t('greetingNamePlaceholder')" />
        </template>
        <template v-else>
          <h1>{{ $t('greeting') }} {{name}}.</h1>
          <el-button type="primary" @click="editName" class="button" size="small">
            <el-icon><Edit /></el-icon>
          </el-button>
        </template>
      </div>
      <template v-if="this.tasks.length < 1">
        <h2>{{ $t('greetingTextNegative') }}</h2>
      </template>
      <template v-else>
        <h2>{{ $t('greetingTextPositive') }}</h2>
      </template>
    </ElCol>
  </ElRow>
</template>

<script>
import {ElButton,ElIcon,ElCol,ElRow} from 'element-plus';
import { Edit} from '@element-plus/icons-vue';

 export default{
    name:'greeting',
    components: {ElButton,ElIcon,Edit,ElCol,ElRow},
    props:{
      tasks: Array,
    },

    data(){

        return{
            name:'',
        }

    },

    mounted() {

    if (localStorage.name) {
      this.name = localStorage.name;
    }

    },

    watch: {

    name(newName) {
      localStorage.name = newName;
    }

  },
  methods:{

    editName(){
      this.name = '';
    }
    
  }

}

</script>

<style>

.greeting__wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  justify-content: center;
}

h1{
  margin-bottom: 0;
  margin: 0;
  color:#E5EAF3;
  text-align: center;
}

@media (max-width:480px){
  h1{
    font-size: 1rem;
  }
}

</style>
