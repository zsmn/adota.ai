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

    await axios.post('https://adota-ai-backend.herokuapp.com/pets', { 
        nomeAnimal: document.getElementById('nome-animal').value,
        localidade: document.getElementById('localidade').value,
        sexo: document.getElementById('sexo-animal').value,
        porte: document.getElementById('porte-animal').value,
        idade: document.getElementById('idade-animal').value,
        extrainfo: document.getElementById('extra-info-animal').value,
        contato: document.getElementById('contato-animal').value,
        fotos: [foto1, foto2, foto3]
    })
    .then(function(response){
        console.log('salvo com sucesso')
    });
}


const form = document.getElementById('formAnimais');
form.addEventListener('submit', sendAnimaisInfo);
