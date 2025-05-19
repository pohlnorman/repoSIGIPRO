import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTallasComponent } from './lista-tallas.component';

describe('ListaTallasComponent', () => {
  let component: ListaTallasComponent;
  let fixture: ComponentFixture<ListaTallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTallasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
