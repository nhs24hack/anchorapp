function onDeviceReady(){

}

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
	anchor.trigger = $('#anchor-gesture').val();
	
	anchor.attack_rating = $('#anchor-attack-severity').val();
	anchor.anchor_rating = $('#anchor-rating').val();
	
	var storage = window.localStorage;
	var anchors = JSON.parse(storage.getItem('anchors'));
	if(anchors == null || !jQuery.isArray(anchors)) {
		anchors = [];
	}
	anchors[anchors.length] = anchor;
	storage.setItem('anchors', JSON.stringify(anchors));
	
	return false;
}

$(document).ready( function(){
	$(document).on( 'pagechange', function(obj){
		var page = $.mobile.activePage.attr('data-url').match(/.*\/(.*)$/)[1];
		//per page javascript, you may want to break these out to functions
		if(page == "dropAnchor.html"){
		    
			var map = AnchorMap.init('drop-anchor-map');
		    
		    
		    
		} else if(page == "viewAnchorsMap.html") {
			var map = AnchorMap.init('map_canvas');
			
			var storage = window.localStorage;
	    	var anchors = JSON.parse(storage.getItem('anchors'));
	    	if(anchors != null) {
	    		var pos;
				for(var a = 0; a < anchors.length; a++) {
					var anchor = anchors[a];
					pos = new google.maps.LatLng(anchor.latitude, anchor.longitude);
					var marker = new google.maps.Marker({
						position : pos,
						map : map,
						title : ""+anchor.timestamp
					});
				}
				map.setCenter(pos);
	    	}
		
		}
	});
});
