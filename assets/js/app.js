// INITIAL ARRAY OF TOPICS
var topics = ["dogs", "cats", "fish"];

function displayGifInfo() {

  var key = "api_key=K9B7VZVfI3exaWDJPkKk5AdqHzoUjE38";  
  var topic = $(this).attr("data-name");
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topic +"&"+ key + "&limit=10";
  // CREATE AN AJAX CALL FOR THE SPECIFIC GIF BUTTON BEING CLICKED
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // CREAT A DIV TO HOLD THE TOPIC
    for (var j = 0; j < topics.length; j++) {
      var topicDiv = $("<div class='topic>");

      // STORING THE RATING DATA
      var rating = response.rating;

      // CREATING A PARAGRAPH ELEMENT TO HAVE THE RATING DISPLAYED
      var pOne = $("<p>").text("Rating: " + rating);

      // DISPLAYING THE RATING
      topicDiv.append(pOne);

      // RETRIEVING THE URL FOR THE GIF
      var gifURL = response.data[j].images.fixed_height.url;

      // CREATING AN ELEMENT TO HOLD THE GIF/IMAGE
      var gif = $("<img>").attr("src", gifURL);

      // APPENDING THE GIF
      topicDiv.append(gif);

      // PUTTING THE ENTIRE GIF ABOVE THE PREVIOUS GIFS
      $("#gif-container").prepend(topicDiv);
    }
  })
}

function renderButtons() {
  // DELETING THE TOPICS PRIOR TO ADDING NEW TOPIC
  // NECESSARY OR WILL HAVE REPEAT BUTTONS
  $("#buttons-view").empty();

  // LOOPING THROUGH THE ARRAY OF TOPICS
  for (var i = 0; i < topics.length; i++) {
    // dynamically generating buttons for each movie in the array
    // this code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // ADDING A CLASS OF GIF-BTN TO OUR BUTTON
    a.addClass("gif-btn");
    // ADDING A DATA-ATTRIBUTE
    a.attr("data-name", topics[i]);
    // PROCIDING THE INITIAL BUTTON TEXT
    a.text(topics[i]);
    // ADDING THE BUTTON TO THE buttons-view div
    $("#buttons-view").append(a);
  }
  // UNBIND THE GIFS (with click event)***
  $(".gif-pic").unbind("click");
  $(".gif-pic").on("click", function() {
    $(".gif-pic").unbind("click");
    displayGifs($(this).text());
  })
}

// FUNCTION HANDLES EVENTS WHERE THE GIF BUTTON IS CLICKED
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // grabbing the input from the textbox
  var topic = $("#gif-input").val().trim();

  // ADDING MOVIE FROM TEXTBOX TO ARRAY 
  topics.push(topic);

  // CALLING RENDERBUTTONS WHICH HANDLES THE PROCESSING OF OUR TOPICS ARRAY
  renderButtons();
});

// ADD A CLICK EVENT LISTENER TO ALL ELEMENTS WITH A CLASS OF gif-btn
$(document).on("click", ".gif-btn", displayGifInfo);

// CALLING THE RENDERBUTTONS FUNCTION TO DISPLAY THE INITIAL BUTTONS
renderButtons();