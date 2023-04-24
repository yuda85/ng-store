import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { IProduct } from '../../models';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details', () => {
    const product: IProduct = {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: {
        rate: 3.9,
        count: 120,
      },
    };
    component.product = product;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.mat-card-title'))
      .nativeElement.textContent;
    expect(title).toEqual(product.title);

    const description = fixture.debugElement.query(By.css('.mat-card-content'))
      .nativeElement.textContent;
    expect(description).toEqual(product.description);

    const price = fixture.debugElement.query(By.css('.card__price'))
      .nativeElement.textContent;
    expect(price).toEqual('$9.99');
  });

  it('should emit addToCart event when "Add To Cart" button is clicked', () => {
    const product: IProduct = {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: {
        rate: 3.9,
        count: 120,
      },
    };
    component.product = product;
    fixture.detectChanges();

    spyOn(component.addToCart, 'emit');
    const button = fixture.debugElement.query(
      By.css('.mat-button')
    ).nativeElement;
    button.click();

    expect(component.addToCart.emit).toHaveBeenCalledWith(product);
  });

  it('should emit onRemoveFromCart event when "Remove From Cart" button is clicked', () => {
    const product: IProduct = {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: {
        rate: 3.9,
        count: 120,
      },
    };
    component.product = product;
    component.isInCart = true;
    fixture.detectChanges();

    spyOn(component.onRemoveFromCart, 'emit');
    const button = fixture.debugElement.query(
      By.css('.mat-button')
    ).nativeElement;
    button.click();

    expect(component.onRemoveFromCart.emit).toHaveBeenCalledWith(product.id);
  });
});
