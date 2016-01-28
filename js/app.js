/**
 * Created by jmlegrand on 26/01/16.
 */

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: datas.placeLocation.lat,
      lng: datas.placeLocation.lng
    },
    zoom: 11
  });

  var locationMarker = new google.maps.Marker({
    position: new google.maps.LatLng(datas.placeLocation.lat, datas.placeLocation.lng),
    map: map,
    title: "my home"
  });
  locationMarker.setMap(map);

  datas.touristPlaces.forEach(function (touristPlace) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(touristPlace.lat, touristPlace.lng),
      map: map,
      title: touristPlace.title
    });
    marker.setMap(map);
  })

}