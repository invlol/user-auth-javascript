'use strict';

// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
  Array.prototype.indexOf= function(find, i /*opt*/) {
    if (i===undefined) i= 0;
    if (i<0) i+= this.length;
    if (i<0) i= 0;
    for (let n= this.length; i<n; i++)
      if (i in this && this[i]===find)
        return i;
    return -1;
  };
}

// This class is used for logins
class Login {
  constructor(hash) {
    this.sessions = [];
    this.users = [];
    this.passwords = [];
    Object.keys(hash).map(k => {
      this.users.push(k);
      this.passwords.push(hash[k])
    });
  }
  
  logout(user) {
    let index = this.users.indexOf(user);
    if(index !== -1) {
      // filter affect immutable and could be slower than splice, test needed
      // keep filter for now
      this.sessions = this.sessions.filter(session => session !== user);
    }
  }
  
  // Checks if user exists
  userExists(user) {
    let index = this.users.indexOf(user);
    return index !== -1;
  }
  
  // Register user
  registerUser(user, password) {
    // register user only if username does not exist
    if (this.users.indexOf(user) === -1) {
      let lastIndex = this.users.length;
      this.users[lastIndex] = user;
      this.passwords[lastIndex] = password;
    }
  }
  
  removeUser(user) {
    let index = this.users.indexOf(user);
    if(index !== -1) {
      this.users[index] = null;
      this.passwords[index] = null;
      this.users = this.users.filter(user => user !== null);
      this.passwords = this.passwords.filter(password => password !== null);
    }
  }
  
  checkPassword(user, password) {
    let index = this.users.indexOf(user);
    if(index === -1) {
      return false;
    }
    
    return this.passwords[index] === password;
  }
  
  updatePassword(user, oldPassword, newPassword) {
    // if password are the same don't do anything
    if(oldPassword === newPassword) {
      return false;
    }
    // check if the user exists
    let index = this.users.indexOf(user);
    if(index === -1) {
      return false;
    }
    
    if (this.checkPassword(user, oldPassword)) {
      this.passwords[index] = newPassword;
      return true;
    }
    
    return false;
  }
  
  login(user, password) {
    let index = this.users.indexOf(user);
    if(index !== -1) {
      if (this.passwords[index] === password) {
        this.sessions.push(user);
      }
    }
  }
}

let registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3'
};

let login = new Login(registeredUsers);

login.registerUser('user4', 'pass4');
login.login('user4', 'pass4');
login.updatePassword('user3', 'pass3', 'pass5');
login.login('user3', 'pass5');
login.logout('user4');
login.logout('user3');