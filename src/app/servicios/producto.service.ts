import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = "http://juanlaguna.pythonanywhere.com/producto";

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any>{
    return this.http.get(this.url);
  }

  getProducto(id: String): Observable<any>{
    return this.http.get(this.url+"/"+id);
  }

  eliminarProducto(id: String): Observable<any>{
    return this.http.delete(this.url+"/"+id);
  }

  agregarProducto(producto: any): Observable<any>{
    return this.http.post(this.url, producto);
  }

  editarProducto(id: String, producto: Producto): Observable<any>{
    return this.http.put(this.url+"/"+id, producto);
  }

}
