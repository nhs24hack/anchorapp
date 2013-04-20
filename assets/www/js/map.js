AnchorMap = {
	map : null,
	
	init : function(id) {
		var myLatLng = new google.maps.LatLng(55.86179, - 4.24388);
		var mapOptions = {
			zoom: 16,
			center: myLatLng,
			mapTypeId: google.maps.MapTypeId.SATELLITE
		};

		map = new google.maps.Map(document.getElementById(id), mapOptions);
		this.map = map;
		
		jQuery.getJSON('anchors.json', function (data) {
			var anchors = data;
			for (var key in anchors) {
				var anchor = anchors[key];
				if (anchor.lat == '' | anchor.lon == '') {
					continue;
				}
				var marker = new google.maps.Marker( {
					position : new google.maps.LatLng(anchor.lat, anchor.lon), map : map, title : anchor.name
				});
			}
		})
	}
};