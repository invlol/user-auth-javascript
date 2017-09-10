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
    this.sessions.forEach((session, i) => {
      if (session === user) {
        this.sessions[i] = null;
      }
    });
    this.sessions = this.sessions.filter(session => session !== null);
  }
  
  // Checks if user exists
  userExists(user) {
    // Temp variable for storing the user if found
    let temp = '';
    for (let i of this.users) {
      if (i === user) {
        temp = user;
      }
    }
    let exists = (temp !== '' && temp === user);
    return exists;
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
    let index = this.idx(user, this.users);
    this.users[index] = null;
    this.passwords[index] = null;
    this.users = this.users.filter(user => user !== null);
    this.passwords = this.passwords.filter(password => password !== null);
  }
  
  checkPassword(user, password) {
    let index = this.idx(user, this.users);
    let passwordCorrect = this.passwords[index] === password;
    return passwordCorrect;
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
    
    if (this.passwords[index] === oldPassword) {
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
  
  // Gets index of an element in an array
  idx(element, array) {
    let cont=0;
    for (let i of array) {
      if (i === element) {
        return cont;
      }
      cont += 1;
    }
    return cont;
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
/*login.login('user3', 'pass5');
login.logout('user4');
login.logout('user3');*/