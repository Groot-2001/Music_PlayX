
function relativeDays(timestamp) {
    const rtf = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto',
    });
    const oneDayInMs = 1000 * 60 * 60 * 24;
    const daysDifference = Math.round(
      (timestamp - new Date().getTime()) / oneDayInMs,
    );
  
    return rtf.format(daysDifference, 'day');
  }
  
//   (Today is 22nd Jan, 2022
  
//   👇️ 7 days ago
//   console.log(relativeDays(new Date('2022-01-15').getTime()));
  
//   👇️ 2 days ago
//   console.log(relativeDays(new Date('2022-01-20').getTime()));
  
//   👇️ yesterday
//   console.log(relativeDays(new Date('2022-01-21').getTime()));
  
//   👇️ today
//   console.log(relativeDays(new Date().getTime()));
  
//   👇️ in 113 days
//   console.log(relativeDays(new Date('2022-05-15').getTime()));

export default relativeDays;