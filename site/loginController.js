var userName = "";

async function checkToken(document){
    var cabecalho = document.getElementById("cabecalho")
    if(localStorage.getItem('token') != null){
       await axios.post('https://adota-ai-backend.herokuapp.com/auth/requestuser', {
        token : localStorage.getItem('token')
    })
      .then(resp => {
        userName = resp.data.username;
        cabecalho.innerHTML += "<li><a id=\"logoutButton\" href=\"index.html\">Logout</a></li> <li><a href=\"#\">"+userName+"</li>"
        document.getElementById('logoutButton').onclick = function() {
            localStorage.setItem('token', '')
            window.location.href = "https://adota-ai.herokuapp.com/index.html";
        }
      })
      .catch(error => {
        cabecalho.innerHTML += "<li><a href=\"login.html\">Login</a></li><li><a href=\"cadastro.html\">Cadastro</a></li>"
      });
    }
    else{
    	cabecalho.innerHTML += "<li><a href=\"login.html\">Login</a></li><li><a href=\"cadastro.html\">Cadastro</a></li>"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkToken(document);
})
