import React, {useState} from 'react'
import Vector from "../images/Prev-logo.png"
import { ResumeBuilder } from "../components/ResumeBuilder"
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import axios from 'axios';

import {showIcon} from "../functions/showIcon"




export const ResumeThirdPage = () => {

  const experiences = JSON.parse(localStorage.getItem("experiences"))

  
  const { setFormData, formData} = useGlobalContext()
  const {name, surname, email, phone_number, about_me, educations, image} = formData


  const [validImg, setValidImg] = useState(null)

  const imageName = localStorage.getItem('image-name')

    //   navigations **********
    const navigate = useNavigate()
    const ToLandingPage = () => {

        localStorage.clear()
        
        setFormData({
            "name": "",
            "surname": "",
            "email": "",
            "phone_number": "",
            "image": "",
            "about_me": "",
            "experiences": [],
            "educations": []
            })
            navigate('/')
    }

    const toSecondPage = (e) => {
    e.preventDefault()
    navigate('/second_page')
  }
  //   navigations ********** ^^
  
  React.useEffect(() => {
      fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
          let newFile= new File([blob], imageName, { type: "image.jpg" });

          setValidImg(newFile)

        })
    }, [image, imageName])


  let errors;
  if (JSON.parse(localStorage.getItem(('educations-errors')))) {
    errors = JSON.parse(localStorage.getItem(('educations-errors')))
  } else {
    errors = [{
              "instituteErr": null,
              "degreeErr": null,
              "due_dateErr": null,
              "descriptionErr": null,
            }]
  }

  const [errorsArr, setErrorsArr] = useState(errors)

//   initialize default value for educations array
  let defaultArr;
  if (!educations || educations.length < 1) {
    defaultArr = [
      {
        "degree": "",
        "due_date": "",
        "description": "",
        "degree_id": "",
        "institute": ""
      }
    ]
  } else {
    defaultArr = [...educations]
  }
  const [educationsArray, setEducationsArray] = React.useState(defaultArr)



//   add errors and educations 
  const addField = (e) => {
    e.preventDefault()

    setEducationsArray((prev) => {
      return ([...prev, {
        "institute": "",
        "degree": "",
        "due_date": "",
        "description": "",
        "degree_id": ""
      }])
    })

    setErrorsArr((prev) => {
        return ([...prev, {
        "instituteErr": null,
        "degreeErr": null,
        "due_dateErr": null,
        "descriptionErr": null,
      }])
    })
  }



  //   data for options input
  const [optionValues, setOptionValues] = React.useState([])
  React.useEffect(() => {
    const options =  () => {
      axios.get('https://resume.redberryinternship.ge/api/degrees')
      .then(res => {
        setOptionValues(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    options() 
  }, [])


     //   change input on every input changes
    const handleChangeInput = (index, event) => {
        const name = event.target.name
        const value = event.target.value
        let data = [...educationsArray]
        
        if (name === "degree") {
        let id;
        optionValues.forEach((item) => {
            if (item.title === event.target.value) {
            id = item.id
            }
        })
        data[index].degree_id = id
        data[index].degree = value
        } else {
        data[index][name] = value
        }

        setFormData((prev) => {
        return (
            {...prev, educations: [...educationsArray]}
        )
        })
        
        localStorage.setItem('educations', [JSON.stringify(educationsArray)])
    }


    //   handle the submit to validate inputs and set errors
    const handleSubmit = (e) => {
        e.preventDefault()
        
        educations.forEach((education, index) => {
          const { degree, due_date,  description, institute } = education
          const valid = Object.values(education)

          const validOtherForms = valid.every((str) => str === "" || str === undefined) 



          if (index === 0 || !validOtherForms) {

              if (degree === "") {
              let newArr = [...errorsArr]
              newArr[index].degreeErr = true
              setErrorsArr(newArr)
              } else {
              let newArr = [...errorsArr]
              newArr[index].degreeErr = false
              setErrorsArr(newArr)
              }

              if (due_date.length < 2) {
              let newArr = [...errorsArr]
              newArr[index].due_dateErr = true
              setErrorsArr(newArr)
              } else {
              let newArr = [...errorsArr]
              newArr[index].due_dateErr = false
              setErrorsArr(newArr)
              }
              
              if (institute.trim().length < 2) {
              let newArr = [...errorsArr]
              newArr[index].instituteErr = true
              setErrorsArr(newArr)
              } else {
              let newArr = [...errorsArr]
              newArr[index].instituteErr = false
              setErrorsArr(newArr)
              }
              
              if (description.trim().length < 2) {
              let newArr = [...errorsArr]
              newArr[index].descriptionErr = true
              setErrorsArr(newArr)
              } else {
              let newArr = [...errorsArr]
              newArr[index].descriptionErr = false
              setErrorsArr(newArr)
              }
          } else if ((index !== 0 && validOtherForms)) {
              let newArr = [...errorsArr]
              newArr[index] = {
                  "instituteErr": false,
                  "degreeErr": false,
                  "due_dateErr": false,
                  "descriptionErr": false,
                  }
              setErrorsArr(newArr)
              localStorage.setItem('educations-errors', JSON.stringify(errorsArr))
          }
        })

        let validArray = []

        for (let i = 0; i < errorsArr.length; i++) {
        const objToArray = Object.values(errorsArr[i])
            for (let j = 0; j < objToArray.length; j++) {
            validArray.push(objToArray[j])
            }
        }

        
        if (!validArray.includes(true) && !validArray.includes(null) &&  validArray.length > 0) {

            // filter data not to include empty values
            let validEducationData = [...educations]
            validEducationData = validEducationData.filter(item => item.institute !== "")
            localStorage.setItem('educations', JSON.stringify(validEducationData))

            
            
            const postData = async () => {

                try {
                const res = await fetch("https://resume.redberryinternship.ge/api/cvs", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                    },
                    body: JSON.stringify({name, surname, email, phone_number, about_me, experiences, educations: validEducationData, image: validImg})


                })
                const data = await res.json()

                console.log(data)

                } catch(err) {
                console.log(err)

                }
                
            }

            postData()

            
            // navigate('/result_resume')
        }
    }




  
  

  return (
    <div className='main-page'>
      <section className='single-part-resume side-paddings bg-dark-white'>
        <header>
          <div>
            <img src={Vector} alt="vector" onClick={ToLandingPage}/>
          </div>
          <div className='info'>
            <h1>განათლება</h1>
            <h2>3/3</h2>
          </div>
        </header>
        <form className='second-page-form'>
          {educationsArray && educationsArray.map((form, index) => {

            const {institute, degree, due_date, description} = form

            return (
              <div key={index} className="form-container">
                <div className='form-controller grit-item width-100'>
                    <label htmlFor='institute' >სასწავლებელი</label>
                    <input type="text" name='institute' id="institute" placeholder='სასწავლებელი' className={`${errorsArr[index] && errorsArr[index].instituteErr && "error-input"} width-100`} onChange={(event) => handleChangeInput(index, event)} value={institute}/>
                    {showIcon(errorsArr[index].instituteErr)}
                    <p className='alert'>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div className='two-input-container'>
                  <div className='form-controller'>
                   <label htmlFor='degree' >ხარისხი</label>
                    <select name="degree" id="degree" value={degree}  defaultValue={degree} onChange={(event) => handleChangeInput(index, event)}  className={`${errorsArr[index] && errorsArr[index].degreeErr && "error-input"} width-100`}>
                      <option value="" >აირჩიეთ ხარისხი</option>
                      {optionValues.map((option, index) => {
                        return <option value={option.title} key={index} >{option.title}</option>
                      })}
                    </select>
                  </div>
                  <div className='form-controller'>
                      <label htmlFor='due_date' >დამთავრების რიცხვი</label>
                      <input type="date" name='due_date' id="due_date"  onChange={(event) => handleChangeInput(index, event)} value={due_date} className={`${errorsArr[index] && errorsArr[index].due_dateErr && "error-input"} width-100`}/>
                      <p className='alert'></p>
                  </div>
                </div>
                <div className='form-controller grit-item'>
                    <label htmlFor='description' >აღწერა</label>
                    <textarea style={{width: "750px", maxWidth: "750px"}} id='description' name='description' type="text" placeholder='როლი თანამდებობაზე და ზოგადი აღწერა' onChange={(event) => handleChangeInput(index, event)} value={description} className={`${errorsArr[index] && errorsArr[index].descriptionErr && "error-input"}`}/>
                </div>
              </div>
            )
          })}
          <div className='add-experience-btn'>
              <button className='bg-blue border-radius white-font' onClick={addField} >მეტი სასწავლებლის დამატება</button>
          </div>
          <div className='button-container two-input-container'>
            <button className='bg-dark-blue border-radius white-font' onClick={toSecondPage}>უკან</button>
            <button className='bg-dark-blue border-radius white-font' onClick={handleSubmit}>შემდეგი</button>
          </div>
        </form>
      </section>
      <section className='resume-builder side-paddings bg-white'>
        <ResumeBuilder />
      </section>
    </div>
  )
}