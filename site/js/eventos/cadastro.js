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

    await axios.post('https://adota-ai-backend.herokuapp.com/events', { 
        dataEvento: document.getElementById('data-evento').value,
        infoGeral: document.getElementById('info-geral').value,
        infoExtra: document.getElementById('info-extra').value,
        contato: document.getElementById('contato-evento').value,
        fotos: [foto1, foto2, foto3, foto4]
    })
    .then(function(response){
        console.log('salvo com sucesso')
    });
}


const form = document.getElementById('formEventos');
form.addEventListener('submit', sendEventosInfo);

