var apiKeyGoogle = "AIzaSyBzrVa4fIYwGQhY0ZJKd3knqqKAmXrp1IM"
var searchTitle = "harry potter"
var numberOfBooks = 5
var language = "en"
var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTitle + "&callback=handleResponse&key=" + apiKeyGoogle;

$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response)
    {
    console.log(response);
});

