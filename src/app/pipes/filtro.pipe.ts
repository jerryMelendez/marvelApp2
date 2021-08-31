import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( arreglo: any[], texto: string, col1: string, col2: string = null, col3: string = null): any[] {
    if ( texto === '' || texto === undefined )
    {
      return arreglo;
    }
    else
    {
      texto = texto.toLowerCase();

      const busqueda1 = arreglo.filter(item => {
        return item[col1].toLowerCase()
          .includes(texto);
      });
      if (busqueda1.length > 0)
      {
        return busqueda1;
      }
    }
  }
}
