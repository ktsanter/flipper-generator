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
    s += '<img src="images/Slide' + (i+1) + '.png" />'; 
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
 