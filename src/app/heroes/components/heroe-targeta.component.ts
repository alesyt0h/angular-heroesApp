import { Component, Input } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-targeta',
  templateUrl: './heroe-targeta.component.html',
  styles: [`
  mat-card {
    margin-top: 20px;
  }
  `]
})
export class HeroeTargetaComponent{

  constructor(){}
  
  @Input() heroe!: Heroe;

}
