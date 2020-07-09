$(document).ready(function(){
	ispismenu();
	ispisproizvoda();
	ispisproizvodaindex();
	ispisliste();
	ispisradia();
	ispiscekova();
	footer();
	$(".pol").change(ispispolova);
	$("#marka").change(menjanjevrednosti);
	$("#dugmepretraga").click(pretrazuj);
	$("#gumad").click(salji)
	$("#saljimail").click(proveramail);
});
var c = 0;

function ispisliste(){
	$.ajax({

		url : "data/patike.json",
		method : "GET",
		data : "json", 
		success : function(data){
			semaispisaliste(data)
		},
		error : function(xhr,error,status){
			console.log("ne radi nesto");
		}

	});


	function semaispisaliste(vrednost){

		let imepolja =  [];
		let vrednostpolja = [];


		for(let i = 0 ; i < vrednost.length ; i++){

			if(imepolja.indexOf(vrednost[i].marka.imemarke) === -1){
				imepolja.push(vrednost[i].marka.imemarke)
			}
			if(vrednostpolja.indexOf(vrednost[i].marka.id) === -1){
				vrednostpolja.push(vrednost[i].marka.id)
			}

		}

		let html = `<option value="0">-</option>`;

		for(let i = 0 ; i< vrednostpolja.length ; i++){

			html += `
			<option value="${vrednostpolja[i]}">${imepolja[i]}</option>
			` ;

		}
		if(window.location.href.indexOf('shop.html') > -1 ){
			document.getElementById("marka").innerHTML = html;
		}
	}

}


function productsInCart(){
	return JSON.parse(localStorage.getItem("products"));
}
function ispisradia(){
	$.ajax({

		url : "data/patike.json",
		method : "GET",
		data : "json", 
		success : function(data){
			semaispisaradia(data)
		},
		error : function(xhr,error,status){
			console.log("ne radi nesto");
		}

	});


	function semaispisaradia(vrednost){

		let vrednostpolja = [];


		for(let i = 0 ; i < vrednost.length ; i++){

			if(vrednostpolja.indexOf(vrednost[i].boja) === -1){
				vrednostpolja.push(vrednost[i].boja)
			}


		}

		let html = ``;

		for(let i = 0 ; i< vrednostpolja.length ; i++){

			html += `

			<label for="${vrednostpolja[i]} " class="pr" >${vrednostpolja[i]} : &nbsp;</label> <input type="radio" name="boja" id="${vrednostpolja[i]}" value="${vrednostpolja[i]}" class="boja"> <br>
			
			` ;

		}


		if(window.location.href.indexOf('shop.html') > -1 ){
			document.getElementById("radiji").innerHTML = html;
			$(".boja").change(ispisboja);
			$("#crna").css("margin-right", "5px");
			$("#crvena").css("margin-right", "13px");
		}
	}

}





function ispismenu(){
	$.ajax({

		url : "data/menu.json",
		method : "GET",
		data : "json", 
		success : function(data){
			semaispisamenu(data)
		},
		error : function(xhr,error,status){
			console.log("ne radi nesto");
		}

	});

	function semaispisamenu(vrednost){

		let html = `	<div class="container">
		<a class="navbar-brand" href="${vrednost[0].link1.link}">${vrednost[0].link1.text}</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
		<ul class="navbar-nav ml-auto">
		<li class="nav-item">
		<a class="nav-link active" href="${vrednost[0].link5.link}">${vrednost[0].link5.text}</a>
		</li>
		<li class="nav-item">
		<a class="nav-link active" href="${vrednost[0].link2.link}">${vrednost[0].link2.text}</a>
		</li>
		<li class="nav-item">
		<a class="nav-link active" href="${vrednost[0].link3.link}">${vrednost[0].link3.text}</a>
		</li>
		<li class="nav-item">
		<a class="nav-link active" href="${vrednost[0].link4.link}">${vrednost[0].link4.text} ${drugafja()}</a>
		</li>
		</ul>
		</div>
		</div>`;

		document.getElementById("menu").innerHTML = html;

	}
	

}


















function ispiscekova(){
	$.ajax({

		url : "data/patike.json",
		method : "GET",
		data : "json", 
		success : function(data){
			semaispisacekova(data)
		},
		error : function(xhr,error,status){
			console.log("ne radi nesto");
		}

	});


	function semaispisacekova(vrednost){

		let vrednostpolja = [];


		for(let i = 0 ; i < vrednost.length ; i++){

			if(vrednostpolja.indexOf(vrednost[i].pol) === -1){
				vrednostpolja.push(vrednost[i].pol)
			}


		}

		let html = ``;

		for(let i = 0 ; i< vrednostpolja.length ; i++){

			html += `

			<label for="${vrednostpolja[i]}">ZA ${vrednostpolja[i]} : </label > <input type="checkbox" class="pol" id="${vrednostpolja[i]}" value="${vrednostpolja[i]}" name="${vrednostpolja[i]}"> <br>	
			` ;

		}


		if(window.location.href.indexOf('shop.html') > -1 ){
			document.getElementById("check").innerHTML = html;
			$(".pol").change(ispispolova);
			$("#muski").css("margin-left" , "2px")
		}
	}

}










function menjanjevrednosti(){

	$.ajax({

		url : "data/patike.json",
		method : "GET",
		data : "json", 
		success : function(data){
			uzimanjevrednosti(data)
		},
		error : function(xhr,error,status){
			console.log("ne radi nesto");
		}

	});

	function uzimanjevrednosti(vrednost){
		let niz = [];
		vrednost.forEach(ispis => {

			if(ispis.marka.id == $("#marka").val()){

				niz.push(ispis);

			}else if($("#marka").val() == 0){
				niz.push(ispis);
			}

		});

		semaispisaproizvoda(niz);
	}

}


function ispisproizvoda(){


	$.ajax({

		url : "data/patike.json",
		method : "GET",
		data : "json", 
		success : function(data){
			semaispisaproizvoda(data)
		},
		error : function(xhr,error,status){
			console.log("ne radi nesto");
		}

	});

}
function semaispisaproizvoda(simulare){

	let html = ``;
	simulare.forEach(vrednost => {

		html += `


		<div class="card mr-3 mb-3 text-center" style="width: 20rem;">
		<img class="card-img-top" src="${vrednost.slika.src}" alt="${vrednost.slika.alt}">
		<div class="card-body">
		<h5 class="card-title">${vrednost.imeproizvoda}</h5>
		<p class="card-text">${vrednost.opis}</p>
		</div>
		<ul class="list-group list-group-flush">
		<li class="list-group-item">${vrednost.pol}</li>
		<li class="list-group-item">` 


		vrednost.velicine.forEach(br => {
			html += ` ${br}  `

		})


		html +=  ` </li> 
		<li class="list-group-item">`

		for(let p = 0 ; p< vrednost.zvezdice ; p++){
			html += `<i class="fas fa-star"></i>`
		}

		html +=` </li>
		<li class="list-group-item">${vrednost.cena}‎€</li>
		</ul>
		<div class="card-body text-center">
		<button type="button" name="korpa" data-id="${vrednost.id}"  id="korpa" class=" korpa btn btn-dark">STAVI U KORPU  <span class="sakri"><i class="fas fa-check"></i></span></button> 
		</div>
		</div>`;


	});
	if(window.location.href.indexOf('shop.html') > -1 ){

		document.getElementById("kartice").innerHTML = html;
	}
	$(".sakri").hide();
	$(".korpa").click(dodajukorpu);
}

function ispisboja(){
	$.ajax({

		url : "data/patike.json",
		method : "GET",
		data : "json", 
		success : function(data){
			radiopolje(data)
		},
		error : function(xhr,error,status){
			console.log("ne radi nesto");
		}

	});

	function radiopolje(vrednost){
		let niz = [];
		vrednost.forEach(jedan => {


			if(jedan.boja == $(".boja:checked").val() ) {

				niz.push(jedan);

			}


		});

		semaispisaproizvoda(niz);


	}
}
function ispispolova(){
	c++
	$.ajax({

		url : "data/patike.json",
		method : "GET",
		data : "json", 
		success : function(data){
			checkopolje(data);
		},
		error : function(xhr,error,status){
			console.log("ne radi nesto");
		}

	});


	function checkopolje(vrednost){
		var nizzacheck = [];
		var nizzacheck2 = [];
		if(!($(".pol:checked").val() == undefined || c > 1 )){
			vrednost.forEach(jedan => {


				if(jedan.pol == $(".pol:checked").val() ) {

					nizzacheck.push(jedan);

				}

			});
			semaispisaproizvoda(nizzacheck);

		}

		else if($(".pol:checked").val() == undefined || c >1 ){


			c = c-2;

			vrednost.forEach(jedan => {



				
				nizzacheck2.push(jedan);



			});
			semaispisaproizvoda(nizzacheck2);

		}
	}
}


function pretrazuj(){
	$.ajax({

		url : "data/patike.json",
		method : "GET",
		data : "json", 
		success : function(data){
			semapretrage(data);
		},
		error : function(xhr,error,status){
			console.log("ne radi nesto");
		}

	});

	function semapretrage(data){

		var niz = data.filter(el => {
			if(el.imeproizvoda.toLowerCase().indexOf($("#pretraga").val().toLowerCase()) != -1){
				return el;
			}

		});

		semaispisaproizvoda(niz);

	}
}
function drugafja(){
	var b = [];
	if(JSON.parse(localStorage.getItem("products")) == null){
		return b.length;
	} else if(JSON.parse(localStorage.getItem("products")) != null){
		if(JSON.parse(localStorage.getItem("products")).length == undefined){
			return b.length;
		}else{
			return JSON.parse(localStorage.getItem("products")).length;
		}
	}
}
function dodajukorpu(){
	let id = $(this).data("id");
	$(this).children(".sakri").show();

	setTimeout(function(){ $(".sakri").hide(); }, 2500);

	
	let patike = JSON.parse(localStorage.getItem("products"));
	if(patike){
		if(patikealeradyforcard()){
			updatekolicina();
		}else {
			dodajpatiku();
			ispismenu();
		}
	}else{
		prviukorpi();
		ispismenu();
	}

	function patikealeradyforcard(){
		return patike.filter(p=>p.id == id).length;
	}

	function dodajpatiku() {
		let patike = JSON.parse(localStorage.getItem("products"));
		patike.push({
			id : id,
			quantity : 1
		});
		localStorage.setItem("products" , JSON.stringify(patike));
		console.log(localStorage);
	}


	function updatekolicina() {
		let patike = JSON.parse(localStorage.getItem("products"));
		for(let i in patike)
		{
			if(patike[i].id == id) {
				patike[i].quantity++;
				break;
			}      
		}

		localStorage.setItem("products", JSON.stringify(patike));
	}



	function prviukorpi() {
		let patike = [];
		patike[0] = {
			id : id,
			quantity : 1
		};
		localStorage.setItem("products", JSON.stringify(patike));
	}
	function clearCart() {
		localStorage.removeItem("products");
	}

}

function footer(){
	var html = `<div class="container">
	<div class="row">
	<div class="col-lg-6 text-center"><br><br>
	<img src="img/ja.jpg" alt="ja" class="w-10">
	</div>
	<div class="col-lg-6 text-center">
	<br><br><h3>Vuk Zdravkovic 53/18</h3><br><br>
	<p>Pozdrav, ja sam Vuk Zdravkovic student Visoke ICT škole u Beogradu <br><br>
	Ovo je web shop "TIKE SHOP" radjen za predment Web programiranje 2 . <br> <br>Jedne od tehnologija koje su ukljucene u ovom projektu su AJAX,JAVASCRIPT(JQUERY), CSS .. itd</p><br><br><br>
	<a href="https://www.facebook.com/" class="pr-3 text-light"><i class="fab fa-facebook fa-2x text-light"></i></a>
	<a href="https://twitter.com/login?lang=sr" class="pr-3 text-light"><i class="fab fa-twitter fa-2x text-light"></i></a>
	<a href="sitemap.xml" class="pr-3 text-light"><i class="fas fa-sitemap fa-2x text-light"></i></a>
	<a href="dokumentacija.pdf" class="pr-3 text-light"><i class="fas fa-file-pdf fa-2x"></i></a>
	</div>
	</div>
	</div><br><br><br>`;

	document.querySelector("footer").innerHTML = html;
}


if(window.location.href.indexOf('kontakt.html') > -1 ){




	function salji(){
		var name = document.getElementById("name").value;
		var email = document.getElementById("email").value;
		var question = document.getElementById("question").value;
		var regname = /^[A-z]{2,15}$/;
		var regemail =   /^[a-z]+[\.\-\_\!a-z\d]*\@[a-z]{2,10}(\.[a-z]{2,3}){1,2}$/ ;
		var regquestion = /^[A-z\d\-\_\.\:]{2,150}$/;

		if(name == "" || question == ""  || email == ""){
			document.getElementById("ispis").innerHTML = `* Morate popuniti sva polja ` ;
			document.getElementById("beli").innerHTML = ' ' ;
			document.getElementById("name").classList.add('crveniokvir');
			document.getElementById("question").classList.add('crveniokvir');
			document.getElementById("email").classList.add('crveniokvir');
		}else{

			document.getElementById("ispis").innerHTML = '' ;
			if(!regname.test(name) ){

				document.getElementById("name").classList.add('crveniokvir');
				document.getElementById("ispisime").innerHTML = `* Ime mora imati vise od 1 slova a najvise 15 ` ;
			}else if(regname.test(name)){

				document.getElementById("name").classList.remove('crveniokvir');
				document.getElementById("ispisime").innerHTML = ' ' ;		
			}

			if(!regemail.test(email) ){


				document.getElementById("email").classList.add('crveniokvir');
				document.getElementById("ispisemail").innerHTML = `* Niste dobro upisali svoj email ` ;
			}
			else if(regemail.test(email)){

				document.getElementById("ispisemail").innerHTML = ' ' ;	
				document.getElementById("email").classList.remove('crveniokvir');	
			}
			if(!regquestion.test(question)){

				document.getElementById("question").classList.add('crveniokvir');
				document.getElementById("ispisquestion").innerHTML = `* Niste dobro popunili polje za pitanje  ` ;
			}
			else if(regquestion.test(question)){

				document.getElementById("ispisquestion").innerHTML = ' ' ;	
				document.getElementById("question").classList.remove('crveniokvir');	
			}
			if((regquestion.test(question) && regemail.test(email) && regname.test(name)) == true ){
				document.getElementById("beli").innerHTML = 'Uspesno poslata poruka' ;
			}if((regquestion.test(question) && regemail.test(email) && regname.test(name)) == false){
				document.getElementById("beli").innerHTML = ' ' ;
			}


		}

	}
}



function ispisproizvodaindex(){


	$.ajax({

		url : "data/patike.json",
		method : "GET",
		data : "json", 
		success : function(data){
			semaispisaindex(data)
		},
		error : function(xhr,error,status){
			console.log("ne radi nesto");
		}

	});

}
function semaispisaindex(simulare){

	let html = ``;
	simulare.forEach(function(vrednost,index) {

		if(index > 1 && index < 6){

			html += `



			<div class="col-lg-3 col-md-12">
			
			<div class="card text-center" >

			<img src="${vrednost.slika.src} " style="height:200px" alt="${vrednost.slika.alt} class="card-img-top">
			<div class="card-body">
			<h5 class="card-title">${vrednost.imeproizvoda}</h5>
			<p class="card-text">${vrednost.opis}</p>
			<a href="shop.html" class="btn btn-outline-dark">PRONADJI PROIZVOD</a>
			</div>
			</div><br/><br/>

			</div> `;


		}});
	if(window.location.href.indexOf('index.html') > -1 ){

		document.getElementById("nekiprozizvodi").innerHTML = html;
	}
	
}




if(window.location.href.indexOf('index.html') > -1 ){




	function proveramail(){
		var email = document.getElementById("email").value;
		var regemail =   /^[a-z]+[\.\-\_\!a-z\d]*\@[a-z]{2,10}(\.[a-z]{2,3}){1,2}$/ ;

		

		if(!regemail.test(email) ){


			document.getElementById("email").classList.add('crveniokvir');
			document.getElementById("uspesno").innerHTML = ` <i class="fas fa-exclamation text-danger pr-2"></i> ` ;
			setTimeout(function(){
				document.getElementById("uspesno").innerHTML = ``;
			},4000)	
		}
		else if(regemail.test(email)){

			document.getElementById("email").classList.remove('crveniokvir');
			document.getElementById("uspesno").innerHTML = ` <i class="fas fa-check text-success pr-2"></i></span> `;
			setTimeout(function(){
				document.getElementById("uspesno").innerHTML = ``;
			},4000)	;
		}
		

	}
}
