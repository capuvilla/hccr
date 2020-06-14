<template>
  <q-page>
    <div class="q-pa-sm bg-grey-2 row q-col-gutter-md">
      <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
        <q-input color="black" bg-color="white" outlined dense v-model="origem" label="Origem"></q-input>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
        <q-input color="black" bg-color="white" outlined dense v-model="destino" label="Destino"></q-input>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
        <q-btn class="glossy full-width" rounded color="deep-orange" label="CALCULAR"/>
      </div>
    </div>
    <div>
      MAPS
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageMapa',
  data () {
    return {
      origem: 'Campinas',
      destino: 'Salvador'
    }
  }
}
</script>
