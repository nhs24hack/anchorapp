var fileSystem = null;

function onDeviceReady(){
	window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 0, 
			
			function(fs) {
				fileSystem = fs;
			},
			
			function(e) {
				console.log("ERROR getting file system: " + e.toString());
			}
	);
}

function getAnchors() {
	var storage = window.localStorage;
	var anchors = JSON.parse(storage.getItem('anchors'));
	return anchors;
}
	
function writeAnchors(anchors) {
	var storage = window.localStorage;
	storage.setItem('anchors', JSON.stringify(anchors));
}

$(document).on('tap', 'a[target="_blank"]', function(e){
    navigator.app.loadUrl(e.target.href, { openExternal: true });
    return false;
});

function Anchor() {
	this.timestamp = 0;
	this.latitude = 0;
	this.longitude = 0;
	this.tell = "";
	this.gesture = "";
	this.trigger = "";
	this.attack_rating = 0;
	this.anchor_rating = 0;
	this.image = {
			type : "",
			src : ""
		};
}

function placeAnchor() {
	var anchor = new Anchor();
	var map = AnchorMap.map;
	
	anchor.timestamp = new Date().getTime();
	
	var position = map.getCenter();
	anchor.latitude = position.lat();
	anchor.longitude = position.lng();
	
	anchor.tell = $('#anchor-tell').val();
	anchor.gesture = $('#anchor-gesture').val();
	anchor.trigger = $('#anchor-trigger').val();
	
	anchor.attack_rating = $('#anchor-attack-severity').val();
	anchor.anchor_rating = $('#anchor-rating').val();

	if($('#anchor-image').attr('src') != null){
		anchor.image.type ="local";
		anchor.image.src = $('#anchor-image').attr('src');
	}
	
	var anchors = getAnchors();
	if(anchors == null || !jQuery.isArray(anchors)) {
		anchors = [];
	}
	anchors[anchors.length] = anchor;
	writeAnchors(anchors);
	$('#dropAnchor').html('<h1>ANCHOR ADDED!</h1><p>Use the above navigation to go back to the menu or fill in a <a href="anxietyTest.html" data-transition="slide">Anxiety Test</a>.</p>');
	return false;
}

$(document).ready( function(){
	$(document).on( 'pagechange', function(obj){
		var page = $.mobile.activePage.attr('data-url').match(/.*\/(.*)$/)[1];
		//per page javascript, you may want to break these out to functions
		if(page == "dropAnchor.html"){
		    
			var map = AnchorMap.init('drop-anchor-map');

			$('#anchor-image-button').click( function(){
			    navigator.camera.getPicture(onAddAnchorAddImageSuccess, onAddAnchorAddImageFail, { quality: 50, 
			    destinationType: Camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }); 
			});

			function onAddAnchorAddImageSuccess(imageURI) {
			    var image = document.getElementById('anchor-image');
			    image.src = imageURI;
			}

			function onAddAnchorAddImageFail(message) {
			    alert('Failed because: ' + message);
			}
		    
		    
		} else if(page == "viewAnchorsMap.html") {
			var map = AnchorMap.init('map_canvas');
			
			var anchors = getAnchors();
	    	if(anchors != null) {
	    		var pos;
				for(var a = 0; a < anchors.length; a++) {
					var anchor = anchors[a];
					pos = new google.maps.LatLng(anchor.latitude, anchor.longitude);
					
					var image = "img/1-anchor-icon-var2.gif"; 
					
					if (anchor.attack_rating == 1) {
						image = "img/2-anchor-icon-var2.gif";
					} else if (anchor.attack_rating == 2) {
						image = "img/3-anchor-icon-var2.gif";
					} else if (anchor.attack_rating == 3) {
						image = "img/4-anchor-icon-var2.gif";
					} else if (anchor.attack_rating == 4) {
						image = "img/5-anchor-icon-var2.gif";
					}
					
					var marker = new google.maps.Marker({
						position : pos,
						map : map,
						title : ""+anchor.timestamp,
						icon : image
					});
				}
				map.setCenter(pos);
	    	}
		
		} else if(page == "viewAnchorsList.html") {
			var anchors = getAnchors();
	    	if(anchors != null) {
	    		var pos;
				for(var a = 0; a < anchors.length; a++) {
					var anchor = anchors[a];
					$('#anchorList').append('<li style="background: transparent url('+anchor.image.src+') no-repeat center center; background-size: cover;"><p><a href="viewAnchorsMap.html">'+ Date(anchor.timestamp * 1000) +'</a></p><p>' + anchor.tell + ' - ' + anchor.gesture + '</p><p><strong>Severity:</strong> ' + anchor.attack_rating + ' <strong>Anchor rating:</strong> ' + anchor.anchor_rating + '</p><a data-transition="slide" href="viewAnchorsMap.html" class="right"><img src="img/map-Icon.gif"></a></li>');
				}
			}
		}
	});
});
