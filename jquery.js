/* Global Variables */
var youTubeSearch = apis.youtube;
var vineSearch = apis.vine;
var twitterSearch = apis.twitter;



/**
 * Created by Weeping Beef on 11/10/15.
 */


/**
 * Function sends ajax request to itunes rss feed and returns top 10 movies and appends them to page.
 */
function appleRss() {
    $.ajax({
        method: 'post',
        dataType: 'json',
        url: 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topMovies/json',

        success: function (response) {
            console.log(response);
            var movies = response.feed.entry;
            for (var i = 0; i < movies.length; i++) {
                var image = $('<img>').attr('src', movies[i]['im:image'][2]['label']);
                var imageInfo = $('<div>').html(movies[i]['im:name']['label']);
                var imageDiv = $('<div>').append(image, imageInfo);
                $(imageDiv).attr('class','imgdiv');
                $('.itunes').append(imageDiv);

            }
            $('.imgdiv').click(function(){
                $('.twitter').empty();
                $('.vine').empty();
                movieInfo($(this).find('div').text());
            });
        },
        error: function (resp) {

        }
    });
}

function movieInfo(movie){
    youTubeSearch.getData(movie + " Official Trailer","5", function(boolean, response){
        if(boolean) {
            console.log("YouTube", response, "ID:", response.video[1].id);
            apis.youtube.playVideo(response.video[1].id, "175", "295");

            setTimeout(function () {
                apis.youtube.stopVideo()
            }, 20000);
        } else {
            console.log("YouTube Failed");
        }
    });

    vineSearch.getData(movie, function (boolean, data) {
        //TODO: How to access vine response data
        if (boolean) {
            console.log(data);

            var vine = data.vines;
            for (i = 0; i < vine.length; i++) {
                if (vine[i] !== null) {
                    console.log("vine[" + i + "].html", vine[i].html);
                    var vines = vine[i].html;
                    var vinesParagraph = $("<div>", {
                        html: vines
                    });
                    $(".vine").append(vinesParagraph);
                }
            }

        }
    });
    twitterSearch.getData(movie, function (boolean, data) {
        //TODO: How to access twitter response data
        if (boolean) {
            console.log(data);
            var tweet = data.tweets;
            for (i = 0; i < tweet.statuses.length; i++) {
                var tweets = tweet.statuses[i].text;
                var twitterParagraph = $('<p>', {
                    text: tweets
                });
                $(".twitter").append(twitterParagraph);
            }
        } else {
            console.log(boolean);

        }
    });
}







$(document).ready(function () {
    appleRss();




});