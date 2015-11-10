

var youTubeSearch = apis.youtube;


$(document).ready(function(){


    console.log(youTubeSearch);

    youTubeSearch.getData("the martian",1, function(s, d){
        if(s){
            console.log("what is S " + s);

            apis.youtube.playVideo(d.video[1].id, "190", 320);
            setTimeout(function () {
                apis.youtube.stopVideo()
            }, 20000);
        }else{
            console.log("YouTube Failed");
        }
    });





}); //end document ready






function movieInfo(movie){

}