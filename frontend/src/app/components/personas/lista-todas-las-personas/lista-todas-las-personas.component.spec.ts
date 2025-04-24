import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTodasLasPersonasComponent } from './lista-todas-las-personas.component';

describe('ListaTodasLasPersonasComponent', () => {
  let component: ListaTodasLasPersonasComponent;
  let fixture: ComponentFixture<ListaTodasLasPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTodasLasPersonasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTodasLasPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
