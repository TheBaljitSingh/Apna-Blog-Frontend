import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import Nav from "./Nav";
import Baljit from "../src/Baljit_maskup.jpg";


// hello for test
export default function About(props){

    return(
        <div>
        <div>
        <Nav/>

          <div className='ml-52 mt-8 w-3/4'>
            <h1 className='text-2xl font-medium'>{props.title}</h1>

          </div>

          <div className="flex flex-row w-5/3 ">
            <div className="ml-52 mr-48 mt-8 font-medium ">
              <p className="text-wrap">Hi, My Name is Baljit Singh.i'm a Full Stack Web Developer. persuing my engineering in Information and Technology.</p>
              <p>Currently exploring my Technical Skills to solve the Problems which we are facing in our daily life.</p>
              <p>Feel free to contact me for any collaboration for solving a particular problem.I also worked with Tech projects of my friends. for more checkout my Linkdin </p>
              <div className=" flex-row inline-flex mt-2">
                  <div className="flex-row text-sky-700" ><p>thebaljitsingh - </p></div>
                  <div className=""> <a className="hover:to-blue-500"  href="https://www.linkedin.com/in/thebaljitsingh/"><  FaLinkedin size={24}  /></a></div> 
                  
              </div>
              <p> </p>
            </div>
            <div className="w-1/2 mr-12 ">
                <img className="rounded-md"  width={280} src={Baljit} alt="" />

            </div>
          </div>
          


          {/* <footer className='w-screen bg-teal-400 h-12 fixed bottom-0 left-0 flex justify-center items-center '>
          <p className='flex justify-center '>Baljit Singh</p>
        </footer> */}
        </div>
    </div>
    )
   
}

