import React, { useEffect, useState } from 'react'
import 'bulma/css/bulma.min.css';
import Style from './styles/pagination.module.css';

export const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers=[];
    const [currentPage, setCurrentPage] = useState(1);

    for(let i = 1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i);
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        paginate(pageNumber);
      };

  return (
    <div className={Style.paginationWrapper}>
    <nav className={`pagination is-centered is-small ${Style.pagination}`} role="navigation" aria-label="pagination">
    <a className={`pagination-previous ${Style.paginationArrow}`} aria-label="Previous">
    <span className="icon">
      <i className="fas fa-chevron-left"></i>
    </span>
  </a>
  <a className={`pagination-next ${Style.paginationArrow}`} aria-label="Next">
    <span className="icon">
      <i className="fas fa-chevron-right"></i>
    </span>
  </a>
      
        <ul className={`pagination-list ${Style.paginationList}`}>
            {pageNumbers.map(number => (
                <li key={number}>
                    {/* console.log("page number", {number}) */}
                    <a onClick={() => handlePageClick(number)} href="#!"   className={`pagination-link ${currentPage === number ? Style.currentPage : ''}`}>
                        {number}
                    </a>
                </li>
            ))}
        </ul>
        
    </nav>
    <div className={Style.paginationresults}>Total Results: {totalPosts}</div>
    </div>
  )
}
export default Pagination;
