// import { initSettlementListAction } from "@/entities/settlement/server";
import { NextResponse } from "next/server";

export const POST = async (): Promise<NextResponse<any>> => {
  try {
    // const status = await initSettlementListAction();
    console.log("output_log: status in API =>>>");

    return NextResponse.json({ status: "ok" });
  } catch (e) {
    return NextResponse.json(e);
  }
};
