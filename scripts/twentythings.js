var myImages = [
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
]

 $(document).ready(function() {
  loadCard('mainCard', 20);  
  
  $("#btnReset").click(function() {
    handleReset();
  });
});

function loadCard(cardId, numItems) {
  var cardSelector = '#' + cardId;
  var s = '';
  
  s += frontOfCard(numItems);
  s += backOfCard(numItems);

  $(cardSelector).html(s);
  $(".btnCard").click(function() {
    flip(cardId, this.id);
  });

  $(".back").css("visibility","hidden");
  
  $(".back").click(function() {
    unflip(cardId);
  });

}

function frontOfCard(numItems) {
  var s = '';
  s += '<div id="card-front" class="front">'
  s += '<table class="tblCard">';
  for (var i = 0; i < numItems; i++) {
    if (i % 5 == 0) s += '<tr class="trCard">';
    var paddedNum = ("00" + i).slice (-2);
    var sid = ' id="btn' + paddedNum + '" ';
    var sclass = ' class="btnCard" ';
    var text = '#' + (i+1);

    s += '<td class="tdCard">';
    s += '<button ' + sid + sclass + '>' + text + '</button>';
    s += '</td>';
    if (i % 5 == 4) s += '</tr>';
  }
  if (i % 5 != 0) s += '</tr>';
  s += '</table>';
  s += '</div>';
  return s;
}

function backOfCard(numItems) {
  var s= '';
  
  for (var i = 0; i < numItems; i++) {
    var paddedNum = ("00" + i).slice (-2);
    var sid = ' id="back' + paddedNum + '" ';
    var sclass = ' class="back" ';
    var scontent = 'back of card ' + (i+1);
    s += '<div ' + sid + sclass + '>' 
    s += '<img src="' + myImages[i] + '" />'; 
    s += '</div>';
  }
  
  return s;
}

function flip(id1, id2) {
  var selector1 = '#' + id1;
  var selector2 = '#back' + id2.substring(id2.length-2);
  var selector3 = '#' + id2;
  
  $(".back").css("visibility","hidden");
  $(selector2).css("visibility","visible");
  $(selector1).toggleClass('flipped');
  $(selector3).css("visibility","hidden");
}

function unflip(id) {
  var selector = '#' + id;
  $(selector).toggleClass('flipped');
}
 
 function handleReset() {
  $(".btnCard").css("visibility","visible");
  if ($("#mainCard").hasClass("flipped"))
     $("#mainCard").removeClass("flipped");
 }
 