function resetFunction() {
  const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
  // SCRIPT_PROPERTIES.deleteAllProperties;

  
  }

function getOnemonthbefore() {

  var date = new Date('2023/05/01');
  var month = date.getMonth();
  date.setMonth(month-1);
  console.log(date.getMonth()); 

}

function test(){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName('祝日リスト');
  const range = sheet.getRange('A2');
  const dateString = range.getValue();
  console.log(dateString);
}

function sp(){
  const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
  const latestCalendarSheetName = SCRIPT_PROPERTIES.getProperty('latestCalendarSheetName');
  const previousCalendarSheetName = SCRIPT_PROPERTIES.getProperty('previousCalendarSheetName');
  console.log('lcs:'+latestCalendarSheetName);
  console.log('pcs:'+previousCalendarSheetName);
}