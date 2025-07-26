"use client";
import React, { useEffect, useState } from 'react';

interface GroupOrderStatus {
  vendorCount: number;
  priceDrop: number;
  nextMilestone: { vendorsNeeded: number; discount: number } | null;
  orderTotal: number;
  timeRemaining: string;
  vendors: string[];
}

export default function GroupOrderMeter() {
  const [status, setStatus] = useState<GroupOrderStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      setLoading(true);
      const res = await fetch('/api/group-order/status');
      const data = await res.json();
      setStatus(data);
      setLoading(false);
    }
    fetchStatus();
    const interval = setInterval(fetchStatus, 4000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !status) return <div className="p-4">Loading group order status...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-2">Group Order Price Drop Meter</h2>
      <div className="mb-2">Current vendors in group: <span className="font-semibold">{status.vendorCount}</span></div>
      <div className="mb-2">Current price drop: <span className="font-semibold text-green-600">{status.priceDrop}%</span></div>
      <div className="mb-2">Order Total: <span className="font-semibold">₹{status.orderTotal.toLocaleString()}</span></div>
      <div className="mb-2">Time Remaining: <span className="font-semibold">{status.timeRemaining}</span></div>
      <div className="mb-2">Vendors: <span className="font-semibold">{status.vendors.join(', ')}</span></div>
      <div className="w-full bg-gray-200 rounded h-4 mb-2">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${Math.min(status.priceDrop, 20) / 20 * 100}%` }}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-1">Next Milestone</h3>
        {status.nextMilestone ? (
          <div className="text-base text-blue-700">
            Invite <span className="font-bold">{status.nextMilestone.vendorsNeeded}</span> more vendor{status.nextMilestone.vendorsNeeded > 1 ? 's' : ''} to unlock <span className="font-bold">{status.nextMilestone.discount}%</span> discount!
          </div>
        ) : (
          <div className="text-base text-green-700">Maximum discount unlocked!</div>
        )}
      </div>
    </div>
  );
}
