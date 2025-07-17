import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequisitionForm from './ReqForm'; // Adjust path as needed

const Home = () => {
  const [username, setUsername] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.user_id);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleCreateProjectClick = () => {
    setShowDropdown(true);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#2e5d95] text-white flex justify-between items-center px-6 py-3 shadow relative">
        <Link to="/">
          <div className="text-lg font-semibold">Home</div>
        </Link>
        <div className="text-xl font-bold">Head of Division</div>

        <div className="relative">
          <div
            className="text-sm font-semibold cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            {username} ▾
          </div>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded z-10">
              <button
                onClick={handleChangePassword}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Top Button */}
        <div className="flex justify-start gap-4 mb-6">
          <button
            className="bg-[#2e5d95] text-white px-4 py-2 font-semibold rounded shadow hover:bg-blue-800"
            onClick={handleCreateProjectClick}
          >
            Create Project Request
          </button>
        </div>

        {/* Dropdown shown after button click */}
        {showDropdown && (
          <div className="mb-6">
            <label className="font-semibold mr-2">Select :</label>
            <select
              className="border rounded px-3 py-2"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="">-- Select Option --</option>
              <option value="manpower">Requisition For Manpower</option>
            </select>
          </div>
        )}

        {/* Divider */}
        <hr className="border-dashed border-t-2 border-[#2e5d95] my-6" />

        {/* Show Requisition Form */}
        {selectedOption === 'manpower' && <RequisitionForm />}

        {/* Center Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-[#2e5d95] text-white px-4 py-2 font-semibold rounded shadow hover:bg-blue-800">
            Requested Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
