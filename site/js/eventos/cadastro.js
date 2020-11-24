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
        if(resp.statusText == "OK") alertify.success('Evento cadastrado com sucesso');
    });
}


const form = document.getElementById('formEventos');
form.addEventListener('submit', sendEventosInfo);