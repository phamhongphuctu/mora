import { useState } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

function App() {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = () => {
    console.log("🔍 Kiểm tra window.Pi:", window.Pi);
    if (!window.Pi) {
      alert("⚠️ Pi SDK chưa sẵn sàng");
      return;
    }

    window.Pi.init({
      version: "2.0",
      sandbox: true,
      appId: "mora4382", // ID đúng theo PiNet
    });

    window.Pi.authenticate(
      {
        onIncompletePaymentFound: (payment: any) =>
          console.log("🟡 Incomplete payment:", payment),
      },
      ["username"]
    )
      .then((res: any) => {
        const user = res?.user?.username;
        setUsername(user);
        console.log("✅ Đăng nhập thành công:", user);
      })
      .catch((err: any) => {
        console.error("❌ Lỗi đăng nhập:", err);
      });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mora</h1>
      {username ? (
        <p>Xin chào <strong>{username}</strong>!</p>
      ) : (
        <button onClick={handleLogin}>🔐 Login with Pi</button>
      )}
    </div>
  );
}

export default App;
