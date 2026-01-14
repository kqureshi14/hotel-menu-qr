import React from "react";

const WHATSAPP_NUMBER = "923000204168"; // replace with your business number

const Cart = ({ cart, room }) => {
  const items = Object.values(cart);

  if (!items.length) return null;

  const message = `
Room ${room}
Order:
${items.map((i) => `${i.qty}x ${i.name}`).join("\n")}
`.trim();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div style={{ marginTop: 32 }}>
      <h3>Order Summary</h3>
      {items.map((item) => (
        <div key={item.id}>
          {item.qty}x {item.name}
        </div>
      ))}

      <a
        href={whatsappUrl}
        style={{
          display: "block",
          marginTop: 16,
          padding: 12,
          background: "#25D366",
          color: "#fff",
          textAlign: "center",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Place Order via WhatsApp
      </a>
    </div>
  );
};

export default Cart;
