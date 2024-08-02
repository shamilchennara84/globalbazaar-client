import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptor running');
  const isAdminRequest = req.url.startsWith(`${environment.staticApiURL}api/admin/`);
  const isVendorRequest = req.url.startsWith(
    `${environment.staticApiURL}api/vendor/`
  );

  let token;
  if (isAdminRequest) {
    console.log('admin req');
    token = localStorage.getItem('admintoken');
  } else if (isVendorRequest) {
    console.log('vendor req');
    token = localStorage.getItem('vendortoken');
  }

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(authReq);
  } else {
    return next(req);
  }
};
