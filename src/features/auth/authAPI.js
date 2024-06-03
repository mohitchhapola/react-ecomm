export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      
      // Store user authentication data in local storage upon successful creation
      localStorage.setItem('authData', JSON.stringify(data));

      // Resolve with the user data
      resolve({ data });
    } catch (error) {
      reject({ message: 'An error occurred while creating the user' });
    }
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    //  TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}


// Function to check user credentials
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const email = loginInfo.email;
      const password = loginInfo.password;
      const response = await fetch('http://localhost:8080/users?email=' + email);
      const data = await response.json();
      
      if (data.length && password === data[0].password) {
        // If credentials match, resolve with user data
        resolve({ data: data[0] });
      } else {
        // If no user found or credentials are incorrect, reject
        reject({ message: 'Wrong credentials' });
      }
    } catch (error) {
      // If an error occurs, reject with error message
      reject({ message: 'An error occurred while checking user credentials' });
    }
  });
}

// Auto-login function using data from local storage

