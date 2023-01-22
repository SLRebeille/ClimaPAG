window.addEventListener('load', ()=> {
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperature-valor')  
    let temperaturaDescripcion = document.getElementById('temperature-descripcion')  
    
    let ubicacion = document.getElementById('ubication')  
    let iconoAnimado = document.getElementById('animated-icon') 

    let vientoVelocidad = document.getElementById('wind-speed') 

    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( posicion => {
        lon = posicion.coords.longitude
        lat = posicion.coords.latitude
            //ubicación actual    
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e3951815550f9a4f6df696b6f30a7ca3`

        fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                console.log(data)
                //temperatura
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} ° C`
                //tipo de clima
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                ubicacion.textContent = data.name
                //velocidad del viento
                vientoVelocidad.textContent = `${data.wind.speed} m/s`

                //iconos dinámicos
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                    iconoAnimado.src='animated/thunder.svg'
                    console.log('TORMENTA');
                    break;
                    case 'Drizzle':
                    iconoAnimado.src='animated/rainy-2.svg'
                    console.log('LLOVIZNA');
                    break;
                    case 'Rain':
                    iconoAnimado.src='animated/rainy-7.svg'
                    console.log('LLUVIA');
                    break;
                    case 'Snow':
                    iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                    break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                    break;
                    case 'Atmosphere':
                    iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                    iconoAnimado.src='animated/cloudy-day-1.svg'
                    console.log('por defecto');
                }

            })
            .catch( error => {
                console.log(error)
            })
    })
        
    }
})
