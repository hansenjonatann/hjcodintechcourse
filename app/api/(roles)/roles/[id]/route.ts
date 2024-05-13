"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const role = await prisma.role.findFirst({
      where: {
        id: Number(params.id),
      },
      include: {
        users: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!role) {
      return NextResponse.json({
        status: false,
        statusCode: 404,
        message: "Role not found",
      });
    }
    return NextResponse.json({
      status: true,
      statusCode: 200,
      message: "List Detail Role",
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

export const PUT = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const role = await prisma.role.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (role) {
      const body = await req.json();
      const updatedRole = await prisma.role.update({
        where: {
          id: Number(params.id),
        },
        data: {
          name: body.name,
        },
      });

      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Update Role Success",
        data: updatedRole,
      });
    }

    return NextResponse.json({
      status: false,
      statusCode: 404,
      message: "Role not found",
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    await prisma.role.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json({
      status: true,
      statusCode: 200,
      message: "Delete Role Success",
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
