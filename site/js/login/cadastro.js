async function sendLoginInfo() {
    await axios.post('https://adota-ai-backend.herokuapp.com/auth/authenticate', { 
        username: document.getElementById('login').value,
        password: document.getElementById('password').value, 
    })
    .then(resp => {
      var token = "Bearer " + resp.data.token
      localStorage.setItem('token', token)
      console.log(resp.statusText)
    });
}

const form = document.getElementById('formLogin');
form.addEventListener('submit', sendLoginInfo);