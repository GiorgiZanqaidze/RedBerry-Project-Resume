import React, {useState} from 'react'
import Vector from "../images/Prev-logo.png"
import { ResumeBuilder } from "../components/ResumeBuilder"
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import axios from 'axios';