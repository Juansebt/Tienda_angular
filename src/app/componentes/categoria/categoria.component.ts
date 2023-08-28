import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelos/categoria.model';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  public frmCategoria!: FormGroup;
  public categoria!: Categoria;
  public mensaje: String ='';
  public listaCategorias: any;

  constructor(private location : Location, private categoriaService: CategoriaService){ }

  obtenerCategorias(){
    this.categoriaService.listarCategorias().subscribe(data=>{
      console.log(data);
      this.listaCategorias=data;
    }, error=>{
      console.log(error);
    })
  }

  public agregarCategoria = (frmCategoriaValue: { txtNombre: String; })=>{
    if (this.frmCategoria.valid) {
      this.categoria = new Categoria(frmCategoriaValue.txtNombre.valueOf());
    }
    this.categoriaService.agregarCategoria(this.categoria).subscribe(respuesta=>{
      console.log(respuesta);
      this.mensaje="Categoria agregada correctamente";
      Swal.fire('Éxito', 'La categoría se ha agregado correctamente', 'success');
    }, error=>{
      console.log(error);
      this.mensaje="Problemas al agregar la categoria";
      Swal.fire('Error', 'Problemas al agregar la categoria', 'error');
      this.frmCategoria.reset();
    });
  }

  ngOnInit(): void {
    this.frmCategoria = new FormGroup ({
      txtNombre: new FormControl ( '' ,
      [ Validators . required , Validators . maxLength ( 60 )]),
    });
  }
}
