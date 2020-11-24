function redirect(){
  window.location.href = "https://adota-ai.herokuapp.com/bichinhos.html";
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

async function sendAnimaisInfo() {
    var file1 = document.getElementById('animal-foto1').files[0]
    var file2 = document.getElementById('animal-foto2').files[0]
    var file3 = document.getElementById('animal-foto3').files[0]

    let foto1 = await readFileAsync(file1)
    let foto2 = await readFileAsync(file2)
    let foto3 = await readFileAsync(file3)

    await axios.post('https://adota-ai-backend.herokuapp.com/pet/register', 
    { 
        animalName: document.getElementById('nome-animal').value,
        locality: document.getElementById('localidade').value,
        sex: document.getElementById('sexo-animal').value,
        size: document.getElementById('porte-animal').value,
        age: document.getElementById('idade-animal').value,
        info: document.getElementById('extra-info-animal').value,
        contact: document.getElementById('contato-animal').value,
        photos: [foto1, foto2, foto3]
    },
    {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
    .catch(err => {
      alertify.error('Erro ao cadastrar o animal');
    })
    .then(resp => {
      if(resp)
        if(resp.statusText == "OK"){
          alertify.success('Animal cadastrado com sucesso, redirecionando...');
          setTimeout(redirect, 2000)
        }
    });
}


const form = document.getElementById('formAnimais');
form.addEventListener('submit', sendAnimaisInfo);
