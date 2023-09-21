import { useNavigate } from "react-router-dom"
import "./navigation.css"
import logo from "../assets/download.png"

export default function Navigation(props) {

    const Navigate = useNavigate()
    function handleLogout(){
        sessionStorage.clear()
        Navigate('/')
    }

    return (
        <>
            <div id="mySidebar" className="sidebar">
                <img src= {logo} />
                <a href="#">Dashboard</a>
                <a href="#">Timesheet</a>
                <a href="#">Projects</a>
                <a href="#">Leave</a>
                <a href="#">Work from home</a>
                <a href="#">Survey</a>
                <a href="#">Service Desk</a>
                <a href="#">Form</a>
                <a href="#">Travel</a>
                <a href="#">Expenses</a>
                <a href="#">Settings</a>
                <a href="#">Learning & Development</a>

                <div className="bottom">
                    <div className="line"></div>

                    <p className="username">
                        {props.name}
                    </p>
                    <div className="signin" onClick={handleLogout}>
                        <button className="butn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg></button>
                    </div>
                </div>
            </div>
        </>

    )
}