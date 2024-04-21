import { Link, useRouteError } from "react-router-dom";

// creating the error page component to implement the error page using useRouteError to achieve this feature.
// Link is used to link one component from the other.
function ErrorPage() {
    const error = useRouteError();
    // console.log(error)

      // Check if it's a 404 error
      if (error.status === 404) {
        return (
            <div className="error-page">
                <h1>404 Not Found</h1>
                <p>The page you searched for does not exist.</p>
                <p>Go to <Link to="/"><b>Home Page</b></Link></p>
            </div>
        );
    }

    const textStatus = error.statusText ? <i>{error.statusText}</i> : null;

    return (
        <div className="error-page">
            <h1>Oops</h1>
             <p>Sorry, an unexpected error has occured</p>
             <p className="error-status">{error.status}</p>
             <p className="error-status">{textStatus}</p>
             <p>Go to <Link to="/"><b>Home Page</b></Link></p>
        </div>
    )
}

export default ErrorPage