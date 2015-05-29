
$(".home.index").ready(function() {
  initializeHome();
});





function initializeHome(){

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

}
