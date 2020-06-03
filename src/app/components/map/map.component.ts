import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare var mapboxgl : any

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {


  @Input() coordenadas: string;
  @ViewChild('mapa') myMap: ElementRef;

  constructor() { }

  ngAfterViewInit(){
    console.log("MAP Coords", this.coordenadas);

    let latlong = this.coordenadas.split(',');
    let latitud = Number(latlong[0]);
    let longitud = Number(latlong[1]);


    

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam5pbm9pdGZhY3RvcmlhIiwiYSI6ImNrYXd5dTM0eDAxYWcyc2x3cGJiaXFkZngifQ.XnNxv87OQK8EJPcJ-DpTaA';
    const map = new mapboxgl.Map({
      container: this.myMap.nativeElement,
      //container : 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitud, latitud],
      zoom: 15
    });

    const marker = new mapboxgl.Marker().setLngLat([longitud, latitud]).addTo(map)
    
  }

  ngOnInit() {
    
  }

}
