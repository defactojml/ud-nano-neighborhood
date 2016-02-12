/**
 * Created by jmlegrand on 26/01/16.
 */

//TODO use require with node ....
// var ko = require('knockout');
// var _ = require('lodash');

var flickrConstants = {
  API_KEY: 'b3bdddc89ecc48e025bfad40ac785142',
  TAG_MODE: 'and',
  RADIUS: 2
};

var MAX_NUMBER = 10, FILTERED_KEYWORDS = ['Le', 'du', 'de'];


var map, infowindow;

function initMap() {
  // instantiate the map object
  map = new google.maps.Map(document.getElementById('map'), mapsOptions);
  ko.applyBindings(new ViewModel());
}


var MapElement = function(touristAttraction, selectedPhoto) {
  return {
    marker: new google.maps.Marker({
      position: new google.maps.LatLng(touristAttraction.lat, touristAttraction.lng),
      map: map,
      title: touristAttraction.title
    }),
    photo : selectedPhoto
  }
};


var ViewModel = function() {
  var self = this;
  this.mapElements = ko.observableArray([]);
  this.filterText = ko.observable("");

  _.forEach(datas, function(touristAttraction) {

    // build an array of strings based on the title of the place
    // filter the array to remove keywords
    var tags = _.filter(_.words(touristAttraction.title), function(tag) {
      return !_.includes(FILTERED_KEYWORDS, tag);
    });

    // build the url that will be used
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + flickrConstants.API_KEY +
      '&tags=' + touristAttraction.title + '&tag_mode=' + flickrConstants.TAG_MODE + '&lat=' + touristAttraction.lat + '&lon=' + touristAttraction.lng +
      '&radius=' + flickrConstants.RADIUS + '&radius_units=km&format=json&nojsoncallback=1';

    console.log(url);


    $.getJSON(url)
      .success(function(datas) {
        // filteredData: filtered list based on the tags passed in the query and the title returned for a given photo
        // for each photo ...
        var filteredData = _.filter(datas.photos.photo, function(photo) {
          // check if there is words associated to the photo's title
          if (!_.isEmpty(photo.title)) {
            // tranform the title into an array of strings
            var words = _.words(photo.title);
            // based on the tags, check if each tag can be found
            // the resulting array is compared to the arrays of strings tags
            // if the 2 structures are equals, the photo is considered founded
            return _.isEqual((_.filter(tags, function(tag) {
              return (_.findIndex(words, function(word) {
                return word === tag
              }) !== -1);
            })), tags);
          }
        });
        console.log('number of pics found for', touristAttraction.title, filteredData.length);
        // photo selection process
        // the photo is selected randomly based on MAX_NUMBER items founded
        var selectedPhoto = (filteredData.length > 0) ?
          ((filteredData.length >= MAX_NUMBER) ?
            _.slice(filteredData, filteredData.length - MAX_NUMBER)[_.random(0, MAX_NUMBER - 1)] :
            filteredData[_.random(0, filteredData.length - 1)]) : datas.photos.photo[_.random(0, datas.photos.photo.length - 1)];

        console.log('photo selected for', touristAttraction.title, selectedPhoto);

        // a map element is created, added to the list and associated to the map
        var mapElement = new MapElement(touristAttraction, selectedPhoto);
        self.mapElements.push(mapElement);
        mapElement.marker.setMap(map);
        // an event listener is created
        mapElement.marker.addListener('click', function() {
          setInfoWindowContent(self, mapElement);
        });
      })
      .fail(function(e) {
        console.log('nooooo...%o', e)
      });
    console.log('sent');

  });


  this.filteredTouristAttractions = ko.computed(function() {
    var filterText = self.filterText().toLowerCase();
    // no filtering, the full array is returned
    if (!filterText) {
      return self.mapElements();
    }
    // when a filter has been set, we filter using plain js (with lodash)
    else {
      return _.filter(self.mapElements(), function(touristAttraction) {
        var touristAttractionFounded = touristAttraction.name.toLowerCase().indexOf(filterText) !== -1;
        touristAttractionFounded ? touristAttraction.marker.setVisible(true) : touristAttraction.marker.setVisible(false);
        return touristAttractionFounded;
      })
    }
  });

  this.currentTouristAttraction = ko.observable("");

  this.changeTouristAttraction = function(mapElement) {
    setInfoWindowContent(self, mapElement);
  }
};


function setInfoWindowContent(self, mapElement) {
  if (!_.isEmpty(infowindow)) {
    infowindow.close();
  }
  self.currentTouristAttraction(mapElement);
  var staticUrl = 'https://farm' + mapElement.photo.farm + '.staticflickr.com/'
    + mapElement.photo.server + '/' + mapElement.photo.id + '_' + mapElement.photo.secret + '_m.jpg';
  infowindow = new google.maps.InfoWindow({
    content: '<img src=' + staticUrl + '>'
  });
  infowindow.open(map, self.currentTouristAttraction().marker);
}


var mapError = function() {
  document.getElementById('map').html('<h5>Unable to load google maps, please try again later</h5>');
};
