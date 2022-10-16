// Use to decode a token and get the user's information out of it
import decode from "jwt-decode";

// Create a new class to instantiate for a user
class AuthService {
  // Get user data
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return !!token && !this.isTokenExpired(token) ? true : false;
  }

  // Check if token is expired
  isTokenExpired(token) {
    try {
      // Decode the token to get its expiration time (that was set by the server)
      const decoded = decode(token);
      // If the expiration time is less than the current time (in seconds) then the token is expired, return `true`
      // If token hasn't passed its expiration time, return `false`
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("id_token");
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Retrieve the user's token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Save the user's token to localStorage
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Remove the user's token and profile data from localStorage
  logout() {
    localStorage.removeItem("id_token");
    // Reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
