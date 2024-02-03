import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStickyMenu]'
})
export class StickyMenuDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
    img
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset;    
    if (scrollPosition > 100) { 
      this.renderer.addClass(this.el.nativeElement, 'stick-heder');
    } else {
      this.renderer.removeClass(this.el.nativeElement,'stick-heder');
    }
  }
}
