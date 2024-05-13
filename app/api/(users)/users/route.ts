"use server";
import { NextResponse } from "next/server";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      return NextResponse.json({
        status: false,
        statusCode: 404,
        message: "Users not listed ! Something went wrong",
      });
    }

    return NextResponse.json({
      status: true,
      statusCode: 200,
      message: "List Users",
      data: users,
    });
  } catch (err) {
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server error",
      error: err,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const body: User = await req.json();

    if (body) {
      body.username = body.username.toLowerCase();
      const user = await prisma.user.create({
        data: {
          name: body.name,
          roleId: body.roleId,
          email: body.email,
          username: body.username,
          password: body.password,
          profile: body.profile,
          address: body.address,
          city: body.city,
          phone: body.phone,
        },
      });

      if (user) {
        return NextResponse.json({
          status: true,
          statusCode: 201,
          message: "User created successfully",
          data: user,
        });
      } else {
        return NextResponse.json({
          status: false,
          statusCode: 500,
          message: "User not created",
        });
      }
    } else {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server error",
      error: error,
    });
  }
};
