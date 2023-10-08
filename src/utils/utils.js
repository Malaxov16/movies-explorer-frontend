function convertDuration(durationInSec) {
   const minutes = Math.floor(durationInSec /60) - Math.floor(durationInSec / 3600) * 60;
   const hours = Math.floor(durationInSec / 3600);
   return (`${hours}ч ${minutes}м`);
};

export default convertDuration;
