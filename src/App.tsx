import React, { useEffect, useState } from "react";
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
          {/* Gắn nút nạp Pi */}
          <PaymentButton />
        </>
      ) : (
        <p>Đang đăng nhập qua Pi Browser...</p>
      )}
    </div>
  );
}

export default App;
