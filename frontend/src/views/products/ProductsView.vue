<template>
    <div class="products-view">
      <h1>Products</h1>
      <div v-if="loading">Loading products...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <table v-else class="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductsView",
    data() {
      return {
        products: [],
        loading: true,
        error: null,
      };
    },
    mounted() {
      // Replace with your actual API endpoint or Vuex action
      fetch("/api/products")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load products");
          return res.json();
        })
        .then((data) => {
          this.products = data;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err.message;
          this.loading = false;
        });
    },
  };
  </script>
  
  <style scoped>
  .products-table {
    width: 100%;
    border-collapse: collapse;
  }
  .products-table th, .products-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .error {
    color: red;
  }
  </style>