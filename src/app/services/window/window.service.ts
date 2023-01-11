import { Injectable } from '@angular/core';
import { _console, _document, _localStorage, _navigator, _sessionStorage, _window } from './window.service.contracts';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor() {
  }

  private getWindow(): Window {
    return _window();
  }

  private getDocument(): Document {
    return _document();
  }

  private getLocalStorage(): Storage {
    return _localStorage();
  }

  private getSessionStorage(): Storage {
    return _sessionStorage();
  }

  private getConsole(): Console {
    return _console();
  }

  private getNavigator(): Navigator {
    return _navigator();
  }

  get nativeWindow(): Window {
    return this.getWindow();
  }

  get nativeDocument(): Document {
    return this.getDocument();
  }

  get nativeLocalStorage(): Storage {
    return this.getLocalStorage();
  }

  get nativeSessionStorage(): Storage {
    return this.getSessionStorage();
  }

  get nativeConsole(): Console {
    return this.getConsole();
  }

  get nativeNavigator(): Navigator {
    return this.getNavigator();
  }
}
