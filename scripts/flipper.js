var ktsFlipperCode = {
	"param": {
		"mainContentId": "ktsFlipperWrapper",
		"mainCardId": "ktsFlipperMainCard",
	
		"images":  [],
		/*---- original 20 -----
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
		*---- end of original 20 ----*/
		
		"title": "",
		"subtitle": ""
	},

	"baseHTML": ""
		+ "<table class='kts-main-container'>"
		+ "<tr>"
		+ "<td>"
		+ "	<table class='kts-flipper-table-title'>"
		+ "	  <tr>"
		+ "		<td>"
		+ "		  <div id='ktsFlipperTitle' class='kts-flipper-title'> </div>"
		+ "		</td>"
		+ "		<td class='kts-flipper-control-cell'>"
		+ "		  <button id='ktsFlipperResetButton' class='kts-flipper-button'> reset </button>"
		+ "		</td>"
		+ "	  </tr>"
		+ "	</table>"
		+ "	<br/>"
		+ "	<div id='ktsFlipperSubtitle' class='kts-flipper-subtitle'>"
		+ "	</div>" 
		+ "	<br/>"
		+ "	<div class='kts-flipper-container'>"
		+ "	  <div id='ktsFlipperMainCard' class='kts-flipper-card'> </div>"
		+ "	</div>"
		+ "</td>"
		+ "</tr>"
		+ "</table>",

	"prepareFlipper": function(inputParameters)
		{
			this.loadParameters(inputParameters);
			this.loadFlipperCSS();
		},

	"loadParameters": function(inputParameters) 
		{
			console.log("input parameters:");
			console.log(JSON.stringify(inputParameters));
			this.param.title = inputParameters.title;
			this.param.subtitle = inputParameters.subtitle;
			for (var i = 0; i < inputParameters.images.length; i++) {
				this.param.images[i] = inputParameters.images[i];
			}
		},
	
	"loadFlipperCSS": function ()
		{
			var ktsFlipperStyleSheet = 'https://raw.githubusercontent.com/ktsanter/twentythings-generator/master/styles/flipper.css';
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var styleElement = document.createElement('style');
					styleElement.innerHTML = xhttp.responseText;
					document.head.appendChild(styleElement);
					
					ktsFlipperCode.loadHTML();
					ktsFlipperCode.loadDescription();
					ktsFlipperCode.loadMainCard();
					$("#ktsFlipperResetButton").click(ktsFlipperCode.handleReset);
				}
			};
			xhttp.open("GET", ktsFlipperStyleSheet, true);
			xhttp.send();
		},
	
	"loadHTML": function()
		{
			$("#" + this.param.mainContentId).html(this.baseHTML);
		},

	"loadDescription": function()
		{  
			$("#ktsFlipperTitle").html(this.param.title);
			$("#ktsFlipperSubtitle").html(this.param.subtitle);
		},

	"loadMainCard": function()
		{
			var cardSelector = '#' + this.param.mainCardId;
			var numItems = this.getNumCards();
			var s = '';

			s += this.loadFrontOfCard(numItems);
			s += this.loadBackOfCard(numItems);

			$(cardSelector).html(s);

			$(".kts-flipper-card-button").click(function() {
				ktsFlipperCode.flip(ktsFlipperCode.param.mainCardId, this.id);
			});

			$(".back").css("visibility","hidden");
			$(".back").click(function() {
				ktsFlipperCode.unflip();
			});
		},

	"loadFrontOfCard": function(numItems) 
		{
			var layoutRowsCols = {
				"9": [3, 3],
				"16": [4, 4],
				"20": [4, 5],
				"25": [5, 5],
				"30": [6, 5]
			};
			var layout = layoutRowsCols[numItems];
			if (layout == null) {
				console.log("no layout for this number of items: " + numItems);
				return;
			}
			
			var rows = layout[0];
			var cols = layout[1];
			
			var s = '';
			s += '<div id="card-front" class="front">'
			s += '<table class="kts-flipper-card-table">';
			for (var i = 0; i < numItems; i++) {
				if (i % cols == 0) s += '<tr>';
				var paddedNum = ("00" + i).slice (-2);
				var sid = ' id="btn' + paddedNum + '" ';
				var sclass = ' class="kts-flipper-card-button" ';
				var text = '#' + (i+1);
				
				s += '<td>';
				s += '<button ' + sid + sclass + '>' + text + '</button>';
				s += '</td>';
				if (i % cols == cols - 1) s += '</tr>';
			}

			if (i % cols != 0) s += '</tr>';
			s += '</table>';
			s += '</div>';
			
			return s;
		},

	"loadBackOfCard": function(numItems) 
		{
			var s= '';
			  
			for (var i = 0; i < numItems; i++) {
				var paddedNum = ("00" + i).slice (-2);
				var sid = ' id="back' + paddedNum + '" ';
				var sclass = ' class="back" ';
				var scontent = 'back of card ' + (i+1);
				s += '<div ' + sid + sclass + '>' 
				s += '<img src="' + this.param.images[i] + '" />'; 
				s += '</div>';
			}
			  
			return s;
		},

	"flip": function(id1, id2) 
		{
			var selector1 = '#' + id1;
			var selector2 = '#back' + id2.substring(id2.length-2);
			var selector3 = '#' + id2;
			  
			$(".back").css("visibility","hidden");
			$(selector2).css("visibility","visible");
			$(selector1).toggleClass('flipped');
			$(selector3).css("visibility","hidden");
		},

	"unflip": function() 
		{
			var selector = '#' + ktsFlipperCode.param.mainCardId;
			$(selector).toggleClass('flipped');
		},
 
	"handleReset": function() 
		{
			var selector = '#' + ktsFlipperCode.param.mainCardId;
			$(".kts-flipper-card-button").css("visibility","visible");
			if ($(selector).hasClass("flipped")) {
				$(selector).removeClass("flipped");
			}
		},	
 
	"getNumCards": function() 
		{
			return this.param.images.length;
		}
};