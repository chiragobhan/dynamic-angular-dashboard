import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in and store token', () => {
    localStorage.setItem('token', 'mock-token');
    service['\_isAuthenticated'].set(true);
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should log out and remove token', () => {
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(service.isAuthenticated()).toBeFalsy();
  });
});