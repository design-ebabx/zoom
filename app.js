$(document).ready(function(){
	var map = L.map('map').setView(new L.LatLng(0,0), 0);

    L.tileLayer.zoomify('src/datcha_tiles/', { 
        width: 7680, 
        height: 4320,
        minZoom: 1,
        maxZoom: 3,
        zoom: 1
    }).addTo(map);

    var hash = new L.Hash(map);

    map.on('zoomend', function (e) {
    	if(map.getZoom() >= 3) {
    		$('.leaflet-marker-pane').fadeIn();
    		$('html, body, #map').css('background', 'white');
    	} else {
    		$('.leaflet-marker-pane').fadeOut();
    		$('html, body, #map').css('background', 'red');
    	}
    });

	$.ajax({
	  dataType: "json",
	  url: "markers.json",
	  success: function(result){
	  	$.each(result.markers, function(i, field){
	  		var content = "<h3>"+field.titre+"</h3>";
	  		content += "<h4>"+field.description+"</h4>";

	  		if(field.punch) {
	  			content += "<p>"+field.punch+"</p>";
	  		}

	  		var audiostart = "<audio controls autoplay src='src/";
	  		var audioend = "'></audio>";

	  		var videostart = "<video controls autoplay src='src/";
	  		var videoend = "'></video>";

	  		var pdfstart = "<iframe src='src/";
	  		var pdfend = "'></iframe>";

	  		var imgstart = "<img src='src/";
	  		var imgend = "'></img>";

	  		if(field.type == "audio") {
	  			content += audiostart+field.type+'/'+field.src+audioend;
	  			var iconname = L.icon({
				    iconUrl: 'assets/icon/icon_audio.png',
				    iconSize:     [50, 50],
				    iconAnchor:   [25, 25],
				    popupAnchor:  [0, -25]
				});
	  		}
	  		if(field.type == "video") {
	  			content += videostart+field.type+'/'+field.src+videoend;
	  			var iconname = L.icon({
				    iconUrl: 'assets/icon/icon_video_camera.png',
				    iconSize:     [50, 50],
				    iconAnchor:   [25, 25],
				    popupAnchor:  [0, -25]
				});
	  		}
	  		if(field.type == "pdf") {
	  			content += pdfstart+field.type+'/'+field.src+pdfend;
	  			var iconname = L.icon({
				    iconUrl: 'assets/icon/icon_dialog.png',
				    iconSize:     [50, 50],
				    iconAnchor:   [25, 25],
				    popupAnchor:  [0, -25]
				});
	  		}
	  		if(field.type == "image") {
	  			content += imgstart+field.type+'/'+field.src+imgend;
	  			var iconname = L.icon({
				    iconUrl: 'assets/icon/icon_img.png',
				    iconSize:     [50, 50],
				    iconAnchor:   [25, 25],
				    popupAnchor:  [0, -25]
				});
	  		}

	  		var customOptions = {
	  			'maxWidth' : '600',
			    'width': '500',
			    'className' : 'popupCustom'
		    }

	  		var marker = L.marker([field.lattitude, field.longitude], {icon: iconname}).addTo(map);
	  		marker.bindPopup(content, customOptions);
	  	});
	  }
	});

	// MENU

	$('.burger, aside .close').click(function(){
		$('#map').toggleClass('menu-animated-map');
		$('.aside').toggleClass('menu-animated');
	});

	$('.infos, .credits > .close').click(function(){
		$('.credits').toggle();
	});

	$('.selector-display > div').click(function(){
		$('.selector-display > div').addClass('inactive').removeClass('active');
		$(this).addClass('active').removeClass('inactive');

		$('.selector-etudiants, .selector-medium').hide();
		$('.'+$(this).attr('data-active')).fadeIn();
	});
});