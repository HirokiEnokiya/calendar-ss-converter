function refCalendar() {
  const id = 'enokiya.hiroki@choidigi.com';
  const calendar = CalendarApp.getCalendarById(id);

  const startDate = new Date();
  const endDate = new Date;
  endDate.setMonth(endDate.getMonth()+2);

  console.log(Utilities.formatDate(startDate,'JST','yyyy/MM/dd'));
  console.log(Utilities.formatDate(endDate,'JST','yyyy/MM/dd'));
  array =[];

// 終日イベントをどう処理するか？
  const events = calendar.getEvents(startDate,endDate);

  for (event of events) {
    let startTime = event.getStartTime();
    let endTime = event.getEndTime();
    let title = event.getTitle();
    let creator = event.getCreators();
    array.push([Utilities.formatDate(startTime,'JST','MM/dd HH/mm'),Utilities.formatDate(endTime,'JST','MM/dd HH:mm'),title,creator]);
  }

  console.log(array);

  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('test');
  const column = ss.getDataRange().getLastColumn();
  const row = array.length;

  ss.getRange(1,1,row,column).setValues(array);

}
