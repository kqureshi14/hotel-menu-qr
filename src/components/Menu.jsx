import React from "react";
import { menuData } from "../data/menu";

const Menu = ({ addItem }) => {
  return (
    <>
      {menuData.map((category) => (
        <div key={category.category} style={{ marginBottom: 24 }}>
          <h3>{category.category}</h3>
          {category.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <div>PKR {item.price}</div>
              </div>
              <button onClick={() => addItem(item)}>Add</button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Menu;
