import auth0 from 'auth0-js';

// class for handling auth0 redirect and obtaining hash information
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'offthecuff.auth0.com',
    clientID: 'lvr0YInBkYfF4LgAKoKFZ1C1S7ozQ6wz',
    redirectUri: 'http://localhost:3000',
    audience: 'https://offthecuff.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  getParameterByName(name) {
    var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
  
  getAccessToken(){
    return this.getParameterByName('access_token');
  }

  getIdToken() {
    return this.getParameterByName('id_token');
  }

  login(){
    this.auth0.authorize();
  }
}