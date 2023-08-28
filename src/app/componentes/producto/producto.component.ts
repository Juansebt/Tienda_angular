import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { Producto } from 'src/app/modelos/producto.model';
import { ProductoService } from 'src/app/servicios/producto.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{
  public frmProducto!: FormGroup;
  public producto!: Producto;
  public mensaje: String = '';

  listaCategorias: any;
  rutaFoto:any;

  constructor(private _productoService: ProductoService,
              private _categoriaService: CategoriaService,
              private router: Router){ }

  listarCategorias(){
    this._categoriaService.listarCategorias().subscribe((result) => {
      this.listaCategorias=result;
    });
  }

  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rutaFoto = URL.createObjectURL(file);
      this.frmProducto.get('fileFoto')?.setValue(file);
    }
  }

  agregarProducto(frmProductoValue:any){

    const formData = new FormData();

    if (this.frmProducto.valid) {
      var codigo = frmProductoValue.txtCodigo;
      var nombre = frmProductoValue.txtNombre;
      var precio = frmProductoValue.txtPrecio;
      var categoria = frmProductoValue.cbCategoria;
      var foto = frmProductoValue.fileFoto;

      formData.append('proCodigo', codigo);
      formData.append('proNombre', nombre);
      formData.append('proPrecio', precio);
      formData.append('proCategoria', categoria);
      formData.append('proFoto', this.frmProducto.get('fileFoto')?.value);

      this.producto = new Producto(codigo,nombre,precio,categoria, foto);
    }
    console.log(this.producto);
    this._productoService.agregarProducto(formData).subscribe(respuesta=>{
      console.log(respuesta);
      this.mensaje="Producto agregado correctamente";
      Swal.fire('Éxito', 'El producto se ha agregado correctamente', 'success');
      this.router.navigate(["/","productos"])
      // this.location.back();
    }, error=>{
      console.log(error);
      this.mensaje="Problemas al agregar el producto";
      Swal.fire('Error', 'Problemas al agregar el produco', 'error');
    });
  }

  ngOnInit(): void {
    this.listarCategorias();
    this.frmProducto = new FormGroup ({
      txtCodigo: new FormControl ( '' , [ Validators . required]),
      txtNombreP: new FormControl ( '' , [ Validators . required , Validators . maxLength ( 60 )]),
      txtPrecio: new FormControl ( '' , [ Validators . required]),
      cbCategoria: new FormControl ( '' , [ Validators . required]),
      fileFoto: new FormControl ( '',),
    });
  }
}
