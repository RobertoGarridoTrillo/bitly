import {Component} from '@angular/core';
import {ShortUrlService} from "../../services/short-url.service";

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent {

  nombreUrl: string = "";
  urlShort: string = "";
  urlProcesada = false;
  loading = false;
  mostrarError: boolean = false;
  textError: string = "";

  constructor(private _shortUrlService: ShortUrlService) {
  }

  procesarUrl() {
    // Validar si url es vacía
    if (this.nombreUrl === "") {
      this.error("Por favor ingrese la url");
      return;
    }

    this.urlProcesada = false;
    this.loading = true;
    setTimeout(() => {
      this.obtenerUrlShort();
    }, 0);
  }

  obtenerUrlShort():void {
    this._shortUrlService.getUrlShort(this.nombreUrl).subscribe({
      next: (response) => {
        this.urlProcesada = true;
        this.loading = false;
        this.urlShort = response.link;
      }, error: (err) => {
        if (err.error.descripcion !== "The value provided is invalid.") {
          this.error("La url ingresada es invalida");
          this.nombreUrl = "";
        }
        this.loading = false;
      }, complete: () => {
      }
    });
  }

  error(valor:string):void {
    this.mostrarError = true;
    this.textError = valor;
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
  }
}

