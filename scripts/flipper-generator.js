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
		var paddedNum = ("00" + i).slice (-2);
		var btnId = ' id="btn' + paddedNum + '" ';
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

function handleFlipperPreviewButtonClick(elemButton)
{
	var origWidth = elemButton.offsetWidth;
	var origHeight = elemButton.offsetHeight;
	var idNum = elemButton.id.slice(-2);
	
    var txtURL = prompt("Please enter the URL for image #" + (idNum * 1), elemButton.value);

    if (txtURL == null || txtURL == "") {
		elemButton.style.background = "";
		elemButton.value = "";

	} else {
		elemButton.style.background = "url(" + txtURL + ") no-repeat right top";
		elemButton.style.backgroundSize = origWidth + "px " + origHeight + "px";
		elemButton.value = txtURL;
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
	var imageElement = document.getElementsByClassName(previewClass);
	for (var i = 0; i < imageElement.length; i++) {
		console.log(imageElement[i].id + ':' + imageElement[i].value);
	}
	/*
	var nDates = 1;
	if (document.getElementById('ktsDeadline2Checkbox').checked) {
		nDates = 2;
	}
	var deadline1 = document.getElementById('ktsDeadlineDate1').value + ' 23:59:59';
	var deadline2 = document.getElementById('ktsDeadlineDate2').value + ' 23:59:59';

	return {
		'nDates': nDates,
		'titleDuring': [ document.getElementById('ktsDeadlineTitleDuring1').value, document.getElementById('ktsDeadlineTitleDuring2').value], 
		'titleAfter': [document.getElementById('ktsDeadlineTitleAfter1').value, document.getElementById('ktsDeadlineTitleAfter2').value], 
		'date': [deadline1, deadline2]
	};
	*/
	return {
		"dummy": 123
	};
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
	return sHTML;
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
