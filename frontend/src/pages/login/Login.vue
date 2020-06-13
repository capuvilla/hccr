<template>
  <q-page class="bg-image">
    LOGIN
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>
  .bg-image{
      position: relative;
      background-color: #000;
  }
  .bg-image::before{
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.5;
    background: url('/statics/img/fundo.jpg') no-repeat center center;
    background-size: cover;
  }
</style>
