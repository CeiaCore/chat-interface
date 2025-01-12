import { GooSpinner } from "react-spinners-kit";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <GooSpinner size={40} color="#333" />
    </div>
  );
};

export default Loading;
