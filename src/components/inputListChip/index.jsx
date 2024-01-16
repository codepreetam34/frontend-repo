import React, { useState } from 'react';
import './style.css'; // Import your CSS file for styling

const UserDropdown = () => {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', profilePic: 'profile1.jpg' },
    { id: 2, name: 'Jane Smith', profilePic: 'profile2.jpg' },
    { id: 3, name: 'Alice Johnson', profilePic: 'profile3.jpg' },
    // Add more users as needed
  ]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Update the list of filtered users based on the input value
    const filtered = users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
    setUsers(filtered);
  };

  const handleInputClick = () => {
    // Open the dropdown and display the full list
    setIsDropdownOpen(!isDropdownOpen);
    setUsers([...selectedUsers, ...users]); // Include selected users in the dropdown
  };

  const handleUserSelect = (user) => {
    setInputValue('');

    // Add the selected user to the list of selected users
    setSelectedUsers([...selectedUsers, user]);

    // Remove the selected user from the dropdown list
    setUsers(users.filter(u => u.id !== user.id));
  };

  const handleChipRemove = (user) => {
    // Remove the clicked chip and add the user back to the dropdown list
    setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    setUsers([...users, user]);
  };

  return (
    <div className="user-dropdown-container">
      <div className="selected-chips-container">
{selectedUsers.map((user) => (
  <div key={user.id} className="chip" onClick={() => handleChipRemove(user)}>
    <img src={user.profilePic} alt={user.name} className="profile-icon" />
    {user.name}
    <span>X</span>
  </div>
))}

      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder="Search for a user"
        className="input-field"
      />
      {isDropdownOpen && (
        <ul className="dropdown-list">
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserSelect(user)}>
              <img src={user.profilePic} alt={user.name} />
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
