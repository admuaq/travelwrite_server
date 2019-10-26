class User {
  constructor (name, email, password, settings) {
    this.name = name.toLowerCase()
    this.email = email
    this._password = password
    this._settings = settings
  }
}

module.exports = User
