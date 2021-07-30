import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})


export class ListadoComponent implements OnInit {
  
  heroes: Heroe[] = []

  constructor( private HeroesService: HeroesService ) { }

  ngOnInit(): void {
    this.HeroesService.getHeroes()
      .subscribe( resp => { this.heroes = resp });
  };

  
}
