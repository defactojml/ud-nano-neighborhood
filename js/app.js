/**
 * Created by jmlegrand on 26/01/16.
 */

//TODO use require with node ....
// var ko = require('knockout');
// var _ = require('lodash');


var map, infowindow;

function initMap() {
  // instantiate the map object
  map = new google.maps.Map(document.getElementById('map'), mapsOptions);
  ko.applyBindings(new ViewModel());
}

var Place = function (data) {
  this.name = data.title;
  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.lat, data.lng),
    map: map,
    title: data.title
  });
};

var ViewModel = function () {
  var self = this;
  this.touristPlaces = ko.observableArray([]);
  this.filterText = ko.observable("");

  // we initialize the observableArray from datas
  _.forEach(datas, function (_place) {
    var place = new Place(_place);
    self.touristPlaces.push(place);
    place.marker.setMap(map);
    place.marker.addListener('click', function () {
      if (!_.isEmpty(place.marker.getAnimation()) || place.marker.getAnimation() === 1) {
        place.marker.setAnimation(null);
      } else {
        place.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  });


  this.touristPlacesFiltered = ko.computed(function () {
    var filterText = self.filterText().toLowerCase();
    // no filtering, the full array is returned
    if (!filterText) {
      return self.touristPlaces();
    }
    // when a filter has been set, we filter using plain js (with lodash)
    else {
      return _.filter(self.touristPlaces(), function (place) {
        var predicate = place.name.toLowerCase().indexOf(filterText) > -1;
        if (predicate) {
          place.marker.setVisible(true);
        } else {
          place.marker.setVisible(false);
        }
        return predicate;
      })
    }
  });

  this.currentPlace = ko.observable("");

  this.changePlace = function(place) {
    // close the infowindow whenever we click on another place
    if (!_.isEmpty(infowindow)) {
      infowindow.close();
    }
    self.currentPlace(place);
    infowindow = new google.maps.InfoWindow({
      content:  '<p>Hello World <b>Jean-Michel</b><p>'
    });
    infowindow.open(map, self.currentPlace().marker);
  }
};

var mapError = function () {
  document.getElementById('map').html('<h5>Unable to load google maps, please try again later</h5>');
};

// TODO flickr
//URL : https://api.flickr.com/services/rest/?method=flickr.geo.photosForLocation&api_key=4a9d265192929f69631c55b9a5bdf9bc&lat=48.85826&lon=2.29451&accuracy=16