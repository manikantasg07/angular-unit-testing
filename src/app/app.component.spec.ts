import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [AppComponent],
  //   }).compileComponents();
  // });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have the 'angular-unit-testing' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('angular-unit-testing');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-unit-testing');
  // });

    let component:AppComponent;
    let fixture:ComponentFixture<AppComponent>;
    let el:DebugElement

    beforeEach(waitForAsync(()=>{
      TestBed.configureTestingModule({imports:[AppComponent]}).compileComponents().then(()=>{
        fixture=TestBed.createComponent(AppComponent);
        component=fixture.componentInstance;
        el=fixture.debugElement;
        // fixture.detectChanges();
      })
    }))


    it("should create a component",()=>{
      expect(component).toBeDefined()
    })


    it("should find the <h1> with text unit testing angular",()=>{

      // let pElements = el.queryAll(By.css('p'))
      let pElements = el.queryAll(By.css("h1"));
      expect(pElements[0].nativeElement.textContent).toBe("Unit Testing Angular")

    })

    it("button should be disabled",()=>{

      let btnElement = el.query(By.css(".btn"));
      expect(btnElement.nativeElement.disabled).toBeTrue()

    })

    it("should generate the interpolated value title",()=>{
      component.title="Mock Title"
      fixture.detectChanges();
      const divElement = el.query(By.css(".title"))
      expect(divElement.nativeElement.textContent.trim()).toBe("Mock Title");
    })

    it("should render a button with text subscribe",()=>{
      component.subscribed=false;
      component.btnText="Subscribe"
      fixture.detectChanges();
      const subscribeBtn = el.query(By.css(".subscribe"))
      expect(subscribeBtn.nativeElement.textContent.trim()).toBe("Subscribe");
    })

    it("should render a button with text subscribed and the button should be disabled after click",()=>{

      component.subscribed=false;
      component.btnText="Subscribe"
      fixture.detectChanges();
      let subscribeBtn = el.query(By.css(".subscribe"))
      subscribeBtn.nativeElement.click();
      fixture.detectChanges();
      subscribeBtn = el.query(By.css(".subscribe"))
      expect(subscribeBtn.nativeElement.textContent.trim()).toBe("Subscribed");
      expect(subscribeBtn.nativeElement.disabled).toBeTrue();

    })


});
