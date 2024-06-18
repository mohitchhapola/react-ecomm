export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/api/user', {
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

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("logindara",data)
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/api/user/update/'+update.id, {
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
export function login(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      // const email = loginInfo.email;
      // const password = loginInfo.password;
      const response = await fetch('http://localhost:8080/api/user/check');
      
      
      if (response.ok) {
        // If credentials match, resolve with user data
        const data = await response.json();
        resolve({ data });
      } else {
        const error  = await response.text()
        // If no user found or credentials are incorrect, reject
        reject(error)
      }
    } catch (error) {
      // If an error occurs, reject with error message
      reject({ message: 'An error occurred while checking user credentials' });
    }
  });
}

// Auto-login function using data from local storage
export function Signout(userId){
  return new Promise (async(resolve)=>{


    resolve({data:'success'})
  })
}
