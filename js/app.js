
//constructor
function Seguro( marca, anio, tipo){
this.marca = marca;
this.tipo   =tipo;
this.anio   =anio
}

    Seguro.prototype.cotizarSeguro= function(){

    let cantidad;
    const base= 2000;

    switch (this.marca) {
        case '1':
            cantidad = base*1.15;
            break;

        case '2':
        cantidad = base*1.05;
        break;

        case '3':
        cantidad = base*1.35;
        break;
    }

        //aplicar el recargo del 3% por cada año
    const diferencia = new Date().getFullYear()-this.anio;

    cantidad -= ((diferencia*3)*cantidad)/100;

    //aplicar el tipo de seguro

    if (this.tipo==="basico") {
        cantidad*=1.50;
    }else{

        cantidad*=1.30;
    }

    return cantidad;


}


    //lo que se mostrara

    function Interfaz() {}

    Interfaz.prototype.mostrarError = function(mensaje,tipo){

        const div = document.createElement('div');

        if (tipo==='error') {
            div.classList.add('mensaje','error');
        }else{
            div.classList.add('mensaje','correcto');
        }


        div.innerHTML= `
                        ${mensaje}
        `;

        formulario.insertBefore(div,document.querySelector('.form-group'));

        setTimeout(function(){document.querySelector('.mensaje').remove();},2000);
    }

    //imprime el resultado

    Interfaz.prototype.mostarResultado = function(seguro,total){

        const resultado = document.getElementById('resultado');
        let marca;

        switch (seguro.marca) {
            case "1":
                marca="americano";
                break;
            case "2":
                marca="asiatico";
                break;
            case "3":
                marca="europeo";
                break;
        }

        const div = document.createElement('div');

        div.innerHTML=`
        <p class="header">RESUMEN:
        <p>MARCA= ${seguro.marca}</p>
        <p> año= ${seguro.anio}</p>
        <p>tipo= ${seguro.tipo}</p>
        <p> total= ${total}</p>
            
        `;


        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function(){spinner.style.display = 'none',resultado.appendChild(div)},2000);
        

        



    }





//eventListener

const formulario= document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();

      //leyendo la marca seleccionada  
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    console.log('presionado');
    

    //leyendo el año
    const anio = document.getElementById('anio');
    const anioSeleccionado= anio.options[anio.selectedIndex].value;

    //leyendo radiobutton

    const tipo = document.querySelector('input[name="tipo"]:checked').value;



   const interfaz = new Interfaz();

    

    
   if (marcaSeleccionada==='' || anioSeleccionado==="" || tipo==="") {
       interfaz.mostrarError('faltan datos','error');
   }else{

    //limpiar resultados anteriores

        const resultados = document.querySelector('#resultado div');

       if (resultados!=null) {
           resultados.remove();
           
       }


     const seguro = new Seguro(marcaSeleccionada,anioSeleccionado,tipo);

     //cotizar seguro

     const cantidad= seguro.cotizarSeguro();

     interfaz.mostarResultado(seguro,cantidad);
     interfaz.mostrarError('cotizando...','correcto');
   }
});




const    max = new Date().getFullYear(),
         min = max - 20;   


const selectAnios = document.getElementById('anio');

for (let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value=i;
        option.innerHTML=i;
        selectAnios.appendChild(option);
  
}

