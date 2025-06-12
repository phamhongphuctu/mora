import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePiAuth } from "./usePiAuth";
import { fetchWalletAddress } from "./api/wallet";
import PaymentButton from "./components/PaymentButton";

function App() {
  const { username } = usePiAuth();
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      fetchWalletAddress(username).then((addr) => setWallet(addr));
    }
  }, [username]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>BZ Market</h1>
      {username ? (
        <>
          <p>Xin chào, <strong>{username}</strong>!</p>
          {wallet ? (
            <p>Ví của bạn: <code>{wallet}</code></p>
          ) : (
            <p>Đang tải địa chỉ ví...</p>
          )}
          <PaymentButton />

          {/* ✅ Nút chuyển qua trang sản phẩm */}
          <Link to="/products">
            <button style={{ marginTop: "2rem" }}>🛍️ Xem sản phẩm</button>
          </Link>
        </>
      ) : (
        <p>Đang đăng nhập qua Pi Browser...</p>
      )}
    </div>
  );
}

export default App;
