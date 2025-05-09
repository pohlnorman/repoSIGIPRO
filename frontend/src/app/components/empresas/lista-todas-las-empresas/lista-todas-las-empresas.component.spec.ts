import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTodasLasEmpresasComponent } from './lista-todas-las-empresas.component';

describe('ListaTodasLasEmpresasComponent', () => {
  let component: ListaTodasLasEmpresasComponent;
  let fixture: ComponentFixture<ListaTodasLasEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTodasLasEmpresasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTodasLasEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
