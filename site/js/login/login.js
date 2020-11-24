function redirect(){
   window.location.href = "https://adota-ai.herokuapp.com/index.html";
}

async function sendLoginInfo() {
  await axios.post('https://adota-ai-backend.herokuapp.com/auth/authenticate', { 
      username: document.getElementById('login').value,
      password: document.getElementById('password').value, 
  })
  .catch(err => {
    alertify.error('Erro ao logar: verifique suas credenciais');
  })
  .then(resp => {
    if(resp){
      if(resp.statusText == "OK") alertify.success('Logado com sucesso, redirecionando...');
      var token = "Bearer " + resp.data.token
      localStorage.setItem('token', token)
      setTimeout(redirect, 2000)
    }
  });
}

const form = document.getElementById('formLogin');
form.addEventListener('submit', sendLoginInfo);