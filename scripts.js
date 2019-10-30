
var seatGeekBase= "https://api.seatgeek.com/2";
var myKey= "&client_id=MTY5MzA1NDd8MTU3MTg3NTc4Mi40NA";
var venuesKey= "/venues?";
var byEvents= "/events?";
var byPerformers="/performers?";
var byZip= "&postal_code=";
var userInput="music";


// Resource Endpoints
// /events
// /events/{EVENT_ID}
// /performers
// /performers/{PERFORMER_ID}
// /venues
// /venues/{VENUE_ID}


$("#submit").on("click", callEvents);

function callEvents(){
    var initialInput= $("#cities").val().trim();
    userInput= "q="+initialInput;
    console.log("user input: "+ userInput);

    var query= seatGeekBase+byEvents+userInput+myKey;
    
    var settings= 
        {
            url: query,
            method:"GET"
        };

    var searchSelector= $("#searchSelector").val();
    
    console.log(searchSelector, "is my search value");

    if(searchSelector==="0"){
        
        console.log("basic");
        $.ajax(settings).then(basicResults);

    }else if (searchSelector==="1"){
        console.log("search perfomers");

        settings.url=seatGeekBase+byPerformers+userInput+myKey;
        console.log(settings.url);
        $.ajax(settings).then(performerResults);
        
    }else if(searchSelector==="2"){
        console.log("search venues");
        
        // settings.url= 

    }else if(searchSelector==="3"){
        console.log("search zips")
    };        


    function basicResults(response){
        console.log("we got to basic response function:", response);

        $(".headLine").empty();
        $(".venueName").empty();
        $(".eventLocation").empty();
        $(".eventDate").empty();
        $(".sryMsg").empty();
        $(".sryMsgSub").empty();

        if (response.events.length==0){
            var sryMsg=$("<h1>").addClass("sryMsg");
            var sryMsgSub=$("<h3>").addClass("sryMsgSub");
            sryMsg.text("Sorry we couldn't find any upcoming events based on your search.")
            sryMsgSub.text("Check your spelling or try changing the search parameters.");

            $("#event-wrap").append(sryMsg, sryMsgSub);

        }else{

            for (var i= 0; i<10; i++) {
                
            var newEle0= $("<div>");
            var newEle1= $("<div>");
            var newEle2= $("<div>");
            var newEle3= $("<div>");
            // var newImg= $("<img>");
            var newLink=$("<a>");

            newEle0.addClass("headLine");
            newEle1.addClass("venueName");
            newEle2.addClass("eventLocation");
            newEle3.addClass("eventDate");
            // newImg.addClass("eventImg");
            newLink.addClass("eventLink");

            newEle0.text(response.events[i].title);
            newEle1.text(response.events[i].venue.name);
            newEle2.text(response.events[i].venue.address);
            newEle3.text(response.events[i].datetime_local);
            newLink.attr("href", response.events[i].url);
            newLink.text("Click here to find tickets");
            
            
            $("#event-wrap").append(newEle0, newEle1, newEle2, newEle3, newLink);
            }
        }   




    };

    function performerResults(response){
        console.log("we got to performer response function:", response);

        $(".headLine").empty();
        $(".venueName").empty();
        $(".eventLocation").empty();
        $(".eventDate").empty();
        $(".sryMsg").empty();
        $(".sryMsgSub").empty();

        if(response.performers.length===0
            // this following tag is not working and I don't know why currently, but if made function could improve the results feedback: 
            // || response.performers[0].has_upcoming_events==false
             ){

            var sryMsg=$("<h1>").addClass("sryMsg");
            var sryMsgSub=$("<h3>").addClass("sryMsgSub");
            sryMsg.text("Sorry we couldn't find any upcoming events based on your search for '"+initialInput+"'");
            sryMsgSub.text("Check your spelling or try changing the search parameters.");

            $("#event-wrap").append(sryMsg, sryMsgSub);

        }else{
            
            for (var i= 0; i<10; i++) {
        
            var newEle0= $("<div>");
            var newEle1= $("<div>");
            var newEle2= $("<div>");
            var newEle3= $("<div>");
            var newLink= $("<a>");
            var newImg=$("<img>");

            newEle0.addClass("headLine");
            newEle1.addClass("venueName");
            newEle2.addClass("eventLocation");
            newEle3.addClass("eventDate");
            newLink.addClass("eventLink");
            newLink.text("click here to see tickets");
            newImg.addClass("eventImg");

            newEle0.text(response.performers[i].short_name);
            newEle1.text(response.performers[i].location);
            newLink.attr("href", response.performers[i].url);
            newImg.attr("src", response.performers[i].images.huge);

            $("#event-wrap").append(newEle0, newEle1, newEle2, newEle3, newLink, newImg);
            }
        }

    };


}