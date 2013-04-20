function onDeviceReady(){
	navigator.notification.alert("PhoneGap is working!!");
	AnchorMap.init('map_canvas');
}

$(document).ready( function(){
	$(document).on( "pagechange", function( toPage, object ) {
		console.log(toPage);
	});
});