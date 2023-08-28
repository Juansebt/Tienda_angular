import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listaProductos: any;
  listaCategorias: any;
  display='none';
  detalleDisplay='none';
  idProducto: any;
  productoSeleccionado: any;
  url: any;

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private router: Router) {
    this.url = "http://juanlaguna.pythonanywhere.com/media/images";
  }

  obtenerProductos(){
    this.productoService.getProductos().subscribe((result) => {
      this.listaProductos=result;
    });
  }

  listarCategorias(){
    this.categoriaService.listarCategorias().subscribe((result) => {
      this.listaCategorias=result;
    });
  }

  cerrarModal(){
    this.display='none';
    this.router.navigate(["/","productos"])
  }

  

  abrirModalEliminar(id:number){
    this.display='block';
    this.idProducto=id;
  }


  // obtenerNombreCategoria(idCategoria: number) {
  //   const categoria = this.listaCategorias.find((c: any) => c.id === idCategoria);
  //   return categoria ? categoria.catNombre : '';
  // }

  eliminarProducto(){
    this.productoService.eliminarProducto(this.idProducto).subscribe((result) => {
      // this.router.navigate(["/","productos"])
      this.obtenerProductos();
    },error => {
      console.log(error);
    });
    this.cerrarModal();
  }

  actualizarProducto() {
    // Aquí debes implementar la lógica para actualizar el producto
    // Utiliza this.productoSeleccionado para obtener los datos actualizados
    // Puedes llamar a un servicio o realizar una solicitud HTTP para enviar los datos al servidor
    // Después de actualizar, cierra la modal con this.cerrarModalEditar()
  }

  ngOnInit(): void {
      this.listarCategorias();
      this.obtenerProductos();
      console.log(this.listaProductos);

  }
}
