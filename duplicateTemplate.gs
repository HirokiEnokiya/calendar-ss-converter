/**
 * 毎月1日に発動し、翌月のシートを作成し先々月のシートをする関数
 */
function makeNextSheetAndDeletePreviousSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const template = ss.getSheetByName('template');
  const copiedSheet = template.copyTo(ss).showSheet();

  const dateString = '2023/03/01';
  let today = new Date(dateString);
  let nextMonthDate = new Date('2023/03/01');
  today.setDate(1);//念のため
  nextMonthDate = anyMonthLaterDate(nextMonthDate,1);
  console.log(nextMonthDate);
  let beforeLastMonthDate = new Date('2023/03/01');
  beforeLastMonthDate = anyMonthLaterDate(beforeLastMonthDate,-2);

  const yearAtThisMonth = today.getFullYear();
  const thisMonth = today.getMonth()+1; //*月１日
  const nextMonth = nextMonthDate.getMonth()+1;
  const beforeLastMonth = beforeLastMonthDate.getMonth()+1;


  const beforeLastMonthSheetName = `${yearAtThisMonth}/${beforeLastMonth}`;
  console.log(beforeLastMonthSheetName);
  const nextMonthSheetName = `${yearAtThisMonth}/${nextMonth}`;
  console.log(nextMonthSheetName);

  let calendarStartDate = nextMonthDate.setDate(1);
  calendarStartDate = Utilities.formatDate(new Date(calendarStartDate),'JST','yyyy/MM/dd');
  const thisMonthSheetName = `${yearAtThisMonth}/${thisMonth}`;
  copiedSheet.getRange('A1').setValue(calendarStartDate);
  copiedSheet.setName(nextMonthSheetName);
 
  const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(beforeLastMonthSheetName);
  if(targetSheet){
    ss.deleteSheet(targetSheet);
  }

  const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
  SCRIPT_PROPERTIES.setProperty('thisMonthSheetName',thisMonthSheetName);
  SCRIPT_PROPERTIES.setProperty('nextMonthSheetName',nextMonthSheetName);

  console.log('lcs:'+nextMonthSheetName);
  console.log('bcs:'+beforeLastMonthSheetName);

}

// 時間主導のトリガーで毎月20日に発動


/**
 * 与えられたDATEオブヘクトをnヶ月後のDATEオブジェクトにして返す関数
 * @param {DATE} date 今日のDATEオブジェクト
 * @param {number} number 何ヶ月後か
 * @return {DATE} date nヶ月後にしたDATEオブジェクト
 */
function anyMonthLaterDate(date,number) {
  date.setMonth(date.getMonth() + number); //numberヶ月後
  return date;
}

function dateTest(){
  let date = new Date();
  console.log(typeof(date));
  anyMonthLaterDate(date,2);
  console.log(date);
  console.log(typeof(date));
}