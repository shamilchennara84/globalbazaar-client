import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptor running');
  const isAdminRequest = req.url.startsWith('http://localhost:3000/api/admin/');
  const isVendorRequest = req.url.startsWith(
    'http://localhost:3000/api/vendor/'
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
