/* Con esto vamos a conseguir que cojamos todos los enlaces, creamos un blucle para recorrerlos , en cada enlace ponemos un listener que va a ser un Listener
cada vez que nos hacen un click, eliminamos todas las clases activo y al target osea al elemnto que han hecho el click le  ponemos la clse activo*/ 
let enlaces = document.querySelectorAll('.lista li a');

enlaces.forEach((element)=>{
    element.addEventListener('click',(event)=>{
        //console.log(event.target)
        enlaces.forEach((link)=>{
            link.classList.remove('activo')

        })
        /* event.target.classList.add('activo');
        menu.style.left = '-100%'; *//*esto hace que cuando demos click a cualquier section de
        la pagina se esconda el menu y nos muestre la section*/

    })
    
}) 

 
/*******MENÚ HAMBURGUESA*********/
let btnMenu = document.querySelector('.btn-menu');
let barIconX = document.querySelector('.btn-menu i');
let menu = document.querySelector('.lista-content');

let activador = true;

btnMenu.addEventListener('click',()=>{
    barIconX.classList.toggle('fa-times');
    
    if(activador){
        menu.style.left = '0';
        activador =false;
    }else{
        menu.style.left = '-100%';
        activador = true;

    }
});






/***************ARCHIVO XML*******************/

function cargar (){
    var objHttp = null;
    if(window.XMLHttpRequest){
        objHttp = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        objHttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    objHttp.open("GET","texto" + ".xml", true); //con el true hacemos que sea conexion asincrona, aqui le estamos pidiendo al servidor 
    //que nos envie el texto
    objHttp.onreadystatechange = function() { //con esto esperamos a que nos llegue y cuando recibamos la peticion ejecutamos lo de dentro del codigo
        if(objHttp.readyState== 4){//4 SIGNIFICA QUE HEMOS RECIBIDO LO QUE PEDIMOS
            document.getElementById('caja').innerHTML = objHttp.responseText;//aqui escribimos en la caja lo que nos han mandado 
        }else{
            console.log("hubo un problema")
        }
    } 
    objHttp.send(null);
    
}



/***************FORMULARIO********************/

var miBoton = document.getElementById("enviar");
var miForm = document.querySelector("#formulario");

miBoton.addEventListener("click",(evento)=>{
    evento.preventDefault();//con esto desactivamos el evento de enviar del boton enviar 

    let valido = validar();

    if(valido==true){
        miForm.submit();
    }
    
   

});


function validar(){
    let nombre = document.getElementById("Nombre");
    let apellido = document.getElementById("apellido");
    let telefono = document.getElementById("telefono");
    let correo = document.getElementById("correo");
    let privacidad = document.getElementById("privacidad");
    let meses = document.getElementById("plazo");
    
    
    let correcto = true;
    let name_re = /^[a-zA-Z ]{2,30}$/; //en el parametro de letras se puede dejar un espacio para que validen los espacios en blanco..
    let numeros = /^[0-9,$]{9}$/;
    let numeros2 = /^[1-3,$]{1}$/;
    let email = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    /*************NOMBRE****************/
    
    if(nombre.value== null || nombre.value==""){
        setError(nombre,"Rellena el campo nombre ");
        correcto = false;//tiene que retornar false ya que no se cumplen las condiciones 
    }else if(!name_re.exec(nombre.value)){//exec es un metodo que valida si se cumplen las expresiones regulares en este caso guardadas en name_re
        setError(nombre,"te comiste letras en nombre ");

        correcto = false;
    }else{
        setSuccess(nombre);
    }


    /*************APELLIDO**************/

    if(apellido.value == null || apellido.value ==""){
        setError(apellido,"Rellena el campo apellido ");
        correcto = false;//tiene que retornar false ya que no se cumplen las condiciones 
    }else if(!name_re.exec(apellido.value)){//exec es un metodo que valida si se cumplen las expresiones regulares en este caso guardadas en name_re
       setError(apellido,"te comiste letras en apellido ");

        correcto = false;
    }else{
        setSuccess(apellido);
    }

    /**************TELÉFONO**************/

    if(telefono.value == null || telefono.value == ""){
        setError(telefono, "Rellene el campo teléfono ");
        correcto = false;
    }else if(!numeros.exec(telefono.value)){
        setError(telefono,"solo numeros  y solo 9 caracteres");
        correcto = false;
    }else{
        setSuccess(telefono);
    }



    /*************CORREO**************/

    if(correo.value == null || correo.value ==""){
        setError(correo,"Rellena el campo correo ");
        correcto = false;//tiene que retornar false ya que no se cumplen las condiciones 
    }else if(!email.exec(correo.value)){//exec es un metodo que valida si se cumplen las expresiones regulares en este caso guardadas en name_re
       setError(correo,"te comiste letras en correo ");

        correcto = false;
    }else{
        setSuccess(correo);
    }

    /**************Plazo****************+*/ 

    if(meses.value == null || meses.value == ""){
        setError(meses, "Rellene el campo plazo ");
        correcto = false;
    }else if(!numeros2.exec(meses.value)){
        setError(meses,"solo numeros  del 1 al 3 y solo 1 caracter");
        correcto = false;
    }else{
        setSuccess(meses);
    }


    /***********PRIVACIDAD*************/
    if(!privacidad.checked){
        setError(privacidad,"Acepte las condiciones de privacidad");
 
         correcto = false;
     }else{
         setSuccess(privacidad);
     }
 
     if(correcto == true){
         return true;
     }else{
         
         return false;
     }
   

    

}  

function setError(input,mensaje){// input es el  primer parametro (osea seria telefono,privacidad etc...) y el segundo paramtro seria el mensaje (que va entre comillas) 
    const formControl = input.parentElement; // aqui creamos una constante y le asignamos el elemento Padre del input (osea el div)
    const small = formControl.querySelector("small");//aqui lo que hacemos es guardar en la const small la etiqueta small del elemento padre (de ese padre no de otro padre)
    formControl.className = "form-control error";
    small.innerText = mensaje;
    
}

function setSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

/*****************PRESUPUESTO********************/



(()=>{//funcion autoejecutable
    let sumaTotal=0;
    
    
    const temas = document.getElementById("temas");
    const plazo=document.getElementById("plazo");
    const casillas=document.querySelectorAll("#check>input");
    const presu= document.getElementById("presupuesto");



    let suma = ()=>{
        sumaTotal = parseInt(temas.value);

        switch (plazo.value) {
            case "1":
                sumaTotal -= (0.1*100) ;
                break;

            case "2":
                sumaTotal -= (0.2*100);
                break;

            case "3":
                sumaTotal -= (0.3*100);
                break;
        
            default:
                sumaTotal += 0;
                break;
        }

        casillas.forEach(element => {
            if(element.checked){
                sumaTotal += parseInt(element.value);
            }
        });

        presu.value = sumaTotal;
    }    

    casillas.forEach(element => {
        element.addEventListener("change",suma,false);
    });

    temas.addEventListener("change",suma,false);//el evento change hace que cuando el valor de temas cambie, tambien cambie el valor del presu. 
    plazo.addEventListener("change",suma,false);
})();


/***************CONTACTO************/

/*-----Ponemos el mapa---------*/ /*Con esto visulaizamos el mapa*/
var map = L.map('map').setView([40.4274788, -3.7070391], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



/*-----Creamos un popup---------*/
var popup = L.popup()
    .setLatLng([41.6558, -0.9974])
.setContent('<a href="https://www.youtube.com/watch?v=YcAW-VbTYnY" target="_blank">Estoy aquí</a>');

/*-----Ponemos Una marca en el mapa Y ponemos un texto de abogados con bindTooltip---------*/
///var marker = L.marker([41.6558,-0.9974]).bindPopup(popup).openPopup().addTo(map);
var marker = L.marker([40.4274788, -3.7070391]).bindTooltip('<a href="https://www.youtube.com/watch?v=YcAW-VbTYnY" target="_blank">ABOGADOS</a>').openTooltip().addTo(map);


//L.marker([41.6558, -0.9974]).addTo(map).bindPopup('<a href="https://www.youtube.com/watch?v=YcAW-VbTYnY" target="_blank">Estoy aquí</a>').openPopup();