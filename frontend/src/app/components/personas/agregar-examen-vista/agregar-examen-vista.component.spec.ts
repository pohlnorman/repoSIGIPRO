import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarExamenVistaComponent } from './agregar-examen-vista.component';


describe('AgregarExameneVistaComponent', () => {
  let component: AgregarExamenVistaComponent;
  let fixture: ComponentFixture<AgregarExamenVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarExamenVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarExamenVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
