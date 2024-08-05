async function getData() {
  let currentURL = new URL(window.location.href) ;

  let username = document.getElementById('username').value ;
  let password = document.getElementById('password').value ;
  
  if (username == '' || password == '')
    return false ;

  let params = '?username=' + username + '&password=' + password ;
  let apiLink = currentURL.origin + '/login/data/params' + params ;

  try {
    const response = await fetch(apiLink);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json ;
  } catch (error) {
    console.log(error.message) ;
    return { flag:false} ;
  }
}

function validate_user() {
  if (validateLoginForm()) {
    getData().then( (result) => {
      if (!result.flag)
        document.getElementById('submit_error').innerHTML = 'Failed' ;
      else {
        document.getElementById('customer_id').value = result.custId ;
        document.getElementById('is_active').value = result.isActive ;
        document.getElementById('login_form').submit() ;
      }
    }) ;
  }
}