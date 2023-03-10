/**
 * プロパティストアから更新するシートを判断し、更新を実行する関数
 * 一日３回程度時間主導のトリガーを設定する
 */
function updateCalendarSheet() {
  const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
  const thisMonthSheetName = SCRIPT_PROPERTIES.getProperty('thisMonthSheetName');
  console.log('今月分を更新:'+thisMonthSheetName);
  const nextMonthSheetName = SCRIPT_PROPERTIES.getProperty('nextMonthSheetName');
  console.log('来月分を更新:'+nextMonthSheetName);

  // 今月と来月or先月と今月のシートを更新
  importCalendarEventsToSheet(thisMonthSheetName);
  if(nextMonthSheetName){
    importCalendarEventsToSheet(nextMonthSheetName);
  }

}

/**
 * 与えられたカレンダーシートの更新をする関数
 * @param {String} calendarSheetName カレンダーシートの名前
 */
function importCalendarEventsToSheet(calendarSheetName) {
// 取得したいカレンダーのid
  const calendarIds = ['enokiya.hiroki@choidigi.com','shiga.kento@choidigi.com','katsumata.motonobu@choidigi.com','sato.tatsuya@choidigi.com','atobe.ryota@choidigi.com'];

//スプレッドシートからその月のカレンダーに関する情報を取得
  const calendarSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(calendarSheetName);
  const standardDateString = calendarSheet.getRange('A9').getValue();
  const calendarStartDateString = calendarSheet.getRange('A1').getValue();
  console.log(calendarStartDateString);

// カレンダーの初期化
  deleteWrittenContent(calendarSheet);

// 予定の取得範囲
  const startDate = new Date(calendarStartDateString);//予定の開始日ではなく、取得範囲の開始日
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth()+1);

// 各カレンダーから予定を取得し一つの配列にまとめる
  const allEvents = [];
  for (calendarId of calendarIds) {
    let events = getCalendarEventsByIdBetweenDates(calendarId,startDate,endDate);
    allEvents.push(...events);
  }

  //まとめた予定を日付ごとにグループ分け
  const groupedEventsByDate = groupingEventsByDate(allEvents); //{dateString : array}

  // 日付ごとにシートへ入力
  let j=0;//セル位置を決めるためのカウンタ
  for (dateString in groupedEventsByDate){
    let eventsOnTheDate = groupedEventsByDate[dateString]; //配列の要素はcalendarEventオブジェクト
    for(i=0;i<eventsOnTheDate.length;i++) {
      let event = eventsOnTheDate[i];
      if(event.getTitle()=='インターン'){
        let startTime = event.getStartTime();//こちらは予定の開始時間
        let endTime = event.getEndTime();
        startTime = Utilities.formatDate(startTime,'JST','HH:mm');
        endTime = Utilities.formatDate(endTime,'JST','HH:mm');
        let romanName = event.getCreators().toString().replace(/\..*/, "");
        //セル位置を求める
        let range = fromDateStringToRangeString(dateString,standardDateString,romanName,calendarSheet);
        let name = fromRomanToKnaji(romanName);
        let output = `${name}:${startTime}~${endTime}`;
        range.setValue(output);
      }
    }
    j++;
  }
 

}