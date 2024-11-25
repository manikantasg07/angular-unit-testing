import { TestBed } from '@angular/core/testing';

import { DataServiceService } from './data-service.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { users } from './mock-data/users';

describe('DataServiceService', () => {
  let service: DataServiceService;
  let testingcontroller:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(),provideHttpClientTesting()]
    });
    testingcontroller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataServiceService);
  });

  afterEach(()=>{
    testingcontroller.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get all users",()=>{
    service.getAllUsers().subscribe((users:any)=>{
        expect(users).toBe(users)
    });
    const mockReq = testingcontroller.expectOne("https://jsonplaceholder.typicode.com/users","reques to load users");
    expect(mockReq.request.method).toBe("GET");
    mockReq.flush(Object.values(users)); //resolve the promise
    

  })
  

  it('should verify the PUT request for updateUser', () => {
    const updatedUser = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      }
    };

    service.updateUser(1, updatedUser).subscribe((user) => {
      expect(user).toEqual(updatedUser); // Use toEqual for deep comparison
    });

    const mockReq = testingcontroller.expectOne("/api/users/1", "Testing PUT request");
    expect(mockReq.request.method).toBe("PUT");
    mockReq.flush(updatedUser); // Provide mock response
  });

 
});
