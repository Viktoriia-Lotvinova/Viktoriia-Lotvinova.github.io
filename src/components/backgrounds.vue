<template>
        <div class="bg__wrap">
            <div class="bg__container" v-for="background in backgrounds" :key="background" :style="{'background-color': background }" @click="$emit('setBackground',background)">
            </div>     
        </div>
</template>

<script>

export default{
    name: "backgrounds",
    emits:['setBackground'],
    data() {

        return {
            backgrounds: [
                "#DFB1E6",
                "#71B1D9",
                "#9d5353",
                "#756f4b",
                "#356a4a",
                "#000000",
            ],
        };
        
    },   
}
</script>

<style>
.bg__wrap{
   display: flex;
   flex-wrap: wrap;
}

.bg__container{
    width: 50%;
    height: 56px;
}

.bg__container:hover{
    cursor: pointer;
}
</style>