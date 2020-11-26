function redirect(){
  window.location.href = "https://adota-ai.herokuapp.com/eventos.html";
}

function checkPhoto(target){
	var fileUpload = target;
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$");
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (fileUpload.files) != "undefined") {
            var reader = new FileReader();
            reader.readAsDataURL(fileUpload.files[0]);
            reader.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    var height = this.height;
                    var width = this.width;
                    if (height > 640 || width > 480) {
                    	fileUpload.value = "";
                        alert("You can upload max an 640x480 photo size.");
                        return false;
                    }else{
                        return true;
                    }
                };
            }
        } else {
        	fileUpload.value = "";
            alert("This browser does not support HTML5.");
            return false;
        }
    } else {
    	fileUpload.value = "";
        alert("Please select a valid Image file.");
        return false;
    }
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
  
      if(file != undefined) reader.readAsDataURL(file);
      else resolve(null)
    })
}

async function sendEventosInfo() {
    var file1 = document.getElementById('evento-foto1').files[0]
    var file2 = document.getElementById('evento-foto2').files[0]
    var file3 = document.getElementById('evento-foto3').files[0]
    var file4 = document.getElementById('evento-foto3').files[0]

    let foto1 = await readFileAsync(file1)
    let foto2 = await readFileAsync(file2)
    let foto3 = await readFileAsync(file3)
    let foto4 = await readFileAsync(file4)

    await axios.post('https://adota-ai-backend.herokuapp.com/event/register', 
    { 
        eventDate: document.getElementById('data-evento').value,
        generalInfo: document.getElementById('info-geral').value,
        extraInfo: document.getElementById('info-extra').value,
        ownerContact: document.getElementById('contato-evento').value,
        photos: [foto1, foto2, foto3, foto4]
    },
    {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }
    )
    .catch(err => {
      alertify.error('Erro ao cadastrar o evento');
    })
    .then(resp => {
      if(resp)
        if(resp.statusText == "OK"){
          alertify.success('Evento cadastrado com sucesso, redirecionando...');
          setTimeout(redirect, 2000)
        }
    });
}


const form = document.getElementById('formEventos');
form.addEventListener('submit', sendEventosInfo);
