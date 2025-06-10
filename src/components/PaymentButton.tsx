

function PaymentButton() {
  const handlePayment = async () => {
    // Kiểm tra xem Pi SDK đã được nạp chưa
    if (!window.Pi) {
      console.error("Pi SDK chưa được nạp!");
      return;
    }

    try {
      // Gọi createPayment để tạo giao dịch nạp Pi.
      // Các tham số cần thiết (amount, currency, recipient) tùy thuộc vào yêu cầu của API Pi SDK.
      const payment = await window.Pi.createPayment({
        // Số tiền: "0.1" Pi (dạng string hoặc số)
        amount: "0.1",
        // Nếu cần định nghĩa loại tiền (sẽ là Pi luôn), hoặc các thông số khác
        // recipient có thể là địa chỉ ví hệ thống của bạn nếu muốn gửi đến ví hệ thống.
        recipient: "SYSTEM_WALLET_ADDRESS" // Thay thế bằng địa chỉ ví hệ thống thật
      });
      console.log("Giao dịch nạp Pi thành công:", payment);
      alert("Giao dịch nạp Pi thành công!");
    } catch (error) {
      console.error("Giao dịch nạp Pi thất bại:", error);
      alert("Giao dịch nạp Pi thất bại. Xem console để biết chi tiết.");
    }
  };

  return (
    <button onClick={handlePayment} style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
      Nạp Pi ngay
    </button>
  );
}

export default PaymentButton;
