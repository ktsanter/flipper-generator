var ktsFlipperCode = {
	"param": {
		"mainContentId": "ktsFlipperWrapper",
		"mainCardId": "ktsFlipperMainCard",
		"images":  [],		
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
		
	"iframeHTMLContent": ''
		+'	<head>'
		+'	</head>'
			
		+'	<body>'
		+'		<span>'
		+'			<span id="ktsFlipperWrapper" class="kts-flipper"> loading... </span>'
		+'		</span>'

		+'		<script>'
		+'			var ktsXHTTP = new XMLHttpRequest();ktsXHTTP.onreadystatechange = function() {'
		+'				if (this.readyState == 4 && this.status == 200) {'
		+'					var scriptElement = document.createElement("script");'
		+'					scriptElement.innerHTML = ktsXHTTP.responseText;' 
		+'					document.getElementById("ktsFlipperIframeWrapper").parentElement.appendChild(scriptElement);'
		+'					ktsFlipperCode.prepareFlipper("***input_parameters***");'
		+'				}'
		+'			};'
		
		+'			ktsXHTTP.open("GET", "https://raw.githubusercontent.com/ktsanter/flipper-generator/master/scripts/flipper.js", true);'
		+'			ktsXHTTP.send();'
		+'		</script>'
		+'	</body>'
		+'	</html>',
		
	"colorSchemeClasses": [
			'kts-flipper-colorscheme-000',
			'kts-flipper-colorscheme-001',
			'kts-flipper-colorscheme-002',
			'kts-flipper-colorscheme-003',
			'kts-flipper-colorscheme-004',
			'kts-flipper-colorscheme-005'
		],

	"prepareFlipperIframe": function(elemWrapperId, inputParameters) {
			var html = this.iframeHTMLContent;
			html = html.replace('***input_parameters***', JSON.stringify(inputParameters));
			var iframe = document.createElement('iframe');
			iframe.srcdoc = html;
			iframe.style = "width: 620px; height: 570px; border:none";
			iframe.scrolling = "no";
	
			var iframeWrapper = document.getElementById(elemWrapperId);
			iframeWrapper.innerHTML = "";
			iframeWrapper.appendChild(iframe);
	},
		
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
	
	"loadFlipperCSS": function()
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
			var wrapper = document.getElementById(this.param.mainContentId);
			wrapper.innerHTML = this.baseHTML;
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