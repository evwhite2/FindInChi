var seatGeekBase= "https://api.seatgeek.com/2";
var myKey= "&client_id=MTY5MzA1NDd8MTU3MTg3NTc4Mi40NA";
var venuesKey= "/venues?";
var byEvents= "/events?";
var byPerformers="/performers?";
var byZip= "&postal_code=";



// Resource Endpoints
// /events
// /events/{EVENT_ID}
// /performers
// /performers/{PERFORMER_ID}
// /venues
// /venues/{VENUE_ID}

var userInput="music";

$("#submit").on("click", callEvents);

function callEvents(){

    console.log("click")
    userInput= "q="+$("#cities").val().trim();
    console.log("user input: "+ userInput);

    var query= seatGeekBase+byEvents+userInput+myKey;

    var settings= 
    {
        url: query,
        method:"GET"
    };


$.ajax(settings).then(function(response){
    console.log(response);

    // $("#headLine").text(response.events[0].title);
    // $("#venueName").text(response.events[0].venue.name);
    // $("#eventLocation").text(response.events[0].venue.address);
    // $("#eventDate").text(response.events[0].datetime_local);
});

}