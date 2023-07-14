import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../../../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../../../libro';
import {Archivio} from '../../../archivio';
import {CommonModule} from '@angular/common'
@Component({
  selector: 'app-presta',
  templateUrl: './presta.component.html',
  styleUrls: ['./presta.component.css'],
  standalone: true,
  providers: [DbLibriService],
  imports: [CommonModule]
})
export class PrestaComponent implements OnInit {
  @Input() libroTrovato: Libro = new Libro("", "", "", true); //true???
  constructor() { }

  ngOnInit() {
  }

}