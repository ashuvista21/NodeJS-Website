// Define the API URL

let currentURL = new URL(window.location.href) ;
let apiLink = currentURL.origin + '/data' + currentURL.search ;

// Make a GET request
fetch(apiLink)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.error == '')
      document.getElementById('customer_name').innerHTML = data.name ;
    else
      document.getElementById('customer_name').innerHTML = data.error ;
  })
  .catch(error => {
    console.error('Error:', error);
  });