/**
 * Created by jmlegrand on 26/01/16.
 */

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.89067, lng: 2.41592},
    zoom: 8
  });
}