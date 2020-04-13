import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  guardar( form: NgForm ) {
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
    // console.log(form);
    // console.log(this.heroe);

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id ) {
      peticion = this.heroesService.actualizarHeroe( this.heroe );

      // this.heroesService.actualizarHeroe( this.heroe )
      //   .subscribe( resp => {
      //     console.log(resp);
      //   });
    } else {
      peticion = this.heroesService.crearHeroe( this.heroe );

      // this.heroesService.crearHeroe( this.heroe )
      //   .subscribe( resp => {
      //     console.log(resp);
      //   });
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    });
  }

}
