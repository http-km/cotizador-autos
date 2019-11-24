// Cotizador Constructor

// Seguro Constructor
function Seguro(brand, year, type){
    this.brand = brand;
    this.year = year;
    this.type = type;
}

Seguro.prototype.cotizarSeguro = function(){
    /* 
        1 | Americano = 1.15
        2 | Asiatico = 1.05
        3 | Europeo = 1.35
    
    */

    const base = 2000;
    let cantidad;

    switch (this.brand) {
        case '1':
            cantidad = base * 1.15;
            break;
    
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }
    // Leer el año
    const diferencia = new Date().getFullYear() - this.year;

    // Cada año de diferencia hay que reducir 3% el valor del seguro
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        Basico - 30%
        Completo - 60%
    */ 

    if(this.type === 'basico'){
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    
    return cantidad.toFixed(2); // Retorna la cantidad, con unicamente 2 decimales
}

// Interfase Constructor
function Interfase(){}

Interfase.prototype.showError = function(msg, type){
    const div = document.createElement('div');

    if(type === 'err'){
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add ('mensaje','correcto');
    }

    div.innerHTML = `${msg}`;
    form.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    }, 3000);
}

Interfase.prototype.showResult = function(seguro, total){
    const result = document.getElementById('resultado');
    let brand;

    switch (seguro.brand) {
        case '1':
            brand = 'Americano'
            break;
        case '2':
            brand = 'Asiatico'
            break;
        case '3':
            brand = 'Europeo'
            break;
    }
    
    // Crear Div 
    const div = document.createElement('div');

    div.innerHTML = `
        <p class="header">Resumen: </p>
        <p>Marca: ${brand}</p>
        <p>Año: ${seguro.year}</p>
        <p>Tipo: ${seguro.type}</p>
        <br>
        <p class="font-weight-bold">Total: ${total}</p>
    `;

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';

    setTimeout(function(){
        spinner.style.display = 'none';
        result.appendChild(div);
    }, 2000);
    
    
}

// EventListeners
const form = document.getElementById('cotizar-seguro');

form.addEventListener('submit', function(e){
    e.preventDefault();

    // Leer la marca seleccionada
    const brand = document.getElementById('marca');
    const brandSelected = brand.options[brand.selectedIndex].value;

    // Leer el año seleccionado
    const year = document.getElementById('anio');
    const yearSelected = year.options[year.selectedIndex].value;

    // Leer el valor del RadioBtn
    const type = document.querySelector('input[name="tipo"]:checked').value;

    // Instanciar Interfase
    const interfase = new Interfase();

    // Revisar que los campos no esten vacios
    if(brandSelected === '' || yearSelected === '' || type === ''){
        // Imprimir Error

        interfase.showError('Faltan datos, revisa el formulario.', 'err')
        
    } else {

        // Limpiar Resultados
        const results = document.querySelector('#resultado div');

        if(results != null){
            results.remove();
        }

        // Instanciar Seguro, mostrar interfase
        const seguro = new Seguro(brandSelected, yearSelected, type);

        // Cotizar el Seguro
        const cantidad = seguro.cotizarSeguro();

        // Mostrar el resultado
        interfase.showResult(seguro, cantidad);
    }

});


const maxYear = new Date().getFullYear(),
      minYear = maxYear - 25;

const selectYears = document.getElementById('anio');
    for(i = maxYear; i > minYear; i--){
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        selectYears.appendChild(option)
    }
