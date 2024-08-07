// Define the API URL

let currentURL = new URL(window.location.href) ;
let errorCode = currentURL.pathname.slice(currentURL.pathname.lastIndexOf('/')) ;
let apiLink = currentURL.origin + '/data/error' + errorCode ;

// Make a GET request
fetch(apiLink)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.flag)
      document.getElementById('error_info').innerHTML = data.info ;
    else
      document.getElementById('error_info').innerHTML = data.error ;
  })
  .catch(error => {
    console.error('Error:', error) ;
  }) ;

function linkToLogin(login_again_a) {
  login_again_a.href = window.location.origin + '/login' ;
}

function linkToSignup(signup_a) {
  signup_a.href = window.location.origin + '/signup' ;
}
