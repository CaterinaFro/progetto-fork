import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../../../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../../../libro';
import {Archivio} from '../../../archivio';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-restituisci',
  templateUrl: './restituisci.component.html',
  styleUrls: ['./restituisci.component.css'],
  standalone: true,
  providers: [DbLibriService],
  imports: [CommonModule]
})
export class RestituisciComponent implements OnInit {
  @Input() libroTrovato: Libro = new Libro("", "", "", true); //true???
  constructor() { }

  ngOnInit() {
  }

}