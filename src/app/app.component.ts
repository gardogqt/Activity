import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Product List';
  products: any[] = []; // Array to hold the products
  selectedProduct: any = null; // To hold the selected product for the modal

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load all products
  loadProducts(): void {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        this.products = data;
        console.log('Products loaded:', this.products);
      })
      .catch(error => console.error('Error fetching products:', error));
  }

  // Method to open the modal with the selected product
  openModal(product: any): void {
    this.selectedProduct = product;
  }

  // Method to close the modal
  closeModal(): void {
    this.selectedProduct = null;
  }

  // Load a limited number of products
  loadLimitedProducts(): void {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then(response => response.json())
      .then(data => {
        this.products = data;
        console.log('Limited products loaded:', this.products);
      })
      .catch(error => console.error('Error fetching limited products:', error));
  }

  // Add a new product
  addProduct(): void {
    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify({
        title: 'New Product',
        price: 20.0,
        description: 'This is a new product.',
        image: 'https://i.pravatar.cc',
        category: 'electronics'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Added Product:', data);
      this.loadProducts(); // Reload products after adding
    })
    .catch(error => console.error('Error adding product:', error));
  }

  // Update an existing product
  updateProduct(): void {
    fetch('https://fakestoreapi.com/products/7', {
      method: "PUT",
      body: JSON.stringify({
        title: 'Updated Product',
        price: 25.0,
        description: 'This product has been updated.',
        image: 'https://i.pravatar.cc',
        category: 'electronics'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Updated Product:', data);
      this.loadProducts(); // Reload products after updating
    })
    .catch(error => console.error('Error updating product:', error));
  }

  // Delete a product
  deleteProduct(id: number): void {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      console.log('Deleted Product:', data);
      this.loadProducts(); // Reload products after deleting
    })
    .catch(error => console.error('Error deleting product:', error));
  }

  // Method to sort products by price
  sortByPrice(order: 'asc' | 'desc'): void {
    this.products.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    console.log('Products sorted by price:', this.products);
  }

  // Method to sort products by title
  sortByTitle(order: 'asc' | 'desc'): void {
    this.products.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (order === 'asc') {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    console.log('Products sorted by title:', this.products);
  }
}
