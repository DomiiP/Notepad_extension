var pageID = document.getElementById("pageID");
var notepad = document.getElementById('notepad');
let page = localStorage.getItem('currentPage');
var fonts = [document.getElementById("font1"),document.getElementById("font2"),document.getElementById("font3")];


// If it isn't loaded the first time
if (page != null) {
    pageID.textContent = page +  ' / 9';
    notepad.textContent = localStorage.getItem('page' + page);
} // If it's loaded the first time
else {pageID.textContent = '1 / 9';}


// If height / fontSize is set (only have to check one)
let height = localStorage.getItem('height');
console.log(height);
if (height != null){
    let notepad = document.getElementById("notepad");
    notepad.style.fontSize = localStorage.getItem('fontSize');
    notepad.style.height = height;
}

// For font
if (localStorage.getItem('font') != null){
    document.body.style.fontFamily = localStorage.getItem('font');
    document.getElementById('notepad').style.fontFamily = localStorage.getItem('font');
}  // You set default font here..
else{document.body.style.fontFamily = 'Franklin Gothic Medium';
document.getElementById('notepad').style.fontFamily = 'Franklin Gothic Medium';}

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

// Settings

var settings = document.getElementById("settings");
// settings.addEventListener('mouseover', function(){
//     document.getElementById("container").style.opacity = 0.8;
//     document.getElementById("settings").style.opacity = 1;
// });
// settings.addEventListener('mouseout', function(){
//     document.getElementById("container").style.opacity = 1;
// });
settings.addEventListener('click', function(){
    var settings = document.getElementById("ex-container");
    if (settings.style.display == '' || settings.style.display == 'none') settings.style.display = 'block';
    else settings.style.display = 'none';
});

// Garbage
var garbage = document.getElementById("garbage");
garbage.addEventListener('click', function(){
    window.localStorage.removeItem('page'+ localStorage.getItem('currentPage'));
    document.getElementById("notepad").value = "";
})

var garbage_all = document.getElementById("garbage_all");
garbage_all.addEventListener('click', function(){
    window.localStorage.clear();    
    document.getElementById("notepad").value = "";
})

// Extra container - settings
var ex_settings = document.getElementById('preffered-resolution');
ex_settings.addEventListener('change', function(){
    // This function changes whole container size - can't be used as an extension but maybe in the future
    /*
    var container = document.getElementById('container');
    let height = document.getElementById('container').offsetHeight;
    let width = document.getElementById('container').offsetWidth;
    var variable = parseInt(parseInt(document.getElementById('preffered-resolution').value) + 2) / 4;
    container.style.transform = 'scale(' + variable.toString() + ')';
    container.style.left = (((width * variable) - width) / 2).toString() + 'px';
    container.style.top = (((height * variable) - height) / 2).toString() + 'px';*/

    // variable - get slider value | then we change dependent fontSize dependent on slider and keep height of notepad the same
    var variable = parseInt(parseInt(document.getElementById('preffered-resolution').value) + 2) / 4;
    let fontSize = document.getElementById("notepad");
    let height = fontSize.offsetHeight.toString() + 'px';
    fontSize.style.fontSize = (14 * variable).toString() + 'px';
    fontSize.style.height = height;
    localStorage.setItem('height', height);
    localStorage.setItem('fontSize', fontSize.style.fontSize.toString());
});

// When notepad changes height
notepad.addEventListener('onresize', function(){
    console.log('test');
});
// TODO
// const resize = new ResizeObserver();

// Font type

fonts[0].addEventListener('click',function(){
    let str = 'Franklin Gothic Medium';
    localStorage.setItem('font',str);
    document.body.style.fontFamily = str;
    document.getElementById("notepad").style.fontFamily = str;
});
fonts[1].addEventListener('click', function(){
    let str = 'rebuchet MS';
    localStorage.setItem('font',str);
    document.body.style.fontFamily = str;
    document.getElementById("notepad").style.fontFamily = str;

});
fonts[2].addEventListener('click', function(){
    let str = 'Impact';
    localStorage.setItem('font',str);
    document.body.style.fontFamily = str;
    document.getElementById("notepad").style.fontFamily = str;
});