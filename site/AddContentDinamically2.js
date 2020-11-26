//Verificar se teremos que usar o metodo Array.from() de novo.

var contentBd
var finalBd
var auxiliar = ""
var userid = "-1"

function redirect(){
    window.location.href = "https://adota-ai.herokuapp.com/bichinhos.html";
}

async function getAnimalsInfo(document){
    await axios.get('https://adota-ai-backend.herokuapp.com/pet')
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
        finalBd = contentBd['pets'] //Aqui, eu consigo acessar cada um dos pets cadastrados em nosso Bd.
       
        //Fazendo a conversão de um Array para u JSON
        var carouselSlides = document.getElementById("carousel-inner")
        var quantityOfCardAnimals = 0
        var allCardAnimals = Array.from(document.querySelectorAll('.card'))
        var allCarouselItem = Array.from(document.querySelectorAll('.carousel-item'))

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
        var ID_DONO_ANIMAL = ""
        
        //Verificar se teremos que usar o metodo Array.from() de novo.
        //Verificar se teremos que usar o metodo Array.from() de novo.

        var allTableCard = Array.from(document.querySelectorAll('.table-card-bichinhos'))

        var j = 10000;
        for(var i = 0; i < finalBd.length; i++, j++){
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
            ID_DONO_ANIMAL = finalBd[i]["userId"]
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
            var aux = ""
            if(i == 0){
                aux = "active"
            }
            if(i % 12 == 0){ //Devo adicionar um novo slide.
                if(ID_DONO_ANIMAL == userid){
                    carouselSlides.innerHTML += "<div class=\"carousel-item "+aux+" \"><table class=\"table-card-bichinhos\" align=\"center\" style=\"padding: 20px;\"><tr class=\"row-bichinhos\"><td> <div class=\"card\" style=\"width: 20rem; background-color: #75E3DE;\"><div class=\"card-body\"><table class=\"content-of-card\"><tr><td> <img class=\"card-img-top\" src="+FOTO_ANIMAL+" alt=\"Card image cap\"> </td><td><h5 class=\"card-title\">"+NOME_ANIMAL+"</h5><table><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/location_icon.png\"> </td><td> <p class=\"card-text\">"+LOCALIDADE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/size_icon.png\"> </td><td> <p class=\"card-text\">"+PORTE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src="+ICONE_SEXO_ANIMAL+"> </td><td> <p class=\"card-text\"> "+SEXO_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/age_icon.png\"> </td><td> <p class=\"card-text\"> "+IDADE_ANIMAL+"<p> </td></tr></table></td></tr></table><br><center><div><a href=\"#\" class=\"btn btn-primary botao-veja-mais\" id="+i.toString()+" style=\"background-color: #FAFF00; height: 40px ;color: black;\"><table><tr><td><img class=\"icon-image-button\" src=\"assets/img/icons/moreinfo_icon.png\"><td> <p class=\"button-text\">Veja mais</p></td></td></tr></table></a> <a href=\"#\" class=\"btn btn-primary botao-deletar\" id="+j.toString()+" style=\"background-color: red; height: 40px; color: black;\"> Deletar </a>  </div></center></div></div> </td></tr></table></div>"
                }else{
                    carouselSlides.innerHTML += "<div class=\"carousel-item "+aux+" \"><table class=\"table-card-bichinhos\" align=\"center\" style=\"padding: 20px;\"><tr class=\"row-bichinhos\"><td> <div class=\"card\" style=\"width: 20rem; background-color: #75E3DE;\"><div class=\"card-body\"><table class=\"content-of-card\"><tr><td> <img class=\"card-img-top\" src="+FOTO_ANIMAL+" alt=\"Card image cap\"> </td><td><h5 class=\"card-title\">"+NOME_ANIMAL+"</h5><table><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/location_icon.png\"> </td><td> <p class=\"card-text\">"+LOCALIDADE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/size_icon.png\"> </td><td> <p class=\"card-text\">"+PORTE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src="+ICONE_SEXO_ANIMAL+"> </td><td> <p class=\"card-text\"> "+SEXO_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/age_icon.png\"> </td><td> <p class=\"card-text\"> "+IDADE_ANIMAL+"<p> </td></tr></table></td></tr></table><br><center><div><a href=\"#\" class=\"btn btn-primary botao-veja-mais\" id="+i.toString()+" style=\"background-color: #FAFF00; height: 40px ;color: black;\"><table><tr><td><img class=\"icon-image-button\" src=\"assets/img/icons/moreinfo_icon.png\"><td> <p class=\"button-text\">Veja mais</p></td></td></tr></table></a> <a hidden href=\"#\" class=\"btn btn-primary botao-deletar\" id="+j.toString()+" style=\"background-color: red; height: 40px; color: black;\"> Deletar </a>  </div></center></div></div> </td></tr></table></div>"
                }
                
            }
            else{ //Adiciono apenas um novo card dentro do slide.
                allTableCard = Array.from(document.querySelectorAll('.table-card-bichinhos'))
                if(i % 4 == 0){ //Devo inserir uma row dentro da table presente no slide.
                    if(ID_DONO_ANIMAL == userid){
                        var lastTableCard = allTableCard[allTableCard.length - 1]
                    lastTableCard.innerHTML += "<tr class=\"row-bichinhos\"><td><div class=\"card\" style=\"width: 20rem; background-color: #75E3DE;\"><div class=\"card-body\"><table class=\"content-of-card\"><tr><td> <img class=\"card-img-top\" src="+FOTO_ANIMAL+" alt=\"Card image cap\"> </td><td><h5 class=\"card-title\">"+NOME_ANIMAL+"</h5><table><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/location_icon.png\"> </td><td> <p class=\"card-text\">"+LOCALIDADE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/size_icon.png\"> </td><td> <p class=\"card-text\">"+PORTE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src="+ICONE_SEXO_ANIMAL+"> </td><td> <p class=\"card-text\"> "+SEXO_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/age_icon.png\"> </td><td> <p class=\"card-text\"> "+IDADE_ANIMAL+"<p> </td></tr></table></td></tr></table><br><center><div><a href=\"#\" class=\"btn btn-primary botao-veja-mais\" id="+i.toString()+" style=\"background-color: #FAFF00; height: 40px ;color: black;\"><table><tr><td><img class=\"icon-image-button\" src=\"assets/img/icons/moreinfo_icon.png\"><td> <p class=\"button-text\">Veja mais</p></td></td></tr></table></a> <a href=\"#\" class=\"btn btn-primary botao-deletar\" id="+j.toString()+" style=\"background-color: red; height: 40px; color: black;\"> Deletar </a></div></center></div></div> </td></tr>"
                    }else{
                    var lastTableCard = allTableCard[allTableCard.length - 1]
                    lastTableCard.innerHTML += "<tr class=\"row-bichinhos\"><td><div class=\"card\" style=\"width: 20rem; background-color: #75E3DE;\"><div class=\"card-body\"><table class=\"content-of-card\"><tr><td> <img class=\"card-img-top\" src="+FOTO_ANIMAL+" alt=\"Card image cap\"> </td><td><h5 class=\"card-title\">"+NOME_ANIMAL+"</h5><table><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/location_icon.png\"> </td><td> <p class=\"card-text\">"+LOCALIDADE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/size_icon.png\"> </td><td> <p class=\"card-text\">"+PORTE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src="+ICONE_SEXO_ANIMAL+"> </td><td> <p class=\"card-text\"> "+SEXO_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/age_icon.png\"> </td><td> <p class=\"card-text\"> "+IDADE_ANIMAL+"<p> </td></tr></table></td></tr></table><br><center><div><a href=\"#\" class=\"btn btn-primary botao-veja-mais\" id="+i.toString()+" style=\"background-color: #FAFF00; height: 40px ;color: black;\"><table><tr><td><img class=\"icon-image-button\" src=\"assets/img/icons/moreinfo_icon.png\"><td> <p class=\"button-text\">Veja mais</p></td></td></tr></table></a> <a hidden href=\"#\" class=\"btn btn-primary botao-deletar\" id="+j.toString()+" style=\"background-color: red; height: 40px; color: black;\"> Deletar </a></div></center></div></div> </td></tr>"
                    }
                }
                else{ //Posso inserir o card direto dentro da row
                    if(ID_DONO_ANIMAL == userid){
                        var allRows = Array.from(document.querySelectorAll('.row-bichinhos'))
                        var lastRow = allRows[allRows.length - 1]
                        lastRow.innerHTML += "<td><div class=\"card\" style=\"width: 20rem; background-color: #75E3DE;\"><div class=\"card-body\"><table class=\"content-of-card\"><tr><td> <img class=\"card-img-top\" src="+FOTO_ANIMAL+" alt=\"Card image cap\"> </td><td><h5 class=\"card-title\">"+NOME_ANIMAL+"</h5><table><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/location_icon.png\"> </td><td> <p class=\"card-text\">"+LOCALIDADE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/size_icon.png\"> </td><td> <p class=\"card-text\">"+PORTE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src="+ICONE_SEXO_ANIMAL+"> </td><td> <p class=\"card-text\"> "+SEXO_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/age_icon.png\"> </td><td> <p class=\"card-text\"> "+IDADE_ANIMAL+"<p> </td></tr></table></td></tr></table><br><center><div><a href=\"#\" class=\"btn btn-primary botao-veja-mais\" id="+i.toString()+" style=\"background-color: #FAFF00; height: 40px ;color: black;\"><table><tr><td><img class=\"icon-image-button\" src=\"assets/img/icons/moreinfo_icon.png\"><td> <p class=\"button-text\">Veja mais</p></td></td></tr></table></a> <a href=\"#\" class=\"btn btn-primary botao-deletar\" id="+j.toString()+" style=\"background-color: red; height: 40px; color: black;\"> Deletar </a> </div></center></div></div> </td>"
                    }else{
                        var allRows = Array.from(document.querySelectorAll('.row-bichinhos'))
                        var lastRow = allRows[allRows.length - 1]
                        lastRow.innerHTML += "<td><div class=\"card\" style=\"width: 20rem; background-color: #75E3DE;\"><div class=\"card-body\"><table class=\"content-of-card\"><tr><td> <img class=\"card-img-top\" src="+FOTO_ANIMAL+" alt=\"Card image cap\"> </td><td><h5 class=\"card-title\">"+NOME_ANIMAL+"</h5><table><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/location_icon.png\"> </td><td> <p class=\"card-text\">"+LOCALIDADE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/size_icon.png\"> </td><td> <p class=\"card-text\">"+PORTE_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src="+ICONE_SEXO_ANIMAL+"> </td><td> <p class=\"card-text\"> "+SEXO_ANIMAL+"<p> </td></tr><tr><td> <img class=\"icon-image\" src=\"assets/img/icons/age_icon.png\"> </td><td> <p class=\"card-text\"> "+IDADE_ANIMAL+"<p> </td></tr></table></td></tr></table><br><center><div><a href=\"#\" class=\"btn btn-primary botao-veja-mais\" id="+i.toString()+" style=\"background-color: #FAFF00; height: 40px ;color: black;\"><table><tr><td><img class=\"icon-image-button\" src=\"assets/img/icons/moreinfo_icon.png\"><td> <p class=\"button-text\">Veja mais</p></td></td></tr></table></a> <a hidden href=\"#\" class=\"btn btn-primary botao-deletar\" id="+j.toString()+" style=\"background-color: red; height: 40px; color: black;\"> Deletar </a> </div></center></div></div> </td>"
                    }
                }
            }
        }

        var arrayBotoesVejaMais = Array.from(document.querySelectorAll('.botao-veja-mais'));
        var petNames = [] 
        var petLocalities = [] 
        var petSize = [] 
        var petSex = [] 
        var petAge = [] 
        var petContact = [] 
        var petInfo = [] 
        var petPhoto1 = []
        var petPhoto2 = []
        var petPhoto3 = []
        var petIDs = []
        for(var i = 0; i < arrayBotoesVejaMais.length; i++){
            var id = parseInt(arrayBotoesVejaMais[i].id);
            var animalName = finalBd[id]["animalName"] 
            var animalLocality = finalBd[id]["locality"]
            var animalSize = finalBd[id]["size"]
            var animalSex = finalBd[id]["sex"]
            var animalAge = finalBd[id]["age"]
            var animalContact = finalBd[id]["contact"]
            var animalInfo = finalBd[id]["info"]
            var animalPhoto1 = finalBd[id]["photos"][0]
            var animalPhoto2 = finalBd[id]["photos"][1]
            var animalPhoto3 = finalBd[id]["photos"][2]
            petNames.push(animalName)
            petLocalities.push(animalLocality)
            petSize.push(animalSize)
            petSex.push(animalSex)
            petAge.push(animalAge)
            petContact.push(animalContact)
            petInfo.push(animalInfo)
            petPhoto1.push(animalPhoto1)
            petPhoto2.push(animalPhoto2)
            petPhoto3.push(animalPhoto3)
            arrayBotoesVejaMais[i].onclick = function () {
                //console.log("this.id veja mais = " + this.id);
                Swal.fire({
                    title: "<h2>" + petNames[this.id] + "</h2>",
                    html: "<div><img src="+petPhoto1[this.id]+" class=\"card-img-titulo-top\" alt=\"Imagem 1 não adicionada\"></div> <p><h5> <strong>Localidade</strong>:  " + petLocalities[this.id] + "</h5></p> <p><h5><strong>Porte</strong>:  " + petSize[this.id] + "</h5></p> <p><h5><strong>Sexo</strong>:  " + petSex[this.id] + "</h5></p> <p><h5><strong>Idade</strong>:  " + petAge[this.id] + "</h5></p> <p><h5><strong>Informações</strong>:  " + petInfo[this.id] + "</h5></p> <p><h5><strong>Contato</strong>:  " + petContact[this.id] + "</h5></p> <div><img src="+petPhoto2[this.id]+" class=\"card-img-top\" alt=\"Imagem 2 não adicionada\"> <img src="+petPhoto3[this.id]+" class=\"card-img-top\" alt=\"Imagem 3 não adicionada\"></div>",
                    background: "#75E3DE",
                });
            }
        }

        var arrayBotoesDelecao = Array.from(document.querySelectorAll('.botao-deletar'));
        for(var i = 0; i < arrayBotoesDelecao.length; i++){
            var animalID = finalBd[i]['_id']
            petIDs.push(animalID)

            arrayBotoesDelecao[i].onclick = async function () {
                var id = this.id - 10000;
                console.log(id);
                await axios.post('https://adota-ai-backend.herokuapp.com/pet/delete/'+ petIDs[id], { },{ headers: {'Authorization' : localStorage.getItem('token')}})
                .catch(err => {
                    alertify.error('Você não tem autorização para isso')
                })
                .then(res => {
                    if(res){
                        if(res.statusText == "OK"){
                            alertify.success('Animal deletado com sucesso, redirecionando...');
                            setTimeout(redirect, 2000)
                        }
                    }
                })
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {    
    getAnimalsInfo(document)
})
//
