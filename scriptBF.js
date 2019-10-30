$(document).ready(function () {

    //Modal
    $('.modal').modal();

    // add back in when search function is set >>  function displayBookPreview() {


    var apiKeyGoogle = "AIzaSyBzrVa4fIYwGQhY0ZJKd3knqqKAmXrp1IM"
    var searchTitle = "the help"
    var numberOfBooks = 5
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTitle + "&key=" + apiKeyGoogle;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.items[0].volumeInfo.imageLinks.thumbnail)
        for (var i = 0; i < numberOfBooks; i++) {
            var cardWrapper = $("<div>");
            var bookContainer = $("<div>");
            var title = response.items[i].volumeInfo.title;
            var authors = response.items[i].volumeInfo.authors[0];
            var coverArt = response.items[i].volumeInfo.imageLinks.thumbnail;
            var isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;

            cardWrapper.addClass("card-wrapper col s2");
            bookContainer.addClass("container card");
            bookContainer.attr("data-name", isbn);

            bookContainer.append($('<img src=' + coverArt + '>'));
            bookContainer.append($('<h4 style="font-size:1.3rem;text-align:center;">' + title + '</h4>'));
            bookContainer.append($('<p style="font-style:italic;text-align:center;">' + authors + '</p>'));
            bookContainer.append($('<p style="text-align:center;">' + isbn + '</p>'));
            cardWrapper.append(bookContainer);
            $('#book-cards').append(cardWrapper);
        };
        // New York Times API key
        var nytApiKey = "XxNStNBahslMckwWpoKsfnbkXiQ6SkF1";
        var replacedSearchTitle = searchTitle.split(' ').join('+');
        console.log(replacedSearchTitle)
        var nytURL = "https://api.nytimes.com/svc/books/v3//reviews.json?title=" + replacedSearchTitle + "&api-key=" + nytApiKey;
        // getting the New York Times review
        $.ajax({
            url: nytURL,
            method: "GET"
        }).then(function (NYTresponse) {
            // need to add these values for the modal once we get information from google books API
            /*  $("#review").html(response.results[0].byline); */
            $('#bookTitle').html(searchTitle);
            if (NYTresponse.num_results == 0) {
                $('#noReview').html('There are no reviews available for this title.');
                $('.modalNone').html('close');
            } else {
                $('#reviewAuthor').html("Review by: " + NYTresponse.results[0].byline);
                $('#reviewCont').attr("href", NYTresponse.results[0].url);
                $('#reviewCont').html("Continue reading review");
                $('#summaryReview').html(NYTresponse.results[0].summary);
            }
        });

    });

// to be attatched to onClick event for specifically selected book
   // $('#summaryBook').html(response.items[i].volumeInfo.description);

    // } 


    //    $(document).on("click", ".book-search", displayBookPreview);

    //  input.addEventListener('keyup',function(e){
    //    if (e.keyCode === 13) {
    // alert('hi');
    //   }
    //  });

});
