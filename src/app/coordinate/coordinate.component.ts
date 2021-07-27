import { Component, OnInit, forwardRef } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-coordinate',
  templateUrl: './coordinate.component.html',
  styleUrls: ['./coordinate.component.scss']
})
export class CoordinateComponent implements OnInit {

  rowColumn: string;
  output: string[] = [];
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    for (let i = 0; i < 3; i++)
    {
      this.output[i] = '';
    }
  }

  GetCoordinates(): void {
    this.apiService.GetCoordinates(this.rowColumn).subscribe(res => {
      for (let i = 0; i < 3; i++)
      {
        this.output[i] = res[i].x.toString() + ',' + res[i].y.toString();
      }

    }, err =>  {
      for (let i = 0; i < 3; i++)
      {
        this.output[i] = '';
      }
      if (err.error?.error)
      {
        alert(err.error.error.message);
      }
      else
      {
        alert('An unknown error occured');
      }
    });
  }
}
