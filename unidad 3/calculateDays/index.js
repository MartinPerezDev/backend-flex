import moment from "moment";

const calculateDays = (newBirthday) => {
  const now = moment();

  const birthDay = moment( newBirthday, "DD-MM-YYYY" );

  const days = now.diff( birthDay, "years" );

  return days;
};

console.log( calculateDays("13/10/1997") );