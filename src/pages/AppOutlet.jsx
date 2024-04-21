import { Outlet } from "react-router-dom";
 // I rendered the Outlet component also from the reac-router-dom in a file I named AppOutlet which made it possible to render details in the single 
 // repo pages according to their ids in order to implement the nested routes

// creating an app outlet component
function AppOutlet() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AppOutlet;