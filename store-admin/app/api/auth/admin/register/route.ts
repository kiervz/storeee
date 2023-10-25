import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/app/lib/prismadb';

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    const user = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });
  
    if (user) {
      return new NextResponse('Unable to create, already have an admin account.', { status: 400 });
    }
    
    const passwordHash = bcrypt.hashSync(password, 10);
  
    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        image: '/images/user.jpg',
        role: 'ADMIN'
      },
    });

    return NextResponse.json('Successfully registered!', { status: 200 });
  } catch (error) {
    console.log('[REGISTER_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}