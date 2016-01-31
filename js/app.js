/**
 * Created by jmlegrand on 26/01/16.
 */

//TODO use require with node ....
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

var ViewModel = function () {
  var self = this;
  this.touristPlaces = ko.observableArray([]);
  datas.touristPlaces.forEach(function (place) {
    self.touristPlaces.push(place.title)
  });
};

ko.applyBindings(new ViewModel());


// TODO flickr
//URL : https://api.flickr.com/services/rest/?method=flickr.geo.photosForLocation&api_key=4a9d265192929f69631c55b9a5bdf9bc&lat=48.85826&lon=2.29451&accuracy=16