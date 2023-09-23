import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit{

  isLoading = false;

  constructor(private loadService: LoaderService) {}

  ngOnInit(): void {
    this.loadService.isLoading$.subscribe( status => {
      this.isLoading = status;
    })
  }
}
