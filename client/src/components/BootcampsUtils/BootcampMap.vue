<template>
  <div style="width: 100%; height: 300px;">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="withPopup">
        <l-popup>{{ bootcamp.name }} </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  props: ['bootcamp'],
  data() {
    return {
      zoom: 15,
      center: latLng(
        this.bootcamp.location.coordinates[1],
        this.bootcamp.location.coordinates[0]
      ),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(
        this.bootcamp.location.coordinates[1],
        this.bootcamp.location.coordinates[0]
      ),
      currentZoom: 11.5,
      currentCenter: latLng(
        this.bootcamp.location.coordinates[1],
        this.bootcamp.location.coordinates[0]
      ),

      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    }
  }
};
</script>
