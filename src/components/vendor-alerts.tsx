"use client";
import React, { useEffect, useState } from 'react';
type Alert = {
  type: 'price' | 'quality' | 'error';
  message: string;
};
import { Card } from './ui/card';
import { Badge } from './ui/badge';

// Replace with your actual AI API endpoint or function
async function fetchVendorAlerts() {
  try {
    const response = await fetch('/api/ai/vendor-alerts');
    if (!response.ok) throw new Error('Failed to fetch alerts');
    return await response.json();
  } catch (error) {
    let message = 'Unknown error';
    if (typeof error === 'object' && error && 'message' in error) {
      message = String((error as any).message);
    } else if (typeof error === 'string') {
      message = error;
    }
    return [{ type: 'error', message }];
  }
}

export default function VendorAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAndUpdate = async () => {
      const data = await fetchVendorAlerts();
      if (isMounted) {
        setAlerts(data);
        setLoading(false);
      }
    };
    fetchAndUpdate();
    const interval = setInterval(fetchAndUpdate, 4000); // Poll every 4 seconds
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Separate errors from normal alerts
  const errorAlerts = alerts.filter((a: Alert) => a.type === 'error');
  const normalAlerts = alerts.filter((a: Alert) => a.type !== 'error');

  return (
    <Card className="mb-4 p-6 shadow-lg rounded-xl bg-gradient-to-br from-white to-blue-50">
      <h2 className="text-xl font-extrabold mb-4 text-blue-900 flex items-center gap-2">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#2563eb" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        Vendor Price/Quality Alerts
      </h2>
      {loading ? (
        <div className="text-center text-gray-500 animate-pulse">Loading alerts...</div>
      ) : (
        <>
          {errorAlerts.length > 0 && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#dc2626" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              <strong>Error:</strong> {errorAlerts.map((alert, idx) => <span key={idx} className="ml-1">{alert.message}</span>)}
            </div>
          )}
          {normalAlerts.length === 0 ? (
            <div className="text-center text-gray-400">No alerts at this time.</div>
          ) : (
            <ul className="space-y-4">
              {normalAlerts.map((alert, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm hover:bg-blue-50 transition">
                  {alert.type === 'price' && (
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#16a34a" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14v-4H8l4-4v4h3l-4 4z"/></svg>
                  )}
                  {alert.type === 'quality' && (
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#f59e42" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 15l-5.5-4.5h11L12 17z"/></svg>
                  )}
                  <Badge variant={alert.type === 'price' ? 'default' : alert.type === 'quality' ? 'secondary' : 'outline'}>
                    {alert.type === 'price' ? 'PRICE' : alert.type === 'quality' ? 'QUALITY' : alert.type.toUpperCase()}
                  </Badge>
                  <span className="ml-2 text-base text-gray-700 font-medium">{alert.message}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Card>
  );
}
