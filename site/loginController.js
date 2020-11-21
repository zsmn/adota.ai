var showUserAndLogoutButton = true; //So mostro isso quando o usuario tiver conectado
var userName = "vmmc2";

document.addEventListener('DOMContentLoaded', () => {
    var cabecalho = document.getElementById("cabecalho")
    if(showUserAndLogoutButton == true){ 
        //Tiro os botoes de 'cadastro' e de 'login'
        //Mostro o botao de 'logout' e o userName
        cabecalho.innerHTML += "<li><a href=\"index.html\">Logout</a></li> <li><a href=\"#\">\"vmmc2\"</li>"
    }else{
        cabecalho.innerHTML += "<li><a href=\"login.html\">Login</a></li><li><a href=\"cadastro.html\">Cadastro</a></li>"
    }
})
/*
<li><a href="login.html">Login</a></li>
<li><a href="cadastro.html">Cadastro</a></li>


<li class="active"><a href="#">Login</a></li>
<li><a href="cadastro.html">Cadastro</a></li>

<li><a href="login.html">Login</a></li>
<li class="active"><a href="#">Cadastro</a></li>
*/
