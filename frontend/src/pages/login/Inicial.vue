<template>
  <q-page class="bg-image window-height full-height">
    <q-carousel
      arrows
      animated
      v-model="slide"
      infinite
      class="window-height full-height mobile-only"
    >
      <q-carousel-slide :name="1" img-src="statics/img/image1.png">
        <div class="absolute-top custom-logo">
          <img alt="Meu Trecho" src="statics/img/logo.png" style="width: 16em">
        </div>
        <div class="absolute-bottom custom-caption">
          <div class="text-subtitle1">Controle financeiro</div>
          <div class="text-subtitle2">Conte com a ajuda do Meu Trecho para calcular o custo das suas viagens!</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" img-src="statics/img/image2.png">
        <div class="absolute-top custom-logo">
          <img alt="Meu Trecho" src="statics/img/logo.png" style="width: 16em">
        </div>
        <div class="absolute-bottom custom-caption">
          <div class="text-subtitle1">Viagem tranquila!</div>
          <div class="text-subtitle2">Nós te mostramos com antecedência os melhores e mais seguros lugares para paradas</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" img-src="statics/img/image3.png">
        <div class="absolute-top custom-logo">
          <img alt="Meu Trecho" src="statics/img/logo.png" style="width: 16em">
        </div>
        <div class="absolute-bottom custom-caption">
          <div class="text-subtitle1">Contribua com a comunidade!</div>
          <div class="text-subtitle2">Ajude  seus amigos caminhoneiros com informações sobre a rota e indicando seus lugares favoritos</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" img-src="statics/img/image4.png">
        <div class="absolute-top">
          <q-page class="flex flex-center">
            <center>
              <img alt="Meu Trecho" src="statics/img/logo.png" style="width: 16em">
              <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
                <div>
                  <q-input color="black" bg-color="white" outlined dense bottom-slots v-model="usuario" label="Login"></q-input>
                  <q-input color="black" bg-color="white" outlined dense v-model="password" label="Senha" :type="isPwd ? 'password' : 'text'">
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
                  <q-btn class="glossy full-width" color="deep-orange" label="ENTRAR" type="submit"/>
                  <br>
                  <br>
                  <q-btn class="full-width text-red" color="white" label="Faça seu cadastro" @click="onRegister"/>
                </div>
              </form>
            </center>
          </q-page>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-page class="flex flex-center desktop-only">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
        <center>
          <!-- <img alt="Meu Trecho" src="statics/img/logo.png" style="width: 10em"> -->
          <img alt="Meu Trecho" src="statics/img/logo.png">
        </center>
        <div>
          <q-input color="black" bg-color="white" outlined dense bottom-slots v-model="usuario" label="Login"></q-input>
          <q-input color="black" bg-color="white" outlined dense v-model="password" label="Senha" :type="isPwd ? 'password' : 'text'">
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
          <q-btn class="glossy full-width" color="deep-orange" label="ENTRAR" type="submit"/>
          <br>
          <br>
          <q-btn class="full-width text-red" color="white" label="Faça seu cadastro" @click="onRegister"/>
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
      slide: 1
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

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 6em
  color: white
  background-color: rgba(0, 0, 0, .3)

.custom-logo
  text-align: center
  padding: 6em
</style>
