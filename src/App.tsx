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

  const handleTestPayment = async () => {
    if (!window.Pi) {
      alert("Pi SDK chưa sẵn sàng!");
      return;
    }

    try {
      const paymentData = {
        amount: 0.01,
        memo: "Test payment",
        metadata: { purpose: "sdk-test" },
        to: "GDCNCXLMTRF642Q6GTO6XWWRGRSAZPJIYZTQVE2VSISFRIEH3PGI4YFZ" // ✅ địa chỉ ví DApp
      };

      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId: string) => {
          console.log("✅ Ready for server approval:", paymentId);
          window.Pi.approvePayment(paymentId);
        },
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          console.log("✅ Ready for server completion:", paymentId, txid);
          window.Pi.completePayment(paymentId, txid);
        },
        onCancel: (reason: string) => {
          console.warn("❌ Hủy giao dịch:", reason);
        },
        onError: (err: any) => {
          console.error("❌ Lỗi giao dịch:", err);
        }
      });

      console.log("Kết quả giao dịch:", payment);
    } catch (err) {
      console.error("Lỗi khi tạo giao dịch:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mora</h1>

      {username ? (
        <>
          <p>Xin chào, <strong>{username}</strong>!</p>
          {wallet ? (
            <p>Ví của bạn: <code>{wallet}</code></p>
          ) : (
            <p>Đang tải địa chỉ ví...</p>
          )}
          <PaymentButton />

          {/* ✅ Nút gửi thử 0.01 Pi */}
          <button onClick={handleTestPayment} style={{ marginTop: "1rem" }}>
            🧪 Gửi thử 0.01 Pi
          </button>

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
