import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../../libro';
import {Archivio} from '../../archivio';
import {CommonModule} from '@angular/common'
import {PrestaComponent} from './presta/presta.component';
import {RestituisciComponent} from './restituisci/restituisci.component';


@Component({
  selector: 'app-visualizzazione',
  templateUrl: './visualizzazione.component.html',
  styleUrls: ['./visualizzazione.component.css'],
  standalone: true,
  providers: [DbLibriService],
  imports: [CommonModule, RestituisciComponent, PrestaComponent]

})
export class VisualizzazioneComponent implements OnInit {
  @Output() sezioneEvent = new EventEmitter<boolean>();
  @Input() libroTrovato: Libro = new Libro("", "", "", true); //true???

  constructor(private dbls: DbLibriService) { }

  ngOnInit() {
  }



}