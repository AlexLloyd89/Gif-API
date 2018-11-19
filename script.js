var gifs = [];

function displayGifs() {
  var gif = $(this).attr("data-name");
  //Change out for GIFY API!!!
  /*var queryURL =
    "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#movies-view").text(JSON.stringify(response));
  }); */
}

function renderButtons() {
  $("#searched-for").empty();

  // Looping through the array of movies
  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");

    a.addClass("gif");
    // Adding a data-attribute
    a.attr("data-name", gifs[i]);
    // Providing the initial button text
    a.text(gifs[i]);
    // Adding the button to the buttons-view div
    $("#searched-for").append(a);
  }
}

$(".search").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var gif = $(".search")
    .val()
    .trim();

  // Adding the movie from the textbox to our array
  gifs.push(gif);
  console.log(gifs);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});
$(document).on("click", ".gif", displayGifs);

// Calling the renderButtons function to display the initial buttons
renderButtons();
