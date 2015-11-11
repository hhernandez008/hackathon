/* Global Variables */
var youTubeSearch = apis.youtube;
var vineSearch = apis.vine;
var twitterSearch = apis.twitter;




/**
 * Created by Weeping Beef on 11/10/15.
 */


function clearPage(){
    $('.twitter').empty();
    $('.vine').empty();
    $("#youtube").empty();
}

/**
 * Function sends ajax request to itunes rss feed and returns top 10 movies and appends them to page.
 */
function appleRss(genreId) {

    var url = null;
    var genreUrls = [
        {genre:"all", url:'https://itunes.apple.com/us/rss/topmovies/limit=10/json'},
        {genre:"action", url:"https://itunes.apple.com/us/rss/topmovies/limit=10/genre=4401/json"},
        {genre:"comedy", url:"https://itunes.apple.com/us/rss/topmovies/limit=10/genre=4404/json"},
        {genre:"horror", url:"https://itunes.apple.com/us/rss/topmovies/limit=10/genre=4408/json"}
    ];

    for(var i = 0; i < genreUrls.length; i++){
        if(genreUrls[i].genre === genreId){
            url=genreUrls[i].url;
            break;
        }
    }
    $.ajax({
        method: 'post',
        dataType: 'json',
        url: url,

        success: function (response) {
        console.log(response);
            var movies = response.feed.entry;
            for (var i = 0; i < movies.length; i++) {
                var image = $('<img>').attr('src', movies[i]['im:image'][2]['label']);
                var imageInfo = $('<div class="image_text">').html(movies[i]['im:name']['label']);
                var imageDiv = $('<div>').append(image, imageInfo);
                $(imageDiv).attr('class','imgdiv');
                $('.itunes').append(imageDiv);

            }
            //Search & append results for first movie
            movieInfo(movies[0]['im:name']['label']);
            $('.movie_title').find("h2").text(movies[0]['im:name']['label']);

            //add click handler to imageDiv
            $('.imgdiv').click(function(){
                clearPage();
                movieInfo($(this).find('div').text());
                // changed title header according to specific movie clicked
                $('.movie_title').find("h2").text($(this).find('div').text());
            })

        },
        error: function (resp) {

        }
    });
}

/**
 * Call the YouTube, Twitter, & Vine apis objects getData methods & pass in the movie name to search.
 * Append response data to DOM as videos or tweets.
 * @param movie
 */
function movieInfo(movie){
    //YOUTUBE
    youTubeSearch.getData(movie + " Official Trailer","4", function(boolean, response){
        if(boolean) {
            var videos =[];
            //store video info object in videos array
            for(var i = 0; i < response.video.length; i++) {
                videos[i] = response.video[i]
            }
            //call placeVideos function to append all of the videos to DOM
            placeVideos(videos);

        } else {
            //TODO: show error to screen, add a retry button
            console.log("YouTube Failed");
        }
    });

    //VINE
    vineSearch.getData(movie, function (boolean, data) {
        if (boolean) {
            var vine = data.vines;
            for (i = 0; i < vine.length; i++) {
                if (vine[i] !== null) {
                    var vines = vine[i].html;
                    var vinesParagraph = $("<div>", {
                        html: vines
                    });
                    $(".vine").append(vinesParagraph);
                }
            }
            if(vine.length == 0){
                $(".vine").append("<p>Vine doesn't care about " + movie + ".");
            }

        }else{
            //TODO: show error to screen, add a retry button
            console.log("Vine Failed");
        }
    });

    //TWITTER
    twitterSearch.getData("movie " + movie, function (boolean, data) {
        if (boolean) {
            var tweet = data.tweets;
            for (i = 0; i < tweet.statuses.length; i++) {
                var tweets = tweet.statuses[i].text;
                var twitterParagraph = $('<div>', {
                    text: tweets,
                    class: "tweets"
                });
                $(".twitter").append(twitterParagraph);
            }
        } else {
            //TODO: show error to screen, add a retry button
            console.log("Twitter Failed");
        }
    });
}

/**
 * Creates divs to show video start image for each item in array param.
 * Allows for multiple videos to be created at a time without having to load the data of each right away.
 * Called in the movieInfo function
 * @param array
 */
function placeVideos(array){
    //create new div for each video in array
    for(var i = 0; i<array.length; i++){
        var $videoDiv = $("<div>",{
                class: "youtubeVideo",
                id: array[i].id,
        });
        $("#youtube").append($videoDiv);
    }

    //add video player functionality to divs
    var $videos = $(".youtubeVideo");
    for(var j = 0; j<$videos.length; j++){
        var youtubeVideo = $videos[j];

        //add video default image as source
        var img = $("<img>").attr("src", "http://i.ytimg.com/vi/"+youtubeVideo.id+"/hqdefault.jpg").addClass("thumb");
        var playButton = $("<div>").addClass("playButton");

        //add videos default image & play button
        $(youtubeVideo).append(img).append(playButton);
    }
}


$(document).ready(function () {

    appleRss('all');

    $('#videoPlayer').modal('hide');


    //Click handler for each YouTube default image to play the video
    $("#youtube").on("click",".youtubeVideo", function(){
        var $modal = $(".modal-body");
        //create iframe for video
        var $iframe = $("<iframe>",{
            class: "videoToPlay",
            //add video url as source
            src: "https://www.youtube.com/embed/" + $(this).attr("id") + "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1"
        });
        //replace the div that holds the default image with the iframe that holds the video
        $($modal).html($iframe);
        $("#videoPlayer").modal("show");
    });
    $(".dropdown-menu").on("click","li", function (){
        console.log("li clicked");
        console.log(this);
       var genreId = $(this).attr('id');
        //clear itunes
        $(".itunes").html("");
        clearPage();
        appleRss(genreId);
    })


});