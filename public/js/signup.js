const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#login-user').value.trim();
    const password = document.querySelector('#login-pass').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ user_name: username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector('button').addEventListener('click', signupFormHandler)