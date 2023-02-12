import React, {useContext} from 'react'

const AppContext = React.createContext()



const AppProvider = ({children}) => {


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

    // experiences from local storage
    let educations;
    if (JSON.parse(localStorage.getItem(('educations'))) === null) {
        educations = [
            {
              "institute": "",
              "degree": "",
              "due_date": "",
              "description": "",
              "degree_id": ""
            }
        ]
    } else {
        educations = JSON.parse(localStorage.getItem(('educations')))
    }


    // data from local storage
    let data;
    if (JSON.parse(localStorage.getItem("form-data"))) {
        data = JSON.parse(localStorage.getItem("form-data"))
    } else {
        data = {
            "name": "",
            "surname": "",
            "email": "",
            "phone_number": "",
            "image": image,
            "about_me": "",
            "experiences": [...experiences],
            "educations": [...educations]
        }
    }

    
    const [formData, setFormData] = React.useState(data)
  
    React.useEffect(() => {
      setFormData(prev => {
        return {
            ...prev,
            image: image,
        }
      })
    }, [image])



  React.useEffect(() => {
      localStorage.setItem('form-data', JSON.stringify(formData))
  }, [formData])


    
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