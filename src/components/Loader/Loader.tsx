import { FadeLoader } from "react-spinners";

const Loader = ({ visible = false }) => (
  <FadeLoader
    loading={visible}
    color="#6f8fe7ff"
    cssOverride={{
      margin: "0 auto",
      display: "block",
    }}
  />
);

export default Loader;
