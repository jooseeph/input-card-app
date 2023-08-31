import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Router'ı import edin
import { CardService } from '../card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {
  newCard: any = {};
  errorMessage: string = '';

  constructor(private cardService: CardService, private router: Router) { }

  ngOnInit(): void {
  }

  createCard(): void {
    this.cardService.createCard(this.newCard).subscribe(
      (response) => {
        console.log('Card created successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'New card created successfully.',
        }).then(() => {
          this.router.navigate(['/cards']); // Cards bileşenine yönlendir
        });
      },
      (error) => {
        console.error('Error creating card:', error);
      }
    );
  }

  openNewCardDialog(): void {
    if (!this.newCard.title || !this.newCard.name || !this.newCard.description) {Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill in all fields',
    })
    } else {
      this.createCard();
      this.errorMessage = ''; // Hata mesajını sıfırla
    }
  }
}
