import { useEffect, useState } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

function App() {
  const [username, setUsername] = useState<string | null>(null);

  // Load username nếu đã lưu
  useEffect(() => {
    const savedUser = localStorage.getItem("pi_username");
    if (savedUser) {
      setUsername(savedUser);
    }
  }, []);

  const handleLogin = () => {
    if (!window.Pi) {
      alert("⚠️ Pi SDK chưa sẵn sàng. Vui lòng mở bằng Pi Browser.");
      return;
    }

    window.Pi.init({
      version: "2.0",
      sandbox: true,
      appId: "mora4382", // ✅ Đúng appId của anh Từ trên Pi Portal
    });

    window.Pi.authenticate(
      {
        onIncompletePaymentFound: (payment: any) =>
          console.log("🔁 Giao dịch chưa hoàn tất:", payment),
      },
      ["username"]
    )
      .then((res: any) => {
        const user = res?.user?.username;
        if (user) {
          setUsername(user);
          localStorage.setItem("pi_username", user);
          console.log("✅ Đăng nhập thành công:", user);
        } else {
          console.warn("⚠️ Không lấy được username");
        }
      })
      .catch((err: any) => {
        console.error("❌ Lỗi khi đăng nhập:", err);
      });
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Mora</h1>

      {username ? (
        <p>
          👋 Xin chào, <strong style={{ color: "green" }}>{username}</strong>!
        </p>
      ) : (
        <button onClick={handleLogin}>🔐 Login with Pi</button>
      )}
    </div>
  );
}

export default App;
