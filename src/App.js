
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Changeing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Changeing items per page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); 
  };

  // Calculate current items based on current page and items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='body'>
    <p className = "heading">TODO LIST</p>
      {loading ? (
        <p style={{textAlign:"center"}}>Loading the data please wait few second...</p>
      ) : (
        <div className='cardSection'>
          {currentItems.map(item => (
            <div key={item.id} className="card">
            <p className='cardId'> Id is: {item.id}</p>
              <p className='cardTitle' >Title is : {item.title}</p>
         </div>
          ))}
        </div>
      )}
      {/* Pagination */}
      <div className='paginationSection'>
      <div style={{float:"left"}}>
        {pageNumbers.map(number => (
          <button className='pageBtn' key={number} onClick={() => handlePageChange(number)} disabled={number === currentPage}>
            {number}
          </button>
        ))}
      </div>
      {/* Page size dropdown */}
      <div style={{float:"right"}}>
        <label className="labelItems">Items per page : </label>
        <select className='pageSizeDropdown' value={itemsPerPage} onChange={handleItemsPerPageChange}>
          
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>

        </select>
      </div>
    </div>
    </div>
  );
};

export default App;