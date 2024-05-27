function loadScripts() {
  var googleMapsScriptLoaded = false;
  var markerClustererScriptLoaded = false;

  function initMapWhenReady() {
    if (googleMapsScriptLoaded && markerClustererScriptLoaded) {
      initMap();
    }
  }

  var googleMapsScript = document.createElement("script");
  googleMapsScript.type = "text/javascript";
  googleMapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyANC15Na85B6UwwYHXVP9NturgBAe0BpyQ&libraries=places&language=ja&callback=onGoogleMapsLoad";
  document.body.appendChild(googleMapsScript);

  var markerClustererScript = document.createElement("script");
  markerClustererScript.type = "text/javascript";
  markerClustererScript.src = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
  markerClustererScript.onload = function() {
    markerClustererScriptLoaded = true;
    initMapWhenReady();
  };
  document.body.appendChild(markerClustererScript);

  window.onGoogleMapsLoad = function() {
    googleMapsScriptLoaded = true;
    initMapWhenReady();
  };
}

if (!window.google || !window.MarkerClusterer) {
  loadScripts();
} else {
  initMap();
}

var markersByCategory = {};
var markerCluster;
var isVisible = true;

function initMap() {
  var isLoggedIn = document.getElementById("map").getAttribute("data-logged-in") === "true";
  var MyLatLng = new google.maps.LatLng(36.5748441, 136.6483217); // 北陸地方の中心点
  var Options = {
    zoom: 10,
    center: MyLatLng,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeId: "roadmap"
  };
  var map = new google.maps.Map(document.getElementById("map"), Options);
  map.markers = [];

  // TrafficLayer の追加
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  // TransitLayer の追加
  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);

  // トラフィックレイヤーのトグル機能
  document.getElementById("toggle-traffic").addEventListener("click", function() {
    if (trafficLayer.getMap()) {
      trafficLayer.setMap(null);
      this.classList.remove("btn-success");
      this.classList.add("btn-secondary");
    } else {
      trafficLayer.setMap(map);
      this.classList.remove("btn-secondary");
      this.classList.add("btn-success");
    }
  });

  // トランジットレイヤーのトグル機能
  document.getElementById("toggle-transit").addEventListener("click", function() {
    if (transitLayer.getMap()) {
      transitLayer.setMap(null);
      this.classList.remove("btn-secondary");
      this.classList.add("btn-success");
    } else {
      transitLayer.setMap(map);
      this.classList.remove("btn-success");
      this.classList.add("btn-secondary");
    }
  });

  var input = document.getElementById("pac-input");
  var autocomplete = new google.maps.places.Autocomplete(input, {componentRestrictions: {country: "jp"}});
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", function() {});
  var service = new google.maps.places.PlacesService(map);

  document.getElementById("search-button").addEventListener("click", function() {
    var input = document.getElementById("pac-input").value;
    if (!input) return;

    service.findPlaceFromQuery({query: input, fields: ["name", "geometry", "place_id"]}, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        map.markers.forEach(marker => marker.setMap(null));
        map.markers = [];
        var bounds = new google.maps.LatLngBounds();
        results.forEach(place => {
          if (!place.geometry) return;

          var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
          });
          map.markers.push(marker);

          marker.addListener("click", function() {
            service.getDetails({placeId: place.place_id}, function(result, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                var content = '<div><strong>' + 'Address: ' + result.formatted_address + '<br>' +
                              'Phone: ' + (result.formatted_phone_number || 'N/A') + '<br>' +
                              'Website: ' + (result.website ? '<a href="' + result.website + '">' + result.website + '</a>' : 'N/A') + '<br>' +
                              'Hours: ' + (result.opening_hours ? result.opening_hours.weekday_text.join(', ') : 'N/A') + '<br>' +
                              '<img src="' + (result.photos && result.photos.length ? result.photos[0].getUrl() : '') + '" alt="Place image" style="width:100px;"><br>' +
                              'Reviews: ' + (result.reviews && result.reviews.length ? result.reviews[0].text : 'N/A') + '</div>';

                var modalTitle = document.getElementById("infoModalLabel");
                var modalBody = document.querySelector("#infoModal .modal-body");

                modalTitle.textContent = result.name;
                modalBody.innerHTML = content;

                var myModal = new window.bootstrap.Modal(document.getElementById("infoModal"));
                myModal.show();
              }
            });
          });
          bounds.union(place.geometry.viewport ? place.geometry.viewport : place.geometry.location);
        });
        map.fitBounds(bounds);
      }
    });
  });

  markerCluster = new MarkerClusterer(map, [], {
    imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });

  var bookmarkStatus = {};

  fetch("/tourist_spots")
    .then(response => response.json())
    .then(data => {
      data.forEach(spot => {
        bookmarkStatus[spot.id] = spot.bookmark_id !== null;
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(spot.latitude, spot.longitude),
          title: spot.name,
          map: map
        });

        marker.addListener("click", function() {
          var modalTitle = document.getElementById("infoModalLabel");
          var modalBody = document.querySelector("#infoModal .modal-body");

          modalTitle.textContent = spot.name;
          modalBody.innerHTML = '<div>' + '住所: ' + spot.address + '<br>' +
                                'カテゴリ: ' + spot.category + '</div>';

          if (isLoggedIn) {
            var bookmarkButton = document.createElement("button");
            bookmarkButton.className = "btn btn-outline-primary bookmark-button";
            bookmarkButton.innerHTML = bookmarkStatus[spot.id] ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
            bookmarkButton.onclick = function() {
              var method = bookmarkStatus[spot.id] ? "DELETE" : "POST";
              var url = bookmarkStatus[spot.id] ? `/bookmarks/${spot.bookmark_id}` : "/bookmarks";
              fetch(url, {
                method: method,
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
                },
                body: method === "POST" ? JSON.stringify({ tourist_spot_id: spot.id }) : null
              }).then(response => response.json())
                .then(data => {
                  if (data.error) {
                    alert("操作に失敗しました。");
                  } else {
                    bookmarkStatus[spot.id] = !bookmarkStatus[spot.id];
                    bookmarkButton.innerHTML = bookmarkStatus[spot.id] ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
                    if (method === "POST") {
                      spot.bookmark_id = data.id;
                    } else {
                      spot.bookmark_id = null;
                    }
                  }
                }).catch(error => {
                  console.error("Error:", error);
                  alert("操作に失敗しました。");
                });
            };
            modalBody.appendChild(bookmarkButton);
          }

          var myModal = new window.bootstrap.Modal(document.getElementById("infoModal"));
          myModal.show();
        });

        markersByCategory[spot.category] = markersByCategory[spot.category] || [];
        markersByCategory[spot.category].push(marker);
      });
      updateMarkers("All");
    });

  window.updateMarkers = function(category) {
    markerCluster.clearMarkers();
    if (category === "All" || (category === "全て(マップに表示する観光地のカテゴリを選択)" && isVisible)) {
      Object.values(markersByCategory).flat().forEach(marker => markerCluster.addMarker(marker, false));
    } else if (isVisible) {
      markersByCategory[category].forEach(marker => markerCluster.addMarker(marker, false));
    }
  };

  document.getElementById("toggle-tourist-spots").addEventListener("click", function() {
    isVisible = !isVisible;
    markerCluster.clearMarkers();
    if (isVisible) {
      updateMarkers(document.getElementById("category-selector").value);
    }
    this.classList.toggle("btn-success", isVisible);
    this.classList.toggle("btn-secondary", !isVisible);
  });
}

window.updateMarkers = updateMarkers;