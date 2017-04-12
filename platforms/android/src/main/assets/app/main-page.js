var observableModule = require("data/observable");
var pageData = new observableModule.Observable();
var api_key = '7a9d16f22ddb837a161d56f75df9a54d';
var http = require("http");
var observableArray = require("data/observable-array");
var images = new observableArray.ObservableArray([]);

exports.pageLoaded = function(args) {
	var page = args.object;
    pageData.set("images", images);
    page.bindingContext = pageData;
};


exports.signin = function() {

	images.length = 0;

	http.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + api_key + "&text=" + pageData.get('txtKeyword') + "&format=json&nojsoncallback=1&per_page=5").then(function(r) {
	    var imgUrl = '';
		var photoList = r.photos.photo;
		for (var i = 0; i < photoList.length; i++) {
		    imgUrl = "https://farm" + photoList[i].farm + ".staticflickr.com/" + photoList[i].server + "/" + photoList[i].id + "_" + photoList[i].secret + ".jpg";
		    images.push({
		        img: imgUrl
		    });
		}
	}, function(e) {
	    console.log(e);
	});
	
};