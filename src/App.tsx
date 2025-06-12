import { useEffect, useState } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

function App() {
  const [username, setUsername] = useState<string | null>(null);

  // Tự load lại username đã đăng nhập trước đó
  useEffect(() => {
    const savedUser = localStorage.getItem("pi_username");
    if (savedUser) {
      setUsername(savedUser);
    }
  }, []);

  // Login Pi: đợi SDK Pi load xong rồi gọi authenticate
  const handleLogin = () => {
    const waitForPi = () => {
      if (typeof window.Pi === "undefined") {
        console.log("⏳ Đang chờ SDK Pi load...");
        setTimeout(waitForPi, 100); // đợi tiếp 100ms
      } else {
        console.log("✅ SDK Pi đã sẵn sàng");

        window.Pi.init({
          version: "2.0",
          sandbox: true,
          appId: "mora4382", // ✅ appId đúng trên Pi Dev Portal
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
      }
    };

    waitForPi(); // Gọi lần đầu tiên
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
