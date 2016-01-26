/**
 * Created by jmlegrand on 26/01/16.
 */

(function () {
    function initMap() {
      var myLatlng = new google.maps.LatLng(48.89067, 2.41592);

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

    initMap();
  })();