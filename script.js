$(document).ready(function() {
  //Inital buttons to be displayed
  var gifs = [
    "Final Fantasy",
    "Mass Effect",
    "Bioshock",
    "Overwatch",
    "The Witcher",
    "Super Mario World"
  ];

  function displayGifs() {
    var searchedTerm = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      searchedTerm +
      "&api_key=fCwmyJXMcCEV9eY9JRLltEhBBhIbBIlg&limit=5";
    //ajax call for whatever the user searched for
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      //Clears the area where the gifs are shown
      $(".gif-view").empty();

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        gifDiv.addClass("gif-picture");

        var rating = results[i].rating;
        var rateThis = $("<h2>").text("Rating: " + rating);

        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gif-image");
        //displays gif
        gifDiv.prepend(rateThis);
        gifDiv.prepend(gifImage);
        $(".gif-view").prepend(gifDiv);
      }

      $(".gif-image").on("click", function() {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  }

  function renderButtons() {
    $("#searched-for").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {
      var a = $("<button>");

      a.addClass("gif");
      // Adding a data-attribute
      a.attr("data-name", gifs[i]);
      // Providing the initial button text
      a.text(gifs[i]);
      // Adding the button to the searched-for div
      $("#searched-for").append(a);
    }
  }

  $("#submit").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var gif = $(".search")
      .val()
      .trim();

    // Adding the movie from the textbox to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  $(document).on("click", ".gif", displayGifs);

  // Calling the renderButtons function to display the initial buttons
  renderButtons();
});
