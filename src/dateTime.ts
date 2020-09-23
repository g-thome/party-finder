function getHours(dateTime: string) {
  return dateTime.split(/h|\:/)[0];
}

function getMinutes(dateTime: string) {
  return dateTime.split(/h|\:/)[1];
}

export { getHours, getMinutes };