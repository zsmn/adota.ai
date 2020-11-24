function redirect(){
  window.location.href = "https://adota-ai.herokuapp.com/login.html";
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

async function sendUsuariosInfo() {
    /*
    var file1 = document.getElementById('evento-foto1').files[0]
    var file2 = document.getElementById('evento-foto2').files[0]
    var file3 = document.getElementById('evento-foto3').files[0]
    var file4 = document.getElementById('evento-foto3').files[0]

    let foto1 = await readFileAsync(file1)
    let foto2 = await readFileAsync(file2)
    let foto3 = await readFileAsync(file3)
    let foto4 = await readFileAsync(file4)
    */
    await axios.post('https://adota-ai-backend.herokuapp.com/auth/register', { 
        username: document.getElementById('login').value,
        password: document.getElementById('password').value, 
        email: document.getElementById('email').value
    })
    .catch(err => {
      alertify.error('Erro ao cadastrar');
    })
    .then(resp => {
      if(resp)
        if(resp.statusText == "OK"){
          alertify.success('Cadastrado com sucesso, redirecionando...');
          setTimeout(redirect, 2000)
        }
    });
}


const form = document.getElementById('formUsuarios');
form.addEventListener('submit', sendUsuariosInfo);

