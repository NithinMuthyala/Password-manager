import './index.css'

const PasswordItem = props => {
  const {eachItem, checkboxstatus, onDeleteClicked} = props
  const {id, password, website, username} = eachItem

  const deleteClicked = () => {
    onDeleteClicked(id)
  }

  const getpasswordtext = () => {
    if (checkboxstatus) {
      return <p className="text">{password}</p>
    }
    return (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="stars-image"
      />
    )
  }
  return (
    <li className="item">
      <div className="letter-container">
        <p>N</p>
      </div>
      <div className="text-delete-container">
        <div className="text-container">
          <p className="text">{website}</p>
          <p className="text">{username}</p>
          {getpasswordtext()}
        </div>
        <button type="button" data-testid="delete" onClick={deleteClicked}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
