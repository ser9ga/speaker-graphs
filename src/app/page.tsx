import {MainAppContainer} from "@/app/_modules/ViewComponents/MainAppContainer/MainAppContainer";
import {seedALL} from "@/app/seed";

if (process.env.NODE_ENV === "development") {
  seedALL()
}

export default function Home() {
  return <MainAppContainer />;
}
