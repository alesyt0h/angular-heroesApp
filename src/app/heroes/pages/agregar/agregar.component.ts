import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }  
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    alt_img: '',
    publisher: Publisher.DCComics
  }

  constructor(
              private _HeroesService: HeroesService,
              private _ActivatedRoute: ActivatedRoute,
              private _router: Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog
            )  { }

  ngOnInit(): void {

    if( !this._router.url.includes('editar') ) {
      return;
    }
    this._ActivatedRoute.params
        .pipe(
          switchMap(({id}) => this._HeroesService.getHeroeById(id))
        )
        .subscribe( heroe => this.heroe = heroe);
  }


  guardar(){
    if ( this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      // Actualizar

      this._HeroesService.actualizarHeroe(this.heroe)
        .subscribe( heroe => this.mostrarSnackbar('Registro actualizado'))
    } else {
      // Crear
      this._HeroesService.agregarHeroe(this.heroe)
          .subscribe( heroe => {
            this._router.navigate(['/heroes/editar', heroe.id]);
            this.mostrarSnackbar('Registro creado');
          })
    }

  }

  borrar(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: {...this.heroe}
    });

    // tarea switchmap
    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this._HeroesService.borrarHeroe(this.heroe.id! )
          .subscribe( resp => {
            this._router.navigate(['/heroes']);
          })
        }
      }
    )
    
  }

  mostrarSnackbar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 2500
    } );
  }

}
