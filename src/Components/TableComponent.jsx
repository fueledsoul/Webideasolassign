import React, { useState } from "react";

const TableComponent = () => {
  const [data, setData] = useState([
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
    { id: 3, name: "Bob", age: 12 },
    { id: 4, name: "Boby", age: 2 },
    { id: 5, name: "Rock", age: 36 },
    { id: 6, name: "Task", age: 38 },
    { id: 7, name: "Pop", age: 37 },
    { id: 8, name: "Roos", age: 58 },
    { id: 9, name: "Tomcat", age: 25 },
    { id: 10, name: "Moky", age: 7 },
    { id: 11, name: "Pana", age: 37 },
    { id: 12, name: "Roopa", age: 58 },
    { id: 13, name: "Tata", age: 25 },
    { id: 14, name: "Ropa", age: 7 },
    { id: 16, name: "Zack", age: 7 },
    { id: 17, name: "Roman", age: 7 },
    { id: 18, name: "John", age: 7 },
    { id: 19, name: "Ryder", age: 7 },
    { id: 20, name: "Tomcat", age: 7 },
    // Add more data rows here
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Search handler
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to the first page
  };

  // Sort handler
  const handleSort = (key) => {
    setData([...data].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
  };

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);

  //   const renderTableData =

  // Pagination - Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      onClick={() => handlePageChange(number)}
      className={currentPage === number ? "active" : ""}
    >
      {number}
    </li>
  ));

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search eg.Ram"
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 m-3"
      />
      <table className="table table-bordered mt-5 mb-3">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID ↑</th>
            <th onClick={() => handleSort("name")}>Name ↑</th>
            <th onClick={() => handleSort("age")}>Age ↑</th>
          </tr>
        </thead>
        <tbody>
          {currentItems
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* <div className="d-flex align-items-center justify-content-center">
        <ul className="pagination">{renderPageNumbers}</ul>
      </div> */}
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          className="prev_btn"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <ul className="mb-0">
          {" "}
          <ul className="pagination">{renderPageNumbers}</ul>
        </ul>
        <button
          className="prev_btn"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
      <div className="d-flex">
        <div className="d-flex justify-content-center w-100 align-items-center">
          <p className="mb-0">Items Per Page</p>
          <div className="">
            <select
              className="ms-3 items"
              onChange={(e) => {
                setItemsPerPage(e.target.value);
              }}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
