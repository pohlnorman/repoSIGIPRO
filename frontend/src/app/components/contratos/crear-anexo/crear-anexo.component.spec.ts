import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnexoComponent } from './crear-anexo.component';

describe('CrearAnexoComponent', () => {
  let component: CrearAnexoComponent;
  let fixture: ComponentFixture<CrearAnexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAnexoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAnexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
