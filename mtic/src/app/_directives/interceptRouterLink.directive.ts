import { Directive, HostListener } from '@angular/core';
import { Router } from "@angular/router";

@Directive({
  selector: '[appInterceptRouterlink]'
})
export class InterceptRouterlinkDirective {
  constructor(private router: Router) { }

  @HostListener("click", ["$event"])
  public onClick(e: MouseEvent): void {
    const srcElem = e.target;
    if (srcElem instanceof HTMLAnchorElement)
    {
      const baseURI = srcElem.baseURI ;
      var href = srcElem.href ;
      
      if (href.startsWith(baseURI))
      {
        const baseURILength = baseURI.length;
        href = '/' + href.substring(baseURILength);
      }

      if (href.startsWith('/')) {
        e.preventDefault();
        e.stopPropagation();
        this.router.navigate([href]);
      }
    }
  }
}