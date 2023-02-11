import React, {useState} from 'react'
import Vector from "../images/Prev-logo.png"
import { ResumeBuilder } from "../components/ResumeBuilder"
import { useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../context'
import '../css/secondPage.css'

import {showIcon} from "../functions/showIcon"



export const ResumeSecondPage = () => {


    // navigations ************** 
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
            "experiences": []
        })
        navigate('/')
    }

    const toFirstPage = (e) => {
        e.preventDefault()
        navigate('/first_page')
    }
    // navigations ************** ^


    const { setFormData, formData} = useGlobalContext()
    const {experiences} = formData

    // errors array from local storage
    let errors;
    if (JSON.parse(localStorage.getItem(('experiences-errors')))) {
        errors = JSON.parse(localStorage.getItem(('experiences-errors')))
    } else {
        errors = [{
            positionErr: null,
            employerErr: null,
            start_dateErr: null,
            due_dateErr: null,
            descriptionErr: null
        }]
    }
    const [errorsArr, setErrorsArr] = useState(errors)
    // errors array from local storage

    // default experience array
    let defaultArr;
    if (experiences.length < 1) {
        defaultArr = [
        {
            "position": "",
            "employer": "",
            "start_date": "",
            "due_date": "",
            "description": ""
        }
        ]
    } else {
        defaultArr = [...experiences]
    }
    const [experienceArray, setExperienceArray] = useState(defaultArr)
    // default experience array


    const addField = (e) => {
    e.preventDefault()
    
    setExperienceArray((prev) => {
      return ([...prev, {
        "position": "",
        "employer": "",
        "start_date": "",
        "due_date": "",
        "description": ""
      }])
    })

    setErrorsArr((prev) => {
        return ([...prev, {
        positionErr: null,
        employerErr: null,
        start_dateErr: null,
        due_dateErr: null,
        descriptionErr: null
      }])
    })
  }

    
    const [formValidArr, setFormValidArr] = useState([])
    const handleChangeInput = (index, event) => {
        const name = event.target.name
        const value = event.target.value

        let data = [...experienceArray]

        data[index][name] = value

        setFormData((prev) => {
        return (
            {...prev, experiences: [...experienceArray]}
        )
        })
        
        localStorage.setItem('experiences', [JSON.stringify(experienceArray)])
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        experienceArray.forEach((experience, index) => {
        const {position, employer, start_date, due_date, description} = experience
        const valid = Object.values(experience)

        const validOtherForms = valid.every((str) => str === "")


        if (index === 0 || !validOtherForms) {

            if (position.trim().length < 2) {
            let newArr = [...errorsArr]
            newArr[index].positionErr = true
            setErrorsArr(newArr)
            } else {
            let newArr = [...errorsArr]
            newArr[index].positionErr = false
            setErrorsArr(newArr)
            }

            if (employer.trim().length < 2) {
            let newArr = [...errorsArr]
            newArr[index].employerErr = true
            setErrorsArr(newArr)
            } else {
            let newArr = [...errorsArr]
            newArr[index].employerErr = false
            setErrorsArr(newArr)
            }
            
            if (!start_date) {
            let newArr = [...errorsArr]
            newArr[index].start_dateErr = true
            setErrorsArr(newArr)
            } else {
            let newArr = [...errorsArr]
            newArr[index].start_dateErr = false
            setErrorsArr(newArr)
            }
            
            if (!due_date) {
            let newArr = [...errorsArr]
            newArr[index].due_dateErr = true
            setErrorsArr(newArr)
            } else {
            let newArr = [...errorsArr]
            newArr[index].due_dateErr = false
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
                positionErr: false,
                employerErr: false,
                start_dateErr: false,
                due_dateErr: false,
                descriptionErr: false
            }
            setErrorsArr(newArr)
            localStorage.setItem('experiences-errors', JSON.stringify(errorsArr))
        }
      })
      let validArray = []

      for (let i = 0; i < errorsArr.length; i++) {
       const objToArray = Object.values(errorsArr[i])
           for (let j = 0; j < objToArray.length; j++) {
           validArray.push(objToArray[j])
          }
        }

        setFormValidArr([...validArray])

    }

    // add errors to local storage
    React.useEffect(() => {
      localStorage.setItem('experiences-errors', JSON.stringify(errorsArr))
  }, [errorsArr])

  // navigate
  React.useEffect(() => {
    if (!formValidArr.includes(true) && !formValidArr.includes(null) && formValidArr.length > 0) {

      // filter data not to include empty values
      let validData = [...experiences]
      validData = validData.filter(item => item.position !== "")
      localStorage.setItem('experiences', JSON.stringify(validData))
      
      navigate('/third_page')
    } 

  }, [formValidArr, navigate, experiences, setExperienceArray])



  
  return (
    <div className='main-page'>
      <section className='single-part-resume side-paddings bg-dark-white'>
        <header>
          <div>
              <img src={Vector} alt="vector" onClick={ToLandingPage}/>
          </div>
          <div className='info'>
            <h1>გამოცდილება</h1>
            <h2>2/3</h2>
          </div>
        </header>
        <form className='second-page-form'>
          {experienceArray && experienceArray.map((form, index) => {

            const {position, employer, start_date, due_date, description} = form

            return (
              <div key={index} className="form-container">
                <div className='form-controller grit-item width-100'>
                    <label htmlFor='position' >თანამდებობა</label>
                    <input type="text" name='position' id="position" placeholder='თანამდებობა' className={`${errorsArr[index] && errorsArr[index].positionErr && "error-input"} width-100`} onChange={(event) => handleChangeInput(index, event)} value={position}/>
                    {showIcon(errorsArr[index].positionErr)}
                    <p className='alert'>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div className='form-controller grit-item width-100'>
                    <label htmlFor='employer' >დამსაქმებელი</label>
                    <input type="text" name='employer' id="employer" placeholder='დამსაქმებელი' className={`${errorsArr[index] && errorsArr[index].employerErr && "error-input"} width-100`} onChange={(event) => handleChangeInput(index, event)} value={employer}/>
                    {showIcon(errorsArr[index].employerErr)}
                    <p className='alert'>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div className='two-input-container'>
                  <div className='form-controller'>
                      <label htmlFor='start_date' >დაწყების რიცხვი</label>
                      <input type="date" name='start_date' id="start_date" placeholder='მუმლაძე' onChange={(event) => handleChangeInput(index, event)} value={start_date} className={`${errorsArr[index] && errorsArr[index].start_dateErr && "error-input"}`}/>
                      {showIcon(errorsArr[index].start_dateErr)}
                      <p className='alert'></p>
                  </div>
                  <div className='form-controller'>
                      <label htmlFor='due_date' >დამთავრების რიცხვი</label>
                      <input type="date" name='due_date' id="due_date" placeholder='მუმლაძე' onChange={(event) => handleChangeInput(index, event)} value={due_date} className={`${errorsArr[index] && errorsArr[index].due_dateErr && "error-input"}`}/>
                      {showIcon(errorsArr[index].due_dateErr)}
                      <p className='alert'></p>
                  </div>
                </div>
                <div className='form-controller grit-item'>
                    <label htmlFor='description' >აღწერა</label>
                    <textarea style={{width: "600px", maxWidth: "600px"}}  id='description' name='description' type="text" placeholder='როლი თანამდებობაზე და ზოგადი აღწერა' onChange={(event) => handleChangeInput(index, event)} value={description} className={`${errorsArr[index] && errorsArr[index].descriptionErr && "error-input"}`}/>
                    {showIcon(errorsArr[index].descriptionErr)}
                </div>
              </div>
            )
          })}
          <div className='add-experience-btn'>
              <button className='bg-blue border-radius white-font' onClick={addField}>მეტი გამოცდილების დამატება</button>
          </div>
          <div className='button-container two-input-container'>
            <button  className='bg-dark-blue border-radius white-font' onClick={toFirstPage}>უკან</button>
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





