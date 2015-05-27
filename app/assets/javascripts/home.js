$(".home.index").ready(function() {
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

});


/*MAP*/
$(".map.index").ready(function(){


  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;




  function initialize() {

    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(37.762997, -122.445137)
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    calcRoute()
  }


  function calcRoute() {

    var start_point = new google.maps.LatLng(parseFloat(JSON.parse($(".start-loc").text())[0]),parseFloat(JSON.parse($(".start-loc").text())[1]));
    var end_rack = new google.maps.LatLng(parseFloat(JSON.parse($(".nearest-bike").text())[0]),parseFloat(JSON.parse($(".nearest-bike").text())[1]));


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
