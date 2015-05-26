$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

  $(".login").click(function(){
    $("#loginmodal").modal();
    $("#loginmodal").removeClass('hidden');

  });

  $(".signup").click(function(){
    $("#signup-modal").modal();
    $("#signup-modal").removeClass('hidden');
  });


  var autocomplete2, autocomplete;


  (function initialize(){

    // Create the autocomplete object, restricting the search
    // to geographical location types.
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('start')),{types: ['geocode']});
    autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('end'));

  })()

  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }




  /*MAP*/


  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
// var DBC = new google.maps.LatLng(37.784848, -122.397203);
// var Home = new google.maps.LatLng(37.787182, -122.416171);
Number.prototype.toRadians = function() {
 return this * Math.PI / 180;
}

function distance(lat1,lon1,lat2,lon2){

  var R = 6371000; // meters (Earth's Radius)
  var φ1 = lat1.toRadians();
  var φ2 = lat2.toRadians();
  var Δφ = (lat2-lat1).toRadians();
  var Δλ = (lon2-lon1).toRadians();

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
  Math.cos(φ1) * Math.cos(φ2) *
  Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;

  return d;
}

(function initialize() {

  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(37.762997, -122.445137)
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
  calcRoute()
})()


function calcRoute() {
  var $JSONelement= JSON.parse($(".start-end").text());
  var start_point = $JSONelement.starting;
  // var end_point = $JSONelement.ending;
  var end_coordinates= JSON.parse($(".coordinates").text())
  var nearest_bikes = JSON.parse($(".data").text())
  var min_distance = 300
  var idx_rack
  for(var i=0;i<nearest_bikes.length;i++){
    var lat1 = end_coordinates.latitude
    var lon1 = end_coordinates.longitude
    var lat2 = parseFloat(nearest_bikes[i].latitude.latitude);
    var lon2 = parseFloat(nearest_bikes[i].latitude.longitude);
    var dist = distance(lat1,lon1,lat2,lon2);
    if(dist < min_distance){
      min_distance=dist;
      idx_rack=i;
    }
  }
  var end_rack = new google.maps.LatLng(parseFloat(nearest_bikes[idx_rack].latitude.latitude),parseFloat(nearest_bikes[idx_rack].latitude.longitude));

  $("#location").text("Location: "+nearest_bikes[idx_rack].yr_inst);
  $("#racks").text("Num Racks: "+nearest_bikes[idx_rack].racks);
  $("#spaces").text("Spaces: "+nearest_bikes[idx_rack].spaces);
  $("#year").text("Year built: "+nearest_bikes[idx_rack].yr_installed);
  var request = {
    origin: start_point,
    destination: end_rack,
    travelMode: google.maps.TravelMode.BICYCLING
  }
  directionsService.route(request, function(response, status){
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);



});
