function dale() {
    axios.post('https://adota-ai-backend.herokuapp.com/pets', { firstName: 'Marlon', lastName: 'Bernardes' })
    .then(function(response){
        console.log('salvo com sucesso')
    });
}
  
const form = document.getElementById('desgraca');
form.addEventListener('submit', dale);