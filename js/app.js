/**
 * Created by jmlegrand on 26/01/16.
 */

function initMap() {
  // instantiate the map object
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: datas.home.lat,
      lng: datas.home.lng
    },
    zoom: 11
  });

  // create a dedicated marker to add the place i currently live
  var locationMarker = new google.maps.Marker({
    position: new google.maps.LatLng(datas.home.lat, datas.home.lng),
    map: map,
    title: "my home"
  });
  locationMarker.setMap(map);

  // create a marker for each and every tourist place and add them to the map
  datas.touristPlaces.forEach(function (touristPlace) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(touristPlace.lat, touristPlace.lng),
      map: map,
      title: touristPlace.title
    });
    marker.setMap(map);
  })

}