import React, { useEffect, useState } from 'react'
import 'bulma/css/bulma.min.css';
import axios from 'axios';
import Pagination  from './pagination';
import { Calls } from './calls';
import Style from "./styles/card.module.css";
import { useNavigate} from "react-router-dom";


export default function Cards() {
  // const token = localStorage.getItem('token');
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const refreshToken = async (refreshToken) => {
    try {
      const response = await axios.post('https://frontend-test-api.aircall.io/auth/refresh-token', {
        username,
        password
      });
  
      const newToken = response.data.access_token;
      // Store the new token in local storage or state for future requests
      localStorage.setItem('token', newToken);
      console.log("newtoke:",JSON.stringify(response?.data))
      // Return the new token
      return newToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error; // Throw the error to handle it in the calling code
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('token', "");
    navigate('/login');
  };

  const fetchData = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://frontend-test-api.aircall.io/calls?offset=0&limit=20',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const value = response.data.nodes;
      setData(value);
      console.log(value);
      setLoading(false);
      setFetching(false);
    } catch (error) {
      console.error('Error retrieving data:', error);
      if (error.response && error.response.status === 401) {
        console.log('Token expired. Refreshing token...');
        try {
          const refreshedToken = await refreshToken(token);
          // Retry the request with the new token
          return await fetchData(refreshedToken);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          // Handle the refresh error or redirect to login page
        }
      } else {
        console.error('Error retrieving data:', error);
        // Handle other types of errors
      }
      console.error('Error retrieving data:', error);
      setFetching(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token in cards.js",token);
    fetchData(token)
  }, []);

  if (fetching) {
    return <p>Loading data...</p>;
  }

  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className={Style.parent}>
      <div className={Style.topbar}>
        <div className={Style.logo}>
        <img src={require('./images/TT Logo.png')} alt="Logo" />
        
        </div>
        <button className={Style.logoutButton} onClick={() => navigate('/login')}>
          Logout
        </button>
      </div>
       {/* {data.length > 0 && (
        <ul>
          {data.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )} */}
      {/* {data.length > 0 ? (
        <>
          {data.map((item) => (
            <div key={item.id}>
              <h2>{item.id}</h2>
              <p>{item.duration}</p>
              <p>{item.is_archived ? 'Archived' : 'Not Archived'}</p>
              <p>{item.from}</p>
              <p>{item.to}</p>
            </div>
          ))} */}

          {/* Pagination */}
          {/* <pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>Loading data...</p>
      )} */}
      <Calls data = {currentPosts} loading = {loading}/>
      <Pagination
            postsPerPage = {postsPerPage}
            totalPosts = {data.length}
            paginate = {paginate}
          />
    </div>
  )
}
