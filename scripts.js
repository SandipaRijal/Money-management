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
	
	//call appendList to add transaction in html
	appendList(description.value,amount.value, category, division);
	total(amount.value, division)
	
	var catAdd = document.querySelector('#add-income-cat');
	catAdd.style.display='none';
	description.value='';
	amount.value='';
});


// this function totals expenses or income and display in respective division.
function total(amount, division){
	var incometotal= parseFloat(document.querySelector('#in-total').innerHTML);
	var expensestotal= parseFloat(document.querySelector('#ex-total').innerHTML);
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
		alert("your expenses is more than 90%");
	}
	document.querySelector('#bal-total').innerHTML =  balance;
	
	
}
function appendList(description, amount, category, division){
	var nodeTR = document.createElement("TR");
	var datatype = document.createAttribute("data-type");
	datatype.value=division;
	nodeTR.setAttributeNode(datatype);
	var nodeTD1 = document.createElement("TD");
	var nodeTD2 = document.createElement("TD");
	var nodeTD3 = document.createElement("TD");
	var nodeTD4 = document.createElement("TD");
	var editBtn = document.createElement("BUTTON");
	var deleteBtn = document.createElement("BUTTON");
	editBtn.className="edit";
	deleteBtn.className="delete";
	
  	var textnodedescription = document.createTextNode(description);
	var textnodeamount = document.createTextNode(amount);
	var textnodesign = document.createTextNode('-');
	var textnodedollor = document.createTextNode('$');
	var textnodecategory = document.createTextNode(category);
	var textnodeeditbtn = document.createTextNode("Edit");
	var textnodedeletebtn= document.createTextNode("Delete");
	
	
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
	
	editBtn.appendChild(textnodeeditbtn);
	deleteBtn.appendChild(textnodedeletebtn);
	nodeTD4.appendChild(editBtn);
	nodeTD4.appendChild(deleteBtn);
	
	nodeTR.appendChild(nodeTD1);
	nodeTR.appendChild(nodeTD2);
	nodeTR.appendChild(nodeTD3);
	nodeTR.appendChild(nodeTD4);
	
	
  	document.getElementById("list").appendChild(nodeTR);
	
	//setTimeout(delItem,1000);
	delItem();
}

//delete
function delItem(){
	var del = document.querySelectorAll(".delete");
	
	for(var i=0; i<del.length; i++){
		del[i].onclick=function(){
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
			secondParent.style.display="none";
			
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


	var login= document.querySelector('#login');
	login.addEventListener('click',function(){
		document.querySelector('#login-page').style.display='block';
		sideMenu.style.display='none';
	});
// login close
document.querySelector('.close-login').addEventListener('click', function(){
	document.querySelector('#login-page').style.display="none";
});

//sign up show


var signup= document.querySelector('#signup-button');
	signup.addEventListener('click',function(){
		document.querySelector('#signup-page').style.display='block';
		document.querySelector('#login-page').style.display='none';
	});
// login close
document.querySelector('.close-signup').addEventListener('click', function(){
	document.querySelector('#signup-page').style.display="none";
});

//edit transactions

