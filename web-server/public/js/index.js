const weatherForm = document.getElementById('weatherForm');

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    
    let address = document.querySelector('#address').value || '';

    fetch('http://localhost:3000/weather?address=' + address).then(response => {
        response.json().then(data => {
           if(data.error){
               document.querySelector('#errorMessage').innerHTML = data.error;
               document.querySelector('#forecastMessage').innerHTML = '';
           }
           else{
               document.querySelector('#forecastMessage').innerHTML = JSON.stringify(data);
               document.querySelector('#errorMessage').innerHTML = '';
           }
        })
    });
})
