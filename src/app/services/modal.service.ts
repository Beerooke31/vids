import { Injectable, signal } from '@angular/core';

interface IModal {
  id: string;
  element: HTMLDialogElement;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals = signal<IModal[]>([]);
  constructor() {}
}
