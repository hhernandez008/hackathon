/* Global Variables */
var youTubeSearch = apis.youtube;
var vineSearch = apis.vine;
var twitterSearch = apis.twitter;



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
                movieInfo($(this).find('div').text());
            });
        },
        error: function (resp) {

        }
    });

}

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
            console.log("Vine " + data);
        }
    });
    twitterSearch.getData(movie, function(boolean, data){
        //TODO: How to access twitter response data
        if(boolean){
            console.log("Twitter " + data);
        }
    });

}


$(document).ready(function () {
    appleRss();






});