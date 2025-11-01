import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class MyTranslate {

  constructor(private translateService: TranslateService, @Inject(PLATFORM_ID) id: object, private cookie: CookieService) {
    let defaultLange = 'en';
    if (isPlatformBrowser(id)) {
      if (this.cookie.get('lang') !== null) {
        defaultLange = this.cookie.get('lang')
      }
      this.changeLanguage(defaultLange);
    }

  }
  changeLanguage(lang: string) {
    this.cookie.set('lang', lang);
    this.translateService.setFallbackLang(lang);
    this.translateService.use(lang);
    this.changeDirection(lang);
  }
  // change direction
  changeDirection(lang: string) {
    if (lang === 'en') {
      document.dir = 'ltr'
    } else if (lang === 'ar') {
      document.dir = 'rtl'
    }
  }
}
