<template>
  <q-page>
    <q-parallax :height="150">
      <img alt="Meu Trecho" src="statics/img/gmaps.png">
    </q-parallax>
    <div class="q-pa-sm">
      <p class="text-h5">Para onde vamos?</p>
      <div class="q-pa-xl">
        <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
          <div>
            <q-input color="black" bg-color="white" outlined bottom-slots dense v-model="origem" label="Origem"></q-input>
            <q-input color="black" bg-color="white" outlined bottom-slots dense v-model="destino" label="Destino"></q-input>
            <q-btn class="glossy full-width" rounded color="deep-orange" label="CALCULAR" type="submit"/>
          </div>
        </form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      origem: '',
      destino: ''
    }
  },
  methods: {
    onReset () {
      this.origem = ''
      this.destino = ''
    },
    onSubmit () {
      this.$router.push('/mapa/')
    }
  }
}
</script>
