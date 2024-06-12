import moment from "moment";

export const dateformat=(value='')=>{
    console.log(value)
    // let temp = moment(value).format("DD-MM-YYYY")
    // console.log(temp);
    const isoDate = new Date(value);

    // Define the desired date format
    const simpleDateFormat = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    });

    // Format the date using the simple date format
    const formattedDate = simpleDateFormat.format(isoDate);

    return formattedDate;
  }