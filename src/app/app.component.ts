import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'CALCULADORA';
  pantallaCalculadora = "";
  cifra: string = ""
  cifras: string[] = [];
  operaciones: string[] = [];
  acumulador: number = 0;

  contenedor: any;

  @ViewChild('mostrarOperciones', {static: true}) mostrarOperciones!: ElementRef;

  constructor(private renderer:Renderer2) {}

  ngOnInit(): void {
    
  }

  /**
   * CALCULADORA
   */
  enterValue(value: string) {
    if(value=="+"||value=="-"||value=="*"||value=="/")
    {
      this.cifras.push(this.cifra);
      this.cifra = "";
      this.operaciones.push(value);
    } else {
      this.cifra += value; 
    }

    this.pantallaCalculadora = this.pantallaCalculadora + value;
  }
  result() {
    var resultado = 0;
    this.cifras.push(this.cifra);

    const hOperacion = this.pantallaCalculadora;

    this.cifras.forEach((_cifra, index) =>{
      resultado = parseInt(_cifra);
      console.log("resultado: ", resultado);
      if(index==0)
        this.acumulador += resultado;

      console.log("index: ", index);
      if(index > 0) {
        console.log("entra en index: ", index);
        console.log("opera: ", this.operaciones[index-1]);
        if(this.operaciones[index-1] == '+') {
          this.acumulador += resultado;
        }
        if(this.operaciones[index-1] == '-') {
          this.acumulador -= resultado;
        }
        if(this.operaciones[index-1] == '*') {
          this.acumulador *= resultado;
        }
        if(this.operaciones[index-1] == '/') {
          this.acumulador /= resultado;
        }
      }
    });

    this.pantallaCalculadora = this.acumulador.toString() == "Infinity" ? "Error: no es posible dividir por cero (0)" : this.acumulador.toString();
    const hResultado = this.pantallaCalculadora;
    this.crearHistoriaHTML(hOperacion, hResultado);
    console.log("res: ", this.acumulador);
  }

  clear() {
    this.pantallaCalculadora = "";
    this.cifra = "";
    this.cifras = [];
    this.operaciones = [];
    this.acumulador = 0;
  }

  crearHistoriaHTML(operacion: string, resultado: string) {
    var containerCard = document.createElement('div');
    var verOperacion = document.createElement('p');
    var verResultado = document.createElement('p');

    containerCard.classList.add("containerCard");
    verOperacion.classList.add("operation");
    verResultado.classList.add("resultOperation");

    containerCard.appendChild(verOperacion);
    containerCard.appendChild(verResultado);

    this.renderer.appendChild(this.mostrarOperciones.nativeElement, containerCard);

    this.contenedor = containerCard;
    this.contenedor.querySelector('.operation').innerText = `${operacion} =`;
    this.contenedor.querySelector('.resultOperation').innerText = resultado;
  }

  limpiarHistorial() {
    this.mostrarOperciones.nativeElement.innerHTML = '';
  }
}
