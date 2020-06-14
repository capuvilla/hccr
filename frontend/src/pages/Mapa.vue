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
            @click="info.visivel = false; info.navega = true"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog seamless v-model="info.navega" :position="info.position">
      <q-card style="width: 350px">
        <q-bar class="text-white" style="background:linear-gradient(to top, red, orange)">
          <div>
            <center>Como deseja iniciar sua rota?</center>
          </div>
        </q-bar>
        <q-card-section>
          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <center>
                <img alt="Meu Trecho" src="statics/img/maps.svg" style="width: 6em" @click="info.navega = false; info.viagem = true">
              </center>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <center>
                <img alt="Meu Trecho" src="statics/img/waze.svg" style="width: 4.8em" @click="info.navega = false; info.viagem = true">
              </center>
            </div>
          </div>
        </q-card-section>
        <q-card-actions class="row items-center no-wrap">
          <q-btn
            outline
            color="red"
            class="text-black full-width"
            label="VER OUTRA ROTA"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog seamless v-model="info.viagem" :position="info.position">
      <q-card style="width: 350px">
        <q-bar class="text-white" style="background:linear-gradient(to top, red, orange)">
          <div>
            <center>TENHA UMA BOA VIAGEM!</center>
          </div>
        </q-bar>
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <center>
                <p>AGRADECEMOS POR UTILIZAR O NOSSO APLICATIVO!</p>
              </center>
            </div>
          </div>
        </q-card-section>
        <q-card-actions class="row items-center no-wrap">
          <q-btn
            outline
            color="red"
            class="text-black full-width"
            label="VOLTAR PARA O MAPA"
            v-close-popup
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
          :icon="getIcone(marca.stsucesso, marca.stfalha, marca.stdegradacao, marca.stdesconhecido)"
        >
          <l-popup>
            <div @click="innerClick">
              <div class="text-red text-h6 text-center" v-if="marca.titulo !== ''">
                {{ marca.titulo }}<br>
              </div>
              {{ marca.uf }}
              <q-list v-show="showParagraph">
                <q-item>
                  <q-item-section>
                    <q-item-label>Buracos na via</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ marca.stdesconhecido }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                  <q-item-section>
                    <q-item-label>Acidentes</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ marca.stfalha }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                  <q-item-section>
                    <q-item-label>Posto de serviços</q-item-label>
                  </q-item-section>
                  <q-item-section side >
                    <q-item-label caption>{{ marca.stsucesso }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              {{ marca.msg }}
              <center class="q-pa-md">
                <q-btn
                  v-if="marca.titulo !== ''"
                  @click="onOpen('r')"
                  dense style="max-width: 200px; width: 200px;" color="red" label="+ VER MAIS"/>
                <q-btn
                  v-if="marca.titulo === ''"
                  @click="onOpen('g')"
                  dense style="max-width: 200px; width: 200px;" color="green" label="+ VER MAIS"/>
              </center>
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
        position: 'bottom',
        navega: false,
        viagem: false
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
      // Marcadores do mapa
      markers: [],
      // eslint-disable-next-line no-undef
      iconSucesso: L.icon({
        iconUrl: 'statics/map/sucesso.png',
        iconSize: [30, 40],
        popupAnchor: [0, -5]
      }),
      // eslint-disable-next-line no-undef
      iconFalha: L.icon({
        iconUrl: 'statics/map/falha.png',
        iconSize: [30, 40],
        popupAnchor: [0, -5]
      }),
      // eslint-disable-next-line no-undef
      iconDegradacao: L.icon({
        iconUrl: 'statics/map/degradacao.png',
        iconSize: [30, 40],
        popupAnchor: [0, -5]
      }),
      // eslint-disable-next-line no-undef
      iconDesconhecido: L.icon({
        iconUrl: 'statics/map/desconhecido.png',
        iconSize: [30, 40],
        popupAnchor: [0, -5]
      })
    }
  },
  watch: {
    //
  },
  mounted () {
    this.onAlimentaMarker()
  },
  methods: {
    onAlimentaMarker () {
      const dadosok = []
      const itndata = {
        uf: 'Av Senador Tancredo Neves - GO',
        msg: 'Caminhoneiros marcaram esse trecho como perigoso!',
        titulo: 'Cuidado!',
        lat: Number(-16.086243),
        long: Number(-47.986215),
        latlong: latLng(Number(-16.086243), Number(-47.986215)),
        stsucesso: Number(1),
        stdegradacao: Number(2),
        stfalha: Number(80),
        stdesconhecido: Number(4)
      }
      dadosok.push(itndata)
      const itndata2 = {
        titulo: '',
        uf: 'Posto Dom Pedro 99 - Km 447 - Cedrolândia, Caetanópolis - MG',
        msg: 'Caminhoneiros marcaram esse local como seguro para descanso!',
        lat: Number(-19.2994402),
        long: Number(-44.3800169),
        latlong: latLng(Number(-19.2994402), Number(-44.3800169)),
        stsucesso: Number(50),
        stdegradacao: Number(2),
        stfalha: Number(0),
        stdesconhecido: Number(4)
      }
      dadosok.push(itndata2)
      const itndata3 = {
        titulo: '',
        uf: 'Posto Brandão - R. Olímpio Martins de Araújo, João Pinheiro - MG',
        msg: 'Caminhoneiros marcaram esse local como seguro para descanso!',
        lat: Number(-17.7381923),
        long: Number(-46.187483),
        latlong: latLng(Number(-17.7381923), Number(-46.187483)),
        stsucesso: Number(20),
        stdegradacao: Number(2),
        stfalha: Number(2),
        stdesconhecido: Number(4)
      }
      dadosok.push(itndata3)
      this.markers = dadosok
    },
    onSumary (val) {
      this.info.kmtempo = val
    },
    onAbreCusto () {
      this.info.visivel = true
    },
    getIcone (sucesso, falha) {
      if (sucesso > falha) {
        return this.iconSucesso
      } else return this.iconFalha
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
    },
    onOpen (tipo) {
      if (tipo === 'r') {
        this.$router.push('/vermelho')
      } else {
        this.$router.push('/verde')
      }
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
