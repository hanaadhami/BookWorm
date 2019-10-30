// New York Times API key
var nytApiKey = "XxNStNBahslMckwWpoKsfnbkXiQ6SkF1";
var replacedSearchTitle = searchTitle.split(' ').join('+');
console.log(replacedSearchTitle);
var nytURL = "https://api.nytimes.com/svc/books/v3//reviews.json?title=" + replacedSearchTitle + "&api-key=" + nytApiKey;
// getting the New York Times review
$.ajax({
    url: nytURL,
    method: "GET"
}).then(function (response) {
// need to add these values for the modal once we get information from google books API
/*  $("#review").html(response.results[0].byline); */
 /* $('#bookTitle'). */
$('#reviewAuthor').html(response.results[0].byline);
$('#reviewCont').attr("href", response.results[0].url);
$('#reviewSumm').html(response.results[0].summary);
});

//Modal
jQuery('.modal').modal();