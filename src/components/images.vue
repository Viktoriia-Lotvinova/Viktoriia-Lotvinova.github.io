<template>
    <div class="img__wrap">
        <div class="img__container" v-for="(image,index) in images" :key="index" :style="{'background-image': 'url(' + image + ')'  }"  @click="$emit('setBackgroundImg',image)"></div>                 
    </div>
</template>

<script>

export default{
    name: "images",
    emits:['setBackgroundImg'],
    data() {

        return {
            images: [
                "/src/assets/computer.jpg",
                "/src/assets/forest.jpg",
                "/src/assets/new-york.jpg",
                "/src/assets/sea.jpg",
                "/src/assets/sf.jpg",
                "/src/assets/sunset.jpg",
            ],
        };

    },   
}
</script>

<style>

.img__wrap{
   display: flex;
   flex-wrap: wrap;
}

.img__container{
    width: 50%;
    height: 56px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.img__container:hover{
    cursor: pointer;
}

body{
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

</style>