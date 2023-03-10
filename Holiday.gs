//翌日が休日(土日、祝日)か判定する関数
function tomorrowIsHoliday(){
//実行した当日の日付情報を取得する
let today = new Date();
//当日の日付から翌日の日付情報を取得する
let tomorrow = new Date(today.setDate(today.getDate() + 1));
//翌日の曜日(0:日曜～6:土曜)を取得し、土日と判定された場合はtrueを返す
let weekInt = tomorrow.getDay();
if(weekInt <= 0 || 6 <= weekInt){ return true; } //祝日を判定するため、日本の祝日を公開しているGoogleカレンダーと接続する 
let calendarId = "ja.japanese#holiday@group.v.calendar.google.com"; let calendar = CalendarApp.getCalendarById(calendarId); //翌日にイベントが設定されているか取得し、イベントが有る場合はtrueを返す 
let tomorrowEvents = calendar.getEventsForDay(tomorrow); if(tomorrowEvents.length > 0){
return true;
}
//土日、祝日のいずれでもない場合は、休日ではないとしてfalseを返す
return false;
}

function refHoliday() {
  // 読み取るカレンダー
  const id = 'ja.japanese#holiday@group.v.calendar.google.com';
  const calendar = CalendarApp.getCalendarById(id);
// イベント取得範囲（今日から２か月後まで）
  const start_date = new Date();
  const end_date = new Date;
  end_date.setMonth(end_date.getMonth()+12);

  // console.log(Utilities.formatDate(start_date,'JST','yyyy/MM/dd'));
  // console.log(Utilities.formatDate(end_date,'JST','yyyy/MM/dd'));
  array =[];
  
  const events = calendar.getEvents(start_date,end_date);
// イベントをカレンダーに入力
  for (event of events) {
    // イベントを[開始日,終了日,タイトル]の配列に格納
    let startTime = event.getStartTime();
    let title = event.getTitle();
    array.push([Utilities.formatDate(startTime,'JST','MM/dd'),title]);
  }

// スプシを取得&無機質に書き込み
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('祝日リスト');
  const column = ss.getDataRange().getLastColumn();
  const row = array.length;

  ss.getRange(2,1,row,column).setValues(array);

}

/**
 * シート上の祝日のセルを赤く着色する関数
 * @param {String} sheetName シート名
 */
function colorHoliday(sheetName){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const calendar = ss.getSheetByName(sheetName);
  const holidayList = ss.getSheetByName('祝日リスト');
}
