<template>
  <q-page padding>
    <div class="row">
      <q-btn
        flat
        color="red"
        dense
        round
        icon="arrow_back"
        aria-label="Voltar"
        @click="onMapa"
      />
    </div>
    <div>
      <p class="text-h4 text-center q-pa-lg">
        Agradecemos pela sua avaliação!
      </p>
      <p class="text-h5 text-center">
        Ela é muito importante para melhorar a segurança de outros caminhoneiros!
      </p>
      <p class="text-h5 text-center">
        <img alt="Obrigado" src="statics/img/ok.svg" style="width: 8em">
      </p>
      <p class="text-h5 text-center">
        <q-btn @click="onMapa" style="max-width: 200px; width: 200px;" class="glossy" color="deep-orange" label="VOLTAR PARA O MAPA"/>
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageObrigado',
  methods: {
    onMapa () {
      this.$router.push('/mapa')
    }
  }
}
</script>
