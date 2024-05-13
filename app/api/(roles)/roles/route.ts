"use server";

import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  try {
    const roles = await prisma.role.findMany({});
    if (roles) {
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "List Roles",
        data: roles,
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const body: Role = await req.json();
    const role = await prisma.role.create({
      data: {
        name: body.name,
      },
    });

    if (!role) {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Something went wrong",
        data: null,
      });
    }

    return NextResponse.json({
      status: true,
      statusCode: 201,
      message: "Role Successfully Added",
      data: role,
    });
  } catch (err) {
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
};
