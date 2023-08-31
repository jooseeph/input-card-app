import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateY(179deg)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ],
})
export class CardListComponent implements OnInit {
  cards: any[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  toggleFlip(card: any) {
    card.flip = card.flip === 'inactive' ? 'active' : 'inactive';
  }

  loadCards() {
    this.cardService.getCards().subscribe(
      (response) => {
        this.cards = response.map((card) => ({
          ...card,
          flip: 'inactive',
        }));
      },
      (error) => {
        console.error('Error loading cards:', error);
      }
    );
  }
}
