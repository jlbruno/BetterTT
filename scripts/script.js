
var BetterTT = {};

var BetterTTFunc = function() {

	var pub = {}; // public object to return

	console.info('BTT: Better TT loading...');

	pub.config = {
		autobop : false
	}

	pub.tt_room = function() {
		if(turntable){
			for(i in turntable){
				return $tt_roomkey=turntable[i]; break; //grab Room object
			}
		}
	}();

	pub.tt_currentSong = function() {
		if (pub.tt_room) {
			return pub.tt_room.currentSong;
		}
	}();


	Object.watch(turntable, 'current_title', function(prop, oldVal, newVal) {
		// Will be run when the property 'foo' is set on the object. 
		//console.log('NEW SONG');
		if (BetterTT.config.autobop) {

			var min = 10000;
			var max = 40000;
			var rand = Math.floor(Math.random() * (max - min + 1)) + min;

			setTimeout(function () {
				voteUp();
			}, rand);

		}
	});



	var voteUp = function() {
		$('#chat-input').val('/up'); $('#chat-form').submit();

	};


	var chatSize = function() {
		console.log('chat bar width', $('#right-panel'), $('#right-panel').width());
		var width = $('#right-panel').width();
		$('#chat-input').css('width', width - 100);
	}();

	var wireAwesomeButton = function() {

		$('#autobop').on('click', function() {
			BetterTT.config.autobop = BetterTT.config.autobop ? false : true;
			var $img = $(this).find('img');
			var urlOff = $img.data('url-off');
			var urlOn = $img.data('url-on');

			console.log(BetterTT.config.autobop);

			if ( BetterTT.config.autobop ) {
				$img.attr('src', urlOn);
				voteUp();
			} else {
				$img.attr('src', urlOff);
			}

		});
	}();

	var setSelectedPanel = function() {
		if ( $('#left-panel').is(':visible') ) {
			$('.room-info-link').eq(1).click();
		} else {
			$('#room-info-container').removeClass('selected');
			$('.chat-container').addClass('selected');
		}
	}();


	return pub;

};


setTimeout(function() {
	BetterTT = BetterTTFunc();
}, 1000);