import { useNavigate } from "react-router-dom";

import React, { useState } from "react";

import "./ProductsPage.css";

export function ProductsPage() {
  const navigate = useNavigate();
  const products = useGetProducts();
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <div className="productsPage">
      <h1>Products</h1>
      <div>
        {products.loading ? (
          <p>Loading...</p>
        ) : (
          <div className="products">
            {products.products.map(({ id, name, description, price }) => (
              <button
                className={`product ${
                  selectedProducts.some((sp) => sp.id === id)
                    ? "product__selected"
                    : ""
                }`}
                key={id}
                onClick={() => {
                  setSelectedProducts((selectedProducts) =>
                    selectedProducts.concat({ id, name, description, price })
                  );
                }}
              >
                <h3>{name}</h3>
                <p>{description}</p>
                <p><strong>$ {price}</strong></p>
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        className="placeOrder"
        onClick={() => navigate("/order", { state: { selectedProducts } })}
      >
        Review order
      </button>
    </div>
  );
}

function useGetProducts() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Replace the URL with your backend products API url
    fetch("/api/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return { products, loading };
}
