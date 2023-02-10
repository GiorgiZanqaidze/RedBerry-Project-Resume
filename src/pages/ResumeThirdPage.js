import React, {useState} from 'react'
import Vector from "../images/Prev-logo.png"
import { ResumeBuilder } from "../components/ResumeBuilder"
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import axios from 'axios';




export const ResumeThirdPage = () => {
  

  

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