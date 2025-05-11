import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  // providers: [ModalService],
})
export class ModalComponent {
  modal = inject(ModalService);
}
