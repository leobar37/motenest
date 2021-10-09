import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  BASE_API = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {}

  searchProducts({ limit, sort }: { limit?: number; sort: 'desc' | 'asc' }) {
    let params = new HttpParams();
    if (limit) params = params.set('limit', String(limit));
    if (sort) params = params = params.set('limit', String(limit));
    return this.http.get(this.BASE_API, { params });
  }

  getCategories() {
    return this.http.get(this.BASE_API.concat(`/categories`));
  }

  getProductsForCategory(category: string) {
    let url = this.BASE_API.concat('/category/');
    return this.http.get(this.BASE_API.concat(category));
  }

  retrieveProduct(id: string) {
    this.http.get(this.BASE_API.concat(`/${id}`));
  }
}
