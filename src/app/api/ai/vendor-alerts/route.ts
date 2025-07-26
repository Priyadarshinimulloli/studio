import { NextResponse } from 'next/server';

export async function GET() {
  // Static alerts (first commit)
  const alerts = [
    { type: 'price', message: 'Vendor A dropped price by 10%!' },
    { type: 'quality', message: 'Vendor B received a 5-star review.' },
    { type: 'price', message: 'Vendor C offers a flash sale for 2 hours.' },
  ];
  return NextResponse.json(alerts);
}
