$(document).ready(function () {
    
    function displayBookPreview() {

        // Google Books API Key Access
        var apiKeyGoogle = "AIzaSyBzrVa4fIYwGQhY0ZJKd3knqqKAmXrp1IM"
        var searchTitle = $("#search").val().trim();
        var numberOfBooks = 5
        var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTitle + "&key=" + apiKeyGoogle;
        var title = [];
        // Ajax request for API Key
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < numberOfBooks; i++) {
                var cardWrapper = $("<div>");
                var bookContainer = $("<div>");
                var bookImageDiv = $("<div>");
                var previewButton = $("<a>");
                var cardContent = $('<div>');
                title.push(response.items[i].volumeInfo.title);
                var authors = response.items[i].volumeInfo.authors[0];
                var coverArt = response.items[i].volumeInfo.imageLinks.smallThumbnail;
                var isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;
                // Creating classes to make the created card work with Materialize CSS
                cardWrapper.addClass("col s4 m2");
                bookContainer.addClass("card");
                bookImageDiv.addClass("card-image");
                previewButton.addClass("btn-floating halfway-fab waves-effect waves-light red accordin-button");
                cardContent.addClass("card-content");
                // Appending the elements to the individual card classes
                previewButton.append($('<i class="material-icons">more_horiz</i>'));
                cardContent.append($('<h4 style="font-size:1.3rem;">' + title + '</h4>'));
                cardContent.append($('<p style="font-style:italic;">' + authors + '</p>'));
                bookTitle.append($(title));
                // Appending the card classes inside their parent card Divs

                bookImageDiv.append($('<img src=' + coverArt + '>'));
                bookImageDiv.append(previewButton);

                bookContainer.append(bookImageDiv);
                bookContainer.append(cardContent);

                cardWrapper.append(bookContainer);

                $('#book-results').append(cardWrapper);

                document.getElementById("book-results").addEventListener("click", function(e) {
                    // e.target is the clicked element!
                    // If it was a list item
                    if(e.target && e.target.nodeName == "a.accordion-button") {
                        var acc = document.getElementsByClassName("accordion");
                        accordion.classList.toggle("active");
                    }
                });


                previewButton.addEventListener('click', function () {
                        var acc = document.getElementsByClassName("accordion");

                        /* Toggle between adding and removing the "active" class,
                        to highlight the button that controls the panel */
                        this.classList.toggle("active");

                        /* Toggle between hiding and showing the active panel */
                        var panel = this.nextElementSibling;
                        if (panel.style.display === "block") {
                            panel.style.display = "none";
                        } else {
                            panel.style.display = "block";
                        }

                    })

                // New York Times API key
                var nytApiKey = "XxNStNBahslMckwWpoKsfnbkXiQ6SkF1";
                var modalBookTitle = response.items[i].volumeInfo.title;
                var nytURL = "https://api.nytimes.com/svc/books/v3//reviews.json?title=" + modalBookTitle + "&api-key=" + nytApiKey;
                // getting the New York Times review
                $.ajax({
                    url: nytURL,
                    method: "GET"
                }).then(function (NYTresponse) {
                    $("#review").html(response.results[0].byline);
                    $('#bookTitle').html(modalBookTitle);
                    if (NYTresponse.num_results == 0) {
                        $('#noReview').html('There are no reviews available for this title.');
                        $('.modalNone').html('close');
                    } else {
                        $('#reviewAuthor').html("Review by: " + NYTresponse.results[0].byline);
                        $('#reviewCont').attr("href", NYTresponse.results[0].url);
                        $('#reviewCont').html("Continue reading review");
                        $('#summaryReview').html(NYTresponse.results[0].summary);
                    };
                });


                // bookContainer.append($('<p style="text-align:center;">' + isbn +'</p>'));
                // bookContainer.attr("daTitle", title);
            };
        });
    };

    function clear() {
        $("#book-results").empty();
    }
    $("form").submit(function (event) {
        event.preventDefault();
        clear();
        displayBookPreview();
    });


});
