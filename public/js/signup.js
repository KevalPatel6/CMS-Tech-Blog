const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#login-user');
    const password = document.querySelector('#login-pass');
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ user_name: username.value.trim(), password: password.value.trim()}),
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