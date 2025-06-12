import { useEffect, useState } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("pi_username");
    if (savedUser) {
      setUsername(savedUser);
    }
  }, []);

  const handleLogin = () => {
    console.log("🟡 Nút Login được bấm");

    let tries = 0;
    const waitForPi = () => {
      if (typeof window.Pi === "undefined") {
        console.log("⏳ SDK Pi chưa sẵn sàng, thử lại...");
        tries++;
        if (tries > 20) {
          alert("❌ Đợi SDK Pi quá lâu mà vẫn chưa load được.");
          return;
        }
        setTimeout(waitForPi, 200);
      } else {
        console.log("✅ SDK Pi đã sẵn sàng");

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
            console.log("🧾 Kết quả SDK:", res);
            const user = res?.user?.username;
            if (user) {
              setUsername(user);
              localStorage.setItem("pi_username", user);
              alert("✅ Đăng nhập thành công: " + user);
            } else {
              alert("⚠️ Không lấy được username.");
              console.warn("⚠️ Không có user:", res);
            }
          })
          .catch((err: any) => {
            alert("❌ Lỗi khi login: " + JSON.stringify(err));
            console.error("❌", err);
          });
      }
    };

    waitForPi();
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Mora</h1>

      {username ? (
        <p>
          👋 Xin chào, <strong style={{ color: "green" }}>{username}</strong>!
        </p>
      ) : (
        <button onClick={() => handleLogin()}>🔐 Login with Pi</button>
      )}
    </div>
  );
}

export default App;
