$(document).ready(onReady);

function onReady(){
    console.log( 'js is working' );
    sampleGET();
}

// sample GET request
function sampleGET() {
    $.ajax({
        method: 'GET',
        // url needs to match router creation url on server.js
        url: '/sampleUrl'
    }).then(function(response) {
        renderToDom(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}

// sample render function to store results in table on DOM
// comes with sample delete and edit buttons
function renderToDom( samples ) {
    // empties out target each time GET run before rendering anew
    $('#sample-html-target').empty();
    for(let sample of samples) {
        // set element to be targeted in HTML
        // sample.id is used to sanitize input values for database
        $('#sample-html-target').append(`
            <tr data-id=${sample.id}>
                <td>${sample.property}</td>
                <td>${sample.property}</td>
                <td><button class='delete-button'>Delete</button></td>
                <td><button class='update-button'>Edit?</button></td>
            </tr>
            `
        );
    }
 }

 // sample POST request to send data to database
function samplePOST() {
    // saving value of input field - add value for each input field
    const thingToSendtoDatabase = {
        tableColumnName: $('#sample-input-id').val(), 
    };
    console.log('Adding data to database', thingToSendtoDatabase);
    $.ajax({
        method: 'POST',
        // url needs to match router creation url on server.js
        url: '/sampleUrl',
        data: thingToSendtoDatabase
    }).then(function(response) {
        console.log(response);
        sampleGET();
    }).catch(function(error) {
        console.log('error in POST', error); 
        alert('Error POSTing. Please try again later.')       
    });
}

// sample DELETE request
function sampleDELETE() {
    // targeting the parent row of the td containing the delete button - grabbing it's id - same as database id
    const idToDelete = $(this).closest('tr').data('id');
    console.log(idToDelete);
    $.ajax({
        type: 'DELETE',
        url: `/sampleUrl/${idToDelete}`
    }).then(function(response) {
        console.log(response);
        sampleGET();
    }).catch(function(error) {
        console.log('Error with delete task:', error);
    })
    
};