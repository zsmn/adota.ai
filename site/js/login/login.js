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
      if(resp.statusText == "OK") alertify.success('Logado com sucesso');
      var token = "Bearer " + resp.data.token
      localStorage.setItem('token', token)
    }
  });
}

const form = document.getElementById('formLogin');
form.addEventListener('submit', sendLoginInfo);