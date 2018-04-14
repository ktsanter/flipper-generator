var param = {
	"mainCardId": "ktsFlipperMainCard",
	
	"images":  [
		"https://drive.google.com/uc?id=1FObgsMGdHQqBhQLeB8E-e4jmEfa6zN4W",
		"https://drive.google.com/uc?id=1_iW927HURWBkurrQ3jSie9RAhVyAVaiZ",
		"https://drive.google.com/uc?id=1-ieJ2oJC25gp0IR_EdREdBYK4gXJsY9L",
		"https://drive.google.com/uc?id=1GOZ0T3xFrY5Nw7QobSRf02tLwy-48LGO",
		"https://drive.google.com/uc?id=1yFl0J3VOrxWVVIkjpC2OBNWrirSGfB6w",
		"https://drive.google.com/uc?id=1DDf1rNTGtpYuRehiQ2DNDv3peoy_S0qb",
		"https://drive.google.com/uc?id=1jn2AHXyVxqluv9Mg17N-wRGY1Ex2xmZE",
		"https://drive.google.com/uc?id=1X8cxOKQLa8Dl8vZcaaAM7EpP12CIBniV",
		"https://drive.google.com/uc?id=1_OiPubAgUAHXTAJ_AoobRlcTwjiroiTl",
		"https://drive.google.com/uc?id=109mYDkj86kpVLOM5HnVr0wapEapN-7ua",
		"https://drive.google.com/uc?id=1PVWhmfGccM8eXYBRXcQGuaezPZ6xrFjZ",
		"https://drive.google.com/uc?id=1EbRP2cV-3H9PH5Wwc-6sXombk-C6Kqgr",
		"https://drive.google.com/uc?id=1KJKCrXRLyPAPNJUXVpedrM-WX35UdXeu",
		"https://drive.google.com/uc?id=1obgJ4qpBMYeFQZQgQH-zoc65xr-b7lwD",
		"https://drive.google.com/uc?id=1l9Mo3no78Ir2_3nCd1h5l045sAAlGLaO",
		"https://drive.google.com/uc?id=1W3oFOtWPVV8KutA4cgv76DX3MFpMUAkk",
		"https://drive.google.com/uc?id=16B_SS4cqSNhYC-Z6ruckX5Q9VST8rpbe",
		"https://drive.google.com/uc?id=1fULDQ4ERqLGzzwJ-8ltbyrSnt13xAquH",
		"https://drive.google.com/uc?id=1fXVPJn06YoANSvC9XGVQMxq701zaJl_z",
		"https://drive.google.com/uc?id=133xtCM6awjqhF8zsTZc94q309bd4mfPP"
	],
	
	"title": "20 Things About Me",
	"subtitle": "Here are 20 things about me you might find interesting. Click on a card to flip it."
}

function prepareFlipper()
{
	loadDescription();
	loadMainCard();
	$("#ktsFlipperResetButton").click(handleReset);
}

function loadDescription()
{  
	$("#ktsFlipperTitle").html(param.title);
	$("#ktsFlipperSubtitle").html(param.subtitle);
}

function loadMainCard() 
{
	var cardSelector = '#' + param.mainCardId;
	var numItems = getNumCards();
	var s = '';

	s += loadFrontOfCard(numItems);
	s += loadBackOfCard(numItems);

	$(cardSelector).html(s);

	$(".kts-flipper-card-button").click(function() {
		flip(param.mainCardId, this.id);
	});

	$(".back").css("visibility","hidden");
	$(".back").click(function() {
		unflip();
	});
}

function loadFrontOfCard(numItems) 
{
	var s = '';
	s += '<div id="card-front" class="front">'
	s += '<table class="kts-flipper-card-table">';
	for (var i = 0; i < numItems; i++) {
		if (i % 5 == 0) s += '<tr>';
		var paddedNum = ("00" + i).slice (-2);
		var sid = ' id="btn' + paddedNum + '" ';
		var sclass = ' class="kts-flipper-card-button" ';
		var text = '#' + (i+1);
		
		s += '<td>';
		s += '<button ' + sid + sclass + '>' + text + '</button>';
		s += '</td>';
		if (i % 5 == 4) s += '</tr>';
	}

	if (i % 5 != 0) s += '</tr>';
	s += '</table>';
	s += '</div>';
	
	return s;
}

function loadBackOfCard(numItems) 
{
	var s= '';
	  
	for (var i = 0; i < numItems; i++) {
		var paddedNum = ("00" + i).slice (-2);
		var sid = ' id="back' + paddedNum + '" ';
		var sclass = ' class="back" ';
		var scontent = 'back of card ' + (i+1);
		s += '<div ' + sid + sclass + '>' 
		s += '<img src="' + param.images[i] + '" />'; 
		s += '</div>';
	}
	  
	return s;
}

function flip(id1, id2) 
{
	var selector1 = '#' + id1;
	var selector2 = '#back' + id2.substring(id2.length-2);
	var selector3 = '#' + id2;
	  
	$(".back").css("visibility","hidden");
	$(selector2).css("visibility","visible");
	$(selector1).toggleClass('flipped');
	$(selector3).css("visibility","hidden");
}

function unflip() 
{
	var selector = '#' + param.mainCardId;
	$(selector).toggleClass('flipped');
}
 
function handleReset() 
{
	var selector = '#' + param.mainCardId;
	$(".kts-flipper-card-button").css("visibility","visible");
	if ($(selector).hasClass("flipped")) {
		$(selector).removeClass("flipped");
	}
}
 
function getNumCards() 
{
	return param.images.length;
}