// Function to check if user is logged in using data from local storage
export function autoLogin() {
    return new Promise((resolve, reject) => {
      try {
        // Check if authentication data exists in local storage
        const authData = localStorage.getItem('authData');
        if (authData) {
          // Parse the authentication data
          const parsedAuthData = JSON.parse(authData);
          // Resolve with the user data
          resolve({ data: parsedAuthData });
        } else {
          // Reject if no authentication data found
          reject({ message: 'No user logged in' });
        }
      } catch (error) {
        // Reject if an error occurs
        reject({ message: 'An error occurred while trying to auto-login' });
      }
    });
  }
  