import { useEffect, useState } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export function usePiAuth() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!window.Pi) {
      console.warn("Pi SDK not loaded");
      setTimeout(() => window.location.reload(), 1000); // Tự reload nếu SDK chưa kịp load
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
          localStorage.setItem("pi_username", user); // Gợi ý lưu thêm
          console.log("Đăng nhập Pi thành công:", user);
        }
      })
      .catch((err: any) => {
        console.error("Lỗi khi login Pi:", err);
      });
  }, []);

  return { username };
}
