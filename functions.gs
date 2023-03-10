/**
 * 任意のカレンダーから開始日から終了日までの予定を取得する関数です。
 * @param {String} calendarId カレンダーID
 * @param {Date} startDate 取得範囲の開始日
 * @param {Date} endDate 取得範囲の終了日
 * @returns {calndar[]} events 取得した予定の配列
 */
function getCalendarEventsByIdBetweenDates(calendarId,startDate,endDate){
  const calendar = CalendarApp.getCalendarById(calendarId);
  const events = calendar.getEvents(startDate,endDate);
  return events 
}

/**
 * 予定の配列を日付ごとに分類する関数です。
 * @param {array} eventsArray 予定の配列
 * @returns {object} groupedEventsByDate {日付：[予定の配列]}のオブジェクト
 */
function groupingEventsByDate(eventsArray) {
  let groupedEventsByDate = {};

  for (i=0;i<eventsArray.length;i++) {
    let event = eventsArray[i];
    let dateString = event.getStartTime().toDateString();

    if(!groupedEventsByDate[dateString]){
      groupedEventsByDate[dateString] = [];
    }

    groupedEventsByDate[dateString].push(event);
  }


  return groupedEventsByDate;
}

/**
 * グループ化された予定のオブジェクトから任意の日付の予定を取り出す
 */
function getAllEventsOnTheDate(groupedEventsByDate,){}

/**
 * 名前をローマ字表記から漢字表記に直す関数
 * @param {String} romanName ローマ字表記の名前
 * @returns {String} kanjiName 漢字表記の名前
 */
function fromRomanToKnaji(romanName){
  const romanKanjidictionary = {
    'sato':'佐藤',
    'atobe':'跡部',
    'katsumata':'勝又',
    'shiga':'志賀',
    'enokiya':'榎屋'
  };

  const kanjiName = romanKanjidictionary[romanName];
  return kanjiName;
}

/**
 * 与えられた日付に対応するセル位置を求める関数
 * @param {Strig} dateString 日付を表す文字列
 * @param {Strig} standardDateString 基準となる日付を表す文字列
 * @param {String} romanName ローマ字表記の名前
 * @param {Sheet} sheet スプレッドシートのシート
 * @returns {Range} range セル範囲
 */
function fromDateStringToRangeString(dateString,standardDateString,romanName,sheet){
  const date = new Date(dateString);
  const standardDate = new Date(standardDateString);
  let dateDif = date.getDate() - standardDate.getDate();
  let row = 10;
  let column = 1;

  if(dateDif < 0){
    row -= 6;
    dateDif += 7;
  }

  while(dateDif > 6){
    row += 6;
    dateDif -= 7;
  }

  column = dateDif + 1;

  switch (romanName) {
    case 'sato':
      row +=0;
      break;
    case 'atobe':
      row +=1;
      break;
    case 'katsumata':
      row +=2;
      break;
    case 'shiga':
      row +=3;
      break;
    case 'enokiya':
      row +=4;
      break;
  }
  const range = sheet.getRange(row,column);
  return range;
}

/**
 * カレンダーは崩さず入力内容のみクリアする関数
 * @param {sheet} sheet スプレッドシートのシート
 */
function deleteWrittenContent(sheet){
  sheet.getRange(4,1,5,7).clearContent();
  sheet.getRange(10,1,5,7).clearContent();
  sheet.getRange(16,1,5,7).clearContent();
  sheet.getRange(22,1,5,7).clearContent();
  sheet.getRange(28,1,5,7).clearContent();
  sheet.getRange(34,1,5,7).clearContent();
}