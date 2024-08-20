import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./PlaceOrderPage.css";

export function PlaceOrderPage() {
  const { state } = useLocation();

  const { selectedProducts, loading, success, sendOrder } = useOrderProducts(
    state?.selectedProducts
  );

  return (
    <div className="placeOrderPage">
      <h1>Place order</h1>

      <div className="products">
        {selectedProducts.map(({ id, name, description, price }) => (
          <div className="product">
            <h3>{name}</h3>
            <p>{description}</p>
            <p><strong>$ {price}</strong></p>
          </div>
        ))}
      </div>
      <button
        className="placeOrder"
        onClick={() => sendOrder({ products: selectedProducts, paymentInfo: {cardNumber: "1234-567-890"} })}
      >
        Place order
      </button>
    </div>
  );
}

function useOrderProducts(initialSelectedProducts) {
  const [success, setSuccess] = React.useState("pending");
  const [loading, setLoading] = React.useState(true);
  const [selectedProducts, setSelectedProducts] = useState(
    initialSelectedProducts ?? []
  );

  const sendOrder = (data) => {
    fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setLoading(false);

        if (!response.ok) {
          // TODO: handle error
        }
        return response.json();
      })
      .then((data) => {
        setSuccess("success");
        setSelectedProducts([]);
      })
      .catch((error) => {
        setSuccess("error");
      });
  };

  return { loading, success, sendOrder, selectedProducts };
}
