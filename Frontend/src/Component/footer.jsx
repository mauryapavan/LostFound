

import {  faGithub, faInstagramSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import react from "react"

const Footer = () => {
    return (
        <div className=" flex flex-col sm:flex-row   mt-3 p-3 sm:mt-5 sm:p-5 " style={{color:"whitesmoke"}}>
            <div className="m-2 p-2 sm:mt-5 sm:p-5  sm:w-1/2 justify-center flex flex-col items-center">
                <img className="myphoto w-sm h-sm" src="https://res.cloudinary.com/dop3yq9to/image/upload/v1753532469/Edusphere/rnyognn68qnpnx9rh7b2.jpg" alt="" />
                <h4 className="mt-5 text-2xl">maurya pawan</h4>
                <div className="flex">
                    <a href="https://www.instagram.com/mauryapavan662/" className="m-2 text-2xl contact  transition duration-300 hover:scale-110 hover:-translate-y-1 "><FontAwesomeIcon icon={faInstagramSquare} /></a>
                    
                    <a href="www.linkedin.com/in/pawan-maurya-494455339" className="m-2 text-2xl contact  transition duration-300 hover:scale-110 hover:-translate-y-1 "><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href="https://github.com/mauryapavan?tab=repositories" className="m-2 text-2xl contact  transition duration-300 hover:scale-110 hover:-translate-y-1 "><FontAwesomeIcon icon={faGithub} /></a>

                </div>
            </div>
            <div className="m-2 p-2 sm:m-5 sm:p-5 sm:w-1/2 text-center">
                <div>
                    <p className="text-sm sm:text-base">
                       The Lost & Found is a web 
                       platform designed to help people report, search, 
                       and recover lost items in their community. Users
                        can create accounts to search proximitly location whare lost item or post details  about items they 
                        have  found, including images, descriptions, 
                        and location coordinates. The system matches lost and 
                        found posts using location proximity, 
                        making it easier for owners to reconnect with their belongings.
                    </p><br />
                    <a href="" className="policy">Terms & Condition</a>
                    <a href="" className="policy"> | Privacy & Policy</a>

                </div>
            </div>
        </div>
    )
}

export default Footer
