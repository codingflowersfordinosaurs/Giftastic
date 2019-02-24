// (function() { // OG code
$(document).ready(function () {
  //create the array of topics for the gifs
  var topics = ["puppies", "kittens", "fish"];

  //create the variables to hold my API documentation

  //create the dynamic buttons
  function renderButtons() {
    //clear the buttons before render
    $("#buttons").empty();

    for (var j = 0; j < topics.length; j++) {
      var rendor = $("<button>");
      rendor.addClass("btns");
      rendor.addClass("main-btn");
      rendor.attr("data-name", topics[j]);
      rendor.text(topics[j]);
      $("#buttons").append(rendor);
    }
  }

  //display the gifs on click of btn class
  $(document).on("click", ".btns", gifMeMore);
////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////
  renderButtons();
  moveGif();
  //load in the API function
  function gifMeMore() {
    var key = "api_key=K9B7VZVfI3exaWDJPkKk5AdqHzoUjE38";
    var newTopic = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + newTopic + "&" + key + "&limit=10";

    //clear out the previous button gifs
    $(".gifs").empty();

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      //for each gif, create the image
      for (var i = 0; i < response.data.length; i++) {
        var justjifs = response.data;
        var gifPic = $("<div>");
        var p = $("<p>");
        p.text("Rating: " + justjifs[i].rating);
        var image = $("<img>");
        image.attr("src", justjifs[i].images.original.url);
        image.attr("alt", justjifs[i].title);
        gifPic.append(p);
        gifPic.append(image);
        gifPic.addClass("inline-block");
        $(".gifs").append(gifPic);
      }
    });
  }

      // UNBIND THE GIFS ***
    function moveGif() {
      // var still = $(this).data("still");
      // var animated = $(this).data("animated");
      var gifState = $(this).data("type");
      var stillURL = response.data[i].images.fixed_height_still.url;
      var animateURL = response.data[i].images.fixed_height.url; 
      // frozenp = parseInt(frozenp);

      // console.log(frozenp);
      // console.log(object.data[frozenp].imaged.fixed_height_still.url);

      if (gifState === "still") {
        $(this).attr("src", animateURL);
        $(this).data("type", "animated");
        console.log(gifState);
      } else if (gifState === "animated") {
        $(this).attr("src", stillURL);
        $(this).data("type", "still");
        console.log(gifState);
      }
    }

});







