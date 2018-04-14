function initFlipperGenerator()
{
	var previewClass = 'kts-preview-button';
	var elemDefaultLayout = document.getElementById('ktsFlipperLayout2');

	elemDefaultLayout.checked = true;
	handleLayoutChange(elemDefaultLayout, previewClass);

	$(".kts-layout-button").change(function() {
		handleLayoutChange(this, previewClass);
	});
	
	$("#ktsGenerateButton").click(function() {
		displayFlipperEmbedCode(previewClass)
	});
	
	$(".kts-hide-embed").click(function() {
		hideArea('ktsEmbedCodeArea');
	});
	
	$("#ktsCopyToClipboardButton").click(copyEmbedCodeToClipboard);

	document.getElementById('files').addEventListener('change', handleFileSelect, false);
	$("#ktsWriteConfigFile").click(writeConfigurationFile);
}

function handleLayoutChange(elem, previewClass)
{
	document.getElementById('ktsFlipperPreview').innerHTML = loadFlipperPreview(elem.value, previewClass);
	
	$("." + previewClass).click(function() {
		hideArea('ktsEmbedCodeArea');
		handleFlipperPreviewButtonClick(this);
	});	
}


function loadFlipperPreview(numItems, previewClass) 
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
	s += '<div >'
	s += '<table>';
	for (var i = 0; i < numItems; i++) {
		/*
		var paddedNum = ("00" + i).slice (-2);
		var btnId = ' id="btn' + paddedNum + '" ';
		*/
		var btnId = ' id="' + makeButtonId(i) + '" ';
		var btnClass = ' class="kts-flipper-generator ' + previewClass + '"';
		var text = (i+1);
		
		if (i % cols == 0) s += '<tr>';

		s += '<td>';
		s += '<button ' + btnId + btnClass + '>' + text + '</button>';
		s += '</td>';
		
		if (i % cols == cols - 1) s += '</tr>';
	}

	if (i % cols != 0) s += '</tr>';
	s += '</table>';
	s += '</div>';

	return s;
}

function makeButtonId(num)
{
	var paddedNum = ("00" + num).slice(-2);
	return 'btn' + paddedNum;
}

function handleFlipperPreviewButtonClick(elemButton)
{
	var idNum = elemButton.id.slice(-2);
	
    var txtURL = prompt("Please enter the URL for image #" + (idNum * 1), elemButton.value);
	setFlipperPreviewImage(elemButton, txtURL);
}

function setFlipperPreviewImage(elemButton, imageURL)
{
	var origWidth = elemButton.offsetWidth;
	var origHeight = elemButton.offsetHeight;

    if (imageURL == null || imageURL == "") {
		elemButton.style.background = "";
		elemButton.value = "";

	} else {
		elemButton.style.background = "url(" + imageURL + ") no-repeat right top";
		elemButton.style.backgroundSize = origWidth + "px " + origHeight + "px";
		elemButton.value = imageURL;
    }
}


function displayFlipperEmbedCode(previewClass)
{
	var param = getFlipperParameters(previewClass);
	var embedCode = generateFlipperEmbedCode(param);
	var embedElement = document.getElementById('ktsEmbedCodeText');
	
	embedElement.value = embedCode;
	document.getElementById('ktsCopiedNotice').innerHTML = '';
	showArea('ktsEmbedCodeArea');
}

function getFlipperParameters(previewClass)
{
	var param = {};
	
	param.title = document.getElementById('ktsFlipperTitle').value;
	param.subtitle = document.getElementById('ktsFlipperSubtitle').value;
	
	var flipperImages = [];
	var imageElement = document.getElementsByClassName(previewClass);
	for (var i = 0; i < imageElement.length; i++) {
		flipperImages[i] = imageElement[i].value;
	}
	param.images = flipperImages;
	
	return param;
}

function generateFlipperEmbedCode(param)
{
	var sHTML = ""
		+ "embed code";
	/*
		+ "<span>"
		+ "  <span id='ktsCountdownContent'> ... </span>"
		+ "</span>"
		+ "<script>"
		+ "var ktsXHTTP = new XMLHttpRequest();"
		+ "ktsXHTTP.onreadystatechange = function() {"
		+ "if (this.readyState == 4 && this.status == 200) {"
		+ "	   var scriptElement = document.createElement('script');"
		+ "    scriptElement.innerHTML = ktsXHTTP.responseText;"
		+ "	   document.getElementById('ktsCountdownContent').parentElement.appendChild(scriptElement);"
		+ "	   ktsCountdownCode.ktsCreateCountdownTimer(" + JSON.stringify(param) + ");"
		+ "	}"
		+ "};"
		+ "ktsXHTTP.open('GET', 'https://raw.githubusercontent.com/ktsanter/countdown-generator/master/scripts/cd_generated.js', true);"
		+ "ktsXHTTP.send();"
		+ "</script>";
*/		
	return JSON.stringify(param);
}

function showArea(elemId)
{
	var embedAreaClist = document.getElementById(elemId).classList;

	if (embedAreaClist.contains('kts-dont-show')) {
		embedAreaClist.remove('kts-dont-show');
	}
}

function hideArea(elemId)
{
	document.getElementById(elemId).classList.add('kts-dont-show');
}

function copyEmbedCodeToClipboard()
{
	var embedElement = document.getElementById('ktsEmbedCodeText');
	embedElement.select();
	document.execCommand("Copy");
	embedElement.selectionEnd = embedElement.selectionStart;
	document.getElementById('ktsCopiedNotice').innerHTML = 'embed code copied to clipboard';
}

function handleFileSelect(evt)
{
	var fileList = evt.target.files;
	if (fileList.length < 1) {
		console.log('no file selected');
		return;
	}
	
	var configFile = fileList[0];
	if (!configFile.type.match('text.plain')) {
		console.log('wrong file type: ' + configFile.type + '\nfile=' + configFile.name);
		return;
	}
	if (configFile.size > 5000) {
		console.log('file is too big: ' + configFile.size + '\nfile=' + configFile.name);
		return;
	}
	
	var reader = new FileReader();

	reader.onload = (function(theFile) {
        return function(e) {
			var param;
			try {
				param = JSON.parse(e.target.result);
				loadConfiguration(param);
			} catch(e) {
				console.log('not a valid configuration file - unable to parse as JSON');
			}
		};
	})(configFile);

	reader.readAsText(configFile);
}

function writeConfigurationFile()
{
	console.log("write file");
}

function loadConfiguration(param)
{
	if (!('title' in param) || !('subtitle' in param) || !('images' in param)) {
		console.log('not a valid configuration file - missing one or more elements');
		return;
	}
	
	var nImages = param.images.length;
	var layoutElementId = {
		"9": "ktsFlipperLayout0",
		"16": "ktsFlipperLayout1",
		"20": "ktsFlipperLayout2",
		"25": "ktsFlipperLayout3",
		"30": "ktsFlipperLayout4"
	}

	if (!(nImages in layoutElementId)) {
		console.log('not a valid number of images: ' + nImages);
		return;
	}
	
	document.getElementById('ktsFlipperTitle').value = param.title;
	document.getElementById('ktsFlipperSubtitle').value = param.subtitle;
	
	var layoutElement = document.getElementById(layoutElementId[nImages]);
	layoutElement.click();
	
	var theImages = param.images;
	for (var i = 0; i < nImages; i++) {
		var btnElement = document.getElementById(makeButtonId(i));
		setFlipperPreviewImage(btnElement, theImages[i]);
	}
}
