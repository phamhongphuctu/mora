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
    const waitForPi = () => {
      if (typeof window.Pi === "undefined") {
        setTimeout(waitForPi, 100); // chờ 100ms rồi thử lại
      } else {
        // đã có Pi SDK → tiến hành login
        window.Pi.init({
          version: "2.0",
          sandbox: true,
          appId: "mora4382",
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
            }
          })
          .catch((err: any) => {
            console.error("❌ Lỗi khi đăng nhập:", err);
          });
      }
    };
  
    waitForPi(); // gọi ngay lần đầu
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
