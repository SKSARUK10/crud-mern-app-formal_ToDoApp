// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const UpdateUser = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [name, setName] = useState();
//   const [email, setEmail] = useState();
//   const [age, setAge] = useState();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/todo/getuser/${id}`)
//       .then((result) => {
//         console.log(result.data);
//         setName(result.data.name);
//         setEmail(result.data.email);
//         setAge(result.data.age);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const update = (e) => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:5000/todo/updateuser/${id}`, { name, email, age })
//       .then((results) => {
//         console.log(results);
//         navigate("/");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//       <div className="w-50 bg-white rounded p-3">
//         <form onSubmit={update}>
//           <h2>Update User</h2>
//           <div className="mb-2">
//             <label htmlFor="">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="">Age</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="enter age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-success">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateUser;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/todo";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/getuser/${id}`)
      .then((result) => {
        console.log(result.data);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    axios
      .put(`${API_BASE_URL}/updateuser/${id}`, { name, email, age })
      .then((results) => {
        console.log(results);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={update}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
