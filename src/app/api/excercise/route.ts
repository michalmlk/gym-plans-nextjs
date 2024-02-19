import { NextResponse } from 'next/server';
import { databases } from '@/database/appwrite';
import { Query } from 'node-appwrite';
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
