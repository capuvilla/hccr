<template>
  <q-page class="window-height full-height">
    <div class="fixed-top vertical-middle q-pa-sm" style="z-index: 500">
      <center>
        <div class="q-pa-sm row q-col-gutter-sm" style="max-width: 760px">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <q-input
              class="mobile-only"
              style="max-width: 220px"
              color="black"
              bg-color="white"
              rounded standout
              dense
              v-model="origem"
              label="Origem">
            </q-input>
            <q-input
              class="desktop-only"
              style="max-width: 500px"
              color="black"
              bg-color="white"
              rounded standout
              dense
              v-model="origem"
              label="Origem">
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <q-input
              class="mobile-only"
              style="max-width: 220px"
              color="black"
              bg-color="white"
              rounded standout
              dense
              v-model="destino"
              label="Destino">
            </q-input>
            <q-input
              class="desktop-only"
              style="max-width: 500px"
              color="black"
              bg-color="white"
              rounded standout
              dense
              v-model="destino"
              label="Destino">
            </q-input>
          </div>
        </div>
      </center>
    </div>
    <div class="fixed-bottom q-pa-lg" style="z-index: 500">
      <center>
        <q-btn
          class="mobile-only glossy"
          style="max-width: 200px; width: 120px;"
          rounded
          color="deep-orange"
          label="VER CUSTO"/>
        <q-btn
          class="desktop-only glossy"
          style="max-width: 200px; width: 200px;"
          rounded
          color="deep-orange"
          label="VER CUSTO"/>
      </center>
    </div>
    <l-map
      class="full-height"
      full-width
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <v-marker-cluster>
        <l-marker
          v-for="marca in markers"
          :key="marca.uf"
          :lat-lng="marca.latlong"
          :icon="getIcone(marca.stfalha, marca.stdegradacao, marca.stdesconhecido)"
        >
          <l-popup>
            <div @click="innerClick">
              {{ marca.uf }}
              <q-list v-show="showParagraph">
                <q-item>
                  <q-item-section>
                    <q-item-label>Degradação</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ marca.stdegradacao }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                  <q-item-section>
                    <q-item-label>Desconhecido</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ marca.stdesconhecido }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                  <q-item-section>
                    <q-item-label>Falha</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ marca.stfalha }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                  <q-item-section>
                    <q-item-label>Sucesso</q-item-label>
                  </q-item-section>
                  <q-item-section side >
                    <q-item-label caption>{{ marca.stsucesso }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </l-popup>
        </l-marker>
      </v-marker-cluster>
    </l-map>
  </q-page>
</template>

<script>
import { latLng, Icon } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'PageMapa',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  data () {
    return {
      origem: 'Brasilia',
      destino: 'Belo Horizonte',
      mapa: {
        mod: true,
        visible: true,
        label: 'Mapa',
        caption: '',
        icon: ''
      },
      zoom: 4,
      center: latLng(-22.8331459, -47.2630796),
      currentCenter: latLng(-22.8331459, -47.2630796),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(-22.8331459, -47.2630796),
      currentZoom: 4,
      showParagraph: true,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      markers: [],
      // eslint-disable-next-line no-undef
      iconSucesso: L.icon({
        iconUrl: 'statics/map/sucesso.png',
        iconSize: [38, 50],
        popupAnchor: [0, -5]
      }),
      // eslint-disable-next-line no-undef
      iconFalha: L.icon({
        iconUrl: 'statics/map/falha.png',
        iconSize: [38, 50],
        popupAnchor: [0, -5]
      }),
      // eslint-disable-next-line no-undef
      iconDegradacao: L.icon({
        iconUrl: 'statics/map/degradacao.png',
        iconSize: [38, 50],
        popupAnchor: [0, -5]
      }),
      // eslint-disable-next-line no-undef
      iconDesconhecido: L.icon({
        iconUrl: 'statics/map/desconhecido.png',
        iconSize: [38, 50],
        popupAnchor: [0, -5]
      })
    }
  },
  watch: {
    //
  },
  methods: {
    getIcone (falha, degradacao, desconhecido) {
      if (falha > 0) {
        return this.iconFalha
      } else if (degradacao > 0) {
        return this.iconDegradacao
      } else if (desconhecido > 0) {
        return this.iconDesconhecido
      } else return this.iconSucesso
    },
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    innerClick () {
      //
    }
  },
  computed: {
    onStyleFull () {
      const height = screen.height
      // const conta = height - 217
      const conta = height - 0
      return 'height:' + conta + 'px;'
    }
  }
}
</script>
