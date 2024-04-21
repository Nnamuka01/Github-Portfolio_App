import { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom"
import '../css/index.css'

// create the home component
function Home() {
    // user is the initial state before pagination
    const [user, setUser] = useState([]);
    // current position is state that tracks number of pages to render
    const [currentPosition, setCurrentPosition] = useState(1)
    // view more is state that when clicked renders other pages
    const [viewMore, setViewMore] = useState(" ")
    // create a state to implement the search and filter feature
    const [userSearch, setUserSearch] = useState('')
    const [filteredLanguage, setFilteredLanguage] = useState('')
    useEffect(() => {
        fetch(`https://api.github.com/users/Nnamuka01/repos?per_page=2&page= ${currentPosition}`)
       .then(response => {
        if(!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        return response.json()})
       .then((data) => {
        if(data.length === 0) {
            setViewMore("End of Repos")
        }else {
            // setUser(prevUser => [...prevUser, ...data])
            const combinedRepos = [...user, ...data];
            const uniqueRepos = Array.from(new Set(combinedRepos.map(repo => repo.id)))
              .map(id => combinedRepos.find(repo => repo.id === id));
            setUser(uniqueRepos);
            setViewMore("View More")
        }
       })
       .catch(error => console.error('Error fetching repositories:', error));
    }, [currentPosition])

    // the useHistory navigate to a 404 page if the search result does not exist
    const navigate = useNavigate();

    const handleSearch = (event) => {
        const SearchTerm = event.target.value;
        setUserSearch(SearchTerm);
        if(SearchTerm && filteredUser.length === 0) {
            navigate("/404")
        }
    }

    const handleFilter = (event) => {
        setFilteredLanguage(event.target.value);
    }

    const filteredUser = user.filter(repo => {
        return (
            repo.name.toLowerCase().includes(userSearch.toLowerCase()) &&
            (filteredLanguage === '' || repo.language === filteredLanguage)
        );
    });

    // const showViewMore = () => {
    //     setCurrentPosition(currentPosition + 1)
    // }
    
    const userElements = filteredUser.map((userElement, index) => {
        return (
            <div className="repo-card" key={`${userElement.id}-${index}`}>
                <Link to={`/repodetails/${userElement.name}`}><h2 className="repo-name">{userElement.name}</h2></Link>
                <p className="language">Language: {userElement.language === null ? 'none' : userElement.language}</p>
                <p className="date">Date Started & time: {userElement.created_at}</p>
                <p className="visibility">Visibility: {userElement.visibility}</p>
            </div>
        )
    })

    return (
        <>
        <section className="select-input">
            <div className="input-search">                
            <input
                    type="text"
                    placeholder="Search by repository name"
                    value={userSearch}
                    onChange={handleSearch}
                />{' '}
                 <select value={filteredLanguage} onChange={handleFilter}>
                    <option value="">All Languages</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Css">CSS</option>
                    <option value="Html">HTML</option>
                    <option value="Java">Java</option>
                </select>
            </div>
        </section>

        <section className="repo-container">
            {userElements}
        </section>
        <div className="paginate">
        <button className="view-more" onClick={() => setCurrentPosition(currentPosition + 1)}>{viewMore}</button>
        </div>
        </>
    )
}

export default Home;