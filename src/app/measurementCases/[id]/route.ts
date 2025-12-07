import {db} from "@/app/_modules/db";

export async function GET(_: Request, ctx: RouteContext<'/measurementCases/[id]'>) {
  try {
    const {id} = await ctx.params
    const isTrueNumber = /\d/.test(id);

    if (!isTrueNumber) {
      return new Response(
        `Error: entity id must be a number`,
        {
          status: 404,
        }
      )
    }

    const collection = await db.measurementCases.getOne(Number(id))

    return new Response(JSON.stringify(collection));
  } catch (error) {
    return new Response(`Error: ${error?.message || 'unknown error'}`, {
      status: 404,
    })
  }
}

export async function PUT(request: Request, ctx: RouteContext<'/measurementCases/[id]'>) {
  try {
    const {id} = await ctx.params
    const isTrueNumber = /\d/.test(id);

    if (!isTrueNumber) {
      return new Response(
        `Error: entity id must be a number`,
        {
          status: 404,
        }
      )
    }

    const body = await request.json();

    const collection = await db.measurementCases.update(Number(id), body)

    return new Response(JSON.stringify(collection));
  } catch (error) {
    return new Response(`Error: ${error?.message || 'unknown error'}`, {
      status: 404,
    })
  }
}

export async function DELETE(_: Request, ctx: RouteContext<'/measurementCases/[id]'>) {
  try {
    const {id} = await ctx.params
    const isTrueNumber = /\d/.test(id);

    if (!isTrueNumber) {
      return new Response(
        `Error: entity id must be a number`,
        {
          status: 404,
        }
      )
    }

    const collection = await db.measurementCases.remove(Number(id))

    return new Response(JSON.stringify(collection));
  } catch (error) {
    return new Response(`Error: ${error?.message || 'unknown error'}`, {
      status: 404,
    })
  }
}

