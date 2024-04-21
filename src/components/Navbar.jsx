import { FaGithub } from "react-icons/fa";

// the navbar component
function Navbar() {
    return (
        <div className="nav-bar">
            <FaGithub className="github-icon"/>
            <h2 className="mine">Nnamuka01 Github.</h2>
        </div>
    )
}

export default Navbar;