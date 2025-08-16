import { FadeLoader } from "react-spinners";

interface LoaderProps {
  visible?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ visible = false }) => (
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
