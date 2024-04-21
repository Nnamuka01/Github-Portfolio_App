import { FaRegStar, FaRegEye, FaCodeBranch } from 'react-icons/fa';
import { TbGitFork } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function RepoDetails() {
    const { id } = useParams()
    const [details, setDetails] = useState({})
    const [branch, setBranch] = useState({})
    const [deployment, setDeployment] = useState({})
    const [error, setError] = useState(null)
    
    
  useEffect(() => {
    fetch(`https://api.github.com/repos/nnamuka01/${id}`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Failed to fetch repository details');
      }
     return response.json()})
    .then(data => {
      setDetails(data)
    })
    .catch(error => {
      console.error('Error fetching repository details:', error);
      setError(error.message);
    });
  }, [id]) 

  useEffect(() => {
    fetch(`https://api.github.com/repos/nnamuka01/${id}/branches`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Failed to fetch branches');
      }
      return response.json()})
    .then(data => {
      setBranch(data)
    })
    .catch(error => {
      console.error('Error fetching branches:', error);
      setError(error.message);
    });
  }, [id])

  useEffect(() => {
    fetch(`https://api.github.com/repos/nnamuka01/${id}/deployments`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Failed to fetch deployments');
      }
      return response.json()})
    .then(data => {
      setDeployment(data)
    })
    .catch(error => {
      console.error('Error fetching deployments', error);
      setError(error.message);
    });
  }, [id]) 

  if (error) {
    return (
        <div>
            <p>Error: {error}</p>
            <p>Please try again later.</p>
        </div>
    );
}

    return (
        <div id="repodetail">
            <div className="repodetail-card">
                <h2 className="repo-name">{details.name}</h2>
                <div className="repo-mini-details">
                    <p><FaRegStar className="icons" /> Stars: {details.stargazers_count}</p>
                    <p><FaRegEye className="icons" /> Watch: {details.watchers}</p>
                    <p><TbGitFork className="icons" /> Forks: {details.forks}</p>
                    <p><FaCodeBranch className="icons" /> Branches: {branch.length}</p>
                </div>
                <p>Main Language: {details.language === null ? "none": details.language}</p>
                <p>Live site: {deployment.length === 0 ? `none` : <a href={`https://nnamuka01.github.io/${details.name}`}>nnamuka01.github.io/{details.name}</a>}</p>
                <p><a href={`https://github.com/${details.full_name}`}>View on Github</a></p>

            </div>
        </div>


        
    )
}


export default RepoDetails