function displayBookPreview(){

// Google Books API Key Access
var apiKeyGoogle = "AIzaSyBzrVa4fIYwGQhY0ZJKd3knqqKAmXrp1IM"
var searchTitle = $("#search").val().trim();
var numberOfBooks = 5
var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTitle + "&key=" + apiKeyGoogle;

// Ajax request for API Key
$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response)
    {
    console.log(response)
    console.log(response.items[0].volumeInfo.imageLinks.smallThumbnail)
    for (var i =0; i < numberOfBooks; i++){
        var cardWrapper = $("<div>");
        var bookContainer = $("<div>");
        var bookImageDiv = $("<div>");
        var previewButton = $("<a>");
        var cardContent = $('<div>');
        var title = response.items[i].volumeInfo.title;
        var authors = response.items[i].volumeInfo.authors[0];
        var coverArt = response.items[i].volumeInfo.imageLinks.smallThumbnail;
        var isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;
        // Creating classes to make the created card work with Materialize CSS
        cardWrapper.addClass("col s4 m2");
        bookContainer.addClass("card");
        bookImageDiv.addClass("card-image");
        previewButton.addClass("btn-floating halfway-fab waves-effect waves-light red modal-trigger");
        previewButton.attr("data-name", title);
        cardContent.addClass("card-content");
        // Appending the elements to the individual card classes
        previewButton.append($('<i class="material-icons">more_horiz</i>'));
        cardContent.append($('<h4 style="font-size:1.3rem;">' + title + '</h4>'));
        cardContent.append($('<p style="font-style:italic;">' + authors + '</p>'));
        bookTitle.append($(title));
        // Appending the card classes inside their parent card Divs
        
        bookImageDiv.append($('<img src=' + coverArt +'>'));
        bookImageDiv.append(previewButton);

        bookContainer.append(bookImageDiv);
        bookContainer.append(cardContent);

        cardWrapper.append(bookContainer);

        $('#book-results').append(cardWrapper);

        var modalBtn = document.getElementsByClassName("modal-trigger");
        var modalBtns = Array.from(document.querySelectorAll(".modal-trigger"));

        console.log(modalBtns)

        modalBtns.forEach((modalBtn) =>
        modalBtn.addEventListener('click', function(e){
            // var bookReviewModal = $("#modal1");
            // bookReviewModal.append()
            console.log(e)
            modalFunction()
        }))


        // bookContainer.append($('<p style="text-align:center;">' + isbn +'</p>'));
        // bookContainer.attr("daTitle", title);
        };
    });
};

function clear() {
    $("#book-results").empty();
    }
$("form").submit(function(event) {
    event.preventDefault();
    clear();
    displayBookPreview();
    });

function modalFunction(){

    // New York Times API key
var nytApiKey = "XxNStNBahslMckwWpoKsfnbkXiQ6SkF1";
var modalBookTitle = $(this).attr("data-name");
var nytURL = "https://api.nytimes.com/svc/books/v3//reviews.json?title=" + modalBookTitle + "&api-key=" + nytApiKey;
// getting the New York Times review
$.ajax({
    url: nytURL,
    method: "GET"
}).then(function (NYTresponse) {
    console.log("nytresponse ", NYTresponse)
    // need to add these values for the modal once we get information from google books API
    /*  $("#review").html(response.results[0].byline); */
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
};


