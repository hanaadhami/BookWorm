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
    for (var i =0; i<numberOfBooks; i++){
        var bookContainer = $("<div>");
        var title = response.items[i].volumeInfo.title;
        var authors = response.items[i].volumeInfo.authors[0];
        var coverArt = response.items[i].volumeInfo.imageLinks.thumbnail;
        var isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;

        bookContainer.append($('<p>' + title + '</p>'))
        bookContainer.append($('<p>' + authors + '</p>'))
        bookContainer.append($('<img src=' + coverArt +'>'))
        bookContainer.append($('<p>' + isbn +'</p>'))
        $('#book-preview').prepend(bookContainer)
        };
    });
}

$(document).on("click", ".book-search", displayBookPreview);


