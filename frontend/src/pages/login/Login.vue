<template>
  <q-page class="bg-grey-3 text-white">
    <q-img
      class="absolute-bottom-left"
      src="statics/img/fundo.jpg"
      spinner-color="white"
    />
    <q-page class="flex flex-center">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
        <img alt="Meu Trecho" src="statics/img/logo.png">
      </form>
    </q-page>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
