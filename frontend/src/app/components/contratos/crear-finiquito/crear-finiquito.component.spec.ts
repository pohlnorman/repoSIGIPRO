import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFiniquitoComponent } from './crear-finiquito.component';

describe('CrearFiniquitoComponent', () => {
  let component: CrearFiniquitoComponent;
  let fixture: ComponentFixture<CrearFiniquitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearFiniquitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFiniquitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
