$(document).ready(function () {

    ispismenu();

    if(JSON.parse(localStorage.getItem("products")) == null){
       praznakorpa();
   } else if(JSON.parse(localStorage.getItem("products")) != null){
    if(JSON.parse(localStorage.getItem("products")).length == undefined){
        praznakorpa();
    }else{
        prikazproizvoda();
    }
}
footer();


});

function prikazproizvoda() {
    
    let patike = proizvodiukorpi();

    $.ajax({
        url : "data/patike.json",
        success : function(data) {
            let productsForDisplay = [];

            //izdvajanje objekata dohvacenih ajaxom tako da tu budu samo objekti koji su u localstorage i dodavanje kolicine




            data = data.filter(p => {
                for(let prod of patike)
                {
                    if(p.id == prod.id) {
                        p.quantity = prod.quantity;
                        return true;
                    }
                    
                }
                return false;
            });
            
            pravljenjetableproizvoda(data);
        }
    });
}

function pravljenjetableproizvoda(patike) {
    let html = `<ul class="list-group">


    <li class="list-group-item text-center bg-dark text-light">
    

    <div class="container-fluid">
    <div class="row ">
    <div class="col-2 border-left border-right justify-content-center">SLIKA </div>
    <div class="col-4 border-left border-right d-flex align-items-center justify-content-center">
    IME PROIZVODA
    </div>
    <div class="col-3 border-left border-right d-flex align-items-center justify-content-center">KOLIČINA</div>
    <div class="col-2 border-left border-right d-flex align-items-center justify-content-center">CENA</div>
    
    <div class="col-1 border-left border-right  d-flex align-items-center justify-content-right justify-content-center">
    <i class="fas fa-trash-alt"></i>
    </div>
    </div>
    </div>


    </li>`;
    
    for(let p of patike) {
        html += generateTr(p);
    }

    html +=`           <li class="list-group-item">
    <div class="container">
    <div class="row pb-2 pt-2 sveee">
    <div class="col-4">
    <button class="btn btn-outline-dark klik"> NARUČI <i class="fas fa-check"></i> </button>
    </div>
    <div class="col-4 text-center">
    <button class="btn btn-dark brisii"> OBRISI SVE <i class="fas fa-trash"></i> </button>
    </div>
    <div class="col-4 text-right pt-1">
    <span class="text-dark  font-weight-bold ukupno" id="ukupno">  </span>
    </div>
    </div>
    </div>
    </li>      </ul> <br/><br/><br/>`;

    $("#content").html(html);
    racunanje();
    $(".radi").blur(menjanjecene);
    $(".brisii").click(brisisve);
    function generateTr(p) {



        return `
        <li class="list-group-item">
        <div class="container-fluid">
        <div class="row ">
        <div class="col-2 h-50 border-left border-right d-flex justify-content-center"><img src="${p.slika.src}" class="img-fluid" alt="${p.slika.alt}"></div>
        <div class="col-4 pt-3 border-left border-right d-flex align-items-center justify-content-center">
        <p>${p.imeproizvoda}</p>
        </div>
        <div class="col-3 border-left border-right d-flex align-items-center justify-content-center text-dark">
        <input type="number"  min="1" max="1000"  value="${p.quantity}" data-id="${p.id}" class="text-center form-control radi">
        </div>
        <div class="col-2 pt-3 border-left border-right d-flex align-items-center justify-content-center text-dark">
        <p>${p.cena}</p>
        </div>
        
        <div class="col-1 pt-3 text-dark border-left border-right  d-flex align-items-center justify-content-right justify-content-center">
        <div class=""><button onclick='brisanjeizkorpe(${p.id})' class="btn btn-dark">X</button> </div>

        </div>
        </div>
        </div>
        </li>
        
        `;
    }
}

function praznakorpa() {
   





  let html = `<ul class="list-group">


  <li class="list-group-item text-center bg-dark text-light">
  

  <div class="container-fluid">
  <div class="row ">
  <div class="col-2 border-left border-right justify-content-center">SLIKA </div>
  <div class="col-4 border-left border-right d-flex align-items-center justify-content-center">
  IME PROIZVODA
  </div>
  <div class="col-3 border-left border-right d-flex align-items-center justify-content-center">KOLIČINA</div>
  <div class="col-2 border-left border-right d-flex align-items-center justify-content-center">CENA</div>
  
  <div class="col-1 border-left border-right  d-flex align-items-center justify-content-right justify-content-center">
  <i class="fas fa-trash-alt"></i>
  </div>
  </div>
  </div>


  </li>
  <li class="list-group-item text-center  text-dark">
  
  <h4>KORPA JE PRAZNA - <a href="shop.html"><button class="btn btn-outline-dark">PRONADJI PATIKE</button> </a></h4>
  


  </li>
  

  </ul>`;

  $("#content").html(html);


}



function menjanjecene() {
    let patike = JSON.parse(localStorage.getItem("products"));
    var id = $(this).data("id");
    var idemoo = $(this).val();
    for(let i in patike)
    {
        if(patike[i].id == id) {
            if(idemoo < 1){
                idemoo = 1;
            }else if(idemoo > 300){
                idemoo = 300;
            }
            patike[i].quantity = idemoo;
            $("#ukupno").load("korpa.html");
            
            break;
        }      
    }

    localStorage.setItem("products", JSON.stringify(patike));
}


function brisisve(){
    localStorage.setItem("products", JSON.stringify(0));
    $(".list-group").load("korpa.html");

}



function racunanje(){
    
    $.ajax({

        url : "data/patike.json",
        method : "GET",
        data : "json", 
        success : function(data){
            semaracuna(data);
        },
        error : function(xhr,error,status){
            console.log("ne radi nesto");
        }

    });
    function semaracuna(vrednosti){
        var broj = 0;


        var patike = proizvodiukorpi();

        patike.forEach(racunaj => {
          
          broj += vrednosti[racunaj['id']-1].cena * racunaj['quantity'];  


      });
        $("#ukupno").html("<h2>" + broj + "EUR</h2>");
    }

}

function proizvodiukorpi(){
   return JSON.parse(localStorage.getItem("products"));
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

function brisanjeizkorpe(id) {
    let patike = proizvodiukorpi();
    let filtered = patike.filter(p => p.id != id);
    ispismenu();
    localStorage.setItem("products", JSON.stringify(filtered));

    prikazproizvoda();

    if(proizvodiukorpi().length == 0){
     ispismenu();
     praznakorpa();
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

        let html = `    <div class="container">
        <a class="navbar-brand" href="${vrednost[0].link1.link}">${vrednost[0].link1.text}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">

        <li class="nav-item">
        <a class="nav-link active" href="${vrednost[0].link2.link}">${vrednost[0].link2.text}</a>
        </li>
        <li class="nav-item">
        <a class="nav-link active" href="${vrednost[0].link3.link}">${vrednost[0].link3.text}</a>
        </li>
        <li class="nav-item reset">
        <a class="nav-link active" href="${vrednost[0].link4.link}">${vrednost[0].link4.text} ${drugafja()}</a>
        </li>
        </ul>
        </div>
        </div>`;

        document.getElementById("menu").innerHTML = html;

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
