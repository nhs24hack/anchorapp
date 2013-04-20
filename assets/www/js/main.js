function onDeviceReady(){

}
$(document).ready( function(){
	$(document).on( 'pagechange', function(obj){
		var page = $.mobile.activePage.attr('data-url').match(/.*\/(.*)$/)[1];
		//per page javascript, you may want to break these out to functions
		if(page == "dropAnchor.html"){
		    var map = AnchorMap.init('drop-anchor-map');
		}
	});
});
