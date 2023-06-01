<template>
  <ElContainer>
    <sideMenu @forseReRender="forseReRender" />
    <ElMain>
      <greeting :tasks="tasks" />
      <ElRow>
        <ElCol :span="12" class="wrap">
          <el-card class="el-card__main">
            <filters :radio="radio" @variable-updated="updateRadio"  :showNoTasksMsg="showNoTasksMsg" :noTasksInThisStatusMsg="noTasksInThisStatusMsg"  />
            <draggable v-model="tasks" @change="dragAndDrop">
              <taskItem v-for="task in filterTasks" :id="task.id" :name="task.name" :description="task.description"
                :status="task.status" :key="task.id" @deleteTask="deleteTask" @editTask="editTask"
                @changeStatus="changeTaskStatus" class="task-item" />
            </draggable>
            <addTask @createTask="createTask"/>
          </el-card>
        </ElCol>
      </ElRow>
    </ElMain>
  </ElContainer>
</template>

<script>

  import { ElContainer,ElMain,ElRow,ElCol,ElCard,} from 'element-plus'
  import { useI18n } from 'vue-i18n';
  import greeting from './components/greeting.vue';
  import filters from './components/filters.vue';
  import taskItem from './components/taskItem.vue';
  import addTask from './components/addTask.vue';
  import sideMenu from './components/sideMenu.vue';
  import { VueDraggableNext } from 'vue-draggable-next';


  export default {

    components: {

        greeting,
        filters,
        taskItem,
        addTask,
        sideMenu,
        ElCol,
        ElRow,
        ElCard,
        ElContainer,
        ElMain,
        draggable: VueDraggableNext,
        
      },

    data() {

        return {
          enabled: true,
          tasks: [],
          newTasks: null,
          radio: this.filtersShowAll,
          noTasksInThisStatusMsg: this.noTasksMsg,
          showNoTasksMsg: false,
          dragging: false,
        }

      },

    setup() {

        const { t } = useI18n({
          useScope: 'global'
        });

        const filtersShowAll = t('filters.showAll');
        const filtersInProgress = t('filters.inProgress');
        const filtersDone = t('filters.done');
        const noTasksMsg = t('noTasksMsg');

        const doneLocalization = () => {
          return t('done');
        };

        const inProgressLocalization = () => {
          return t('inProgress');
        };

        return {
          filtersShowAll,
          filtersInProgress,
          filtersDone,
          noTasksMsg,
          doneLocalization,
          inProgressLocalization
        };

      },

    mounted() {

        if (localStorage.tasks) {
          this.tasks = JSON.parse(localStorage.tasks);
        }

        if (!localStorage.bg && !localStorage.bgColor) {
          document.body.style.cssText = `background-image: url(/sunset.jpg) !important`;
        }

      },

    watch: {

        tasks: {
          handler(newTasks) {
            localStorage.tasks = JSON.stringify(newTasks);
          },
          deep: true,
        }

      },

    methods: {

      forseReRender() {
        window.location.reload();
        this.checkStatusForLocalization();
      },

      checkStatusForLocalization() {
        let done = this.doneLocalization();
        let inProgress = this.inProgressLocalization();

        this.tasks = this.tasks.map((task) => {
            if (task.status == 'Done' || task.status == 'Зроблено') {
              return {...task,status: done};
            } else {
              return {...task,status: inProgress};
            }
          })

      },

      updateRadio(variable) {
      this.radio = variable;
      },

      dragAndDrop() {
          localStorage.tasks = JSON.stringify(this.tasks);
      },

      deleteTask(id) {
        this.tasks = this.tasks.filter((task) => {
          return task.id != id;
        })
      },

      createTask(taskName, taskDescription) {
        const id = Math.random();

        this.tasks.push({
            id,
            name: taskName,
            description: taskDescription,
            status: this.inProgressLocalization(),
            updateLang: 0,
          });
      },

      editTask(id, newName, newDescription) {
          let task = this.tasks.find(task => task.id == id);
          task.name = newName;
          task.description = newDescription;
      },

      changeTaskStatus(id, newStatus) {
          let task = this.tasks.find(task => task.id == id);
          task.status = newStatus;
      },

      checkIsFilteredTasksExist(array) {
        if (array.length < 1) {
            this.showNoTasksMsg = true;
        } else {
            this.showNoTasksMsg = false;
        }
        }

      },

      computed: {

        filterTasks() {
          let filteredTasks = this.tasks;

          if (this.radio == this.filtersShowAll) {
            this.showNoTasksMsg = false;
            return filteredTasks;
          } else {
            filteredTasks = filteredTasks.filter((task) => {
              return task.status == this.radio;
            });
          }

          this.checkIsFilteredTasksExist(filteredTasks);

          return filteredTasks;
        }

      }
    }
</script>


<style>
h2{
  margin-top: 5px;
  color:#E5EAF3;
}

.el-card__main{
  width: 450px;
  min-width: 450px;
  background-color: rgba(229, 234, 243,0.5);
}

.el-menu--collapse{
  height: fit-content;
}

@media (max-width:767px){
  .el-card__main{
    width: 300px;
    min-width: 300px;
  }
}

@media (max-width:480px){
  .el-card__main{
    width: 200px;
    min-width: 200px;
  }

  h2{
    font-size: 1rem;
  }
}
</style>