/**
 * Created by jmlegrand on 26/01/16.
 */



var myLatLng = {
  lat: 48.89067,
  lng: 2.41592
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 12
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });

}