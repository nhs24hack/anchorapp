AnchorMap = {
		map:null,
	init : function(id) {
		var myLatLng = new google.maps.LatLng(55.86179, - 4.24388);
    	
    	var mapOptions = {
			zoom: 16,
			center: myLatLng,
			mapTypeId: google.maps.MapTypeId.SATELLITE,
			disableDefaultUI: true
		};
    	
    	var map = new google.maps.Map(document.getElementById(id), mapOptions);
		this.map = map;
		
    	if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition(
        			function(position) {
        				map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
        			},
        			function(error){
        				//TODO:Handle error
        			},
        			{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
        		);
        }
    	
		return map;
	}
};