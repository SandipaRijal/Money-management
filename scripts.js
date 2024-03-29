function navTab(evt, tabName) {
  // Declare all variables
  var i, formatDiv, navLinks;

  // Get all elements with class="formatdiv" and hide themlq
  formatDiv = document.querySelectorAll(".format-div");
  for (i = 0; i < formatDiv.length; i++) {
    formatDiv[i].style.display = "none";
  }

  // Get all elements with class="nav-links" and remove the class "active"
  navLinks = document.querySelectorAll(".nav-links");
  for (i = 0; i < navLinks.length; i++) {
    navLinks[i].className = navLinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// set default tab
document.querySelector('#defaultSelect').click();


// add item in income
var category;
var division; // division example income expenses
//open box to input details
function incomeCategory(cat, div){
	var catAdd = document.querySelector('#add-income-cat');
	
	document.querySelector('#category-name').innerHTML=cat[0].toUpperCase()+cat.substring(1);
	catAdd.style.display='block';
	
	category = cat;
	division = div;
    
}

//display form to add income or expenses

var submit=document.getElementById('form');

submit.addEventListener('submit', function(event){
		event.preventDefault();

	var description = document.querySelector('#description');
	var amount = document.querySelector('#amount');
	var date = document.querySelector("#start").value;
	//call appendList to add transaction in html
    date = date.split('-');
    newdate = date[2] + "/" + date[1] + "/" + date[0];
	appendList(description.value,amount.value, newdate,category, division);
    
    
	total(amount.value, division)
	
	var catAdd = document.querySelector('#add-income-cat');
	catAdd.style.display='none';
	description.value='';
	amount.value='';
});




// this function totals expenses or income and display in respective division.
var incometotal= parseFloat(document.querySelector('#in-total').innerHTML);
var expensestotal= parseFloat(document.querySelector('#ex-total').innerHTML);
function total(amount, division){
	
	if (division === 'income'){
	
	incometotal +=parseFloat(amount);
	document.querySelector('#in-total').innerHTML=incometotal;
	}else if(division === 'expenses'){
		
		expensestotal +=parseFloat(amount);
		document.querySelector('#ex-total').innerHTML=expensestotal;
	}
	
	// balance
		var balance = incometotal - expensestotal ;
	
	if(balance/incometotal <= 0.10){
		alert("Your expenses is more than 90%");
	}
	document.querySelector('#bal-total').innerHTML =  balance;
	chart();
	
}
function appendList(description, amount, date, category, division){
	var nodeTR = document.createElement("TR");
	var datatype = document.createAttribute("data-type");
	datatype.value=division;
	nodeTR.setAttributeNode(datatype);
	var nodeTD1 = document.createElement("TD");
	var nodeTD2 = document.createElement("TD");
	var nodeTD3 = document.createElement("TD");
    var nodeTD5 = document.createElement("TD");
	var nodeTD4 = document.createElement("TD");
	var deleteBtn = document.createElement("BUTTON");
	deleteBtn.className="delete";
	
  	var textnodedescription = document.createTextNode(description);
	var textnodeamount = document.createTextNode(amount);
    var textnodedate = document.createTextNode(date);
	var textnodesign = document.createTextNode('-');
	var textnodedollor = document.createTextNode('$');
	var textnodecategory = document.createTextNode(category);
	var textnodedeletebtn= document.createTextNode("-");
    
	
	
	nodeTD1.appendChild(textnodedescription);
	if(division ==='expenses'){
	nodeTD2.appendChild(textnodesign);
	nodeTD2.appendChild(textnodedollor);
	nodeTD2.appendChild(textnodeamount);
	}else{
		nodeTD2.appendChild(textnodedollor);
		nodeTD2.appendChild(textnodeamount);
	}
	nodeTD3.appendChild(textnodecategory);
	
    nodeTD5.appendChild(textnodedate);
	
	deleteBtn.appendChild(textnodedeletebtn);
	nodeTD4.appendChild(deleteBtn);
	
	nodeTR.appendChild(nodeTD1);
	nodeTR.appendChild(nodeTD2);
	nodeTR.appendChild(nodeTD3);
    nodeTR.appendChild(nodeTD5);
	nodeTR.appendChild(nodeTD4);
	
	
  	document.getElementById("list").appendChild(nodeTR);
	
	//setTimeout(delItem,1000);
	delItem();
    
}

//delete list item
function delItem(){
	var del = document.querySelectorAll(".delete");
	
	for(var i=0; i<del.length; i++){
		del[i].onclick=function(){
            var confirmToDelete= confirm("Are you sure?");
            if(confirmToDelete){
                var firstParent = this.parentElement;
                var secondParent = firstParent.parentElement;
                console.log(secondParent.getAttribute("data-type"));
                console.log(secondParent.childNodes[1].innerHTML);
                var division = secondParent.getAttribute("data-type");
                var amount = secondParent.childNodes[1].innerHTML;

                if(division ==="expenses"){
                total(-parseFloat(amount.slice(2)), division );
                }else{
                    total(-parseFloat(amount.slice(1)), division );
                }
                secondParent.remove();
            }
			
		}
	}
}


// Aside menu//
var icon= document.querySelector('#menuImg');
var sideMenu=document.querySelector('#aside');
icon.addEventListener('click', function(){
 
document.querySelector('#menu').style.width="300px";
 sideMenu.style.display="block";

});

document.querySelector('.close').addEventListener('click', function(){
	document.querySelector('#aside').style.display="none";
})

//this will close add income box when pressed cancel button
var closebutton= document.querySelector('#cancel');
closebutton.addEventListener('click',function(){
	
	document.querySelector('#add-income-cat').style.display="none";
	
});

//login page show


	var loginlink= document.querySelector('#login-link');
	loginlink.addEventListener('click',function(){
		document.querySelector('#login-page').style.display='block';
		sideMenu.style.display='none';
	});
// login close
document.querySelector('.close-login').addEventListener('click', function(){
	document.querySelector('#login-page').style.display="none";
});

var loginbtn= document.querySelector("#login");
loginbtn.addEventListener('click', function(){
	let boolresult = login();
	if(boolresult){
	document.querySelector('#login-page').style.display='none';
	
	}

});

// display username at the top of the page.
if(sessionStorage.getItem('userdetail')){
document.querySelector('#username').innerHTML=JSON.parse(sessionStorage.getItem("userdetail"))[0];
document.querySelector("#logout").style.display="block";
}

//verify and login
function login(){
	
	let loginemail = document.querySelector("#loginemail");
	let loginpassword = document.querySelector("#loginpassword");
	// now verify the detail
	if(loginemail.value !== savedata[1] || loginpassword.value !== savedata[2]){
		alert("email or password did not matched");
		return false;
	}else{
		document.querySelector('#defaultSelect').click();
		sessionStorage.setItem('userdetail',JSON.stringify(savedata))
		document.querySelector('#username').innerHTML=JSON.parse(sessionStorage.getItem("userdetail"))[0];
		document.querySelector("#logout").style.display="block";
		loginemail.value="";
		loginpassword.value="";
		return true;
	}
}

//log out
let logout = document.querySelector("#logout");
logout.addEventListener('click',function(){
	sessionStorage.removeItem('userdetail');
	location.reload(true);

});
//sign up show


var signupbtn= document.querySelector('#signup-button');
	signupbtn.addEventListener('click',function(){
		document.querySelector('#signup-page').style.display='block';
		document.querySelector('#login-page').style.display='none';
				
	});
// login close
document.querySelector('.close-signup').addEventListener('click', function(){
	document.querySelector('#signup-page').style.display="none";
});

// now sign up 
var signupsave = document.querySelector("#signup");
signupsave.addEventListener('click', function(){
	let booleanresult = signup(); 
	if(booleanresult)
		document.querySelector('#signup-page').style.display='none';
});

var savedata=[];
function signup(){
	let name = document.querySelector("#signupname");
	let email = document.querySelector("#signupemail");
	let password = document.querySelector("#signuppassword");
	let confirmpassword = document.querySelector("#signupconfirmpassword");
	if (password.value !== confirmpassword.value){
		document.querySelector("#message").innerHTML="password did not matched";
		return false;
	}else{
		savedata=[name.value,email.value,password.value];
		name.value="";
		email.value="";
		password.value="";
		confirmpassword.value="";
		return true;
	}
}

//sign up page end

//tip page show

	var tip= document.querySelector('#tip');
	tip.addEventListener('click',function(){
		document.querySelector('#tip-page').style.display='block';
		sideMenu.style.display='none';
	});
// login close
document.querySelector('.close-tip').addEventListener('click', function(){
	document.querySelector('#tip-page').style.display="none";
});

// chart

function chart(){
let mychart = document.querySelector('#chart').getContext('2d');
    document.querySelector('#chart-place').style.display="block";
    let massChart = new Chart(mychart, {
               type:'pie',
                data:{
                    labels:['Income','Expenses'],
                    datasets:[{
                        label:'Income',
                        data:[incometotal,expensestotal],
                        backgroundColor: ['green','red'],
                        
                        
                    }], 
                     },
                
                options:{
                    title:{
                        //display:true,
                        //text:'see text'
                    }
                }
            });
}
