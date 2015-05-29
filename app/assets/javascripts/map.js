$(".map.index").ready(function(){
  initializeMap();
});



function initializeMap(){

  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
     scrollwheel: false,
     navigationControl: false,
     mapTypeControl: false,
     scaleControl: false,
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

var avgRating = parseInt($(".rack-rating").text())
if (avgRating !== 0) $('#group-1-'+ (5 - avgRating)).prop("checked", true);


//Ratings
$(".acidjs-rating-stars form :input").change(function(e){
  var userRating = $(this).attr("value");
  var currentRackID = $(".ul-container").attr("data-id")
  $.ajax({
    url: '/rating',
    type: 'POST',
    dataType: 'JSON',
    data: {ratingData: {newRating: userRating, rackID: currentRackID}},
  })
  .done(function(e) {
    e === 1 ? $(".rating-count").text("1 Rating") : $(".rating-count").text(e + " Ratings")
  })
  .fail(function() {
    alert("Oops! You must be signed in to do that.");
  })
})

//comment form
$(".comment-form").on("submit", function(event){
  event.preventDefault();
  $.ajax({
    url: '/comment',
    type: 'POST',
    dataType: 'JSON',
    data: {comment: {content: $(".comment-form textarea").val(), bike_rack_id: parseInt($(".ul-container").attr("data-id"))}}
  })
  .done(function(e) {
    $(".comment-container").append('<div>'+e.user.email+':'+e.comment.content+'</div>')
    //Scroll to bottom
    $('html, body').animate({scrollTop: $(document).height()}, 'slow');
  })
  .error(function() {
    alert("You must be signed in to do that!")
  });

});
}