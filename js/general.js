// add content topic link
var allH3 = $("h3");
$('.normal h1').after('<div id="listItem" style="clear: both; padding: 1px"></div>');
$('#listItem').append('<h4>主題選單</h4><ul>');
for(var i = 0 ; i < allH3.length ; i++) {
  $(allH3[i]).before('<a name="' + 'h3_' + i + '"></a>');
  $('#listItem').append('<h5><li><a style="clear:both; font-size: 16px;" href="#' + 'h3_' + i + '">' + $(allH3[i]).text() + '</a></li></h5>');
}
$('#listItem').append('</ul>');