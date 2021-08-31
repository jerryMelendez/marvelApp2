import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFavoriteComicsComponent } from './modal-favorite-comics.component';

describe('ModalFavoriteComicsComponent', () => {
  let component: ModalFavoriteComicsComponent;
  let fixture: ComponentFixture<ModalFavoriteComicsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFavoriteComicsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFavoriteComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
