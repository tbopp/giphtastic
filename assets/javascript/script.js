//Create an array of video games to start with

var gameArray = ["Final Fantasy", "Mass Effect", "Gears of War", "Dark Souls", "Horizon Zero Dawn", "World of Warcraft", "Command and Conquer", "Paragon", "Fallout", "Skyrim"];

// Create a function to display the game buttons

      function renderButtons() {

        $("#games-view").empty();

// Create a loop to run through the array of games to generate buttons for each index in the array.

        for (var i = 0; i < gameArray.length; i++) {
          var a = $("<button>");
          a.addClass("game");
          a.attr("data-name", gameArray[i]);
          a.text(gameArray[i]);
          a.attr("data-state", "still");
          $("#games-view").append(a);
        }
      }

renderButtons();

//Create the call to Giphy API using the data from the buttons.

$(document).on("click", "button", function() {
  var gameTitle = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4dRNEaTFYbZGFAteZdi8w68LLYFIR97S&q=" + gameTitle + "&limit=10&offset=0&rating=G&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var results = response.data;
        for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var gameImage = $("<img>");
          gameImage.attr("src", results[i].images.fixed_height_still.url);
          gifDiv.append(p);
          gifDiv.append(gameImage);
          $("#games-gif-view").prepend(gifDiv);
        }
      }
    });
});

// Create a function to handle button click events

      $("#add-game").on("click", function(event) {
        event.preventDefault();
        var game = $("#game-input").val().trim();
        gameArray.push(game);
        renderButtons();
      });

      $(".game").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          var animateURL = $(this).attr("data-animate")//https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif
          $(this).attr("src", animateURL);
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });