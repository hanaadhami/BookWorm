
function displayBookPreview(){

var apiKeyGoogle = "AIzaSyBzrVa4fIYwGQhY0ZJKd3knqqKAmXrp1IM"
var searchTitle = $("#search").val().trim();
var numberOfBooks = 5
var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTitle + "&key=" + apiKeyGoogle;

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

        cardWrapper.addClass("col s4 m2");
        bookContainer.addClass("card");
        bookImageDiv.addClass("card-image");
        previewButton.addClass("btn-floating halfway-fab waves-effect waves-light red");
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

        // bookContainer.append($('<p style="text-align:center;">' + isbn +'</p>'));
        // bookContainer.attr("daTitle", title);
        };
    });
}

$("form").submit(function(event) {
    event.preventDefault();
    displayBookPreview();
    });
