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

    console.log("\uD83C\uDF10 T\u00ean mi\u1EC1n hi\u1EC7n t\u1EA1i:", window.location.href);
  }, []);

  const handleLogin = () => {
    console.log("\uD83D\uDFE1 N\u00FAt Login \u0111\u01B0\u1EE3c b\u1EA5m");

    let tries = 0;
    const waitForPi = () => {
      if (typeof window.Pi === "undefined") {
        console.log("\u23F3 SDK Pi ch\u01B0a s\u1EB5n s\u00E0ng, th\u1EED l\u1EA1i...");
        tries++;
        if (tries > 20) {
          alert("\u274C \u0110\u1EE3i SDK Pi qu\u00E1 l\u00E2u m\u00E0 v\u1EABn ch\u01B0a load \u0111\u01B0\u1EE3c.");
          return;
        }
        setTimeout(waitForPi, 200);
      } else {
        console.log("\u2705 SDK Pi \u0111\u00E3 s\u1EB5n s\u00E0ng");

        window.Pi.init({
          version: "2.0",
          sandbox: true,
          appId: "mora4382",
        });

        window.Pi.authenticate(
          {
            onIncompletePaymentFound: (payment: any) =>
              console.log("\uD83D\uDD01 Giao d\u1ECBch ch\u01B0a ho\u00E0n t\u1EA5t:", payment),
          },
          ["username"]
        )
          .then((res: any) => {
            console.log("\uD83D\uDDFE K\u1EBFt qu\u1EA3 SDK:", res);
            const user = res?.user?.username;
            if (user) {
              setUsername(user);
              localStorage.setItem("pi_username", user);
              alert("\u2705 \u0110\u0103ng nh\u1EADp th\u00E0nh c\u00F4ng: " + user);
            } else {
              alert("\u26A0\uFE0F Kh\u00F4ng l\u1EA5y \u0111\u01B0\u1EE3c username.");
              console.warn("\u26A0\uFE0F Kh\u00F4ng c\u00F3 user:", res);
            }
          })
          .catch((err: any) => {
            alert("\u274C L\u1ED7i khi login: " + JSON.stringify(err));
            console.error("\u274C", err);
          });
      }
    };

    waitForPi();
  };

  const sendTestPayment = () => {
    if (!window.Pi) {
      alert("\u26A0\uFE0F SDK Pi ch\u01B0a s\u1EB5n s\u00E0ng!");
      return;
    }

    window.Pi.createPayment(
      {
        amount: 0.01,
        memo: "test-payment",
        metadata: { type: "test" },
      },
      {
        onReadyForServerApproval: (paymentId: string) => {
          console.log("\uD83D\uDCEC Ready for approval:", paymentId);
        },
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          console.log("\u2705 Ready to complete:", paymentId, txid);
        },
        onCancel: () => {
          alert("\u274C Ng\u01B0\u1EDDi d\u00F9ng \u0111\u00E3 hu\u1EF7 giao d\u1ECBch.");
        },
        onError: (err: any) => {
          alert("\u274C L\u1ED7i khi g\u1EEDi Pi: " + JSON.stringify(err));
        },
      }
    );
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Mora</h1>

      {username && (
        <p>
          \uD83D\uDC4B Xin ch\u00E0o, <strong style={{ color: "green" }}>{username}</strong>!
        </p>
      )}

      <button onClick={handleLogin} style={{ marginRight: "1rem" }}>
        \uD83D\uDD10 Login with Pi
      </button>

      <button onClick={sendTestPayment}>\uD83D\uDCB8 G\u1EEDi 0.01 Pi test</button>
    </div>
  );
}

export default App;
