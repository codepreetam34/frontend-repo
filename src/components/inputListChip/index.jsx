import React, { useState } from "react";
import "./style.css"; // Import your CSS file for styling

const UserDropdown = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      profilePic: "https://avatar.iran.liara.run/public/boy?username=Ash",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      profilePic: "https://avatar.iran.liara.run/public/boy?username=Ash",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      profilePic: "https://avatar.iran.liara.run/public/boy?username=Ash",
    },
    {
        id: 4,
        name: "John Doe",
        email: "john@example.com",
        profilePic: "https://avatar.iran.liara.run/public/boy?username=Ash",
      },
      {
        id: 5,
        name: "Jane Smith",
        email: "jane@example.com",
        profilePic: "https://avatar.iran.liara.run/public/boy?username=Ash",
      },
      {
        id: 6,
        name: "Alice Johnson",
        email: "alice@example.com",
        profilePic: "https://avatar.iran.liara.run/public/boy?username=Ash",
      },
  ]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filtered);
  };

  const handleInputClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setUsers([...selectedUsers, ...users]);
  };

  const handleUserSelect = (user) => {
    setInputValue("");

    setSelectedUsers([...selectedUsers, user]);

    setUsers(users.filter((u) => u.id !== user.id));
  };

  const handleChipRemove = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    setUsers([...users, user]);
  };

  return (
    <div className="user-dropdown-container">
      <h3 className="dropdown-title">Pick Users</h3>
      <div className="selected-chips-container">
        {selectedUsers.map((user) => (
          <div
            key={user.id}
            className="chip"
            onClick={() => handleChipRemove(user)}
          >
            <img
              src={user.profilePic}
              alt={user.name}
              className="profile-icon-chip"
            />
            {user.name}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="cross-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder="Add a new user...."
        className="input-field"
      />
      {isDropdownOpen && (
        <ul className="dropdown-list">
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserSelect(user)}>
              <img
                className="profile-icon"
                src={user.profilePic}
                alt={user.name}
              />
              <span className="user-name">{user.name} </span>
              <span className="user-email"> {user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
