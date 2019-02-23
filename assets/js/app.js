$(document).ready(function() {
  // TOPICS ARRAY
  var topics = ["puppies", "kittens", "fish"];
  // FOR USER INPUT OF NEWTOPIC
  var newTopic;

  // MAKE THE BUTTONS
  function renderButtons() {
    // DELETING THE TOPICS PRIOR TO ADDING NEW TOPIC; NECESSARY OR WILL HAVE REPEAT BUTTONS
    $("#gif-buttons").empty();
    // LOOPING THROUGH THE ARRAY OF TOPICS
    for (var i = 0; i < topics.length; i++) {
      // dynamically generating buttons for each movie in the array
      // this code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // ADDING A CLASS OF GIF-BTN TO OUR BUTTON
      a.addClass("topic-btn");
      // ADDING A DATA-ATTRIBUTE
      a.attr("data-name", topics[i]);
      // PROCIDING THE INITIAL BUTTON TEXT
      a.text(topics[i]);
      // ADDING THE BUTTON TO THE buttons-view div
      $("#gif-buttons").append(a);
      
    }
  }
  // FUNCTION HANDLES EVENTS WHERE THE GIF BUTTON IS CLICKED
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // grabbing the input from the textbox
    var topic = $("#gif-input").val().trim();
    // ADDING MOVIE FROM TEXTBOX TO ARRAY 
    topics.push(topic);
    $("#gif-input").val("");
    // CALLING RENDERBUTTONS WHICH HANDLES THE PROCESSING OF OUR TOPICS ARRAY
    renderButtons();
    // CHECK FOR BUGS
    console.log(topics);
  });
  renderButtons();

  // FUNCTION WILL GET GIPHY API STUFF (NEED URLS AND AJAX)
  // [og. getGifInfo]
  function gifMeMore() {

    var key = "api_key=K9B7VZVfI3exaWDJPkKk5AdqHzoUjE38";  
    var gifName = $(this).attr("data-name"); // og var = topic
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + gifName +"&"+ key + "&limit=10";
    // CREATE AN AJAX CALL FOR THE SPECIFIC GIF BUTTON BEING CLICKED
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(queryUrl);

      newTopic = response.data;
      // DELETING THE gifs PRIOR TO ADDING NEW TOPIC
      $(".gifs").empty();

      // CREAT A DIV TO HOLD THE TOPIC
      for (var j = 0; j < newTopic.length; j++) {
        var topicDiv = $("<div>");
        // STORING THE RATING DATA
        // CREATING A PARAGRAPH ELEMENT TO HAVE THE RATING DISPLAYED
        var pRating = $("<p>").text("Rating: " + response.data[j].rating);
        pRating.addClass("gifRating-text");
        console.log(response.data[j].rating);
        // CREATING AN ELEMENT TO HOLD THE GIF/IMAGE
        // var gifImage = $("<img>").attr("src", gifURL); break this down
        var gifImage = $("<img>");

        // DISPLAYING THE RATING
        // topicDiv.append(pRating); //maybe don't need since ^

        // RETRIEVING THE URL FOR THE GIF
        // var gifURL = response.data[j].images.fixed_height_still.url;

        gifImage.addClass("gif-pic");
        gifImage.attr("src", newTopic[j].images.fixed_height_still.url);
        gifImage.attr("frozen", "still"); // state
        gifImage.attr("frozen-p", j); // position

        // APPENDING THE GIF
        // topicDiv.append(gif);
        topicDiv.append(pRating);
        topicDiv.append(gifImage);
        topicDiv.addClass("single-gifs");

        // PUTTING THE ENTIRE GIF ABOVE THE PREVIOUS GIFS
        $("#gifs").prepend(topicDiv);
      } // done
    }) // done
  }
  $(document).on("click", ".topic-btn", gifMeMore);
    // UNBIND THE GIFS (with click event)***
    function gifMove() {
      var frozen = $(this).attr("frozen");
      var frozenp = $(this).attr("frozenp");
      frozenp = parseInt(frozenp);

      console.log(frozenp);
      console.log(response.data[frozenp].imaged.fixed_height_still.url);

      if (frozen === "still") {
        console.log("working it");
        $(this).attr("src", response.data[frozenp].images.fixed_height_still.url);
        $(this).attr("frozen", "animate");
      } else {
        $(this).attr("src", response.data[frozenp].images.fixed_height_still.url);
        $(this).attr("frozen", "still");
      }
    }
  
});




//  // TOPICS ARRAY
//   var topics = ["puppies", "kittens", "fish"];
//   // FOR USER INPUT OF NEWTOPIC
//   var newTopic;

//   // MAKE THE BUTTONS
//   function renderButtons() {
//     // DELETING THE TOPICS PRIOR TO ADDING NEW TOPIC; NECESSARY OR WILL HAVE REPEAT BUTTONS
//     $("#buttons-view").empty();
//     // LOOPING THROUGH THE ARRAY OF TOPICS
//     for (var i = 0; i < topics.length; i++) {
//       // dynamically generating buttons for each movie in the array
//       // this code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//       var a = $("<button>");
//       // ADDING A CLASS OF GIF-BTN TO OUR BUTTON
//       a.addClass("topic-btn");
//       // ADDING A DATA-ATTRIBUTE
//       a.attr("data-name", topics[i]);
//       // PROCIDING THE INITIAL BUTTON TEXT
//       a.text(topics[i]);
//       // ADDING THE BUTTON TO THE buttons-view div
//       $("#buttons-view").append(a);
      
//     }
//   }
//   // FUNCTION HANDLES EVENTS WHERE THE GIF BUTTON IS CLICKED
//   $("#add-gif").on("click", function(event) {
//     event.preventDefault();
//     // grabbing the input from the textbox
//     var topic = $("#gif-input").val().trim();

//     // ADDING MOVIE FROM TEXTBOX TO ARRAY 
//     topics.push(topic);
//     $("#gif-input").val("");
//     // CALLING RENDERBUTTONS WHICH HANDLES THE PROCESSING OF OUR TOPICS ARRAY
//     renderButtons();
//     // CHECK FOR BUGS
//     console.log(topics);
//   });
//   renderButtons();

//   // FUNCTION WILL GET GIPHY API STUFF (NEED URLS AND AJAX)
//   // [og. getGifInfo]
//   function gifMeMore() {

//     var key = "api_key=K9B7VZVfI3exaWDJPkKk5AdqHzoUjE38";  
//     var gifName = $(this).attr("data-name"); // og var = topic
//     var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + gifName +"&"+ key + "&limit=10";
//     // CREATE AN AJAX CALL FOR THE SPECIFIC GIF BUTTON BEING CLICKED
//     $.ajax({
//       url: queryUrl,
//       method: "GET"
//     }).then(function(response) {
//       console.log(response);
//       console.log(queryUrl);

//       newTopic = response.data;
//       // DELETING THE gifs PRIOR TO ADDING NEW TOPIC
//       $(".gifs").empty();

//       // CREAT A DIV TO HOLD THE TOPIC
//       for (var j = 0; j < topics.length; j++) {
//         var topicDiv = $("<div>");
//         // STORING THE RATING DATA
//         // CREATING A PARAGRAPH ELEMENT TO HAVE THE RATING DISPLAYED
//         var pRating = $("<p>").text("Rating: " + results[j].rating);
//         pRating.addClass("gifRating-text");
//         // CREATING AN ELEMENT TO HOLD THE GIF/IMAGE
//         // var gifImage = $("<img>").attr("src", gifURL); break this down
//         var gifImage = $("<img>");

//         // DISPLAYING THE RATING
//         // topicDiv.append(pRating); //maybe don't need since ^

//         // RETRIEVING THE URL FOR THE GIF
//         // var gifURL = response.data[j].images.fixed_height_still.url;

//         gifImage.addClass("gif-pic");
//         gifImage.attr("src", newTopic[j].images.fixed_height_still.url);
//         gifImage.attr("frozen", "still");
//         gifImage.attr("frozen-p", j);

//         // APPENDING THE GIF
//         // topicDiv.append(gif);
//         topicDiv.append(pRating);
//         topicDiv.append(gifImage);
//         topicDiv.addClass("single-gifs");

//         // PUTTING THE ENTIRE GIF ABOVE THE PREVIOUS GIFS
//         $("#gifs").prepend(topicDiv);
//       } // done
//     }) // done
//   }

//     // UNBIND THE GIFS (with click event)***
//     function gifMove() {
//       var frozen = $(this).attr("frozen");
//       var frozenp = $(this).attr("frozenp");
//       frozenp = parseInt(frozenp);

//       console.log(frozenp);
//       console.log(results[frozenp].imaged.fixed_height_still.url);

//       if (frozen === "still") {
//         console.log("working it");
//         $(this).attr("src", results[frozenp].images.fixed_height_still.url);
//         $(this).attr("frozen", "animate");
//       } else {
//         $(this).attr("src", results[frozenp].images.fixed_height_still.url);
//         $(this).attr("frozen", "still");
//       }
//     }
//     $(".gif-pic").unbind("click");
//     $(".gif-pic").on("click", function() {
//       $(".gif-pic").unbind("click");
//       displayGifs($(this).text());
//     })
//   }

  // FUNCTION HANDLES EVENTS WHERE THE GIF BUTTON IS CLICKED
  // $("#add-gif").on("click", function(event) {
  //   event.preventDefault();
  //   // grabbing the input from the textbox
  //   var topic = $("#gif-input").val().trim();

  //   // ADDING MOVIE FROM TEXTBOX TO ARRAY 
  //   topics.push(topic);
  //   $("#gif-input").val("");
  //   // CALLING RENDERBUTTONS WHICH HANDLES THE PROCESSING OF OUR TOPICS ARRAY
  //   renderButtons();
  //   // CHECK FOR BUGS
  //   console.log(topics);
  // });

  // // ADD A CLICK EVENT LISTENER TO ALL ELEMENTS WITH A CLASS OF gif-btn
  // $(document).on("click", ".gif-btn", displayGifInfo);

  // // CALLING THE RENDERBUTTONS FUNCTION TO DISPLAY THE INITIAL BUTTONS
  // renderButtons();