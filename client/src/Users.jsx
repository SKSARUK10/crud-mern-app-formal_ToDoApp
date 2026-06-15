import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/todo/getall`,
      );
      const data = response.data;
      setUsers(Array.isArray(data) ? data : (data.users ?? data.data ?? []));
    } catch (error) {
      toast.error("Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/todo/deleteuser/${id}`,
      );
      toast.success("User deleted!");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(input.toLowerCase()),
  );

  return (
    <div className="d-flex min-vh-100 bg-primary justify-content-center align-items-start align-items-md-center py-4 py-md-0 px-2">
      <div
        className="bg-white rounded-3 p-3 p-md-4 shadow w-100"
        style={{ maxWidth: 700 }}
      >
        {/* Title */}
        <h5 className="fw-semibold text-primary mb-3">All Users</h5>

        {/* Search + Add row */}
        <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
          <div className="input-group flex-grow-1">
            <span className="input-group-text bg-white">
              <FaSearch className="text-muted" />
            </span>
            <input
              className="form-control border-start-0 ps-0"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              type="search"
              placeholder="Search Item"
            />
          </div>
          <Link to="/create" className="btn btn-success px-4 text-nowrap">
            + Add
          </Link>
        </div>

        {/* Table */}
        <div className="table-responsive rounded-2">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th className="d-none d-sm-table-cell">Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-danger">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="fw-medium">{user.name}</td>
                    <td className="text-muted small">{user.email}</td>
                    <td className="d-none d-sm-table-cell">{user.age}</td>
                    <td>
                      <div className="d-flex gap-2 flex-wrap">
                        <Link
                          to={`/update/${user._id}`}
                          className="btn btn-success btn-sm"
                        >
                          Update
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
