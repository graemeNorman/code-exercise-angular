import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from "@angular/platform-browser";

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.paginationData = { page: 1, pageSize: 1, total: 2, count: 1 };
    component.page  = 1;
    component.pageSize = 1;
    component.lastPage = 2;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should have default page data and page 1 pagination data', () => {
    const spyOutput = spyOn(component.outputPaginationData, 'emit');

    component.ngOnInit();
    fixture.detectChanges();

    expect(spyOutput).toHaveBeenCalledWith({ pageSize: 1 });
    expect(component.page).toEqual(1);
  });

  it('should navigate to the previous page when the previous page nav is clicked on a page that has previous page',() => {
    const spyOutput = spyOn(component.outputPaginationData, 'emit');
    spyOn(component, 'paginationPrev').and.callThrough();
    component.paginationData = { page: 2, pageSize: 1, total: 2, count: 1 };
    component.page = 2;
    fixture.detectChanges();

    // Find and click 'next page' button
    const prevNavButton = fixture.debugElement.query(By.css('[class="previous-page"]'));
    prevNavButton.nativeElement.click();
    fixture.detectChanges();

    expect(spyOutput).toHaveBeenCalledWith({ pageSize: 1, page: 1 });
  });

  it('should not navigate when the previous page nav is clicked on the first page', () => {
    spyOn(component, 'paginationPrev').and.callThrough();

    const prevNavButton = fixture.debugElement.query(By.css('.previous-page'));
    expect(prevNavButton.nativeElement.disabled).toBe(true);
  });

  it('should go to a specified page when user updates go to page input and blur event triggered',() => {
    const spyOutput = spyOn(component.outputPaginationData, 'emit');
    const spyGoToPage = spyOn(component, 'goToPage').and.callThrough();

    const goToPageInput = fixture.debugElement.query(By.css('[class="go-to-page"]'));
    let goToPageInputElement = goToPageInput.nativeElement;
    goToPageInputElement.value = '2';

    const event = new Event('blur');
    goToPageInputElement.dispatchEvent(new Event('blur'))

    expect(spyGoToPage).toHaveBeenCalledWith(event);
    expect(spyOutput).toHaveBeenCalledWith({ pageSize: 1, page: '2' });
  });
});
