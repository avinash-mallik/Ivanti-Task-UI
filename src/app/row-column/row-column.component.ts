import { Component, OnInit } from '@angular/core';
import { Coordinate } from '../Model/Coordinate';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-row-column',
  templateUrl: './row-column.component.html',
  styleUrls: ['./row-column.component.scss']
})
export class RowColumnComponent implements OnInit {

  inputs: string[] = [];
  coordinates: Coordinate[] = [];
  rowColumn = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  GetRowAndColumn(): void {
    for (let i = 0; i < 3; i++)
    {
      if (this.inputs.length === 0 || this.inputs[i] === '')
      {
        alert('Invalid input');
        return;
      }

      const input = this.inputs[i].split(',');
      if (input[0] === '' || input[1] === '')
      {
        alert('Invalid input');
        return;
      }
      const x = Number(input[0]);
      const y = Number(input[1]);
      if (isNaN(x) && isNaN(y))
      {
        alert('Invalid input');
        return;
      }

      this.coordinates[i] = new Coordinate(x, y);
    }

    this.apiService.GetRowAndColumn(this.coordinates).subscribe(res => {
      this.rowColumn = res.toString();
    } , err =>  {
      this.rowColumn = '';
      const errorObj = JSON.parse(err.error);
      if (errorObj?.error)
      {
        alert(errorObj.error.message);
      }
      else
      {
        alert('An unknown error occured');
      }
    });
  }

}
