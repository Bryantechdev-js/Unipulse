import React from "react";
import { getEventsDetails } from "@/action/getEventDetails";
import DetailedPageCompunent from "@/components/DetailedPageCompunent";


export default async function EventDetailsPage({params}:{params:{id:string}}) {
  const post = await getEventsDetails(params.id)
  console.log("the detailed post data: ", post);
  
  return(
    <DetailedPageCompunent event={post.events}/>
  )

}
