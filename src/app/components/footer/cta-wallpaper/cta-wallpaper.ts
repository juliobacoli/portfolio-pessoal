import { Component, HostListener, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cta-wallpaper',
  templateUrl: './cta-wallpaper.html',
  styleUrl: './cta-wallpaper.scss',
})
export class CtaWallpaper implements OnInit, AfterViewInit {
  ovals: number[] = [];
  
  @ViewChildren('ovalElement') ovalElements!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.calculate();
  }

  ngAfterViewInit() {
    this.setupMagneticDodge();
  }

  @HostListener('window:resize')
  calculate(): void {
    const isMobile = window.innerWidth < 768;
    this.ovals = Array(isMobile ? 1 : 16).fill(0);
    
    // Re-setup listener after recreating elements
    setTimeout(() => this.setupMagneticDodge(), 100);
  }

  private setupMagneticDodge() {
    this.ovalElements.forEach((ovalRef) => {
      const el = ovalRef.nativeElement as HTMLElement;
      
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate distance from center
        const distanceX = x - centerX;
        const distanceY = y - centerY;
        
        // The magic: move the element IN THE OPPOSITE DIRECTION of the mouse
        // Multiplier controls how far it dodges
        const moveX = (distanceX * -0.4); 
        const moveY = (distanceY * -0.4);

        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      el.addEventListener('mouseleave', () => {
        // Snap back to center smoothly when mouse leaves
        el.style.transform = 'translate(0px, 0px)';
      });
    });
  }
}
