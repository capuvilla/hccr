<template>
  <q-page style="background: #E5E5E5">
    <div class="back-container" >
      <img alt="Meu Trecho" src="statics/img/arrow_back_24px.svg" @click="onMapa">
    </div>
    <div class="flex justify-center items-center">

      <q-option-group
        :options="options"
        label="Notifications"
        type="checkbox"
        v-model="group"
        class="q-option-group"
      />
    </div>
    <div class="flex justify-center full-width container-text">
      Conhece esse trecho? Deixe sua avaliação e contribua com a comunidade!
    </div>
    <div class="full-width">
      <div class="flex justify-center container-button full-width">
        <q-btn
          @click="onReport"
          class='glossy'
          rounded
          color='deep-orange'
          label='DEIXE SUA AVALIAÇÃO'
          type='submit'
          style="width: 50%; letter-spacing: 1.25px; font-size: 14px; line-height: 16px; font-weight: 600;"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      group: [],
      options: [
        { label: 'O que estão falando sobre esse trecho?', size: '50px' },
        { label: 'Roubos', value: 'roubo', color: 'deep-orange' },
        { label: 'Pessoas ', value: 'friend', color: 'deep-orange' },
        { label: 'Postos sem estrutura', value: 'postos', color: 'deep-orange' },
        { label: 'Combustível de origem duvidosa', value: 'combustivel', color: 'deep-orange' }
      ]
    }
  },
  methods: {
    onMapa () {
      this.$router.push('/mapa')
    },
    onReport () {
      this.$router.push('/report')
    }
  }
}
</script>

<style>
  .back-container {
    display: flex;
    justify-content: center;
    background: #ffffff;
    width: 56px;
    height: 56px;
    border-radius: 80px;
    position: absolute;
    left: 3.89%;
    right: 82.48%;
    top: 3.28%;
    bottom: 89.06%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.14);
  }
  .q-option-group {
    position: absolute;
    width: 90%;
    background: #ffffff;
    top: 16.01%;
    border-radius: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.14);
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.6);
    padding-bottom: 20%;
  }
  .container-text{
    position: absolute;
    bottom: 38%;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.6);
  }
  .container-button {
    position: absolute;
    bottom: 25%;
  }
</style>
