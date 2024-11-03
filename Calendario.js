const mesSelector = document.getElementById("mes");
const añoSelector = document.getElementById("año");
const cuadriculaDias = document.getElementById("cuadricula-dias")
const diasEspeciales = [{dia: 25, mes: 11, año: 2024},
    {dia: 1, mes: 0, año: 2024},
    {dia: 25, mes: 11, año: 2023},
    {dia: 1, mes: 0, año: 2023},
    {dia: 25, mes: 11, año: 2022},
    {dia: 1, mes: 0, año: 2022}];

function actualizarCalendario(){
    const mes = parseInt(mesSelector.value);
    const año = parseInt(añoSelector.value);

    const primerDia = new Date(año, mes, 1).getDay();
    const diasTotales = new Date(año, mes + 1, 0).getDate();

    const hoy = new Date();
    const diaActual = hoy.getDate();
    const mesActual = hoy.getMonth();
    const añoActual = hoy.getFullYear();

    cuadriculaDias.innerHTML = "";

    for(let i = 0; i < primerDia; i++){
        const diaVacio = document.createElement("div");
        diaVacio.classList.add("dia");
        cuadriculaDias.appendChild(diaVacio);
    }

    for(let dia = 1; dia <= diasTotales; dia++){
        const elementoDia = document.createElement("div");
        elementoDia.classList.add("dia");
        elementoDia.textContent = dia;
        

        const esEspecial = diasEspeciales.some(diaEspecial => diaEspecial.dia === dia && diaEspecial.mes === mes);

        if(esEspecial){
            elementoDia.classList.add("dia-especial");
            elementoDia.title = diasEspeciales.find(diaEspecial => diaEspecial.dia === dia && diaEspecial.mes === mes).description;
        }

        if(dia === diaActual && mes === mesActual && año === añoActual){
            elementoDia.classList.add("hoy")
        }
        cuadriculaDias.appendChild(elementoDia);
    }

    
}

actualizarCalendario();