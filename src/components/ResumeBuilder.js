import React from 'react'
import "../css/resumeBuilder.css"
import Logo1 from '../images/@-logo.png'
import Logo2 from '../images/phone-logo.png'
import LogoResume from '../images/LOGO-resume.png'
import { useGlobalContext } from '../context'
import {formatPhoneNumber} from '../functions/formatPhoneNumber'

export const ResumeBuilder = () => {
  const {formData} = useGlobalContext()
  
  const {name, surname, email, phone_number, image, about_me, experiences, educations} = formData

  const privateInfoBottomLine = name || surname || email || phone_number || image || about_me ? true : false





  // console.log(val)
  // console.log(val.split('').filter(str => str !== " ").join(''))

  return (
    <div className='center-div'>
      <section className={`private-info ${privateInfoBottomLine ? "bottom-line" : ""}`}>
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
              {formatPhoneNumber(phone_number)}
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
            <img src={image} alt="profile" />
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
  )
}

