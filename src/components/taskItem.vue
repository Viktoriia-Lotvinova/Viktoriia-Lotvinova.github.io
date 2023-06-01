<template>
<ElCard :class="{'task__wrap--done':isDone}">
    <template v-if="!isEdit">
        <div class="task__wrap--main">
            <ElCheckbox v-model="isDone" @change="toggleStatus"></ElCheckbox>
                <div class="task__wrap--info">
                    <h4>{{newTaskName}}</h4>
                    <div class="task__description">{{newTaskDescription}}</div>
                    <div>{{newTaskStarus}}</div>
                 </div>
        </div>
        <div>
            <el-button type="primary" @click="editTask">
                <el-icon><Edit /></el-icon>
            </el-button>
            <el-button type="danger" @click="deleteTask(id)">
                <el-icon><Delete /></el-icon>
            </el-button>
        </div>
    </template>
    <template v-else>
        <form>
            <ElInput v-model="newTaskName" :placeholder="$t('taskPlaceholders.taskName')"  @keydown.enter="saveTask" required></ElInput>
            <span v-if="validationMsg" class="dander">{{validationMsg}}</span>
            <ElInput v-model="newTaskDescription" :placeholder="$t('taskPlaceholders.taskDescription')"  @keydown.enter="saveTask"></ElInput>
            <ElButton @click="saveTask" :disabled="isDisabled">{{ $t('buttons.saveTask') }}</ElButton>
            <ElButton @click="cancelEdit">{{ $t('buttons.cancel') }}</ElButton>
        </form>
    </template>
</ElCard>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { Delete, Edit } from '@element-plus/icons-vue'
import {ElCard, ElCheckbox,ElButton,ElIcon,ElInput,ElDialog,ElMessageBox} from 'element-plus'

export default{
    name:'taskItem',
    components: { ElCard, ElCheckbox, ElButton, ElIcon, Edit, Delete, ElInput, ElDialog, ElMessageBox},
    props:{
        id: Number,
        name: String,
        description: String,
        status: String,
    },
    emits:['deleteTask','editTask','changeStatus'],
    data(){

        return{
            isDone:'',
            newTaskId: this.id,
            newTaskStarus:this.status,
            newTaskName:this.name,
            newTaskDescription:this.description,
            isEdit:null ,
            dialogVisible: true,
            validationMsg:'',
            isDisabled: false,
        }

    },
    setup() {

    const { t } = useI18n( {useScope:'global'}); 
     
    const inProgress = t('inProgress');
    const done = t('done');
    const validation =  t('validation');
    const deleteMessage = t('deleteModal');
    
    const doneLocalization = () => {
       return t('done');
    };

    const inProgressLocalization = () => {
       return t('inProgress');
    };
    
     return{
      inProgress,
      done,
      validation,
      deleteMessage,
      doneLocalization,
      inProgressLocalization
     };

  },
    watch: {

        newTaskName(name){
            this.validateInput(name);
        }

    },
    mounted(){

        let inProgress =this.inProgressLocalization()
            if(this.newTaskStarus == inProgress){
                this.isDone = false;
            }else{
                this.isDone = true;
            }

            this.cashedNewTaskName = this.newTaskName;
            this.cashedNewTaskDescrition = this.newTaskDescription;

        },
    methods:{

        toggleStatus(){
            if(this.isDone){
                this.$emit('changeStatus', this.newTaskId,this.done);
                this.newTaskStarus = this.done;
            }else{
                this.$emit('changeStatus', this.newTaskId,this.inProgress);
                this.newTaskStarus = this.inProgress;
            }
            },

        validateInput(name){
            if(!name){
                this.validationMsg =  this.validation;
                this.isDisabled = true;
            }else{
                this.validationMsg = '';
                this.isDisabled = false;
            }
        },

        editTask(){
            if(!this.isEdit){
                this.isEdit = true;
            }
        },

        saveTask(){
            if(this.isEdit){
                this.isEdit = false;
            }
            this.$emit('editTask', this.newTaskId, this.newTaskName, this.newTaskDescription);        
        },

        deleteTask(id,done){
            ElMessageBox.confirm(this.deleteMessage).then(() => {
                done(this.$emit('deleteTask', id));
                })
                .catch((e) => {
                    return e;
                });
            },

        cancelEdit(){
                this.newTaskName = this.cashedNewTaskName;
                this.newTaskDescription = this.cashedNewTaskDescrition;
                this.isEdit = false;
            },
        },
}

</script>


<style>

.task__wrap--main{
    display: flex;
    align-items: baseline;
    word-break: break-all;
    white-space: normal;
}

.task__wrap--main:hover{
    cursor:grab;
}

.task__wrap--main:active{
    cursor:grabbing;
}

.task__wrap--done{
    background-color: #c9c7c762;
}

.task__wrap--info{
    margin-left: 10px;
    margin-bottom: 10px;
    width: 90%;
}

.task-item{
  margin-bottom: 10px;
}

.task__description{
    margin-bottom: 5px;
}

.el-input__wrapper{
    margin-top: 5px;
}

.el-radio-group{
    margin-bottom: 10px;
}

.el-button{
    margin-top: 5px;
}

h4{
    margin-top: 5px;
    margin-bottom: 3px;
    font-size: 20px;
}

</style>