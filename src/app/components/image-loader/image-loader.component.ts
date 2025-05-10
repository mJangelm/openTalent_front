import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  imports: [CommonModule],
  templateUrl: './image-loader.component.html',
  styleUrl: './image-loader.component.css',
})
export class ImageLoaderComponent {
  @Input() src!: string;
  @Input() alt: string = '';
  @Input() width: string = '100%';
  @Input() height: string = '200px';

  isLoading = true;
  hasError = false;

  onImageLoad() {
    this.isLoading = false;
    this.hasError = false;
  }

  onImageError() {
    this.isLoading = false;
    this.hasError = true;
  }
}
