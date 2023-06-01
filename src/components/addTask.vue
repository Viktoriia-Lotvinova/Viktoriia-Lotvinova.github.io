<template>
    <template v-if="showForm">
        <form @keyup.enter="$emit('createTask',this.newTaskName,this.newTaskDescription)">
            <ElInput type="text" v-model="newTaskName"  :placeholder= "$t('taskPlaceholders.taskName')"/>  
            <span v-if="validationMsg" class="dander">{{validationMsg}}</span>
            <ElInput type="text" v-model="newTaskDescription" :placeholder= "$t('taskPlaceholders.taskDescription')"/>
            <ElButton  @click.prevent="$emit('createTask',this.newTaskName,this.newTaskDescription)" @click="toggleForm" :disabled="isDisabled">{{ $t('buttons.createTask') }}</ElButton>
            <ElButton @click="toggleForm">{{ $t('buttons.cancel') }}</ElButton>
        </form>
    </template>
   <template v-else>
        <el-button type="primary" @click="toggleForm">
                <el-icon><Plus /></el-icon>
        </el-button>
   </template>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { Plus} from '@element-plus/icons-vue'
import {ElButton,ElIcon,ElInput} from 'element-plus'

export default{
    name:'addTask',
    components: {ElButton,ElIcon,Plus,ElInput},
    emits:['createTask'],
    data(){
        return{
            newTaskName:'',
            newTaskDescription:'',
            showForm:false,
            validationMsg: '',
            isDisabled: false,
        }
    },
    setup() {

    const { t } = useI18n( {useScope:'global'}); 
    const validation = t('validation');
    
     return{
      validation,
    };

  },
    watch: {

        newTaskName(name){
            this.validateInput(name);
        }

    },
    methods:{

        toggleForm(){
            this.newTaskName = '';
            this.newTaskDescription = '';
            this.showForm = !this.showForm;
        },

        validateInput(name){

                if(!name){
                    this.validationMsg = this.validation;
                    this.isDisabled = true;
                }else{
                    this.validationMsg = '';
                    this.isDisabled = false;
                }

            },

    }
}
</script>