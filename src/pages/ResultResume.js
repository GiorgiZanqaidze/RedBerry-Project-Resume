import React from 'react'
import Vector from "../images/Prev-logo.png"
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../context'
import  CloseBtn  from "../images/Vector.png"
import "../css/resumeBuilder.css"
import Logo1 from '../images/@-logo.png'
import Logo2 from '../images/phone-logo.png'
import LogoResume from '../images/LOGO-resume.png'

export const ResultResume = () => {



    const { setFormData } = useGlobalContext()

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

    const [showPopUp, setShowPopUp] = React.useState(false)

    const closePopUp = (e) => {
        setShowPopUp(true)
    }

    const data = JSON.parse(localStorage.getItem('data'))
    
    const {name, surname, phone_number, email, about_me, experiences, educations, image} = data

  return (
    <>
        <div style={{width: "822px", border: "1px solid black", margin: "50px auto", padding: "50px", position:"relative"}} className="result-resume">
            <div>
                <img src={Vector} alt="vector" onClick={ToLandingPage} style={{position: 'absolute', top: "0px", left: "-400px", cursor: "pointer", }}/>
            </div>
            <div className={`pop-up ${showPopUp ? "display-none" : ""}`} >
                <h1>რეზიუმე წარმატებით გაიგზავნა  🎉</h1>
                <div>
                    <img src={CloseBtn} alt="close" onClick={closePopUp}/>
                </div>
            </div>
            <div className='center-div'>
      <section className='private-info  "bottom-line'>
        <div className='info'>
          <h1 className='name-surname red-font'>{`${name} ${surname}`}</h1>
          {email && 
            <p>
              <img src={Logo1} alt="logo1"/>
              {email}
            </p>
          }
          {phone_number &&
            <p>
              <img src={Logo2} alt="logo2"/>
              {phone_number}
            </p>
          }
          {about_me &&
          <>
            <h2 className='red-font'>ჩემ შესახებ</h2>
            <p>{about_me}</p>
          </>
          }
        </div>
        {image && 
          <div className='img-div'>
            <img src={`https://resume.redberryinternship.ge${image}`} alt="profile" />
          </div>
        }
      </section>
      <section className={`experiences ${experiences.length > 2 && "bottom-line"}`}>
        {experiences && experiences.map((experience, index) => {
          const {position, employer, start_date, due_date, description} = experience

          const showFlag = position || employer || start_date || due_date || description ? true : false

          return (
            <div className={`single ${showFlag ? "bottom-line" : ""}`} key={index}>
              {showFlag && <h2 className='red-font'>გამოცდილება</h2>}
              {position ||  employer ? <p>{position}, {employer}</p> : ""}
              {start_date || due_date ? <small>{start_date} - {due_date}</small> : ""}
              {description && <p>{description}</p>}
            </div>
          )
        })}
      </section>
      <section className='educations'>
        {educations && educations.map((education, index) => {
          const { institute, degree, due_date, description } = education

          const showFlag = institute || degree  || due_date || description ? true : false
          return (
            <div className={`single ${showFlag ? "bottom-line" : ""}`} key={index}>
              {showFlag && <h2 className='red-font'>განათლება</h2>}
              {institute ||  degree  ? <p>{institute}, {degree}</p> : ""}
              { due_date ? <small>{due_date}</small> : ""}
              {description && <p>{description}</p>}
            </div>
          )
        })}
      </section>
      <div className='resume-logo-container'>
        <img src={LogoResume} alt="resume-logo"/>
      </div>
    </div>
        </div>
    </>
  )
}

