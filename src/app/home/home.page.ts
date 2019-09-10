import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemons = [];
  @ViewChild(IonInfiniteScroll, {static: false}) infinite: IonInfiniteScroll;
  constructor(private pokeService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 25;
    }
    this.pokeService.getPokemon(this.offset).subscribe(res => {
      console.log('results: ',res);
      
      this.pokemons = [...this.pokemons, ...res];
      
      if (event) {
        event.target.complete();
      }

      if (this.offset == 125 ) {
        this.infinite.disabled = true;
      }
    })
  }

  onSearchChange(event) {
    let value = event.detail.value;

    if (value == '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemons = [res];
    }, err => {
      this.pokemons = [];
    });

  }
}
