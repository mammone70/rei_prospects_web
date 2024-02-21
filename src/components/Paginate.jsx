import React from 'react';
 
const Paginate = ({ prospectsPerPage, totalProspects, paginate }) => {
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalProspects / prospectsPerPage); i++) {
      pageNumbers.push(i);
   }
 
   return (
    <div className="pagination-container">
        <ul className="pagination">
        {pageNumbers.map((number) => (
            <li 
                key={number} 
                onClick={() => paginate(number)}
                className="page-number">
                {number}
            </li>
        ))}
        </ul>
    </div>
   );
};
 
export default Paginate;