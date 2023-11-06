function convertDuration(durationInMin) {
   const minutes = durationInMin - Math.floor(durationInMin / 60) * 60;
   const hours = Math.floor(durationInMin / 60);
   return (`${hours}ч ${minutes}м`);
};

export default convertDuration;
