/**
 * Created by jmlegrand on 26/01/16.
 */


// var ko = require('knockout');
// var _ = require('lodash');




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
    marker.addListener('click', function () {
      if (!_.isEmpty(marker.getAnimation()) || marker.getAnimation() === 1) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  })

}


//getWithGeoData

//URL : https://api.flickr.com/services/rest/?
// method=flickr.photos.getWithGeoData&
// api_key=4a9d265192929f69631c55b9a5bdf9bc&
// format=json&
// nojsoncallback=1&
// auth_token=72157661813552244-5b2b63e321d08ba6&
// api_sig=badc97e52280ad1f54925a4957bbcc3f


//URL : https://api.flickr.com/services/rest/?
// method=flickr.geo.photosForLocation&
// api_key=4a9d265192929f69631c55b9a5bdf9bc&
// format=json&
// nojsoncallback=1&
// auth_token=72157661813552244-5b2b63e321d08ba6&
// api_sig=badc97e52280ad1f54925a4957bbcc3f&
// lat=48.85826&
// lon=2.29451&
// accuracy=16


//URL : https://api.flickr.com/services/rest/?method=flickr.geo.photosForLocation&api_key=4a9d265192929f69631c55b9a5bdf9bc&lat=48.85826&lon=2.29451&accuracy=16