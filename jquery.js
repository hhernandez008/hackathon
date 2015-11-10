
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
        },
        error: function (resp) {

        }
    });
}

/**
 *
 */
function twitter() {
    $.ajax({
        method: 'POST',
        dataType: 'json',
        url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php',
        success: function(response) {
            console.log("twitter", response);
        }
    })
}







$(document).ready(function () {
    appleRss();
    //$('.imgdiv').click(function(){
    //
    //}



});