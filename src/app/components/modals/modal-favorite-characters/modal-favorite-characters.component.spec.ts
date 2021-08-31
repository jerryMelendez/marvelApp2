import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFavoriteCharactersComponent } from './modal-favorite-characters.component';

describe('ModalFavoriteCharactersComponent', () => {
  let component: ModalFavoriteCharactersComponent;
  let fixture: ComponentFixture<ModalFavoriteCharactersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFavoriteCharactersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFavoriteCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
