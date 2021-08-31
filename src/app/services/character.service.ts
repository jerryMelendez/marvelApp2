import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apikey = `${environment.marvelPublicKey}&ts=${environment.marvelTimeStamp}&hash=${environment.marvelHash}`;
  constructor(
    private http: HttpClient
  ) { }
  // Obtiene todos los personajes
  getCharacters(offset = null, limit = null, name = null): Observable<any>
  {
    if (name === null)
    {
      if (limit === null && offset === null)
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=${this.apikey}`);
      }
      else
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=${this.apikey}&limit=${limit}&offset=${offset}`);
      }
    }
    else // Si la variable name tiene un valor retornará los personajes cuyos nombres comiencen con este string
    {
      if (limit === null && offset === null)
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=${this.apikey}&nameStartsWith=${name}`);
      }
      else
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=${this.apikey}&limit=${limit}&offset=${offset}&nameStartsWith=${name}`);
      }
    }
  }

  // Muestra la informacion de un solo personaje
  show(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${this.apikey}`);
  }

  // Obtiene los comics en los que aparece un personaje
  getComics(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?apikey=${this.apikey}`);
  }

  // Revisar si un personaje está en los favoritos: true -> está, false -> no está
  async checkFavorite(id, uid): Promise<any>
  {
    let band = false;
    // Obtenemos el array de favoritos de storage
    const key = 'favoriteCharacters_' + uid;

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
      const key = 'favoriteCharacters_' + uid; // El uid es el id del usuario que está agregando
  
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
      const key = 'favoriteCharacters_' + uid;

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

  async getFavoriteCharacters(uid): Promise<any>
  {
    const key = 'favoriteCharacters_' + uid;
    const resp = await Storage.get({key});
    return JSON.parse(resp.value);
  }
}
