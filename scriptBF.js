function displayBookPreview(){

var apiKeyGoogle = "AIzaSyBzrVa4fIYwGQhY0ZJKd3knqqKAmXrp1IM"
var searchTitle = "the hobbit"
var numberOfBooks = 5
var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTitle + "&key=" + apiKeyGoogle;

$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response)
    {
    console.log(response)
    console.log(response.items[0].volumeInfo.imageLinks.thumbnail)
    for (var i =0; i < numberOfBooks; i++){
        var cardWrapper = $("<div>");
        var bookContainer = $("<div>");
        var title = response.items[i].volumeInfo.title;
        var authors = response.items[i].volumeInfo.authors[0];
        var coverArt = response.items[i].volumeInfo.imageLinks.thumbnail;
        var isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;

        cardWrapper.addClass("card-wrapper col s2");
        bookContainer.addClass("container card");
        bookContainer.attr("data-name", isbn);

        bookContainer.append($('<img src=' + coverArt +'>'));
        bookContainer.append($('<h4 style="font-size:1.3rem;text-align:center;">' + title + '</h4>'));
        bookContainer.append($('<p style="font-style:italic;text-align:center;">' + authors + '</p>'));
        bookContainer.append($('<p style="text-align:center;">' + isbn +'</p>'));
        cardWrapper.append(bookContainer);
        $('#book-cards').append(cardWrapper);
        };
    });
}


$(document).on("click", ".book-search", displayBookPreview);


