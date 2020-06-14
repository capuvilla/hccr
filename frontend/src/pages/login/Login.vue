<template>
  <q-page class="bg-image text-white">
    <q-page class="flex flex-center">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
        <img alt="Meu Trecho" src="statics/img/logo.png">
        <div>
          <q-input color="black" bg-color="white" outlined bottom-slots dense v-model="usuario" label="Login"></q-input>
          <q-input color="black" bg-color="white" outlined dense v-model="password" label="Senha" :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <a dense color="primary" style="cursor: pointer" @click="cdsenha()">Esqueceu sua senha?</a>
        </div>
        <div>
          <q-btn class="glossy full-width" rounded color="deep-orange" label="ENTRAR" type="submit"/>
          <br>
          <br>
          <q-btn class="full-width text-red" rounded color="white" label="Faça seu cadastro" type="submit"/>
        </div>
      </form>
    </q-page>
  </q-page>
</template>

<script>
export default {
  name: 'PageLogin',
  data () {
    return {
      password: '',
      usuario: '',
      isPwd: true
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>

<style>
  .bg-image{
    position: relative;
    background-color: #000;
  }
  .bg-image::before{
    content: ' ';
    display: block;
    position: absolute;
    opacity: 0.5;
    background: url('/statics/img/fundo.jpg');
    width: 100%;
    height: 100%;
    background-position: right bottom;
    background-size: cover;
  }
</style>
