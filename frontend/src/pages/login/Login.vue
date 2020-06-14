<template>
  <q-page class="bg-image">
    <q-page class="flex flex-center">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
        <center>
          <!-- <img alt="Meu Trecho" src="statics/img/logo.png" style="width: 10em"> -->
          <img alt="Meu Trecho" src="statics/img/logo.png">
        </center>
        <div>
          <q-input color="black" bg-color="white" rounded outlined dense bottom-slots v-model="usuario" label="Login"></q-input>
          <q-input color="black" bg-color="white" rounded outlined dense v-model="password" label="Senha" :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <a dense color="white" class="text-white" style="cursor: pointer" @click="cdsenha()">Esqueceu sua senha?</a>
        </div>
        <div>
          <q-btn class="glossy full-width" rounded color="deep-orange" label="ENTRAR" type="submit"/>
          <br>
          <br>
          <q-btn class="full-width text-red" rounded color="white" label="Faça seu cadastro" @click="onRegister"/>
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
  },
  created () {
    this.$q.dark.set(false)
  },
  methods: {
    onRegister () {
      this.$router.push('/register')
    },
    onSubmit () {
      this.$router.push('/mapa')
    },
    onReset () {
      this.password = ''
      this.usuario = ''
      this.isPwd = true
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
    opacity: 0.6;
    background: url('/statics/img/fundo.jpg');
    width: 100%;
    height: 100%;
    background-position: right bottom;
    background-size: cover;
  }
</style>
