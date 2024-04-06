function initMap() {
  var MyLatLng = new google.maps.LatLng(36.5748441, 136.6483217); // 北陸地方の中心点
  var Options = {
    zoom: 8,
    center: MyLatLng,
    mapTypeId: 'roadmap'
  };
  var map = new google.maps.Map(document.getElementById('map'), Options);
  map.markers = [];
  // TrafficLayer の追加
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
  // TransitLayer の追加
  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  // トラフィックレイヤーのトグル機能
  document.getElementById('toggle-traffic').addEventListener('click', function() {
    if (trafficLayer.getMap()) {
      trafficLayer.setMap(null);
      this.classList.remove('btn-success');
      this.classList.add('btn-secondary');
    } else {
      trafficLayer.setMap(map);
      this.classList.remove('btn-secondary');
      this.classList.add('btn-success');
    }
  });
  // トランジットレイヤーのトグル機能
  document.getElementById('toggle-transit').addEventListener('click', function() {
    if (transitLayer.getMap()) {
      transitLayer.setMap(null);
      this.classList.remove('btn-secondary');
      this.classList.add('btn-success');
    } else {
      transitLayer.setMap(map);
      this.classList.remove('btn-success');
      this.classList.add('btn-secondary');
    }
  });
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) return;
      map.markers.forEach(marker => marker.setMap(null));
      map.markers = [];
      var bounds = new google.maps.LatLngBounds();
      places.forEach(place => {
          if (!place.geometry) return;
          var marker = new google.maps.Marker({
              map: map,
              title: place.name,
              position: place.geometry.location
          });
          map.markers.push(marker);
      // Place Detailsリクエスト
      marker.addListener('click', function() {
        service.getDetails({placeId: place.place_id}, function(result, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var content = '<div><strong>' + place.name + '</strong><br>' +
                          'Address: ' + place.formatted_address + '<br>' +
                          'Phone: ' + (place.formatted_phone_number || 'N/A') + '<br>' +
                          'Website: ' + (place.website ? '<a href="' + place.website + '">' + place.website + '</a>' : 'N/A') + '<br>' +
                          'Hours: ' + (place.opening_hours ? place.opening_hours.weekday_text.join(', ') : 'N/A') + '<br>' +
                          '<img src="' + (place.photos && place.photos.length ? place.photos[0].getUrl() : '') + '" alt="Place image" style="width:100px;"><br>' +
                          'Reviews: ' + (place.reviews && place.reviews.length ? place.reviews[0].text : 'N/A') + '</div>';
            infowindow.setContent(content);
            infowindow.open(map, marker);
          }
        });
      });
      if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
      } else {
          bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  var touristSpotMarkers = [];
  var markerCluster;
  fetch('/tourist_spots')
    .then(response => response.json())
    .then(data => {
      var markers = data.map(spot => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(spot.latitude, spot.longitude),
          title: spot.name,
        });
        var infowindow = new google.maps.InfoWindow({
          content: '<div><strong>' + spot.name + '</strong><br>' +
                   'Category: ' + spot.category + '</div>'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        return marker;
      });
      markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      });
      touristSpotMarkers = markers;
    });
  document.getElementById('toggle-tourist-spots').addEventListener('click', function() {
    var button = this;
    var isDisplayed = markerCluster.getMarkers().length > 0;
    if (isDisplayed) {
      markerCluster.clearMarkers();
      button.classList.remove('btn-success');
      button.classList.add('btn-secondary');
    } else {
      markerCluster.addMarkers(touristSpotMarkers);
      button.classList.remove('btn-secondary');
      button.classList.add('btn-success');
    }
  });
}