export async function fetchWalletAddress(username: string): Promise<string | null> {
    try {
      const res = await fetch(
        `https://betzone-wallet-api.onrender.com/api/getWalletAddress?username=${username}`
      );
      if (!res.ok) throw new Error("Lỗi khi lấy địa chỉ ví");
      const data = await res.json();
      return data.walletAddress || null;
    } catch (err) {
      console.error("Lỗi API ví:", err);
      return null;
    }
  }
  