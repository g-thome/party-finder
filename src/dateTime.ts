function getDate(dateTime: string) {
  return dateTime.split('/')[0];
}

function getMonth(dateTime: string) {
  return dateTime.split('/')[1];
}

function getYear(dateTime: string) {
  return dateTime.split('/')[2];
}

function getHours(dateTime: string) {
  return dateTime.split(/h|\:/)[0];
}

function getMinutes(dateTime: string) {
  return dateTime.split(/h|\:/)[1];
}

export { getDate, getMonth, getYear, getHours, getMinutes };