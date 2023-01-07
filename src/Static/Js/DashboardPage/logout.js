$('#logoutAccept').on('click', function(event) {
  // Your code here
  //localStorage.removeItem('token')
  document.cookie = 'token=; expires=' + getPastDate(1)
  window.location.replace('/')
})
function getPastDate(days) {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}