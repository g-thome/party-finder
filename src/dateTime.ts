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

function isValidDay(day: number, month: number) {
  if (day === 0 || day > 31) {
    return false;
  }

  if (month === 1 && day > 29) {
    return false;
  }

  if ((month % 2 !== 0) && day === 31) {
    return false;
  }

  const now = new Date();

  if (month < now.getMonth()) {
    return false;
  }

  if (day < now.getDate() && month === now.getMonth()) {
    return false;
  }

  return true;
}

function isValidTime(hours: number, minutes: number) {
  const now = new Date();
  if (hours < now.getHours()) {
    return false;
  }

  if (hours === now.getHours() && minutes < now.getMinutes()) {
    return false;
  }

  return true;
}

export { getDate, getMonth, getYear, getHours, getMinutes, isValidDay, isValidTime };