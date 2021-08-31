import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private apikey = `${environment.marvelPublicKey}&ts=${environment.marvelTimeStamp}&hash=${environment.marvelHash}`;

  constructor(
    private http: HttpClient
  ) { }

  // Obtiene todos los comics
  getComics(offset = null, limit = null, title = null): Observable<any>
  {
    if (title === null)
    {
      if (limit === null && offset === null)
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/comics?apikey=${this.apikey}`);
      }
      else
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/comics?apikey=${this.apikey}&limit=${limit}&offset=${offset}`);
      }
    }
    else
    {
      if (limit === null && offset === null)
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/comics?apikey=${this.apikey}&titleStartsWith=${title}`);
      }
      else
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/comics?apikey=${this.apikey}&limit=${limit}&offset=${offset}&titleStartsWith=${title}`);
      }
    }
  }

  // Obtiene un registro
  show(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=${this.apikey}`);
  }

  // Obtiene los personajes del comic
  getCharacters(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/comics/${id}/characters?apikey=${this.apikey}`);
  }

  // Revisar si un personaje está en los favoritos: true -> está, false -> no está
  async checkFavorite(id, uid): Promise<any>
  {
    let band = false;
    // Obtenemos el array de favoritos de storage
    const key = 'favoriteComics_' + uid;

    await Storage.get({key}).then((items) => {
      let data: any[] = JSON.parse(items.value);

      if (data) // Si existe un array buscará al personaje entre los elementos
      {
        const result = data.find(e => e.id === id); // Buscamos un personaje cuyo id coincida con alguno del array

        if (result) // Si encuentra un resultado significa que el personaje está en favoritos y devuelve true
        {
          band = true;
        }
        else // En caso contrario devuelve false
        {
          band = false;
        }
      }
      else // Si no existe automaticamente devolvemos false
      {
        band = false;
      }
    });
    return band;
  }

    // Agrega un personaje a un array de favoritos en el local storage
    async addFavorite(character, uid): Promise<any>
    {
      // Creamos un array en el local storage de todos los personajes favoritos que el usuario ha agregado
      const key = 'favoriteComics_' + uid; // El uid es el id del usuario que está agregando
  
      // Consultar si existe ese array en el storage
      const resp = await Storage.get({ key }).then((items) => {
        let data: any[] = JSON.parse(items.value); // Obtener la respuesta del JSON y guardarla en una variable de tipo objeto
        // Verificar si existe un objeto guardado
        if ( data )
        {
          //Agregamos el personaje al array
          data.push(character);
  
          // filtramos el array para que no hallan personajes repetidos
          const hash = {};
          data = data.filter(current => {
            const exists = !hash[current.id];
            hash[current.id] = true;
            return exists;
          });
          
          // Cargamos el array devuelta al local storage
          Storage.set({ key, value: JSON.stringify(data) });
        }
        else // Si no hay algun registro guardado Asignar el primero
        {
          Storage.set({ key, value: JSON.stringify([character]) });
        }
      });
      return resp;
    }

    async RemoveFavorite(id, uid): Promise<any>
    {
      let band = false; // Bandera que nos dirá si la operación fué exitosa: true -> exito, false -> fracaso
      const key = 'favoriteComics_' + uid;

    await Storage.get({key}).then((items) => {
      let data: any[] = JSON.parse(items.value);

      if (data)
      {
        const index = data.findIndex(e => e.id === id); // Buscará el indice del personaje a remover

        if (index >= 0) 
        {
          data.splice(index, 1); // Eliminará el personaje del array

          Storage.set({ key, value: JSON.stringify(data) }); // Cargamos el array devuelta al local storage

          band = true;
        }
      }
    });
    return band;
  }

  async getfavoriteComics(uid): Promise<any>
  {
    const key = 'favoriteComics_' + uid;
    const resp = await Storage.get({key});
    return JSON.parse(resp.value);
  }
}
