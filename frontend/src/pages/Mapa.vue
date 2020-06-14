<template>
  <q-page class="window-height full-height">
    <q-dialog seamless v-model="info.visivel" :position="info.position">
      <q-card style="width: 350px">
        <q-bar class="text-white" style="background:linear-gradient(to top, red, orange)">
          <q-icon name="o_local_shipping" style="font-size: 2.4em;" />
          <div>Total da viagem</div>
          <q-space />
          <div>R$ {{ info.custos.total }}</div>
        </q-bar>
        <q-card-section>
          <Custo
            :kmtempo="info.kmtempo"
            :custos="info.custos"
            :visivel="info.visivel"
          />
        </q-card-section>
        <q-card-actions class="row items-center no-wrap">
          <q-btn
            outline
            color="red"
            class="text-black"
            label="VER OUTRA ROTA"
            v-close-popup
          />
          <q-space />
          <q-btn
            color="deep-orange"
            class="text-white"
            label="UTILIZAR ESTA ROTA"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="fixed-top vertical-middle q-pa-sm" style="z-index: 500">
      <center>
        <div class="q-pa-sm row q-col-gutter-sm" style="max-width: 760px">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <q-input
              class="mobile-only"
              style="max-width: 220px"
              color="black" bg-color="white" outlined dense
              v-model="origem"
              label="Origem">
            </q-input>
            <q-input
              class="desktop-only"
              style="max-width: 500px"
              color="black" bg-color="white" outlined dense
              v-model="origem"
              label="Origem">
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <q-input
              class="mobile-only"
              style="max-width: 220px"
              color="black" bg-color="white" outlined dense
              v-model="destino"
              label="Destino">
            </q-input>
            <q-input
              class="desktop-only"
              style="max-width: 500px"
              color="black" bg-color="white" outlined dense
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
          color="deep-orange"
          label="VER CUSTO"
          @click="onAbreCusto"
          />
        <q-btn
          class="desktop-only glossy"
          style="max-width: 200px; width: 200px;"
          color="deep-orange"
          label="VER CUSTO"
          @click="onAbreCusto"
          />
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
      <l-control-zoom position="bottomright"></l-control-zoom>
      <l-control-layers position="topright"  ></l-control-layers>
      <l-tile-layer
            v-for="tileProvider in tileProviders"
            :key="tileProvider.name"
            :name="tileProvider.name"
            :visible="tileProvider.visible"
            :url="tileProvider.url"
            :attribution="tileProvider.attribution"
            layer-type="base"/>
      <l-routing-machine
        :waypoints="waypoints"
        :lineOptions="lineColor"
        @retsumary="onSumary"
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
import { LMap, LTileLayer, LMarker, LPopup, LControlZoom, LControlLayers } from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import LRoutingMachine from '../components/LRoutingMachine'
import Custo from '../components/Custo'

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
    'v-marker-cluster': Vue2LeafletMarkerCluster,
    LControlZoom,
    LControlLayers,
    'l-routing-machine': LRoutingMachine,
    Custo
  },
  data () {
    return {
      origem: 'Brasilia',
      destino: 'Belo Horizonte',
      info: {
        kmtempo: {},
        custos: {
          combustivel: '492,08',
          pedagio: '127,20',
          total: '619,28'
        },
        visivel: false,
        position: 'bottom'
      },
      lineColor: {
        styles: [
          { color: 'black', opacity: 0.15, weight: 9 },
          { color: 'white', opacity: 0.8, weight: 6 },
          { color: 'blue', opacity: 1, weight: 2 }
        ]
      },
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
      tileProviders: [
        {
          name: 'Mapa',
          visible: true,
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        },
        {
          name: 'Relevo',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
      ],
      withPopup: latLng(-22.8331459, -47.2630796),
      waypoints: [
        latLng(-15.721387, -48.0774459),
        latLng(-19.9023386, -44.1041379)
      ],
      currentZoom: 4,
      showParagraph: true,
      mapOptions: {
        zoomSnap: 0.5,
        zoomControl: false
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
    onSumary (val) {
      this.info.kmtempo = val
    },
    onAbreCusto () {
      this.info.visivel = true
    },
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
