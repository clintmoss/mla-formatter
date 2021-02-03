//These are just actions on the page to listen for
let formatButton = document.getElementById('format-btn')
let radioClick = document.getElementsByClassName('radio')
let copyButton = document.getElementById('copy-whole-citation')

//These variables listen if different types are checked to change which information is needed
let bookDiv = document.getElementById('bookInfo')
let articleDiv = document.getElementById('articleInfo')
let webDiv = document.getElementById('webInfo')


//These are the variables that are actually put into the DOM for the citation
let mlaAuthor = document.getElementById('mla-author')
let mlaTitle = document.getElementById('mla-title')
let mlaContainer = document.getElementById('mla-container')
let mlaUrl = document.getElementById('mla-url')
let mlaParenthesisCitation = document.getElementById('mla-parenthesis')
let mlaPublisher = document.getElementById('mla-publisher')
let mlaEdition = document.getElementById('mla-edition')
let mlaYear = document.getElementById('mla-year')

//These are just to target values from the form 
let firstName = document.getElementById('first')
let lastName = document.getElementById('last')
let websiteUrl = document.getElementById('url')
let title = document.getElementById('title')
let date = document.getElementById('date')
let pageNumber = document.getElementById('pageNumber')
let publisher = document.getElementById('publisher')
let edition = document.getElementById('edition')




//Event listener on the format button and radio buttons
radioClick[0].addEventListener('click',function(){
  bookDiv.style.display = "none"
  articleDiv.style.display = "none"
  webDiv.style.display = "none"
})
radioClick[1].addEventListener('click', function(){
  bookDiv.style.display = "block"
  articleDiv.style.display = "none"
  webDiv.style.display = "none"
})
radioClick[2].addEventListener('click',function(){
  bookDiv.style.display = "none"
  webDiv.style.display = "none"
  articleDiv.style.display = "block"
})

//Format button event listener
formatButton.addEventListener("click",formatInfo);

//Parenthesis and normal citations, calls all the functions to reformat the citation depending on the type of citation
function formatInfo(){
  let formattedAuthor =  formatAuthor();
  let formattedTitle = formatTitle();
  let formattedDate = date.value 
  formattedDate = parseDate(formattedDate) // 0 - year, 1 - month, 2 - day
  let formattedContainer = formatUrl();
  let formattedEdition = formatEdition();
  console.log(formattedEdition)


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
    mlaAuthor.innerText = formattedAuthor[1] + ", " + formattedAuthor[0] + ". "
    mlaTitle.innerText = "\"" +formattedTitle + ".\" "
    mlaEdition = formattedEdition
    mlaTitle.style.fontStyle ="italic"
    mlaPublisher.innerText = publisher.value + ", "
    mlaYear.innerText = formattedDate[0]
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


const formatEdition = () => {
  let bookEdition = edition.value
  let numberEnding = bookEdition.toString().split('')
  let endOfNumber = numberEnding.length - 1
  let end = numberEnding[endOfNumber]
  end = parseInt(end,10)
  let endingVerbiage = ""

  switch(end){
    case 1 : endingVerbiage = "st"; break;
    case 2 : endingVerbiage = "nd"; break;
    case 3 : endingVerbiage = "rd"; break;
    case 4,5,6,7,8,9 : endingVerbiage = "th"; break;
    deafult: break;
  }

  let result = bookEdition + endingVerbiage;
  return result
}

