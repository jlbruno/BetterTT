
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

			var min = 5000;
			var max = 30000;
			var rand = Math.floor(Math.random() * (max - min + 1)) + min;

			setTimeout(function () {
				voteUp();
			}, rand);

		}
	});



	var voteUpTTObjects = function() {
		console.info('BTT: trying to vote up');

		// USING TTObjects
		ttObjects.getRoom();
		ttObjects.getManager();
		ttObjects.getApi();
		console.log(ttObjects);

		ttObjects.api({
		  api: 'room.vote',
		  roomid: ttObjects.room.roomId,
		  val: "upvote",
		  vh: $.sha1(ttObjects.room.roomId + "upvote" + ttObjects.room.currentSong._id),
		  th: $.sha1(Math.random() + ""),
		  ph: $.sha1(Math.random() + "")
		});

	}

	var voteUp = function() {
		$('#chat-input').val('/up'); $('#chat-form').submit();

	};

	var voteUpOrig = function() {
		console.info('BTT: trying to vote up');

		if(!$tt) {
			
			if(turntable){ var $tt=window.turntable; }//grab turntable object
			if($tt){
				for(i in $tt){
					var $tt_roomkey=$tt[i]; break; //grab roomkey object
				}
			}
			if($tt_roomkey){
				for(i in $tt_roomkey){
					if($tt_roomkey[i] && $tt_roomkey[i].callback) {
						var $tt_vote=$tt_roomkey[i]; break; //grab object for callback
					}
				}
			}
		}
		$tt_vote.callback("upvote"); //vote


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

			if ( BetterTT.config.autobop ) {
				$img.attr('src', urlOn);
			} else {
				$img.attr('src', urlOff);
			}

			console.log(BetterTT.config.autobop);
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