import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [`
    mat-card {
      width:20%;
    }
  `
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;
  
  constructor(private HeroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    // trim() para borrar los espacios al final y al principio lo que vendria siendo como si el usuario no hubiera espaciado el termino
    this.HeroesService.getSugerencias(this.termino.trim())
        .subscribe (heroes => this.heroes = heroes);
    if (this.heroes.length === 0) {  };
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent){

    if (!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = event.option.value

    this.termino = heroe.superhero;

    this.HeroesService.getHeroeById(heroe.id!)
        .subscribe( heroe => this.heroeSeleccionado = heroe)

  }

}
