import {db} from "@/app/_modules/db";

export const GET = async () => {
  try {
    const entityCollection = await db.speakers.getAll();

    return new Response(JSON.stringify(entityCollection));
  } catch (error) {
    // @ts-ignore
    return new Response(`Error: ${error?.message || 'unknown error'}`, {
      status: 404,
    })
  }
};

export const POST = async (request: Request)=> {
  try {
    const body = await request.json();

    const product = await db.speakers.add(body);

    return new Response(JSON.stringify(product));;
  } catch (error) {
    // @ts-ignore
    return new Response(`Error: ${error?.message || 'unknown error'}`, {
      status: 404,
    })
  }
}
