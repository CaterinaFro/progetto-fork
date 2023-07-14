import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../../libro';
import {Archivio} from '../../archivio';
import {CommonModule} from '@angular/common'




@Component({
  selector: 'app-elimina',
  templateUrl: './elimina.component.html',
  styleUrls: ['./elimina.component.css'],
  providers: [DbLibriService],
  imports: [CommonModule],
  standalone: true
})
export class EliminaComponent implements OnInit {

  constructor(private dbls: DbLibriService) { }

  ngOnInit() {
  }

}