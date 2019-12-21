import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BreakoutPage } from './breakout.page';

describe('BreakoutPage', () => {
  let component: BreakoutPage;
  let fixture: ComponentFixture<BreakoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BreakoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
