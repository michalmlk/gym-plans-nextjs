import React from 'react';
import { plans } from '@/mocks';
import Link from 'next/link';

export default function PlansPage() {
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-xl">PLANS</h1>
            <ul>
                {plans.map((plan) => (
                    <li key={plan.id}>
                        <Link href={`/plans/${plan.id}`}>{plan.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
