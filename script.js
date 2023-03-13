var pageID = document.getElementById("pageID");
var notepad = document.getElementById('notepad');
let page = localStorage.getItem('currentPage');
// If it isn't loaded the first time
if (page != null) {
    pageID.textContent = page +  ' / 9';
    notepad.textContent = localStorage.getItem('page' + page);
} // If it's loaded the first time
else {pageID.textContent = '1 / 9';}

var previous = document.getElementById('previousButton');
var next = document.getElementById('nextButton')

notepad.addEventListener('input', function(){
    saveState();
})

previous.addEventListener('click', function(){
    changePageNumber(-1);
});

next.addEventListener('click', function(){
    changePageNumber(1);
})

// notepad.innerHTML or notepad.textContent doesn't work right, so i used notepad.value

function changePageNumber(number){
    // Get current page number +- changed page number
    var numb = parseInt(document.getElementById('pageID').textContent) + number;
    // Content of notepad
    var notepad = document.getElementById('notepad');
    // If you try to go below 1 page
    if (number == -1 && parseInt(document.getElementById('pageID').textContent) < 2){
        localStorage.setItem('currentPage', (numb+1).toString());
        notepad.value = localStorage.getItem('page' + (numb +1));
    }
    // If you try to go above 9 pages
    else if(numb == 10){console.log('Limit of page reached');}
    else{
    // Page number | Saves current page | Changes notepad value
    document.getElementById('pageID').textContent = numb.toString() + ' / ' + '9';
    localStorage.setItem('currentPage', numb.toString());
    notepad.value = localStorage.getItem('page' + numb);
    }
}

function saveState(){
    // Get page value and saves it; it is set between 0 and 9
    var pagenumber = document.getElementById("pageID").textContent[0];
    localStorage.setItem('page'+ pagenumber,document.getElementById("notepad").value);
}