//Targets and event listeners 
let firstName = document.getElementById('first')
let lastName = document.getElementById('last')
let websiteUrl = document.getElementById('url')
let title = document.getElementById('title')
let date = document.getElementById('date')
let pageNumber = document.getElementById('pageNumber')
let mlaAuthor = document.getElementById('mla-author')
let mlaTitle = document.getElementById('mla-title')
let mlaContainer = document.getElementById('mla-container')
let mlaUrl = document.getElementById('mla-url')
let bookDiv = document.getElementById('bookInfo')
let articleDiv = document.getElementById('articleInfo')
let button = document.getElementById('format-btn')
let radioClick = document.getElementsByClassName('radio')
let mlaParenthesisCitation = document.getElementById('mla-parenthesis')
let copyButton = document.getElementById('copy-whole-citation')

//Disguised boxes
let bookVisibility = "none"
let articleVisibility = "none"

//Event listener on the format button and radio buttons
radioClick[0].addEventListener('click',function(){
  bookVisibility = "none"
  articleVisibility = "none"
  bookDiv.style.display = bookVisibility
})
radioClick[1].addEventListener('click', function(){
  bookVisibility = "block"
  articleVisibility = "none"
  bookDiv.style.display = bookVisibility
  articleDiv.style.display = articleVisibility

})
radioClick[2].addEventListener('click',function(){
  bookVisibility = "none"
  bookDiv.style.display = bookVisibility
  articleVisibility = "block"
  articleDiv.style.display = articleVisibility
})

//Format button event listener
button.addEventListener("click",formatInfo);

//Parenthesis and normal citations
function formatInfo(){
  let formattedAuthor =  formatAuthor();
  let formattedTitle = formatTitle();
  let formattedDate = date.value 
  formattedDate = parseDate(formattedDate) // 0 - year, 1 - month, 2 - day
  let formattedContainer = formatUrl();
  //Format for web
  if(document.getElementById('web').checked){
    mlaAuthor.innerText = formattedAuthor[1] + ", " + formattedAuthor[0] + ". "
    mlaTitle.innerText = "\"" +formattedTitle + ".\" "
    mlaContainer.innerText = formattedContainer + ",\n"
    mlaContainer.style.fontStyle="italic"
    mlaUrl.innerText = websiteUrl.value;
    mlaParenthesisCitation.innerText = "(" + formattedAuthor[1] + " " + pageNumber.value + ")"; 
  }
  //Format for book
  else if(document.getElementById('book').checked){
    console.log('book')
    mlaAuthor.innerText = formattedAuthor[1] + ", " + formattedAuthor[0] + ". "
    mlaTitle.innerText = "\"" +formattedTitle + ".\" "
    mlaTitle.style.fontStyle ="italic"
    mlaContainer.innerText = formattedContainer + ",\n"
    mlaParenthesisCitation.innerText = "(" + formattedAuthor[1] + " " + pageNumber.value + ")"; 

  }
  //Format for an article
  else if(document.getElementById('article')){

    mlaParenthesisCitation.innerText = "(" + formattedAuthor[1] + " " + pageNumber.value + ")"; 
  }
  return 1;
}

//Event listener and function for copy text buttons
copyButton.addEventListener('click', function(){
    /* Get the text field */
    var copyText = document.getElementById("whole-citation");
  
    /* Select the text field */
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  })



//–––––––––––––––––––––––––––––– Functions ––––––––––––––––––––––––––––––

// Capitalizes and combines returns first and last name
function formatAuthor(){
  let authorFirst = firstName.value;
  let authorLast = lastName.value;
  let result;
  authorFirst = authorFirst.charAt(0).toUpperCase() + authorFirst.slice(1);
  authorLast = authorLast.charAt(0).toUpperCase() + authorLast.slice(1);
  result = [authorFirst, authorLast]
  return result
}

//Capitalizes the first letter in the words in the title  
function formatTitle(){
  let webUrlTitle = document.getElementById('title').value;
  webTitle = webUrlTitle.toLowerCase()
  return webTitle.split(' ')
  .map(function(word){
    return word[0].toUpperCase() + word.substr(1)
  })
  .join(" ");
}

//Splits the URL to get the domain container name
function formatUrl(){
  let webUrl = websiteUrl.value;
  let result;
  let container = webUrl.split('.');
  if(container[0] != "www"){
    result = container[0]
  }else if(container[0] == "www"){
    result = container[1]
  }
return result;
}

//separate values for month, year and day.
function parseDate(date){
  let result = date.split('-');
  let monthNum = result[1];
  let month = "";
  switch(monthNum){
    case "01" :month = "January"; break;
    case "02": month = "Februrary"; break;
    case "03": month = "March"; break;
    case "04": month = "April"; break;
    case "05": month = "May"; break;
    case "06": month = "June"; break;
    case "07": month = "July"; break;
    case "08": month = "August"; break;
    case "09": month = "September"; break;
    case "10": month = "October"; break;
    case "11": month = "November"; break;
    case "12": month = "December"; break;
    default:; break;
  }
  result[1] = month;
  return result;

}

