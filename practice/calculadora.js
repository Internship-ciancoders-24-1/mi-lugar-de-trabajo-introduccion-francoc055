

function EstructurarOperacion(cadena)
{
    if(cadena.length >= 20)
    {
        return []
    }
    let terminos = [];
    let numeroActual = '';
    let operadores = '+-*/√^';

  
    for (let i = 0; i < cadena.length; i++) {
      let caracter = cadena[i];
  
      if (operadores.includes(caracter)) {
        if (numeroActual !== '') {
          terminos.push(parseFloat(numeroActual));
          numeroActual = '';
        }
        if(caracter === '/' && cadena[i+1] === '0')
        {
            return [];
        }
        terminos.push(caracter);
      } else {
        numeroActual += caracter;
      }
    }
  
    if (numeroActual !== '') {
      terminos.push(parseFloat(numeroActual));
    }

    return terminos;
}

function CalcularRaizYPotencia(cadena){
  let operadores = '+-*/';
  let terminos = EstructurarOperacion(cadena)
  if(!VerificarRaizYPotencia(terminos))
  {
    return false
  }
  let terminosAgrupados = [];
  let rpPendiente = false;
  let numeroAnterior = null;

  for (let i = 0; i < terminos.length; i++) {
    let termino = terminos[i];

    if (typeof termino === 'number') {
        terminosAgrupados.push(termino);
    } else if (termino === '^' || termino === '√') {
      let siguienteNumero = terminos[i + 1];
      let resultado;
      
      if (termino === '^') {
        numeroAnterior = terminosAgrupados.pop();
        resultado = numeroAnterior ** siguienteNumero;
      } else {
          resultado = Math.sqrt(siguienteNumero);
      }

      terminosAgrupados.push(resultado);
      i++;

    } else {
      terminosAgrupados.push(termino);
    }
  }

  return terminosAgrupados;


}


function VerificarRaizYPotencia(cadena)
{
  operadores = "√^"
  let ret = false

  cadena.forEach(element => {
    if(operadores.includes(element))
    {
      ret = true;
    }
  });

  return ret;
}

function CalcularDivisionYMultiplicacion(cadena) {
    let terminos = CalcularRaizYPotencia(cadena)
    if(!terminos)
    {
      terminos = EstructurarOperacion(cadena)
    }
    if(terminos.length == 0 || terminos == null)
    {
        return []
    }
    let terminosAgrupados = [];
    let mdPendiente = false;
    let numeroAnterior = null;
  
    for (let i = 0; i < terminos.length; i++) {
      let termino = terminos[i];
  
      if (typeof termino === 'number') {
        terminosAgrupados.push(termino);
      } else if (termino === '*' || termino === '/') {
        numeroAnterior = terminosAgrupados.pop();
        let siguienteNumero = terminos[i + 1];
        let resultado;
  
        if (termino === '*') {
          resultado = numeroAnterior * siguienteNumero;
        } else {
          resultado = numeroAnterior / siguienteNumero;
        }
  
        terminosAgrupados.push(resultado);
        i++;
      } else {
        terminosAgrupados.push(termino);
      }
    }
    return terminosAgrupados;
  }
  
  function calcularOperacion(operacion) {
    let terminosSeparados = CalcularDivisionYMultiplicacion(operacion);
    if(terminosSeparados.length == 0)
    {
        return []
    }
    let resultado = terminosSeparados[0];
  
    for (let i = 1; i < terminosSeparados.length; i += 2) {
      let operador = terminosSeparados[i];
      let siguienteNumero = terminosSeparados[i + 1];
  
      if (operador === '+') {
        resultado += siguienteNumero;
      } else if (operador === '-') {
        resultado -= siguienteNumero;
      }
    }
  
    return resultado;
  }
  

  // let resultado = calcularOperacion('2^2+7/6*3^2-5*6-√16');

  let resultado = calcularOperacion('4-7+8+9/2*3');

  console.log(resultado);  
