import { TestBed } from "@angular/core/testing";
import { CalcService } from "./calc.service"
import { SharedService } from "./shared.service";



describe("CalcService",()=>{

  let sharedService:jasmine.SpyObj<SharedService>;
  let calc:CalcService;

  beforeEach(()=>{
    sharedService = jasmine.createSpyObj("SharedService",["mySharedFunction"]);
    TestBed.configureTestingModule({
      providers:[CalcService,{
        provide:SharedService,useValue:sharedService
      }]
    })
    calc=TestBed.inject(CalcService);
    sharedService=TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    
  })

  it("Should Multiply two numbers",()=>{
    const result  = calc.multiply(3,5);
    expect(result).toBe(15);
  })

  it("Should add two numbers",()=>{
    const result  = calc.add(3,5);
    expect(result).toBe(8);
  })

  it("Should call the mysharedfunction func ",()=>{
      const result = calc.multiply(3,5);
      expect(sharedService.mySharedFunction).toHaveBeenCalled();
  })
})