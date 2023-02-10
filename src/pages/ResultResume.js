import React from 'react'
import Vector from "../images/Prev-logo.png"
import { ResumeBuilder } from '../components/ResumeBuilder'
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../context'
import  CloseBtn  from "../images/Vector.png"

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
            <ResumeBuilder />
        </div>
    </>
  )
}

