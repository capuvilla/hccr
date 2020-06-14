<template>
  <q-page style="background: #E5E5E5">
    <div class="q-pa-md">
        <q-header elevated class="bg-white">
          <q-toolbar class="flex justify-between">
            <q-btn color="deep-orange" flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
            <img alt="Meu Trecho" src="statics/img/Color.jpg">
          </q-toolbar>
        </q-header>
        <q-drawer
          v-model="drawerLeft"
          show-if-above
          :width="200"
          :breakpoint="700"
          elevated
          content-class="bg-primary text-white"
        >
          <q-scroll-area class="fit">
            <div class="q-pa-sm">
              <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
            </div>
          </q-scroll-area>
        </q-drawer>
    </div>
    <div>
      <div class="p-container full-width">
        <p class="p-text text-center">Quantos eixos tem o seu caminhão?</p>
      </div>
      <div class="flex justify-center">
        <div class="number-container justify-evenly items-center">
          <q-btn color="black" size="40px" flat round dense label="-"/>
          <div class="box-number flex justify-center items-center">
            2
          </div>
          <q-btn color="black" size="40px" flat round dense label="+"/>
        </div>
      </div>
      <div class="full-width kml-container flex justify-center" >
        <p class="p-text p-width">Quantos  Km/L? </p>
      </div>
      <div class="flex justify-center" style="margin-top: 230px;">
        <q-input
          style="border: none; border-radius: 12px"
          bg-color='white'
          filled
          bottom-slots
          dense
          value='2,4 Km/L'
        />
      </div>
      <div class="full-width flex justify-center" >
        <p class="p-text p-width">Qual o valor do combustível? </p>
      </div>
      <div class="input-container flex justify-center">
        <q-input
          color='black'
          bg-color='white'
          filled
          bottom-slots
          dense
          value='2,4 Km/L'
        />
      </div>
      <div class="flex justify-center full-width">
        <q-checkbox v-model="checkbox" label="Calcular ida e volta" color="deep-orange" class="p-text" />
      </div>
      <br />
      <div class="flex justify-center full-width">
        <q-btn
          class='glossy'
          rounded
          color='deep-orange'
          label='PRÓXIMO'
          type='submit'
          style="width: 40%; letter-spacing: 1.25px; font-size: 14px; line-height: 16px; font-weight: 600;"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      drawerLeft: false,
      checkbox: false
    }
  },
  methods: {
    onSubmit () {
      this.$router.push('/mapa/')
    }
  }
}
</script>

<style>
  .p-container {
    position: absolute;
    top: 116px;
  }
  .p-text {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.6);
  }
  .number-container {
    display: inline-flex;
    position: relative;
    width: 80%;
    height: 67px;
    top: 150px;
  }
  .box-number {
    height: 67px;
    width: 67px;
    background: linear-gradient(225.34deg, #DD7C13 0%, #DD1313 101.17%);
    border-radius: 19px;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 56px;
    color: white;
  }
  .kml-container {
    position: absolute;
    left: 0;
    top: 289px;
  }
  .p-width {
    width: 60%;
  }
</style>
