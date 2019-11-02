$(document).ready(function () {

    function displayBookPreview(){
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
        }).then(function(response)
        {
        // console.log(response)
        // console.log(response.items[0].volumeInfo.imageLinks.smallThumbnail)
        for (var i =0; i < numberOfBooks; i++){
            var cardWrapper = $("<div>");
            var bookContainer = $("<div>");
            var bookImageDiv = $("<div>");
            var previewButton = $("<a>");
            var cardContent = $('<div>');
            title. push(response.items[i].volumeInfo.title);
            var authors = response.items[i].volumeInfo.authors[0];
            var coverArt = response.items[i].volumeInfo.imageLinks.smallThumbnail;
            var isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;
            // Creating classes to make the created card work with Materialize CSS
            cardWrapper.addClass("col s12 m4 l2");
            bookContainer.addClass("card");
            bookImageDiv.addClass("card-image");
            previewButton.addClass("btn-floating halfway-fab waves-effect waves-light red modal-button");
            cardContent.addClass("card-content");
            // Appending the elements to the individual card classes
            previewButton.append($('<i class="material-icons">more_horiz</i>'));
            cardContent.append($('<h4 style="font-size:1.3rem;">' + title[i] + '</h4>'));
            cardContent.append($('<p style="font-style:italic;">' + authors + '</p>'));
            bookTitle.append($(title));
            // Appending the card classes inside their parent card Divs
            
            bookImageDiv.append($('<img src=' + coverArt +'>'));
            bookImageDiv.append(previewButton);
            bookContainer.append(bookImageDiv);
            bookContainer.append(cardContent);
            cardWrapper.append(bookContainer);
            $('#book-results').append(cardWrapper);
            var modalBtn = document.getElementsByClassName("modal-button");
            
            var modalBtns = Array.from(document.querySelectorAll(".modal-button"));
            modalBtns[i].setAttribute("data-name", title[i]);
        
            // bookContainer.append($('<p style="text-align:center;">' + isbn +'</p>'));
            // bookContainer.attr("daTitle", title);
            };
            modalBtns.forEach((modalBtn) =>
            modalBtn.addEventListener('click', function(e){
                // console.log("modal btns inside: ", modalBtns)
                modalFunction(modalBtn.getAttribute("data-name"));
                e.preventDefault();
                $(".modal").css("display","block")
                $(".modal").css('z-index', 3000);
                
    // close button
                $(".modal-close").click(function() {
                    $(".modal").css("display","none")
                    $('#noReview').empty()
                    $('#reviewAuthor').empty()
                    $('#reviewCont').empty()
                    $('#reviewCont').empty()
                    $('#summaryReview').empty()
                });
    // Add button, still need to have it add books to the library
                $(".modal-add").click(function() {
                    $(".modal").css("display","none")
                    $('#noReview').empty()
                    $('#reviewAuthor').empty()
                    $('#reviewCont').empty()
                    $('#reviewCont').empty()
                    $('#summaryReview').empty()
                
                    var apiKeyGoogle = "AIzaSyBzrVa4fIYwGQhY0ZJKd3knqqKAmXrp1IM"
                    var libraryTitle = modalBtn.getAttribute("data-name");
                    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + libraryTitle + "&key=" + apiKeyGoogle;
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                        }).then(function(response){
                            for (var i =0; i < 1; i++){
                            var libraryWrapper = $('<div>');
                            var libraryContainer = $('<div>');
                            var libraryImageDiv = $('<div>');
                            var libraryCardContent = $('<div>')
                            
                            var libraryTitle = response.items[0].volumeInfo.title;
                            var libraryImg = response.items[0].volumeInfo.imageLinks.smallThumbnail;
                            libraryWrapper.addClass("col s12 s4 m2 saved-books");
                            libraryContainer.addClass("card");
                            libraryImageDiv.addClass("card-image");
                            libraryCardContent.addClass("card-content");
                            libraryCardContent.append($('<h4 style="font-size:1.3rem;">' + libraryTitle + '</h4>'));
                            libraryImageDiv.append($('<img src=' + libraryImg +'>'));
                            libraryContainer.append(libraryImageDiv);
                            libraryContainer.append(libraryCardContent);
                            libraryWrapper.append(libraryContainer);
                            $('#library').append(libraryWrapper);

                        

                        }});
                });
            }))
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
    function modalFunction(t){
        // New York Times API key
    var nytApiKey = "XxNStNBahslMckwWpoKsfnbkXiQ6SkF1";
    var modalBookTitle = t
    var nytURL = "https://api.nytimes.com/svc/books/v3//reviews.json?title=" + modalBookTitle + "&api-key=" + nytApiKey;
    // getting the New York Times review
    $.ajax({
        url: nytURL,
        method: "GET"
    }).then(function (NYTresponse) {
        // console.log("nytresponse ", NYTresponse)
        // need to add these values for the modal once we get information from google books API
        /*  $("#review").html(response.results[0].byline); */
        $('#bookTitle').html(modalBookTitle);
        // console.log("modalBookTitle ", modalBookTitle)
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
    });
  
    
    
    
    


function displayBookPreview(){

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
    }).then(function(response)
    {
    // console.log(response)
    // console.log(response.items[0].volumeInfo.imageLinks.smallThumbnail)
    for (var i =0; i < numberOfBooks; i++){
        var cardWrapper = $("<div>");
        var bookContainer = $("<div>");
        var bookImageDiv = $("<div>");
        var previewButton = $("<a>");
        var cardContent = $('<div>');
        title. push(response.items[i].volumeInfo.title);
        console.log("title is ", title);
        var authors = response.items[i].volumeInfo.authors[0];
        var coverArt = response.items[i].volumeInfo.imageLinks.smallThumbnail;
        var isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;
        // Creating classes to make the created card work with Materialize CSS
        cardWrapper.addClass("col s4 m2");
        bookContainer.addClass("card");
        bookImageDiv.addClass("card-image");
        previewButton.addClass("btn-floating halfway-fab waves-effect waves-light red modal-button");
        cardContent.addClass("card-content");
        // Appending the elements to the individual card classes
        previewButton.append($('<i class="material-icons">more_horiz</i>'));
        cardContent.append($('<h4 style="font-size:1.3rem;">' + title[i] + '</h4>'));
        cardContent.append($('<p style="font-style:italic;">' + authors + '</p>'));
        bookTitle.append($(title));
        // Appending the card classes inside their parent card Divs
        
        bookImageDiv.append($('<img src=' + coverArt +'>'));
        bookImageDiv.append(previewButton);

        bookContainer.append(bookImageDiv);
        bookContainer.append(cardContent);

        cardWrapper.append(bookContainer);

        $('#book-results').append(cardWrapper);

        var modalBtn = document.getElementsByClassName("modal-button");
        
        var modalBtns = Array.from(document.querySelectorAll(".modal-button"));
        modalBtns[i].setAttribute("data-name", title[i]);

    


        // bookContainer.append($('<p style="text-align:center;">' + isbn +'</p>'));
        // bookContainer.attr("daTitle", title);
        };
        modalBtns.forEach((modalBtn) =>
        modalBtn.addEventListener('click', function(e){
            // console.log("modal btns inside: ", modalBtns)
            modalFunction(modalBtn.getAttribute("data-name"));
            e.preventDefault();
            $(".modal").css("display","block")
            $(".modal").css('z-index', 3000);
            
// close button

            $(".modal-close").click(function() {

                $(".modal").css("display","none")
                $('#noReview').empty()
                $('#reviewAuthor').empty()
                $('#reviewCont').empty()
                $('#reviewCont').empty()
                $('#summaryReview').empty()

            });
// Add button, still need to have it add books to the library
            $(".modal-add").click(function() {

                $(".modal").css("display","none")
                $('#noReview').empty()
                $('#reviewAuthor').empty()
                $('#reviewCont').empty()
                $('#reviewCont').empty()
                $('#summaryReview').empty()
            
                var apiKeyGoogle = "AIzaSyBzrVa4fIYwGQhY0ZJKd3knqqKAmXrp1IM"
                var libraryTitle = modalBtn.getAttribute("data-name");
                var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + libraryTitle + "&key=" + apiKeyGoogle;
                $.ajax({
                    url: queryURL,
                    method: "GET"
                    }).then(function(response){
                        for (var i =0; i < 1; i++){
                        console.log(response.items[0].volumeInfo.title);
                        console.log(response.items[0].volumeInfo.imageLinks.smallThumbnail);

                        var libraryWrapper = $('<div>');
                        var libraryContainer = $('<div>');
                        var libraryImageDiv = $('<div>');
                        var libraryCardContent = $('<div>')
                        
                        var libraryTitle = response.items[0].volumeInfo.title;
                        var libraryImg = response.items[0].volumeInfo.imageLinks.smallThumbnail;

                        libraryWrapper.addClass("col s4 m2 saved-books");
                        libraryContainer.addClass("card");
                        libraryImageDiv.addClass("card-image");
                        libraryCardContent.addClass("card-content");

                        libraryCardContent.append($('<h4 style="font-size:1.3rem;">' + libraryTitle + '</h4>'));
                        libraryImageDiv.append($('<img src=' + libraryImg +'>'));

                        libraryContainer.append(libraryImageDiv);
                        libraryContainer.append(libraryCardContent);

                        libraryWrapper.append(libraryContainer);
                        $('#library').append(libraryWrapper);

                    }});
            });
        }))
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


function modalFunction(t){

    // New York Times API key
var nytApiKey = "XxNStNBahslMckwWpoKsfnbkXiQ6SkF1";
var modalBookTitle = t
var nytURL = "https://api.nytimes.com/svc/books/v3//reviews.json?title=" + modalBookTitle + "&api-key=" + nytApiKey;
// getting the New York Times review
$.ajax({
    url: nytURL,
    method: "GET"
}).then(function (NYTresponse) {
    // console.log("nytresponse ", NYTresponse)
    // need to add these values for the modal once we get information from google books API
    /*  $("#review").html(response.results[0].byline); */
    $('#bookTitle').html(modalBookTitle);
    // console.log("modalBookTitle ", modalBookTitle)
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

});
