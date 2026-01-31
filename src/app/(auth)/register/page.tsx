// import Registercomponent from "@/app/components/Registercomponent";

import Registercomponent from "@/components/Registercomponent";
import { connectToDatabase } from "@/lib/db";

export default async function Page() {
  // await connectToDatabase()
  return <div>
     <Registercomponent/>
  </div>;
}