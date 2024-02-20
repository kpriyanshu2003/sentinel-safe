import dynamic from "next/dynamic";
import useServerFetchData from "./hooks/hook1";

const ClientComponent = dynamic(
  () => import("../../components/Dashboard/Location"),
  { ssr: false }
);

export default function ServerComponent() {
  const { useServerFetchData } = useServerFetchData();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(async () => {
      const response = await fetch(
        "https://sentinel-safe-backend.vercel.app/locmetrics",
        {
          method: "GET",
          cache: "default",
          next: { revalidate: 3600 },
        }
      );
      const res = await response.json();
      setData(res);
    });
  }, [fetchData]);

  return <ClientComponent data={data} />;
}
