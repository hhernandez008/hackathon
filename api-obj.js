
var apis = {
    youtube: {
        getData: function(search, count, callback){
            this.errors = [];

            if(typeof search != "string"){
                this.errors.push("'Search' must be a string, you gave a " + typeof search);
            }
            if(isNaN(parseInt(count))){
                this.errors.push("'Count' must be a number, you gave a " + typeof count);
            }else if(count < 1){
                this.errors.push("'Count' must be at least 1, you gave " + count);
            }else if(count > 25){
                this.errors.push("'Count' must be 25 or less, you gave" + count);
            }

            if(typeof callback != "undefined" && typeof callback != "function"){
                this.errors.push("'Callback' must be a function, you gave a " + typeof callback);
            }

            if(this.errors.length > 0) {
                console.log("There were errors with your request:", this.errors);
                return this.errors;
            }else{
                var data = {q: search, maxResults: count};
                var url = "http://s-apis.learningfuze.com/hackathon/youtube/search.php";
                apis.ajax(data, url, callback);
            }
        },
        playVideo: function(videoId, height, width) {
            this.errors = [];

            if(typeof height != "undefined" && isNaN(parseInt(height))){
                this.errors.push("Height must be a number, you entered a " + typeof height);
            }
            if(typeof width != "undefined" && isNaN(parseInt(width))){
                this.errors.push("Width must be a number, you entered a " + typeof width);
            }

            if(this.errors.length > 0){
                console.log("Unable to play video, due to the following errors:", this.errors);
                return this.errors;
            }

            if(height && width){
                this.setDem(height, width);
            }else{
                //Default player dimensions
                //based on YouTube documentation
                this.setDem(390, 640);
            }

            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.playerInfo.videoId = videoId;
        },
        onPlayerStateChange: function(event){
            //unused at this time but is called on every state change of the player
        },
        onPlayerReady: function(event){
            event.target.playVideo();
        },
        stopVideo: function(){
            if(this.playerInfo.player) {
                this.playerInfo.player.stopVideo();
                return true;
            }else{
                console.log("No video to stop playback");
                return false;
            }
        },
        setDem: function(h, w){
            this.playerInfo.vHeight = h;
            this.playerInfo.vWidth = w;
        },
        playerInfo:{
            player: null,
            videoId: "",
            vHeight: 0,
            vWidth: 0
        },
        errors: []
    },
    vine: {
        getData: function(search, callback){
            this.errors = [];

            if(typeof search != "string"){
                this.errors.push("'Search' must be a string, you gave a " + typeof search);
            }

            if(typeof callback != "undefined" && typeof callback != "function"){
                this.errors.push("'Callback' must be a function, you gave a " + typeof callback);
            }

            if(this.errors.length > 0){
                console.log("There were errors with your request:", this.errors);
                return this.errors;
            }else {
                var data = {search_term: search};
                var url = "http://s-apis.learningfuze.com/hackathon/vine/index.php";
                apis.ajax(data, url, callback);
            }
        },
        appendVine: function(search, where, pos){
            this.getData(search, function(s, d){
                if(s){
                    if(!isNaN(pos)) {
                        if(pos >= 0 && pos < d.vines.length) {
                            if (d.vines[pos] != null) {
                                var vine = d.vines[pos].html;
                                $(where).append(vine);
                            } else {
                                console.log("No vine at that position");
                            }
                        }else{
                            console.log("Position is out of range, must be between 0 and " + (d.vines.length-1));
                        }
                    }else{
                        switch(pos){
                            case "all":
                                for(var i=0; i< d.vines.length; i++){
                                    if(d.vines[i] != null){
                                        var vine = d.vines[i].html;
                                        $(where).append(vine);
                                    }
                                }
                                break;
                            case "1st":
                            case "first":
                            default:
                                var found = false;
                                var i = 0;
                                do{
                                    if(d.vines[i] != null){
                                        var vine = d.vines[i].html;
                                        $(where).append(vine);
                                        found = true;
                                    }
                                    i++;
                                }while(!found && i< d.vines.length);
                                break;
                        }
                    }
                }else{
                    console.log("Vines failed to load");
                }
            });
        },
        errors: []
    },
    twitter: {
        getData: function(search, callback){
            this.errors = [];

            if(typeof search != "string"){
                this.errors.push("'Search' must be a string, you gave a " + typeof search);
            }

            if(typeof callback != "undefined" && typeof callback != "function"){
                this.errors.push("'Callback' must be a function, you gave a " + typeof callback);
            }

            if(this.errors.length > 0){
                console.log("There were errors with your request:", this.errors);
                return this.errors;
            }else {
                var data = {search_term: search};
                var url = "http://s-apis.learningfuze.com/hackathon/twitter/index.php";
                apis.ajax(data, url, callback);
            }
        },
        errors: []

    },
    flickr: {
        getData: function(search, count, callback){
            this.errors = [];

            if(typeof search != "string"){
                this.errors.push("'Search' must be a string, you gave a " + typeof search);
            }
            if(isNaN(parseInt(count))){
                this.errors.push("'Count' must be a number, you gave a " + typeof count);
            }else if(count < 1){
                this.errors.push("'Count' must be at least 1, you gave " + count);
            }else if(count > 100){
                this.errors.push("'Count' must be 25 or less, you gave" + count);
            }

            if(typeof callback != "undefined" && typeof callback != "function"){
                this.errors.push("'Callback' must be a function, you gave a " + typeof callback);
            }

            if(this.errors.length > 0){
                console.log("There were errors with your request:", this.errors);
                return this.errors;
            }else {
                var parts = {};
                parts.server = "api.flickr.com";
                parts.services = "/services/rest?";
                parts.key = "&api_key=a20ecbe391bca214cd8dff80c1c188bd";
                parts.format = "&format=json";
                parts.callBack = "&nojsoncallback=1";
                parts.method = "&method=flickr.photos.search";
                parts.text = "&text=" + search;
                parts.perPage = "&per_page=" + count;

                var url = "https://";

                for (var keys in parts) {
                    url += parts[keys];
                }

                apis.ajax({}, url, this.makeUrls, callback);
            }
        },
        makeUrls: function(success, obj, callback){
            var pics = obj.photos.photo;

            obj.urls = [];

            for (var img in pics) {
                var url = "https://farm" + pics[img].farm + ".staticflickr.com/" + pics[img].server + "/" + pics[img].id + "_" + pics[img].secret + ".jpg";
                obj.urls.push(url);
            }

            if(typeof callback != "function"){
                console.log("Default callback ressult:", success, obj);
            }else{
                callback(success, obj);
            }
        },
        errors: []
    },
    ajax: function(data, url, callback, cb2){

        if(typeof callback != "function"){
            callback = function(success, obj){
                console.log("Default callback result:", success, obj);
            }
        }
        if(!cb2){
            cb2 = null;
        }

        $.ajax({
            url: url,
            data: data,
            cache: false,
            method: 'post',
            dataType: 'json',
            success: function(resp){
                callback(true, resp, cb2);
                return resp;
            },
            error: function(resp){
                callback(false, resp, cb2);
                return resp;
            }
        });
    }
};

function onYouTubeIframeAPIReady(){
    apis.youtube.playerInfo.player = new YT.Player('player', {
        height: apis.youtube.playerInfo.vHeight,
        width: apis.youtube.playerInfo.vWidth,
        videoId: apis.youtube.playerInfo.videoId,
        events: {
            'onReady': apis.youtube.onPlayerReady,
            'onStateChange': apis.youtube.onPlayerStateChange
        }
    });
}
