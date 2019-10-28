
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
var searchSelector=

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
    
        for (var i= 0; i<10; i++) {
            
        var newEle0= $("<div>");
        var newEle1= $("<div>");
        var newEle2= $("<div>");
        
        newEle0.addClass("headLine");
        newEle1.addClass("venueName");
        newEle2.addClass("eventLocation");
        
        newEle0.text(response.events[i].title);
        newEle1.text(response.events[i].venue.name);
        newEle2.text(response.events[i].venue.address);
        $(".eventDate").text(response.events[i].datetime_local);
    
        $("#event-wrap").append(newEle0, newEle1, newEle2);
        }
    
    });
}