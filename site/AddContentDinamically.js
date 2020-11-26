//Verificar se teremos que usar o metodo Array.from() de novo.

var contentBd
var finalBd
var userid = "-1"

function redirect(){
    window.location.href = "https://adota-ai.herokuapp.com/eventos.html";
}

async function getEventsInfo(document){
    await axios.get('https://adota-ai-backend.herokuapp.com/event')
      .then(async resp => {
        if(localStorage.getItem('token')){
            await axios.post('https://adota-ai-backend.herokuapp.com/auth/requestuser', {
                token : localStorage.getItem('token')
            })
            .then(resp => {
                userid = resp.data._id;    
            })
        }

        contentBd = resp.data;
        finalBd = contentBd['events'] //Assim eu consigo acessar cada um dos eventos que se encontram presentes dentro do meu bd.
        console.log(finalBd);

        var carouselSlides = document.getElementById("carousel-inner")

        var quantityOfCardEventos = 0;
        var allCardEventos = Array.from(document.querySelectorAll('.card-eventos'))
        var allCarouselItem = Array.from(document.querySelectorAll('.carousel-item'))
        var allCarouselTr = Array.from(document.querySelectorAll('.identifier-row'))
        console.log(allCardEventos.length)
        console.log(allCarouselItem.length)
        quantityOfCardEventos = allCardEventos.length
 
        var IMAGEM_PRINCIPAL_EVENTO = ""
        var DATA_DO_EVENTO = ""
        var DESCRICAO_DO_EVENTO = ""
        var DESCRICAO_DO_EVENTO_2 = ""
        var PHOTO2_DO_EVENTO = ""
        var PHOTO3_DO_EVENTO = ""
        var PHOTO4_DO_EVENTO = ""
        var CONTATO_DO_EVENTO = ""
        var ID_DONO_EVENTO = ""
        var d = ""
        var date = []
        var date1 = ""
        var aux = []
        var year = ""
        //Verificar se teremos que usar o metodo Array.from() de novo.
        //Verificar se teremos que usar o metodo Array.from() de novo.

        for(var i = 0; i < finalBd.length; i++){
            IMAGEM_PRINCIPAL_EVENTO = finalBd[i]['photos'][0]
            /* Realizando o tratamento de formatacao de data*/
            d = finalBd[i]['eventDate']
            date = d.split('T')
            date1 = date[0]
            aux = date1.split('-') 
            //aux[0] -> year
            //aux[1] -> month
            //aux[2] -> day
            year = aux[0].substr(2,2)
            DATA_DO_EVENTO = aux[2] + "/" + aux[1] + "/" + year
            //console.log("data do evento: " + DATA_DO_EVENTO)
            /************************************************/
            DESCRICAO_DO_EVENTO = finalBd[i]['generalInfo']
            DESCRICAO_DO_EVENTO_2 = finalBd[i]['extraInfo']
            PHOTO2_DO_EVENTO = finalBd[i]['photos'][1]
            PHOTO3_DO_EVENTO = finalBd[i]['photos'][2]
            PHOTO4_DO_EVENTO = finalBd[i]['photos'][3]
            CONTATO_DO_EVENTO = finalBd[i]['ownerContact']
            ID_DONO_EVENTO = finalBd[i]['userId']

            if(i % 3 == 0){ //Tem que adicionar uma nova pagina 
                if(ID_DONO_EVENTO == userid){ //Mostro o botao de deletar
                    carouselSlides.innerHTML += "<div class=\"carousel-item \"> <table class=\"table-card-eventos\" align=\"center\" style=\"padding: 20px;\"><tr class=\"identifier-row\">  <td><div class=\"card-eventos\" style=\"width: 18rem; height: 33rem;\"><div class=\"card-body-eventos\" style=\"height: 33rem;\"><table class=\"content-of-event-card\"><tr><img class=\"card-eventos-img-top\" src="+IMAGEM_PRINCIPAL_EVENTO+" alt=\"Card image cap\"></tr><tr><td><div class=\"event-date-box\"><p class=\"event-date\"> "+DATA_DO_EVENTO+" </p></div></td><td style=\"margin-right: 5px;\"><div class=\"event-descript1-box\"><p class=\"event-descript1\"> "+DESCRICAO_DO_EVENTO+" </p></div></td></tr></table><div class=\"event-descript2\"><p> "+DESCRICAO_DO_EVENTO_2+" </p></div><table class=\"event-photos\"><tr><td><img class=\"event-photo\" src="+PHOTO2_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO3_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO4_DO_EVENTO+" alt=\"Here goes an image!\"></td></tr></table><div class=\"event-contact\"><center> <p> "+CONTATO_DO_EVENTO+" </p></center></div><div> <center><a href=\"#\" class=\"btn btn-primary botao-deletar\" id="+i.toString()+" style=\"background-color: red; height: 40px; color: black;\"> Deletar </a></center></div></div></div></td>  </tr></table></div>"
                }else{ //Nao mostro o botao de deletar
                    carouselSlides.innerHTML += "<div class=\"carousel-item \"> <table class=\"table-card-eventos\" align=\"center\" style=\"padding: 20px;\"><tr class=\"identifier-row\">  <td><div class=\"card-eventos\" style=\"width: 18rem;\"><div class=\"card-body-eventos\"><table class=\"content-of-event-card\"><tr><img class=\"card-eventos-img-top\" src="+IMAGEM_PRINCIPAL_EVENTO+" alt=\"Card image cap\"></tr><tr><td><div class=\"event-date-box\"><p class=\"event-date\"> "+DATA_DO_EVENTO+" </p></div></td><td style=\"margin-right: 5px;\"><div class=\"event-descript1-box\"><p class=\"event-descript1\"> "+DESCRICAO_DO_EVENTO+" </p></div></td></tr></table><div class=\"event-descript2\"><p> "+DESCRICAO_DO_EVENTO_2+" </p></div><table class=\"event-photos\"><tr><td><img class=\"event-photo\" src="+PHOTO2_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO3_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO4_DO_EVENTO+" alt=\"Here goes an image!\"></td></tr></table><div class=\"event-contact\"><center> <p> "+CONTATO_DO_EVENTO+" </p> </center></div> <div> <center><a hidden href=\"#\" class=\"btn btn-primary botao-deletar\" id="+i.toString()+" style=\"background-color: red; height: 40px; color: black;\"> Deletar </a></center> </div>  </div></div></td>  </tr></table></div>"
                }
                //allCarouselItem = Array.from(document.querySelectorAll('.carousel-item'))
                //var lastCarouselItem = allCarouselItem[allCarouselItem.length - 1]
                //lastCarouselItem.innerHTML += "<div style=\"background-color: red; width: 50px; height: 50px;\"> </div>"
            }
            else{ //Tem um ou dois espacos vagos na ultima pagina.
                if(ID_DONO_EVENTO == userid){ //Mostro o botao de deletar
                    allCarouselTr = Array.from(document.querySelectorAll('.identifier-row'))
                    var lastTr = allCarouselTr[allCarouselTr.length - 1]
                    lastTr.innerHTML += "<td><div class=\"card-eventos\" style=\"width: 18rem; height: 33rem;\"><div class=\"card-body-eventos\" style=\"height: 33rem;\"><table class=\"content-of-event-card\"><tr><img class=\"card-eventos-img-top\" src="+IMAGEM_PRINCIPAL_EVENTO+" alt=\"Card image cap\"></tr><tr><td><div class=\"event-date-box\"><p class=\"event-date\"> "+DATA_DO_EVENTO+" </p></div></td><td style=\"margin-right: 5px;\"><div class=\"event-descript1-box\"><p class=\"event-descript1\"> "+DESCRICAO_DO_EVENTO+" </p></div></td></tr></table><div class=\"event-descript2\"><p> "+DESCRICAO_DO_EVENTO_2+" </p></div><table class=\"event-photos\"><tr><td><img class=\"event-photo\" src="+PHOTO2_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO3_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO4_DO_EVENTO+" alt=\"Here goes an image!\"></td></tr></table><div class=\"event-contact\"><center> <p> "+CONTATO_DO_EVENTO+" </p> </center></div> <div> <center><a href=\"#\" class=\"btn btn-primary botao-deletar\" id="+i.toString()+" style=\"background-color: red; height: 40px; color: black;\"> Deletar </a></center></div></div></div></td>"
                }else{ //Nao mostro o botao de deletar
                    allCarouselTr = Array.from(document.querySelectorAll('.identifier-row'))
                    var lastTr = allCarouselTr[allCarouselTr.length - 1]
                    lastTr.innerHTML += "<td><div class=\"card-eventos\" style=\"width: 18rem;\"><div class=\"card-body-eventos\"><table class=\"content-of-event-card\"><tr><img class=\"card-eventos-img-top\" src="+IMAGEM_PRINCIPAL_EVENTO+" alt=\"Card image cap\"></tr><tr><td><div class=\"event-date-box\"><p class=\"event-date\"> "+DATA_DO_EVENTO+" </p></div></td><td style=\"margin-right: 5px;\"><div class=\"event-descript1-box\"><p class=\"event-descript1\"> "+DESCRICAO_DO_EVENTO+" </p></div></td></tr></table><div class=\"event-descript2\"><p> "+DESCRICAO_DO_EVENTO_2+" </p></div><table class=\"event-photos\"><tr><td><img class=\"event-photo\" src="+PHOTO2_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO3_DO_EVENTO+" alt=\"Here goes an image!\"></td><td><img class=\"event-photo\" src="+PHOTO4_DO_EVENTO+" alt=\"Here goes an image!\"></td></tr></table><div class=\"event-contact\"><center> <p> "+CONTATO_DO_EVENTO+" </p> </center></div> <div><center><a hidden href=\"#\" class=\"btn btn-primary botao-deletar\" id="+i.toString()+" style=\"background-color: red; height: 40px; color: black;\"> Deletar </a></center></div> </div></div></td>"
                }
                //var lastCarouselItem = allCarouselItem[allCarouselItem.length - 1]
                //lastCarouselItem.append("<div style=\"background-color: red; width: 50px; height: 50px;\"> </div>")    
            }
        }
        var eventIDs = [];
        var arrayBotoesDelecao = Array.from(document.querySelectorAll('.botao-deletar'));
        for(var i = 0; i < arrayBotoesDelecao.length; i++){
            var eventID = finalBd[i]["_id"];
            console.log("eventID = " + eventID);
            eventIDs.push(eventID);

            arrayBotoesDelecao[i].onclick = async function () {
                console.log("dentro do function = " + eventIDs[this.id]);
                await axios.post('https://adota-ai-backend.herokuapp.com/event/delete/'+ eventIDs[this.id], { },{ headers: {'Authorization' : localStorage.getItem('token')}})
                .catch(err => {
                    alertify.error('Você não tem autorização para isso')
                })
                .then(res => {
                    if(res){
                        if(res.statusText == "OK"){
                            alertify.success('Evento deletado com sucesso, redirecionando...');
                            setTimeout(redirect, 2000)
                        }
                    }
                })
            }
        }
          
    })
}


document.addEventListener('DOMContentLoaded', () => {  
    getEventsInfo(document)
})
