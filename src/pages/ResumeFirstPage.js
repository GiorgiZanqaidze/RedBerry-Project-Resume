import React from 'react'
import Vector from "../images/Prev-logo.png"
import { ResumeBuilder } from "../components/ResumeBuilder"
import { useNavigate } from "react-router-dom";
import '../css/firstPage.css'
import { useGlobalContext } from '../context'
import "../css/app.css"

export const ResumeFirstPage = () => {

    const {formData, setFormData} = useGlobalContext()
    const {name, surname, email, phone_number, about_me, image} = formData
    const navigate = useNavigate()

    const [errorsObj, setErrorsObj] = React.useState(
        {
        name: null,
        surname: null,
        image: null,
        email: null,
        phone_number: null
        }
    )
 

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


     const handleChange = (e) => {
      const name = e.currentTarget.name
      let value = e.currentTarget.value

      // if input type is file
      if (name === "image") {
          const fileUrl = e.target.files[0];
          // setImage2(fileUrl)
          
          const fr = new FileReader()
          console.log(fileUrl)

          // var data=(reader.result).split(',')[1];
          // var binaryBlob = atob(data);
          // console.log('Encoded Binary File String:', binaryBlob);
          

          // console.log(JSON.parse(localStorage.getItem(('image-file'))))
          localStorage.setItem("image-name", fileUrl.name)

          fr.addEventListener('load', () => {
            const url = fr.result
            localStorage.setItem('recent-image', url)

            value = url
          })
          
          fr.readAsDataURL(fileUrl)
          value = URL.createObjectURL(fileUrl)

      }   
  
      setFormData((prev) => {
          return {
              ...prev,
              [name]: value
          }
      })
  }
  



  return (
    <div className='main-page'>
      <section className='single-part-resume side-paddings bg-dark-white'>
        <header>
          <div>
              <img src={Vector} alt="vector" onClick={() => ToLandingPage(navigate('/'))}/>
          </div>
          <div className='info'>
            <h1>პირადი ინფო</h1>
            <h2>1/3</h2>
          </div>
        </header>
        <form className='form-container' >
          <div className='two-input-container'>
            <div className='form-controller name'>
                <label htmlFor='name'>სახელი</label>
                <input type="text" name='name' id="name" placeholder='ანზორ' onChange={handleChange} value={name} className={`${errorsObj.name && "error-input"}`} />
                <p className='alert'>მინიმუმ 2 ასო, ქართული ასოები</p>
            </div>
            <div className='form-controller last-name'>
                <label htmlFor='surname' >გვარი</label>
                <input type="text" name='surname' id="surname" placeholder='მუმლაძე' onChange={handleChange} value={surname} className={`${errorsObj.surname && "error-input"}`}/>
                <p className='alert'>მინიმუმ 2 ასო, ქართული ასოები</p>
            </div>
          </div>
          <div className='form-controller grit-item '>
              <label htmlFor='image'className='file-control' >პირადი ფოტოს ატვირთვა <span className='bg-blue white-font' >ატვირთვა</span></label>
              <input type="file" name='image' id="image" accept='image/png, image/jpeg' placeholder='მუმლაძე' style={{display:"none"}}  onChange={handleChange}/>
          </div>
          <div className='form-controller grit-item width-100'>
              <label htmlFor='about_me' >ჩემ შესახებ (არასავალდებულო)</label>
              <textarea id='about_me' name='about_me' type="text" placeholder='ზოგადი ინფო შენ შესახებ' className='width-100' onChange={handleChange} value={about_me}/>
          </div>
          <div className='form-controller grit-item width-100'>
              <label htmlFor='email' >ელ.ფოსტა</label>
              <input type="text" name='email' id="email" placeholder='anzor666@redberry.ge' onChange={handleChange} value={email} className={`${errorsObj.email && "error-input"} width-100 `}/>
              <p className='alert'>უნდა მთავრდებოდეს @redberry.ge-ით</p>
          </div>
          <div className='form-controller grit-item width-100'>
              <label htmlFor='phone_number' >მობილურის ნომერი</label>
              <input type="text" name='phone_number' id="phone_number" placeholder='+995 551 12 34 56' onChange={handleChange} value={phone_number} className={`${errorsObj.phone_number && "error-input"} width-100 `}/>
              <p className='alert'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>
          </div>
          <div className='button-container'>
            <button className='bg-dark-blue border-radius white-font' onClick={handleSubmit}>შემდეგი</button>
          </div>
        </form>
      </section>
      <section className='resume-builder side-paddings bg-white'>
        <ResumeBuilder data={formData}/>
      </section>
    </div>
  )
}

