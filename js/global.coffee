userListData = []

$(document).ready( ->
  populateTable();

  $('#userList table tbody').on 'click', 'td a.linkshowuser', showUserInfo

  ### Add User link click ###
  $('#btnAddUser').on 'click', addUser

  ### Delete User link click ###
  $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
)

populateTable = ->
  tableContent = ''
  $.getJSON('/users/userlist', (data) ->
    userListData = data
    
    $.each (data), ->
      tableContent += '<tr>'
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>'
      tableContent += '<td>' + this.email + '</td>'
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>'
      tableContent += '</tr>'
      return
    
    $('#userList table tbody').html tableContent

    return
  )
  return

showUserInfo = (event) ->
  event.preventDefault()

  thisUserName = $(this).attr 'rel';

  userNames = userListData.map (arrayItem) -> return arrayItem.username

  arrayPosition = userNames.indexOf(thisUserName)

  thisUserObject = userListData[arrayPosition]

  $('#userInfoName').text thisUserObject.fullname
  $('#userInfoAge').text thisUserObject.age
  $('#userInfoGender').text thisUserObject.gender
  $('#userInfoLocation').text thisUserObject.location

  return

addUser = (event) ->
  event.preventDefault()

  errorCount = 0
  $('#addUser input').each((index, val) ->
    errorCount++  if $(this).val is ''
  )

  if errorCount == 0
    newUser =
      'username': $('#addUser fieldset input#inputUserName').val(),
      'email': $('#addUser fieldset input#inputUserEmail').val(),
      'fullname': $('#addUser fieldset input#inputUserFullName').val(),
      'age': $('#addUser fieldset input#inputUserAge').val(),
      'location': $('#addUser fieldset input#inputUserLocation').val(),
      'gender': $('#addUser fieldset input#inputUserGender').val()

    $.ajax(
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    ).done (response) ->
      if response.msg == ''
        $('#addUser fieldset input').val ''
        populateTable()
      else
        alert 'Error: ' + response.msg
    return
  else
    alert 'Please fill in all fields'
    return false;

deleteUser = (event) ->
  event.preventDefault()

  confirmation = confirm 'Are you sure you want to delete this user?'

  if confirmation
    $.ajax(
      type: 'DELETE',
      url: '/users/deleteuser/' + $(this).attr 'rel'
    ).done (response) ->
      if(response.msg == '')
      else
        alert 'Error: ' + response.msg

      populateTable()
    return
  else
    return false;
