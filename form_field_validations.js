function validate_username(username) {
	if (username.length == 0)
		document.getElementById('username_error').innerHTML = 'Username is mandatory' ;
	else if(parseInt(username.at(0)).toString() != 'NaN')
		document.getElementById('username_error').innerHTML = 'Username cannot begins with number' ;
	else if(username.length > 20)
		document.getElementById('username_error').innerHTML = 'Username cannot have more than 20 characters' ;
}

function validate_firstname(firstname) {
	if (firstname.length == 0)
		document.getElementById('firstname_error').innerHTML = 'Name is mandatory' ;
	else if(firstname.length > 15)
		document.getElementById('firstname_error').innerHTML = 'Name cannot have more than 15 characters' ;
}

function validate_psw(psw) {
	if (psw.length == 0)
		document.getElementById('psw_error').innerHTML = 'Password is mandatory' ;
	else if(psw.length < 6 || psw.length > 15)
		document.getElementById('psw_error').innerHTML = 'Password should be between 6 to 15 characters' ;
}

function match_psw(repsw) {
	let psw = document.getElementById('psw').value ;
	if (repsw.length == 0)
		document.getElementById('repsw_error').innerHTML = 'Password is mandatory' ;
	else if (psw !== repsw)
		document.getElementById('repsw_error').innerHTML = 'Password not matched' ;
}

function clear_error(element_id) {
	for (let x of element_id)
		document.getElementById(x).innerHTML = '' ;
}

function validateSignupForm()
{
	let error_string = document.getElementById('username_error').innerHTML ;
	error_string += document.getElementById('firstname_error').innerHTML ;
	error_string += document.getElementById('psw_error').innerHTML ;
	error_string += document.getElementById('repsw_error').innerHTML ;

	let firstname = document.getElementById('firstname').value ;
	let username = document.getElementById('username').value ;
	let psw = document.getElementById('psw').value ;
	let repsw = document.getElementById('repsw').value ;
	let email = document.getElementById('email').value ;
	let phone = document.getElementById('phone').value ;

	if (error_string == '' && firstname != '' && username != '' && psw != '' && repsw != '') {
		if (email == '' && phone == '') {
			document.getElementById('submit_error').innerHTML = 'Either email id or phone number should be present' ;
			return false ;
		}
		return true ;
	}
	else
		document.getElementById('submit_error').innerHTML = 'Please input mandatory fields' ;
	return false ;
}

function validateLoginForm() {
	let error_string = document.getElementById('username_error').innerHTML ;
	error_string += document.getElementById('psw_error').innerHTML ;

	let username = document.getElementById('username').value ;
	let password = document.getElementById('password').value ;

	if (error_string == '' && username != '' && password != '') 
		return true ;
	document.getElementById('submit_error').innerHTML = 'Please input mandatory fields' ;
	return false ;
}