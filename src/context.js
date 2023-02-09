import React, {useContext} from 'react'

const AppContext = React.createContext()



const AppProvider = ({children}) => {
    const [formData, setFormData] = React.useState([])
  

    
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