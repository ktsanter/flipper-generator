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
		"subtitle": "",
		"colorscheme": 0
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
		
	"colorSchemeClasses": [
			'kts-flipper-colorscheme-000',
			'kts-flipper-colorscheme-001',
			'kts-flipper-colorscheme-002',
			'kts-flipper-colorscheme-003',
			'kts-flipper-colorscheme-004',
			'kts-flipper-colorscheme-005'
		],

	"prepareFlipper": function(inputParameters)
		{
			this.loadParameters(inputParameters);
			this.loadFlipperCSS();
		},

	"loadParameters": function(inputParameters) 
		{
			this.param.title = inputParameters.title;
			this.param.subtitle = inputParameters.subtitle;
			this.param.colorscheme = inputParameters.colorscheme;
			
			for (var i = 0; i < inputParameters.images.length; i++) {
				this.param.images[i] = inputParameters.images[i];
			}
		},
	
	"loadFlipperCSS": function ()
		{
			/*---- non-local ----*/
			var ktsFlipperStyleSheet = 'https://raw.githubusercontent.com/ktsanter/flipper-generator/master/styles/flipper.css';
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var styleElement = document.createElement('style');
					styleElement.innerHTML = xhttp.responseText;
					document.head.appendChild(styleElement);
					
					ktsFlipperCode.loadHTML();
					ktsFlipperCode.loadDescription();
					ktsFlipperCode.loadMainCard();
					document.getElementById('ktsFlipperResetButton').addEventListener('click', ktsFlipperCode.handleReset);
				}
			};
			xhttp.open("GET", ktsFlipperStyleSheet, true);
			xhttp.send();
			/*----- end of non-local ----*/
			
			/*---- local  ------
			ktsFlipperCode.loadHTML();
			ktsFlipperCode.loadDescription();
			ktsFlipperCode.loadMainCard();
			document.getElementById('ktsFlipperResetButton').addEventListener('click', ktsFlipperCode.handleReset);
			---- end of local -----*/
		},
	
	"loadHTML": function()
		{
			document.getElementById(this.param.mainContentId).innerHTML = this.baseHTML;
			var wrapper = document.getElementById('ktsFlipperWrapper');
			wrapper.classList.add(this.colorSchemeClasses[this.param.colorscheme]);
		},

	"loadDescription": function()
		{  
			document.getElementById('ktsFlipperTitle').textContent = this.param.title;
			document.getElementById('ktsFlipperSubtitle').textContent = this.param.subtitle;
		},

	"loadMainCard": function()
		{
			var numItems = this.getNumCards();
			var s = '';

			s += this.loadFrontOfCard(numItems);
			s += this.loadBackOfCard(numItems);

			document.getElementById(this.param.mainCardId).innerHTML = s;

			var cardButtons = document.getElementsByClassName('kts-flipper-card-button');
			for (var i = 0; i < cardButtons.length; i++) {
				cardButtons[i].addEventListener('click', function() {
					ktsFlipperCode.flip(ktsFlipperCode.param.mainCardId, this.id);
				});
			}

			var cardBacks = document.getElementsByClassName('back');
			for (var i = 0; i < cardBacks.length; i++) {
				var back = cardBacks[i];
				back.style.visiblity = 'hidden';
				back.addEventListener('click', function () {
					ktsFlipperCode.unflip();
				});
			}
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
				alert('internal error - no layout for this number of items: ' + numItems);
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
				var sid = ' id="ktsFlipperButton' + paddedNum + '" ';
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
				s += '<img src="' + this.param.images[i] + '" style="height:100%" />'; 
				s += '</div>';
			}
			  
			return s;
		},

	"flip": function(id1, id2) 
		{
			var cardBacks = document.getElementsByClassName('back');
			for (var i = 0; i < cardBacks.length; i++) {
				cardBacks[i].style.visibility = 'hidden';
			}
			document.getElementById('back' + id2.substring(id2.length-2)).style.visibility = 'visible';

			ktsFlipperCode.toggleClass(document.getElementById(id1), 'flipped');
			document.getElementById(id2).style.visibility = 'hidden';
		},

	"unflip": function() 
		{
			ktsFlipperCode.toggleClass(document.getElementById(ktsFlipperCode.param.mainCardId), 'flipped');
		},
 
	"handleReset": function() 
		{
			var cardButtons = document.getElementsByClassName('kts-flipper-card-button');
			for (var i = 0; i < cardButtons.length; i++) {
				cardButtons[i].style.visibility = 'visible';
			}

			var clist = document.getElementById(ktsFlipperCode.param.mainCardId).classList;
			if (clist.contains('flipped')) {
				clist.remove('flipped');
			}
		},	
 
	"getNumCards": function() 
		{
			return this.param.images.length;
		},
		
	"toggleClass": function(elem, className)
		{
			var clist = elem.classList;
			if (clist.contains(className)) {
				clist.remove(className);
			} else {
				clist.add(className);
			}
		}
};