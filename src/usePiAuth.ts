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
      return;
    }

    window.Pi.init({ version: "2.0", sandbox: true });

    window.Pi.authenticate(
      { onIncompletePaymentFound: (payment: any) => console.log("Incomplete:", payment) },
      ["username"]
    )
      .then((authResult: any) => {
        setUsername(authResult.user.username);
        console.log("Đăng nhập Pi thành công:", authResult.user.username);
      })
      .catch((err: any) => {
        console.error("Lỗi khi login Pi", err);
      });
  }, []);

  return { username };
}
