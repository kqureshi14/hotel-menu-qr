import { useMemo, useState } from "react";
import { menuData } from "./data/menu";

export default function App() {
  const room = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("room") || "—";
  }, []);

  const [cart, setCart] = useState({});

  const addItem = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        qty: (prev[item.id]?.qty || 0) + 1,
      },
    }));
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id].qty > 1) {
        updated[id].qty -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const items = Object.values(cart);


  const WHATSAPP_NUMBER = "923000204168";

  const message = `
Room ${room}
Order:
${items.map((i) => `${i.qty}x ${i.name}`).join("\n")}
`.trim();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* Header */}
      <header className="bg-hotel text-white px-6 py-5 rounded-b-3xl shadow">
        <h1 className="text-xl font-semibold tracking-wide">Hotel Hillview</h1>
        <p className="text-sm opacity-80">In-Room Dining · Room {room}</p>
      </header>

      {/* Category Tabs */}
      <div className="sticky top-0 z-20 bg-white border-b">
        <div className="flex gap-3 overflow-x-auto px-4 py-3">
          {menuData.map((cat) => (
            <a
              key={cat.category}
              href={`#${cat.category}`}
              className="px-4 py-2 text-sm rounded-full bg-gray-100 hover:bg-accent hover:text-white transition whitespace-nowrap"
            >
              {cat.category}
            </a>
          ))}
        </div>
      </div>

      {/* Menu */}
      <main className="max-w-xl mx-auto px-4 space-y-10 mt-6">
        {menuData.map((category) => (
          <section
            key={category.category}
            id={category.category}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {category.category}
            </h2>

            {category.items.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">PKR {item.price}</p>
                </div>

                <button
                  onClick={() => addItem(item)}
                  className="bg-accent text-white px-4 py-1.5 rounded-full text-sm hover:opacity-90"
                >
                  Add
                </button>
              </div>
            ))}
          </section>
        ))}

        <p className="text-center text-xs text-gray-400 mt-8">
          Prices are subject to government applicable taxes.
        </p>
      </main>

      {items.length > 0 && (
        <div className="max-w-xl mx-auto px-4 mt-6">
          <div className="bg-white rounded-xl border shadow-sm p-4 space-y-3">
            <h3 className="font-semibold text-gray-800">Your Order</h3>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">PKR {item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-7 h-7 rounded-full border text-sm"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm">{item.qty}</span>
                  <button
                    onClick={() => addItem(item)}
                    className="w-7 h-7 rounded-full border text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Cart */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
            <span className="font-medium">{items.length} item(s) selected</span>

            <a
              href={whatsappUrl}
              className="bg-green-600 text-white px-6 py-2 rounded-full font-medium"
            >
              Place Order
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
