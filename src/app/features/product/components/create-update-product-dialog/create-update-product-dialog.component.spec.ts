import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateProductDialogComponent } from './create-update-product-dialog.component';

describe('CreateUpdateProductDialogComponent', () => {
  let component: CreateUpdateProductDialogComponent;
  let fixture: ComponentFixture<CreateUpdateProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateProductDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
