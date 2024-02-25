import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';

export async function GET() {
    const user = await currentUser();
    if (!user?.id) {
        return NextResponse.redirect('/sign-in');
    }

    return NextResponse.json({
        excercises: [],
    });
}
