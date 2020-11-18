//Verificar se teremos que usar o metodo Array.from() de novo.
const axios = require('axios')


document.addEventListener('DOMContentLoaded', () => {
    var carouselSlides = document.getElementById("carousel-inner")

    var quantityOfCardEventos = 0;
    var allCardEventos = Array.from(document.querySelectorAll('.card-eventos'))
    var allCarouselItem = Array.from(document.querySelectorAll('.carousel-item'))
    var allCarouselTr = Array.from(document.querySelectorAll('.identifier-row'))
    console.log(allCardEventos.length)
    console.log(allCarouselItem.length)
    quantityOfCardEventos = allCardEventos.length
 

    var IMAGEM_PRINCIPAL_EVENTO
    var DATA_DO_EVENTO
    var DESCRICAO_DO_EVENTO
    var DESCRICAO_DO_EVENTO_2
    var PHOTO2_DO_EVENTO
    var PHOTO3_DO_EVENTO
    var PHOTO4_DO_EVENTO
    var CONTATO_DO_EVENTO


    //Verificar se teremos que usar o metodo Array.from() de novo.
    //Verificar se teremos que usar o metodo Array.from() de novo.

    if(quantityOfCardEventos % 3 == 0){ //Tem que adicionar uma nova pagina 
        carouselSlides.innerHTML += "<div class=\"carousel-item \"> <table class=\"table-card-eventos\" align=\"center\" style=\"padding: 20px;\"><tr class=\"identifier-row\">  <td><div class=\"card-eventos\" style=\"width: 18rem;\"><div class=\"card-body-eventos\"><table class=\"content-of-event-card\"><tr><img class=\"card-eventos-img-top\" src="+IMAGEM_PRINCIPAL_EVENTO+" alt=\"Card image cap\"></tr><tr><td><div class=\"event-date-box\"><p class=\"event-date\"> "+DATA_DO_EVENTO+" </p></div></td><td style=\"margin-right: 5px;\"><div class=\"event-descript1-box\"><p class=\"event-descript1\"> "+DESCRICAO_DO_EVENTO+" </p></div></td></tr></table><div class=\"event-descript2\"><p> "+DESCRICAO_DO_EVENTO_2+" </p></div><table class=\"event-photos\"><tr><td><img class=\"event-photo\" src="+PHOTO2_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO3_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO4_DO_EVENTO+" alt=\"Here goes an image!\"></td></tr></table><div class=\"event-contact\"><center> <p> "+CONTATO_DO_EVENTO+" </p> </center></div></div></div></td>  </tr></table></div>"
        //allCarouselItem = Array.from(document.querySelectorAll('.carousel-item'))
        //var lastCarouselItem = allCarouselItem[allCarouselItem.length - 1]
        //lastCarouselItem.innerHTML += "<div style=\"background-color: red; width: 50px; height: 50px;\"> </div>"
    }
    if(true){ //Tem um ou dois espacos vagos na ultima pagina.
        allCarouselTr = Array.from(document.querySelectorAll('.identifier-row'))
        var lastTr = allCarouselTr[allCarouselTr.length - 1]
        lastTr.innerHTML += "<td><div class=\"card-eventos\" style=\"width: 18rem;\"><div class=\"card-body-eventos\"><table class=\"content-of-event-card\"><tr><img class=\"card-eventos-img-top\" src="+IMAGEM_PRINCIPAL_EVENTO+" alt=\"Card image cap\"></tr><tr><td><div class=\"event-date-box\"><p class=\"event-date\"> "+DATA_DO_EVENTO+" </p></div></td><td style=\"margin-right: 5px;\"><div class=\"event-descript1-box\"><p class=\"event-descript1\"> "+DESCRICAO_DO_EVENTO+" </p></div></td></tr></table><div class=\"event-descript2\"><p> "+DESCRICAO_DO_EVENTO_2+" </p></div><table class=\"event-photos\"><tr><td><img class=\"event-photo\" src="+PHOTO2_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO3_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO4_DO_EVENTO+" alt=\"Here goes an image!\"></td></tr></table><div class=\"event-contact\"><center> <p> "+CONTATO_DO_EVENTO+" </p> </center></div></div></div></td>"

        //var lastCarouselItem = allCarouselItem[allCarouselItem.length - 1]
        //lastCarouselItem.append("<div style=\"background-color: red; width: 50px; height: 50px;\"> </div>")    
    }

    

})
