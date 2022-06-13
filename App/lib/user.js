export default class User {
  profile = null;
  token = null;
  loggedIn = false;
  redirect = () => { };

  constructor(account, funcRedirect) {
    //this.profile = account.user;
    // console.log(account, "account---------===========")

    for (let key in account.user) {
      this[key] = account.user[key];
    }

    this.token = account.token;
    this.loggedIn = account.loggedIn;
    // this.redirect = funcRedirect;
  }

  isUser = (id) => {
    return this.id == id;
  };

  isInRole = (roles) => {
    // console.log(roles, "this.roles=======", this.roles);
    if (!roles || !this.roles) return false;
    roles = roles.split("|");
    for (let role of roles) {
      if (this.roles.any((r) => r.name == role && r.status == 1)) return true;
    }
    return false;
  };

  hasCap = (caps) => {
    if (this.isInRole("Administrators")) return true;

    if (!caps || !this.caps) return false;
    // console.log(caps, "caps", this.caps);
    caps = caps.split(/\||,|;/);

    for (let cap of caps) {
      let cap1 = "Branch" + "." + cap;
      let cap2 = "Branch0." + cap;

      if (this.caps.indexOf(cap1) > -1 || this.caps.indexOf(cap2) > -1) return true;
    }


    return false;
  };

  can = (action, entry) => {
    entry = entry || {};

    if (this.isInRole("Administrators")) return true;

    let ok = this.hasCap(action);

    switch (action) {
      case "SomeAction1":
        //check it
        ok = true;
        break;
      case "SomeAction2":
        //check it
        ok = false;
        break;
    }

    return ok;
  };
}
