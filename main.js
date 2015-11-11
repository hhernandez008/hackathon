/* Global Variables */
var youTubeSearch = apis.youtube;
var vineSearch = apis.vine;
var twitterSearch = apis.twitter;


$(document).ready(function () {

//for testing
    movieInfo("jurassic world");


}); //end document ready



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