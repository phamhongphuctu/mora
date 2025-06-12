import { useEffect, useState } from "react";

const sampleProducts = [
  { id: 1, name: "Áo thun Pi", price: 5 },
  { id: 2, name: "Cốc Pi sứ trắng", price: 3.5 },
  { id: 3, name: "Sticker Pi", price: 1 },
];

const SYSTEM_WALLET = "GDCNCXLMTRF642Q6GTO6XWWRGRSAZPJIYZTQVE2VSISFRIEH3PGI4YFZ";

interface Order {
  name: string;
  price: number;
  time: string;
}

function ProductList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("bz-orders");
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  const saveOrder = (order: Order) => {
    const updated = [...orders, order];
    setOrders(updated);
    localStorage.setItem("bz-orders", JSON.stringify(updated));
  };

  const handleBuy = async (productName: string, amount: number) => {
    if (!window.Pi) {
      alert("SDK Pi chưa sẵn sàng. Vui lòng mở trong Pi Browser.");
      return;
    }

    try {
      const payment = await window.Pi.createPayment({
        amount: amount.toString(),
        memo: `Mua hàng: ${productName}`,
        metadata: { product: productName },
        recipient: SYSTEM_WALLET,
      });

      console.log("Mua hàng thành công:", payment);
      alert(`🎉 Đã thanh toán ${amount} Pi cho ${productName}!`);

      saveOrder({
        name: productName,
        price: amount,
        time: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("Lỗi:", error);
      alert("❌ Giao dịch thất bại.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sản phẩm nổi bật</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {sampleProducts.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <h4>{product.name}</h4>
            <p>Giá: {product.price} Pi</p>
            <button onClick={() => handleBuy(product.name, product.price)}>
              Mua bằng Pi
            </button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <h3>Lịch sử mua hàng 🧾</h3>
      {orders.length === 0 ? (
        <p>Chưa có giao dịch nào.</p>
      ) : (
        <ul>
          {orders.map((o, i) => (
            <li key={i}>
              🛍️ {o.name} – {o.price} Pi – {o.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
