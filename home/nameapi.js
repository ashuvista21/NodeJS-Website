// Define the API URL

let currentURL = new URL(window.location.href) ;
let custId = currentURL.pathname.slice(currentURL.pathname.lastIndexOf('/')) ;
let apiLink = currentURL.origin + '/data/customer' + custId ;

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
      document.getElementById('customer_name').innerHTML = data.firstname ;
    else
      document.getElementById('customer_name').innerHTML = data.error ;
  })
  .catch(error => {
    console.error('Error:', error);
  });