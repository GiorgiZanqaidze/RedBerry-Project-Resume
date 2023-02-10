import React, {useContext} from 'react'

const AppContext = React.createContext()



const AppProvider = ({children}) => {
    const [formData, setFormData] = React.useState([])


    // image url from local storage
    let image;
    if (localStorage.getItem("recent-image")) {
    image = localStorage.getItem("recent-image")
    } else {
        image = ""
    }

    // experiences from local storage
    let experiences;
    if (JSON.parse(localStorage.getItem(('experiences'))) === null) {
        experiences = [
            {
                "position": "",
                "employer": "",
                "start_date": "",
                "due_date": "",
                "description": ""
            }
        ]
    } else {
        experiences = JSON.parse(localStorage.getItem(('experiences')))
    }

  

    
  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }