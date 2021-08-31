import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() coords: any;
  @ViewChild('mapa') mapa;
  constructor() { }

  ngOnInit() {
    // Componente que rendirisa el mapa
    setTimeout(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiamVycnltZWxlbmRlejk3IiwiYSI6ImNrdDBteXZ0ODA2ajIydXA5bGUyeHJlNzUifQ.AU_DkU6vX-QGJWCenLYfBQ';
        const map = new mapboxgl.Map({
        container: this.mapa.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: this.coords,
        zoom: 15
      });
  
      const marker = new mapboxgl.Marker().setLngLat( this.coords ).addTo(map);
    }, 1000);
  }

}
