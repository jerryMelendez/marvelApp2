import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatorsService {

  private apikey = `${environment.marvelPublicKey}&ts=${environment.marvelTimeStamp}&hash=${environment.marvelHash}`;

  constructor(
    private http: HttpClient
  ) { }

  // Obtiene los creadores
  getCreators(offset = null, limit = null, name = null): Observable<any>
  {
    if (name === null)
    {
      if (limit === null && offset === null)
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/creators?apikey=${this.apikey}`);
      }
      else
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/creators?apikey=${this.apikey}&limit=${limit}&offset=${offset}`);
      }
    }
    else
    {
      if (limit === null && offset === null)
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/creators?nameStartsWith=${name}&apikey=${this.apikey}`);
      }
      else
      {
        return this.http.get(`https://gateway.marvel.com:443/v1/public/creators?nameStartsWith=${name}&apikey=${this.apikey}&limit=${limit}&offset=${offset}`);
      }
    }
  }

  // Obtiene un registro
  show(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/creators/${id}?apikey=${this.apikey}`);
  }

  // Obtiene los comics del creador
  getComics(id): Observable<any>
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/creators/${id}/comics?apikey=${this.apikey}`);
  }
}
