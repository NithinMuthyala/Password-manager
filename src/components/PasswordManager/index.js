import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    password: '',
    username: '',
    passwordlist: [],
    checkboxstatus: false,
    searchText: '',
  }

  searchInput = event => {
    console.log(event.target.value)
    const {searchText} = this.state
    this.setState({searchText: event.target.value})
    // const filteredpasswords = passwordlist.filter(eachPassword =>
    //   eachPassword.website.toLowerCase().includes(searchText.toLowerCase()),
    // )
    // this.setState({passwordlist: filteredpasswords})

    this.setState(prevState => ({
      passwordlist: [
        ...prevState.passwordlist.filter(eachPassw =>
          eachPassw.website.toLowerCase().includes(searchText.toLowerCase()),
        ),
      ],
    }))
  }

  websiteName = event => {
    this.setState({website: event.target.value})
  }

  userName = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  submitClicked = event => {
    event.preventDefault()
    const {website, password, username, passwordlist} = this.state
    const passDetails = {
      id: v4(),
      website,
      password,
      username,
    }

    this.setState(prevState => ({
      passwordlist: [...prevState.passwordlist, passDetails],
      website: '',
      password: '',
      username: '',
    }))

    console.log(passwordlist)
  }

  checkboxClicked = () => {
    this.setState(prevState => ({checkboxstatus: !prevState.checkboxstatus}))
  }

  onDeleteClicked = id => {
    const {passwordlist} = this.state
    const filteredpss = passwordlist.filter(eachPass => eachPass.id !== id)
    this.setState({passwordlist: filteredpss})
  }

  getImage = () => (
    <div className="no-pass-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
        alt="no passwords"
        className="nopasswords-image"
      />
      <p className="nopass-text">No Passwords</p>
    </div>
  )

  getComponennt = () => {
    const {checkboxstatus, passwordlist, searchText} = this.state

    const filteredItems = passwordlist.filter(eachpass =>
      eachpass.website.toLowerCase().includes(searchText.toLowerCase()),
    )

    return (
      <ul>
        {filteredItems.map(eachItem => (
          <PasswordItem
            key={eachItem.id}
            checkboxstatus={checkboxstatus}
            eachItem={eachItem}
            onDeleteClicked={this.onDeleteClicked}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      website,
      password,
      username,
      passwordlist,
      checkboxstatus,
      searchText,
    } = this.state

    const filtered = passwordlist.filter(eachPass =>
      eachPass.website.toLowerCase().includes(searchText.toLowerCase()),
    )

    return (
      <div className="bg-color-container">
        <div className="cards-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
              alt="app logo"
              className="logo"
            />
          </div>
          <div className="form-image-container">
            <div className="small-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="smaller-image"
              />
            </div>

            <form className="form-container" onSubmit={this.submitClicked}>
              <div className="addnewpass">
                <h3>Add New Password</h3>
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                  className="image"
                />
                <input
                  type="text"
                  className="input-tag"
                  placeholder="Enter Website"
                  onChange={this.websiteName}
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="image"
                />
                <input
                  type="text"
                  className="input-tag"
                  placeholder="Enter Username"
                  onChange={this.userName}
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="image"
                />
                <input
                  type="password"
                  className="input-tag"
                  placeholder="Enter Password"
                  onChange={this.password}
                  value={password}
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="btn-element">
                  Add
                </button>
              </div>
            </form>
            <div className="large-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="passwordmanager"
                className="larger-image"
              />
            </div>
          </div>
        </div>

        {/* bottom Container */}

        <div className="background-footer-container">
          <div className="search-password-count-container">
            <div className="your-pass-container">
              <h3 className="password-heading">Your Passwords</h3>
              <p className="passlength">{filtered.length}</p>
            </div>

            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="search"
                className="search-tag"
                value={searchText}
                onChange={this.searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              value={checkboxstatus}
              onChange={this.checkboxClicked}
            />
            <label htmlFor="checkbox">Show Passwords</label>
          </div>

          {filtered.length === 0
            ? this.getImage()
            : this.getComponennt(filtered)}

          {/* <ul>
            {filtered.map(eachItem => (
              <PasswordItem
                key={eachItem.id}
                checkboxstatus={checkboxstatus}
                eachItem={eachItem}
                onDeleteClicked={this.onDeleteClicked}
              />
            ))}
          </ul> */}
        </div>
      </div>
    )
  }
}

export default PasswordManager
