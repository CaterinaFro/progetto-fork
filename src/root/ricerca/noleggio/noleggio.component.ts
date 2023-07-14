import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DbLibriService } from '../../db-libri.service';
import { AjaxResponse } from 'rxjs/ajax';
import {Libro} from '../../libro';
import {Archivio} from '../../archivio';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-noleggio',
  templateUrl: './noleggio.component.html',
  styleUrls: ['./noleggio.component.css'],
  standalone: true,
  providers: [DbLibriService],
  imports: [CommonModule]
})
export class NoleggioComponent implements OnInit {

  constructor(private dbls: DbLibriService) { }

  ngOnInit() {
  }

}