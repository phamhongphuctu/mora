

function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Chào mừng đến với BZ Market</h2>
      <p>Nơi người mua và người bán kết nối với nhau bằng Pi.</p>

      <section style={{ marginTop: "2rem" }}>
        <h3>Sản phẩm nổi bật</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem"
        }}>
          <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <h4>Áo thun Pi</h4>
            <p>Giá: 5 Pi</p>
          </div>
          <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <h4>Sách Blockchain</h4>
            <p>Giá: 2.5 Pi</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
