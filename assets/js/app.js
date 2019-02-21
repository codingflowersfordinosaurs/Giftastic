// NEED AN ARRAY OF TOPICS (for the gifs)
var topics = ["Scooby-Doo", "Super Smash Bros", "Puppies"];

// NEED TO CREATE BUTTONS AND CLEAR BUTTONS
function makeButtons() {
  
  // iterating through topics array using a for loop
  for (var i = 0; i < topics.length; i++) {
    // make making the button using jQuery and button tag
    var createB = $("<button>");
    createB.addClass("btn");
    createB.addClass("the-button");
    createB.text(topics[i]);
    createB.attr("data-name", topics[i]);
    $("#buttons").append(createB);
  }
}

// NEED TO SHOW THE GIFS WHEN BTN CLASS IS CLICKED...so an event listener .on("click", ...)
$(document).on("click", ".btn", showGifs);

// NEED A FUNCTION SO GIPHS DON'T AUTOMATICALLY SHOW ON PAGE W/OUT INPUT & SEARCH; + QUERYURL AND AJAX STUFF
function () {
  // NEED TO LOAD THE API FUNCTION
  function showGifs() {
    var key = "api_key=K9B7VZVfI3exaWDJPkKk5AdqHzoUjE38";  
    var gif = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=";

    // NEED TO CLEAR OUT THE PREVIOUS BUTTON GIFS
    $("#gifView").empty();

    $.ajax ({
      url:
      queryUrl + gif + "&" + key + "&" + "limit=10",
      method: "GET"
    })
    .then(function(response) {
      console.log(response);

      // NEE TO CREATE IMAGES FOR THE GIFS
      for (var g = 0; g < response.data.length; g++) {
        var results = response.data;
        var gifDiv = $("<div>");
        var p = $("<p>");
        p.text("Rating: " + results[g].rating);
        var image = $("<img>");
        image.attr("src", results[g].images.original.url);
        image.attr("alt", results[g].title);
        gifDiv.append(p);
        gifDiv.addClass("inline-block");
        $("#gifView").append(gifDiv);
      }
    });
  }
}


