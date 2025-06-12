import { useState } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export function usePiAuth() {
  const [username, setUsername] = useState<string | null>(null);

  const loginWithPi = () => {
    if (!window.Pi) {
      alert("Pi SDK chưa sẵn sàng!");
      return;
    }

    window.Pi.init({ version: "2.0", sandbox: true });

    window.Pi.authenticate(
      { onIncompletePaymentFound: (payment: any) => console.log("Incomplete:", payment) },
      ["username"]
    )
      .then((authResult: any) => {
        const user = authResult?.user?.username;
        if (user) {
          setUsername(user);
          console.log("✅ Đăng nhập thành công:", user);
        }
      })
      .catch((err: any) => {
        console.error("❌ Lỗi đăng nhập:", err);
      });
  };

  return { username, loginWithPi };
}
