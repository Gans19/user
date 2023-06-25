 //Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-Q0Sc6DwU1ZfwsvKLSWy8RYv4Z7ynNNg",
    authDomain: "user-8ffe0.firebaseapp.com",
    databaseURL: "https://user-8ffe0-default-rtdb.firebaseio.com",
    projectId: "user-8ffe0",
    storageBucket: "user-8ffe0.appspot.com",
    messagingSenderId: "1090831952796",
    appId: "1:1090831952796:web:c938737ccc102407ba3659"
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
    var row = button.parentNode.parentNode;
    var key = row.getAttribute("data-key");
    var name = row.cells[0].innerHTML;
    var email = row.cells[1].innerHTML;
    var message = row.cells[2].innerHTML;

    var updatedName = prompt("Enter updated name:", name);
    var updatedEmail = prompt("Enter updated email:", email);
    var updatedMessage = prompt("Enter updated message:", message);

    if (updatedName && updatedEmail && updatedMessage) {
      usersRef.child(key).update({
        name: updatedName,
        email: updatedEmail,
        message: updatedMessage
      });
      alert("Data updated successfully!");
    }
  }

    // Listen for updated users and update them in the table
    usersRef.on('child_changed', function(data) {
      var user = data.val();
      var row = document.querySelector("tr[data-key='" + data.key + "']");
      row.cells[0].innerHTML = user.name;
      row.cells[1].innerHTML = user.email;
      row.cells[2].innerHTML = user.message;
    });
  
  // Delete user data
  function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
      database.ref('users').child(userId).remove();
    }
  }
  