$(document).ready(function() {
  //Inital buttons to be displayed
  var gifs = [
    "Final Fantasy",
    "Mass Effect",
    "Bioshock",
    "Pokemon",
    "The Witcher",
    "Super Mario World"
  ];

  function displayGifs() {
    var searchedTerm = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      searchedTerm +
      "&api_key=fCwmyJXMcCEV9eY9JRLltEhBBhIbBIlg&limit=30";
    //ajax call for whatever the user searched for
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      //Clears the area where the gifs are shown
      $(".gif-view").empty();

      var results = response.data;
      var random = [];

      do {
        var item = results[Math.floor(Math.random() * results.length)];
        if (!random.includes(item)) {
          random.push(item);
          console.log(`The current array has ${random.length} items`);
        } else {
          console.log(`${item.title} is already in the array`);
        }
      } while (random.length < 5);

      for (var i in random) {
        let item = random[i];
        console.log(item.title);
        var gifDiv = $("<div>");
        gifDiv.addClass("gif-picture");

        var rateThis = $("<h2>").text("Rating: " + item.rating);

        var gifImage = $("<img>");
        gifImage.attr("src", item.images.fixed_height_still.url);
        gifImage.attr("data-still", item.images.fixed_height_still.url);
        gifImage.attr("data-animate", item.images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gif-image");
        //displays gif
        gifDiv.prepend(rateThis);
        gifDiv.prepend(gifImage);
        $(".gif-view").prepend(gifDiv);
      }

      $(".gif-image").on("click", function() {
        var state = $(this).attr("data-state");

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
    for (var gif in gifs) {
      var a = $("<button>");

      a.addClass("gif");
      // Adding a data-attribute
      a.attr("data-name", gifs[gif]);
      // Providing the initial button text
      a.text(gifs[gif]);
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
