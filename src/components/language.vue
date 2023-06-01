<template>
    <div class="language__wrap">
        <el-radio-group v-model="radio" size="large"  @change="switchLanguage" >
          <el-radio-button label='en'/>
          <el-radio-button label='ua'/>
        </el-radio-group>
    </div>
</template>

<script>

import { useI18n } from 'vue-i18n';
import { ElRadioGroup,ElRadioButton} from 'element-plus'
import { getCurrentInstance } from 'vue';


export default{
    name:'language',
    components:{ElRadioGroup, ElRadioButton},
    emits:['emitEventToChild'],
    data(){

        return{
            radio: ' ',
        }

    },
    setup() {

    const { t, locale } = useI18n({useScope:'global'}); 
    const instance = getCurrentInstance();

    const switchLang=()=>{
        instance?.proxy?.$data.radio === 'en' ? locale.value = 'en' : locale.value = 'ua';
        localStorage.setItem('lang', locale.value);
    }

    return{
        locale,
        switchLang
    }

    },
    methods:{

        switchLanguage(){
            this.switchLang();
            this.$emit('emitEventToChild');
        }

    },

}
</script>


<style>

.language__wrap{
    display: flex;
    justify-content: center;
}

.el-radio-group {
  margin: 10px 0;
}

</style>