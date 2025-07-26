"use client";
import { useEffect, useState } from 'react';

interface Recommendations {
  recommendedSuppliers: string[];
  recommendedGroupSize: number;
  priceDropPrediction: number;
}

export default function SupplierRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true);
      const res = await fetch('/api/group-order/recommendations');
      const data: Recommendations = await res.json();
      setRecommendations(data);
      setLoading(false);
    }
    fetchRecommendations();
  }, []);

  if (loading) return <div className="p-4">Loading recommendations...</div>;
  if (!recommendations) return <div className="p-4">No recommendations available.</div>;

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-bold mb-2">AI Supplier Recommendations</h2>
      <div className="mb-2">
        <strong>Recommended Suppliers:</strong>
        <ul className="list-disc ml-6">
          {recommendations.recommendedSuppliers.map((supplier) => (
            <li key={supplier}>{supplier}</li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <strong>Recommended Group Size:</strong> {recommendations.recommendedGroupSize}
      </div>
      <div>
        <strong>Predicted Price Drop:</strong> ₹{recommendations.priceDropPrediction}
      </div>
    </div>
  );
}
