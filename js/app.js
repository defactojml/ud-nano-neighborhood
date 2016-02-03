/**
 * Created by jmlegrand on 26/01/16.
 */

//TODO use require with node ....
// var ko = require('knockout');
// var _ = require('lodash');

var map;

function initMap() {
  // instantiate the map object
  map = new google.maps.Map(document.getElementById('map'), {
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
  /*_.forEach(datas.touristPlaces, function(touristPlace){

   var marker = new google.maps.Marker({
   position: new google.maps.LatLng(touristPlace.lat, touristPlace.lng),
   map: map,
   title: touristPlace.title
   });
   marker.setMap(map);
   marker.addListener('click', function() {
   if (!_.isEmpty(marker.getAnimation()) || marker.getAnimation() === 1) {
   marker.setAnimation(null);
   } else {
   marker.setAnimation(google.maps.Animation.BOUNCE);
   }
   });
   })*/

}

(function() {

  var Place = function(data) {
    this.name = data.title;
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.lat, data.lng),
      map: map,
      title: data.title
    });
  };

  var ViewModel = function() {
    var self = this;
    this.touristPlaces = ko.observableArray([]);
    this.filterText = ko.observable("");

    // we initialize the observableArray from datas
    datas.touristPlaces.forEach(function(place) {
      self.touristPlaces.push(new Place(place));
      place.marker.setMap(map);
      /*marker.addListener('click', function() {
       if (!_.isEmpty(marker.getAnimation()) || marker.getAnimation() === 1) {
       marker.setAnimation(null);
       } else {
       marker.setAnimation(google.maps.Animation.BOUNCE);
       }
       });*/
    });


    this.touristPlacesFiltered = ko.computed(function() {
      var filterText = self.filterText().toLowerCase();
      // no filtering, the full array is returned
      if (!filterText) {
        return self.touristPlaces();
      }
      // when a filter has been set, we filter using plain js (with lodash)
      else {
        return _.filter(self.touristPlaces(), function(place) {
          return (place.name.toLowerCase().indexOf(filterText) > -1);
        })
      }
    });
  };

  ko.applyBindings(new ViewModel());

}());


var mapError = function(){
  document.getElementById('map').html('<h5>Unable to load google maps, please try again later</h5>');
};

// TODO flickr
//URL : https://api.flickr.com/services/rest/?method=flickr.geo.photosForLocation&api_key=4a9d265192929f69631c55b9a5bdf9bc&lat=48.85826&lon=2.29451&accuracy=16