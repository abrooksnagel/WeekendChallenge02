var returnInfo = {};
var j = 0;


//This function waits until the document is ready and then runs the getData and init functions
//This init function is more of an experiment in cleaning up the code than anything else
$(document).ready(function(){
    getData();
    init();
});


//This function retrieves the data from the server/apps.js file (I think I understand that?)
//sets the data to a var outside the function and appends the DOM using the data
function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data){
            returnInfo = data;
            //For testing - see function at the end of this file
            //testStuff(returnInfo);
            appendDOM(returnInfo);
        }
    });
}


//This function runs activateButtons function (see previous note about experiment
// to clean up the code
function init() {
    activateButtons();
}


//This function appends the DOM using the data to create divs for each student
function appendDOM(something) {
    for (var i = 0; i < something.people.length; i++) {
        $('#peopleContainer').append('<div class="student" data-num="' + i + '"></div>');
        $el = $('#peopleContainer').children().last()
        $el.append('<p>' + something.people[i].name + '</p>');
        $el.append('<p>' + something.people[i].location + '</p>');
        $el.append('<p>' + something.people[i].animal + '</p>');
    }
}


//This function allows the button clicks to execute functions
function activateButtons() {
    $('#peopleContainer').on('click', '.next', nextStudent);
    $('#peopleContainer').on('click', '.prev', prevStudent);
    $('#peopleContainer').on('click', '.start', start);
}


//This function fades out the start button on click
function start() {
    $('.start').fadeOut();
    //$('#peopleContainer').find('[data-num="' + j + '"]').fadeIn();
    //j++;
}


//This function fades out current student, allowing next student to be visible
//this also resets a counter at the end of the class list to allow the list
//to start over
function nextStudent() {
    $('#peopleContainer').find('[data-num="' + j + '"]').fadeOut();
    j++;
    console.log(j);
    if (j >= returnInfo.people.length) {
        j = 0;
        $('.student').show();
    }
}


//This fades back in the last student, this decreases a counter and resets
//the counter to the length of the student list to allow the list to start over
function prevStudent() {
    j--;
    $('#peopleContainer').find('[data-num="' + j + '"]').fadeIn();
    console.log(j);
    if (j < 0) {
        j = returnInfo.people.length;
        $('.student').hide();
    }
}


//This is for testing -
// must unwhack the testStuff function in getData function to use
function testStuff(something) {
    for (var i = 0; i < something.people.length; i++) {
        console.log(something.people[i].name);
    }
}











