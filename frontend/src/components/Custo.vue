<template>
  <div>
    <div class="row">
      <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <center>
          <span class="text-caption">
            Distância
          </span>
          <br>
          <q-icon name="o_pin_drop" style="font-size: 1.8em;" />
          <br>
          <span class="text-weight-bold">
            {{ kmtempo.km }}
          </span>
        </center>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <center>
          <span class="text-caption">
            Tempo
          </span>
          <br>
          <q-icon name="access_time" style="font-size: 1.8em;" />
          <br>
          <span class="text-weight-bold">
            {{ kmtempo.tempo }}
          </span>
        </center>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <center>
          <span class="text-caption">
            Combustível
          </span>
          <br>
          <q-icon name="o_ev_station" style="font-size: 1.8em;" />
          <br>
          <span class="text-weight-bold">
            R$ {{ custos.combustivel }}
          </span>
        </center>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <center>
          <span class="text-caption">
            Pedágio
          </span>
          <br>
          <q-icon name="o_local_atm" style="font-size: 1.8em;" />
          <br>
          <span class="text-weight-bold">
            R$ {{ custos.pedagio }}
          </span>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentCusto',
  props: {
    kmtempo: {
      type: [Array, Object],
      default: null
    },
    custos: {
      type: [Array, Object],
      default: null
    },
    visivel: {
      type: Boolean,
      default: () => true
    }
  },
  watch: {
    //
  },
  data () {
    return {
      //
    }
  }
}
</script>
