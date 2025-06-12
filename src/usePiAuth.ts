import { useState } from "react";

export function usePiAuth() {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = () => {
    if (!window.Pi) {
      alert("Pi SDK chưa sẵn sàng!");
      return;
    }

    window.Pi.init({
      version: "2.0",
      sandbox: true,
      appId: "mora4382", // 👈 sửa đúng tên app trong PiNet
    });

    window.Pi.authenticate(
      {
        onIncompletePaymentFound: (payment: any) =>
          console.log("Incomplete:", payment),
      },
      ["username"]
    )
      .then((res: any) => {
        setUsername(res.user.username);
        console.log("✅ Login thành công:", res.user.username);
      })
      .catch(console.error);
  };

  return { username, handleLogin };
}
