import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 50%;
      border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute,
               private HeroesService: HeroesService,  
               private router: Router 
             ) {  }
  // constructor(private HeroesService: HeroesService) {  }

  ngOnInit(): void {
    this.activatedRoute.params
        .pipe(
        switchMap( ({id}) => this.HeroesService.getHeroeById(id)))
        // .subscribe( ({id}) => console.log(id));
        .subscribe( heroe => this.heroe = heroe);


    // this.activatedRoute.params
    // .subscribe(({id}) => console.log(id));
  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }
}



// Get the current <id> as specified in routing module heroes/:id
//
// this.activatedRoute.params
//     .subscribe(({id}) => console.log(id));
