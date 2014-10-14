var addUser, deleteUser, populateTable, showUserInfo, userListData;

userListData = [];

$(document).ready(function() {
  populateTable();
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

  /* Add User link click */
  $('#btnAddUser').on('click', addUser);

  /* Delete User link click */
  return $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
});

populateTable = function() {
  var tableContent;
  tableContent = '';
  $.getJSON('/users/userlist', function(data) {
    userListData = data;
    $.each(data, function() {
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });
    $('#userList table tbody').html(tableContent);
  });
};

showUserInfo = function(event) {
  var arrayPosition, thisUserName, thisUserObject, userNames;
  event.preventDefault();
  thisUserName = $(this).attr('rel');
  userNames = userListData.map(function(arrayItem) {
    return arrayItem.username;
  });
  arrayPosition = userNames.indexOf(thisUserName);
  thisUserObject = userListData[arrayPosition];
  $('#userInfoName').text(thisUserObject.fullname);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.location);
};

addUser = function(event) {
  var errorCount, newUser;
  event.preventDefault();
  errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if ($(this).val === '') {
      return errorCount++;
    }
  });
  if (errorCount === 0) {
    newUser = {
      'username': $('#addUser fieldset input#inputUserName').val(),
      'email': $('#addUser fieldset input#inputUserEmail').val(),
      'fullname': $('#addUser fieldset input#inputUserFullName').val(),
      'age': $('#addUser fieldset input#inputUserAge').val(),
      'location': $('#addUser fieldset input#inputUserLocation').val(),
      'gender': $('#addUser fieldset input#inputUserGender').val()
    };
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function(response) {
      if (response.msg === '') {
        $('#addUser fieldset input').val('');
        return populateTable();
      } else {
        return alert('Error: ' + response.msg);
      }
    });
  } else {
    alert('Please fill in all fields');
    return false;
  }
};

deleteUser = function(event) {
  var confirmation;
  event.preventDefault();
  confirmation = confirm('Are you sure you want to delete this user?');
  if (confirmation) {
    $.ajax({
      type: 'DELETE',
      url: '/users/deleteuser/' + $(this).attr('rel')
    }).done(function(response) {
      if (response.msg === '') {

      } else {
        alert('Error: ' + response.msg);
      }
      return populateTable();
    });
  } else {
    return false;
  }
};
