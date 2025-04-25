<template>
  <div id="app">
    <demo />
    
    <!-- <normal-tags label="我的标签" placement="bottom" content="666" type="success" /> -->
    <jins-button />

    <ajj style="margin-top: 30px;" />

    <image-cropper/>
    <vue-office-docx
        :src="docx"
        style="height: 100vh;"
    />
  </div>
</template>
<script setup>
import { defineComponent, ref } from 'vue';
import Ajj from './ajj.vue'
import ImageCropper from './image-cropper.vue';
import Demo from './pages/demo.vue';

//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

defineComponent([VueOfficeDocx])

const docx = ref('http://static.shanhuxueyuan.com/test6.docx');
</script>

<style>
#app {
  margin-top: 60px;
}
</style>