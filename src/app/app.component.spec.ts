import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { count, delay, of } from 'rxjs';

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

    // it("should render a button with text subscribed and the button should be disabled after click",(done:DoneFn)=>{

    //   component.subscribed=false;
    //   component.btnText="Subscribe"
    //   fixture.detectChanges();
    //   let subscribeBtn = el.query(By.css(".subscribe"))
    //   subscribeBtn.nativeElement.click();
    //   setTimeout(()=>{
    //     console.log("Hello");
    //     done();
    //   },8000)
    //   setTimeout(()=>{
    //     fixture.detectChanges();
    //     subscribeBtn = el.query(By.css(".subscribe"))
    //     expect(subscribeBtn.nativeElement.textContent.trim()).toBe("Subscribed");
    //     expect(subscribeBtn.nativeElement.disabled).toBeTrue();
        
    //   },3000)
    // })


    it("should render a button with text subscribed and the button should be disabled after click",fakeAsync(()=>{

      component.subscribed=false;
      component.btnText="Subscribe"
      fixture.detectChanges();
      let subscribeBtn = el.query(By.css(".subscribe"))
      subscribeBtn.nativeElement.click();
      setTimeout(()=>{
        console.log("Hello");
      },8000)
      setTimeout(()=>{
        fixture.detectChanges();
        subscribeBtn = el.query(By.css(".subscribe"))
        
      },3000)

      // tick(3000);
      flush();

      expect(subscribeBtn.nativeElement.textContent.trim()).toBe("Subscribed");
      expect(subscribeBtn.nativeElement.disabled).toBeTrue();

      // tick(5000);

    }))

    it("should test the promise",fakeAsync(()=>{

      let counter=0;

      setTimeout(()=>{
        counter=counter +2;
      },2000)

      setTimeout(()=>{
        counter=counter+3;
      },3000)

      Promise.resolve().then(()=>{
        counter=counter+1
      })
      
      // flush();

      flushMicrotasks();
      expect(counter).toBe(1);      
      tick(2000);
      expect(counter).toBe(3);
      tick(1000);
      expect(counter).toBe(6);

    }))

    it("should test observable",fakeAsync(()=>{

      let isSubscribed = false;
      let obs = of(isSubscribed).pipe(delay(2000));
      obs.subscribe(()=>{
        isSubscribed=true
      })
      // flush();
      tick(2000);
      expect(isSubscribed).toBeTrue()

    }))
});
