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

async function sendLoginInfo() {
    
    await axios.post('https://adota-ai-backend.herokuapp.com/auth/authentication', { 
        username: document.getElementById('login').value,
        password: document.getElementById('password').value, 
    })
    .then(function(response){
        console.log('salvo com sucesso')
    });
}


const form = document.getElementById('formLogin');
form.addEventListener('submit', sendLoginInfo);

