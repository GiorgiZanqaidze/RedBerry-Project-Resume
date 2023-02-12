
import ErrorIcon from "../images/error-icon.png"
import ValidIcon from "../images/valid-icon.png"

export const showIcon = (value) => {
    if (value === true) {
      return <img src={ErrorIcon} alt='error' className="show-error-icon error-icon" />
    } else if (value === false) {
      return <img src={ValidIcon} alt='error' className="show-error-icon error-icon" />
    } else if (value === null) {
      return 
    }
  }