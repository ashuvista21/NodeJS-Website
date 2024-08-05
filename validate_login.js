async function getData() {
  let currentURL = new URL(window.location.href) ;

  let username = document.getElementById('username').value ;
  let password = document.getElementById('password').value ;
  
  if (username == '' || password == '')
    return false ;

  let params = '?username=' + username + '&password=' + password ;
  let apiLink = currentURL.origin + '/login/data' + params ;

  try {
    const response = await fetch(apiLink);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.flag ;
  } catch (error) {
    console.log(error.message) ;
    return false ;
  }
}

function validate_user() {
  if (validateLoginForm()) {
    getData().then( (result) => {
      if (!result)
        document.getElementById('submit_error').innerHTML = 'Failed' ;
      else {
        console.log("Yeah") ;
        document.getElementById('login_form').submit() ;
      }
    }) ;
  }
}