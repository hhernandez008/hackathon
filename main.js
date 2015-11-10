/* Global Variables */
var youTubeSearch = apis.youtube;
var vineSearch = apis.vine;
var twitterSearch = apis.twitter;


$(document).ready(function(){

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
        }else{
            console.log("YouTube Failed");
        }
    });
    vineSearch.getData(movie, function(boolean, response){
        //TODO: How to access vine response data
        if(boolean){
            console.log("Vine " + response);
        }
    });
    twitterSearch.getData(movie, function(boolean, response){
        //TODO: How to access twitter response data
        if(boolean){
            console.log("Twitter " + response);
        }
    });

}