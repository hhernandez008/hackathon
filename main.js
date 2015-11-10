/* Global Variables */
var youTubeSearch = apis.youtube;
var vineSearch = apis.vine;
var twitterSearch = apis.twitter;


$(document).ready(function(){

//for testing
movieInfo("jurassic world");



}); //end document ready


function movieInfo(movie){
    youTubeSearch.getData(movie + " Official Trailer","5", function(boolean, data){
        if(boolean) {
            console.log("YouTube", data, "ID:", data.video[1].id);
            apis.youtube.playVideo(data.video[1].id, "190", 320);
            setTimeout(function () {
                apis.youtube.stopVideo()
            }, 20000);
        }else{
            console.log("YouTube Failed");
        }
    });
    vineSearch.getData(movie, function(boolean, data){
        //TODO: How to access vine response data
        if(boolean){
            console.log(data);
        }
    });
    twitterSearch.getData(movie, function(boolean, data){
        //TODO: How to access twitter response data
        if(boolean){
            console.log(data);
            var tweet = data.tweets;
            for(i=0; i < tweet.statuses.length; i++) {
                var tweets= tweet.statuses[i].text;
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