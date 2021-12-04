function getTime() {
  let date = new Date();
  let y = date.getFullYear();
  let M = date.getMonth()+1;
  let d = date.getDate()<10?'0'+date.getDate():date.getDate();
  let h = date.getHours()<10?'0'+date.getHours():date.getHours();
  let m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
  let s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
  let id = 'cj' + date.getTime();
  let time = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
  return {
    time,
    id
  }
}
module.exports = {
  getTime
}
