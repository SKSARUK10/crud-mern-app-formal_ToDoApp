// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./App.css";
// import { FaSearch } from "react-icons/fa";
// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [input, setInput] = useState("");

//   //serach by input /users/:name
//   const fetchData = (value) => {
//     fetch("http://localhost:5000/todo/getall")
//       .then((response) => response.json())
//       .then((json) => {
//         const results = json.filter((user) => {
//           return (
//             value &&
//             user &&
//             user.name &&
//             user.name.toLowerCase().includes(value)
//           );
//         });
//         setUsers(results);
//       });
//   };

//   const handleChange = (value) => {
//     setInput(value);
//     fetchData(value);
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/todo/getall")
//       .then((result) => setUsers(result.data))
//       .catch((err) => console.log(err));
//   }, []);

//   //deleteuser
//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:5000/todo/deleteuser/${id}`)
//       .then((result) => {
//         console.log(result);
//         window.location.reload();
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//       <div className="w-50 bg-white rounded p-3">
//         <div className="input-wrapper">
//           <FaSearch id="search-icon" />
//           <input
//             className="search-inp"
//             value={input}
//             onChange={(e) => handleChange(e.target.value)}
//             type="search"
//             placeholder="Search Item"
//           />{" "}
//         </div>

//         <Link to="/create" className="btn btn-success">
//           Add+
//         </Link>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Age</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, i) => (
//               <tr key={i}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.age}</td>
//                 <td>
//                   <Link to={`/update/${user._id}`} className="btn btn-success">
//                     Update++
//                   </Link>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDelete(user._id)}
//                   >
//                     delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Users;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todo/getall");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo/deleteuser/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input
            className="search-inp"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            type="search"
            placeholder="Search Item"
          />
        </div>

        <Link to="/create" className="btn btn-success">
          Add
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className="btn btn-success">
                    Update
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
