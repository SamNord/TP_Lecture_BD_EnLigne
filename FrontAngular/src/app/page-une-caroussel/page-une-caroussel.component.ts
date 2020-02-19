import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-une-caroussel',
  templateUrl: './page-une-caroussel.component.html',
  styleUrls: ['./page-une-caroussel.component.scss']
})
export class PageUneCarousselComponent implements OnInit {
  @Input() slides;
  currentSlide = 0;
  constructor() { }

  ngOnInit() {
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

}
