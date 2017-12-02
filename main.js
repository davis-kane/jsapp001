document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// This saves the form inputs to local storage

function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  // issueId uses chance.js to create a unique identifier
  var issueId = chance.guid();
  var issueStatus = 'Open';

  // Puts inputs from saveIssue above together to create single issue object
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  }

  if(localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    // JSON.stringify method takes the array and generates a JSON object - that is the value stored in the issues object in local storage.
    localStorage.setItem('issues', JSON.stringify(issues))
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    // issues.push is adding another element to the existing array
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  // This makes sure that everything in the form is initialized and values are removed
  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();

}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

// fetchIssues function fetches the list of issues that are available
function fetchIssues() {
   var issues = JSON.parse(localStorage.getItem('issues'));
   // issuesList references the issuesList id in the HTML page
   var issuesList = document.getElementById('issuesList');

   issuesList.innerHTML = '';

   for (var i = 0; i < issues.length; i++) {
     var id = issues[i].id;
     var desc = issues[i].description;
     var severity = issues[i].severity;
     var assignedTo = issues[i].assignedTo;
     var status = issues[i].status;

     issuesList.innerHTML += '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>'
   }
}
