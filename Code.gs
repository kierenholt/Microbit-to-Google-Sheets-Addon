
/* What should the add-on do after it is installed */
function onInstall() {
  onOpen();
}

/* What should the add-on do when a document is opened */
function onOpen() {
  var menu = SpreadsheetApp.getUi().createAddonMenu();
  
  menu.addItem("GET DATA", "showSidebar").addToUi();  // Run the showSidebar function when someone clicks the menu

}

//add to classroom sidebar
function showSidebar() {
  var dialog = HtmlService.createTemplateFromFile("sidebar.html");
  
  var html = dialog.evaluate().setTitle("microbit data logger"); // The title shows in the sidebar
  SpreadsheetApp.getUi().showSidebar(html);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function test() {
  writeToSheet("x,1,2,3\ny,1,2,3"); 
}

function writeToSheet(data) {
  //data = "x,1,2,3\ny,1,2,3";
  if (data[data.length-1] == "\n") {
    data = data.substr(0,data.length-1);
  }
  var cell = SpreadsheetApp.getCurrentCell();
  var cols = data.split("\n");
  
  for (var col, i = 0; col = cols[i]; i++) {  
    var values = col.split(",").map(function(s) {return  [[s]]});
    var range = cell.offset(0, i, values.length, 1);
    range.setValues(values);
  }
  //SpreadsheetApp.setCurrentCell(range.offset(1, 0));
  return true;
}