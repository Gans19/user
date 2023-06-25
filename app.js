// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Handle form submission
  document.getElementById('userForm').addEventListener('submit', submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    // Get user input
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Save data in Firebase Realtime Database
    database.ref('users').push().set({
      name: name,
      email: email,
      message: message
    }).then(() => {
      // Display success message
      document.getElementById('successMessage').classList.remove('hidden');
  
      // Clear form
      document.getElementById('userForm').reset();
    }).catch((error) => {
      console.error('Error saving data:', error);
    });
  }
  
  // Fetch and display user data from Firebase
  database.ref('users').on('value', (snapshot) => {
    const userData = snapshot.val();
    const tableBody = document.getElementById('userData');
  
    // Clear table
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  
    // Populate table with user data
    for (const userId in userData) {
      const user = userData[userId];
      const row = tableBody.insertRow();
      row.insertCell().textContent = user.name;
      row.insertCell().textContent = user.email;
      row.insertCell().textContent = user.message;
  
      const actionsCell = row.insertCell();
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => openUpdatePopup(userId, user));
      actionsCell.appendChild(updateButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteUser(userId));
      actionsCell.appendChild(deleteButton);
    }
  });
  
  // Open update popup
  function openUpdatePopup(userId, user) {

  }
  
  // Delete user data
  function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
      database.ref('users').child(userId).remove();
    }
  }
  