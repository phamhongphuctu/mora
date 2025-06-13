import { useState } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

function App() {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = () => {
    if (!window.Pi) {
      alert("⚠️ Pi SDK chưa sẵn sàng");
      return;
    }

    // Gọi Pi SDK init đúng subdomain ID
    window.Pi.init({
      version: "2.0",
      sandbox: true,
      appId: "mora4382", // phải đúng với subdomain app đang chạy
    });

    window.Pi.authenticate(
      {
        onIncompletePaymentFound: (payment: any) => {
          console.log("🟡 Incomplete payment:", payment);
        },
      },
      ["username"]
    )
      .then((res: any) => {
        const user = res?.user?.username;
        setUsername(user);
        console.log("✅ Login thành công:", user);
      })
      .catch((err: any) => {
        console.error("❌ Lỗi login:", err);
      });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mora</h1>
      {username ? (
        <p>👋 Xin chào <strong>{username}</strong>!</p>
      ) : (
        <button onClick={handleLogin}>🔐 Login with Pi</button>
      )}
    </div>
  );
}

export default App;
