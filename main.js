// Fetch mock data from api
document.addEventListener('DOMContentLoaded', () => {
    const userTable = document.getElementById('userTable');
    const searchInput = document.getElementById('default-search');
    let usersData = [];
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
            usersData = data;
            populateTable(usersData);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    function populateTable(users) {
        userTable.innerHTML = '';
        users.forEach((user) => {
            const row = `
              <tr>
                  <td class="border px-4 py-2">${user.name.split(' ')[0]}</td>
                  <td class="border px-4 py-2">${user.name.split(' ')[1] || ''}</td>
                  <td class="border px-4 py-2">${user.email}</td>
                  <td class="border px-4 py-2">${user.phone}</td>
              </tr>
          `;
            userTable.innerHTML += row;
        });
    }

    // Event listener for the search input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredUsers = usersData.filter((user) => {
            const firstName = user.name.split(' ')[0].toLowerCase();
            const lastName = user.name.split(' ')[1]?.toLowerCase() || '';
            const email = user.email.toLowerCase();
            const phone = user.phone.toLowerCase();
            return firstName.includes(query) || lastName.includes(query) || email.includes(query) || phone.includes(query);
        });
        populateTable(filteredUsers);
    });
});

// ------------------------------------------------------
// Pristine.js validation for the Add User form
const form = document.getElementById('userForm');
const pristine = new Pristine(form);
//email validation
pristine.addValidator(document.getElementById('email'), function (value) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(value);
});

//password validation
pristine.addValidator(document.getElementById('confirmPassword'), function () {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    return password === confirmPassword;
});
//mobile validation
pristine.addValidator(document.getElementById('mobile'), function (value) {
    var mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(value);
});
//checkbox validation
pristine.addValidator(document.getElementById('tc'), function (value) {
    return document.getElementById('tc').checked;
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const valid = pristine.validate();
    console.log('result', valid);

    if (valid) {
        alert('Successfully added user data');
        form.reset();
    } else {
        alert('Please fill out the form correctly.');
    }
});
