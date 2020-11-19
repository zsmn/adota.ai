//Verificar se teremos que usar o metodo Array.from() de novo.

var contentBd
var finalBd

async function getAnimalsInfo(document){
    await axios.get('https://adota-ai-backend.herokuapp.com/pet')
      .then(resp => {
        
        //console.log(resp.data);
        contentBd = resp.data;
        finalBd = contentBd['pets'] //Aqui, eu consigo acessar cada um dos pets cadastrados em nosso Bd.
        /*
        console.log('olaaaaa');
        console.log(contentBd['pets']);
        console.log(contentBd['pets'][0]);
        console.log(contentBd['pets'][1]);
        console.log(contentBd['pets'][0]['age']);
        console.log(contentBd['pets'][0]['animalName']);
        */
        //Fazendo a conversão de um Array para u JSON
        
        
        
        var carouselSlides = document.getElementById("carousel-inner")

        var quantityOfCardAnimals = 0
        var allCardAnimals = Array.from(document.querySelectorAll('.card'))
        var allCarouselItem = Array.from(document.querySelectorAll('.carousel-item'))
        console.log(allCardAnimals.length)
        console.log(allCarouselItem.length)

        quantityOfCardAnimals = allCardAnimals.length

        var FOTO_ANIMAL = ""
        var NOME_ANIMAL = ""
        var LOCALIDADE_ANIMAL =""
        var PORTE_ANIMAL = ""
        var ICONE_SEXO_ANIMAL = ""
        var SEXO_ANIMAL = ""
        var IDADE_ANIMAL = ""
        
        //Variaveis extras cujo conteudo apenas vai ser mostrado quando um usuario clicar nele
        var CONTATO_ANIMAL = ""
        var INFO_ANIMAL = ""
        var FOTO_ANIMAL_2 = ""
        var FOTO_ANIMAL_3 = ""
        
        //Verificar se teremos que usar o metodo Array.from() de novo.
        //Verificar se teremos que usar o metodo Array.from() de novo.

        var allTableCard = Array.from(document.querySelectorAll('.table-card-bichinhos'))

        //console.log(contentBd)
        //console.log(contentBd.length)

        for(var i = 0; i < finalBd.length; i++){
            //console.log("DALEEE")
            FOTO_ANIMAL = finalBd[i]["photos"][0]
            NOME_ANIMAL = finalBd[i]["animalName"]
            LOCALIDADE_ANIMAL = finalBd[i]["locality"]
            PORTE_ANIMAL = finalBd[i]["size"]
            SEXO_ANIMAL = finalBd[i]["sex"]
            IDADE_ANIMAL = finalBd[i]["age"]
            CONTATO_ANIMAL = finalBd[i]["contact"]
            INFO_ANIMAL = finalBd[i]["info"]
            FOTO_ANIMAL_2 = finalBd[i]["photos"][1]
            FOTO_ANIMAL_3 = finalBd[i]["photos"][2]
            if(SEXO_ANIMAL == "F" || SEXO_ANIMAL == "Femea" || SEXO_ANIMAL == "Fêmea"){
                ICONE_SEXO_ANIMAL = "assets/img/icons/female_icon.png"
                SEXO_ANIMAL = "Fêmea"
            }else if(SEXO_ANIMAL == "M" || SEXO_ANIMAL == "Macho" || SEXO_ANIMAL == "Masculino"){
                ICONE_SEXO_ANIMAL = "assets/img/icons/male_icon.png"
                SEXO_ANIMAL = "Macho"
            }else{
                ICONE_SEXO_ANIMAL = "assets/img/icons/male_icon.png"
                SEXO_ANIMAL = "Macho"
            }

            if(i % 12 == 0){ //Devo adicionar um novo slide.
                carouselSlides.innerHTML += "<div class=\"carousel-item\"><table class=\"table-card-bichinhos\" align=\"center\" style=\"padding: 20px;\"><tr class=\"row-bichinhos\"><td> <div class=\"card\" style=\"width: 20rem; background-color: #75E3DE;\"><div class=\"card-body\"><table class=\"content-of-card\"><tr><td> <img class=\"card-img-top\" src="+FOTO_ANIMAL+" alt=\"Card image cap\"> </td><td><h5 class=\"card-title\">"+NOME_ANIMAL+"</h5><table><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/location_icon.png\"> </td><td> <p class=\"card-text\">"+LOCALIDADE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/size_icon.png\"> </td><td> <p class=\"card-text\">"+PORTE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src="+ICONE_SEXO_ANIMAL+"> </td><td> <p class=\"card-text\"> "+SEXO_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/age_icon.png\"> </td><td> <p class=\"card-text\"> "+IDADE_ANIMAL+"<p> </td></tr></table></td></tr></table><br><center><a href=\"#\" class=\"btn btn-primary\" style=\"background-color: #FAFF00; height: 40px ;color: black;\"><table><tr><td><img class=\"icon-image-button\" src=\"assets/img/icons/moreinfo_icon.png\"><td> <p class=\"button-text\">Veja mais</p></td></td></tr></table></a></center></div></div>  </td></tr></table></div>"
            }
            else{ //Adiciono apenas um novo card dentro do slide.
                allTableCard = Array.from(document.querySelectorAll('.table-card-bichinhos'))
                if(i % 4 == 0){ //Devo inserir uma row dentro da table presente no slide.
                    var lastTableCard = allTableCard[allTableCard.length - 1]
                    lastTableCard.innerHTML += "<tr class=\"row-bichinhos\"><td><div class=\"card\" style=\"width: 20rem; background-color: #75E3DE;\"><div class=\"card-body\"><table class=\"content-of-card\"><tr><td> <img class=\"card-img-top\" src="+FOTO_ANIMAL+" alt=\"Card image cap\"> </td><td><h5 class=\"card-title\">"+NOME_ANIMAL+"</h5><table><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/location_icon.png\"> </td><td> <p class=\"card-text\">"+LOCALIDADE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/size_icon.png\"> </td><td> <p class=\"card-text\">"+PORTE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src="+ICONE_SEXO_ANIMAL+"> </td><td> <p class=\"card-text\"> "+SEXO_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/age_icon.png\"> </td><td> <p class=\"card-text\"> "+IDADE_ANIMAL+"<p> </td></tr></table></td></tr></table><br><center><a href=\"#\" class=\"btn btn-primary\" style=\"background-color: #FAFF00; height: 40px ;color: black;\"><table><tr><td><img class=\"icon-image-button\" src=\"assets/img/icons/moreinfo_icon.png\"><td> <p class=\"button-text\">Veja mais</p></td></td></tr></table></a></center></div></div> </td></tr>"
                }
                else{ //Posso inserir o card direto dentro da row
                    var allRows = Array.from(document.querySelectorAll('.row-bichinhos'))
                    var lastRow = allRows[allRows.length - 1]
                    lastRow.innerHTML += "<td><div class=\"card\" style=\"width: 20rem; background-color: #75E3DE;\"><div class=\"card-body\"><table class=\"content-of-card\"><tr><td> <img class=\"card-img-top\" src="+FOTO_ANIMAL+" alt=\"Card image cap\"> </td><td><h5 class=\"card-title\">"+NOME_ANIMAL+"</h5><table><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/location_icon.png\"> </td><td> <p class=\"card-text\">"+LOCALIDADE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/size_icon.png\"> </td><td> <p class=\"card-text\">"+PORTE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src="+ICONE_SEXO_ANIMAL+"> </td><td> <p class=\"card-text\"> "+SEXO_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/age_icon.png\"> </td><td> <p class=\"card-text\"> "+IDADE_ANIMAL+"<p> </td></tr></table></td></tr></table><br><center><a href=\"#\" class=\"btn btn-primary\" style=\"background-color: #FAFF00; height: 40px ;color: black;\"><table><tr><td><img class=\"icon-image-button\" src=\"assets/img/icons/moreinfo_icon.png\"><td> <p class=\"button-text\">Veja mais</p></td></td></tr></table></a></center></div></div> </td>"
                }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {    
    getAnimalsInfo(document)
})


