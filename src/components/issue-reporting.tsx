'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  Upload,
  Eye,
  FileText,
  Star
} from 'lucide-react';

interface Issue {
  id: string;
  orderId: string;
  supplierId: string;
  supplierName: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  title: string;
  description: string;
  dateCreated: string;
  dateResolved?: string;
  resolution?: string;
  attachments?: string[];
  vendorSatisfaction?: number;
}

interface IssueReportingProps {
  vendorId?: string;
  orderId?: string;
  supplierId?: string;
  supplierName?: string;
}

const issueCategories = [
  'Quality Issues',
  'Delivery Delays', 
  'Missing Items',
  'Wrong Items',
  'Pricing Disputes',
  'Communication Issues',
  'Packaging Problems',
  'Billing Errors',
  'Other'
];

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800', 
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-800',
  investigating: 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-600'
};

// Mock data for existing issues
const mockIssues: Issue[] = [
  {
    id: 'ISS-001',
    orderId: 'ORD-12345',
    supplierId: 'SUP-001',
    supplierName: 'Fresh Farm Supplies',
    category: 'Quality Issues',
    priority: 'high',
    status: 'investigating',
    title: 'Received spoiled vegetables',
    description: 'The tomatoes delivered yesterday were already showing signs of rot. This affects our daily preparation.',
    dateCreated: '2025-01-25',
    attachments: ['photo1.jpg', 'photo2.jpg']
  },
  {
    id: 'ISS-002', 
    orderId: 'ORD-12344',
    supplierId: 'SUP-002',
    supplierName: 'Spice Masters Ltd',
    category: 'Delivery Delays',
    priority: 'medium',
    status: 'resolved',
    title: 'Late delivery caused menu shortage',
    description: 'Spices were delivered 3 hours late, causing us to run out of our signature dishes.',
    dateCreated: '2025-01-24',
    dateResolved: '2025-01-25',
    resolution: 'Supplier provided 10% discount and promised improved delivery timing. Enhanced tracking system implemented.',
    vendorSatisfaction: 4
  }
];

export function IssueReporting({ vendorId, orderId, supplierId, supplierName }: IssueReportingProps) {
  const [activeTab, setActiveTab] = useState<'report' | 'history'>('report');
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Form state for new issue
  const [newIssue, setNewIssue] = useState({
    orderId: orderId || '',
    supplierId: supplierId || '',
    supplierName: supplierName || '',
    category: '',
    priority: 'medium' as const,
    title: '',
    description: '',
    attachments: [] as File[]
  });

  const handleSubmitIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const issue: Issue = {
        id: `ISS-${String(issues.length + 1).padStart(3, '0')}`,
        ...newIssue,
        status: 'pending',
        dateCreated: new Date().toISOString().split('T')[0],
        attachments: newIssue.attachments.map(f => f.name)
      };

      setIssues(prev => [issue, ...prev]);
      
      // Reset form
      setNewIssue({
        orderId: orderId || '',
        supplierId: supplierId || '',
        supplierName: supplierName || '',
        category: '',
        priority: 'medium',
        title: '',
        description: '',
        attachments: []
      });

      toast({
        title: 'Issue Reported Successfully',
        description: `Your issue ${issue.id} has been submitted and is being reviewed.`,
      });

      setActiveTab('history');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit issue. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewIssue(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setNewIssue(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const renderSatisfactionStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('report')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'report'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <AlertTriangle className="inline h-4 w-4 mr-2" />
          Report Issue
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="inline h-4 w-4 mr-2" />
          Issue History ({issues.length})
        </button>
      </div>

      {/* Report New Issue */}
      {activeTab === 'report' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Report an Issue
            </CardTitle>
            <CardDescription>
              Describe any problems with your order, delivery, or supplier interaction. Our team will investigate and work to resolve the issue quickly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitIssue} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    value={newIssue.orderId}
                    onChange={(e) => setNewIssue(prev => ({ ...prev, orderId: e.target.value }))}
                    placeholder="e.g., ORD-12345"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplierName">Supplier Name</Label>
                  <Input
                    id="supplierName"
                    value={newIssue.supplierName}
                    onChange={(e) => setNewIssue(prev => ({ ...prev, supplierName: e.target.value }))}
                    placeholder="Enter supplier name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category</Label>
                  <Select 
                    value={newIssue.category} 
                    onValueChange={(value) => setNewIssue(prev => ({ ...prev, category: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select 
                    value={newIssue.priority} 
                    onValueChange={(value: any) => setNewIssue(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                      <SelectItem value="medium">Medium - Affects operations</SelectItem>
                      <SelectItem value="high">High - Significant impact</SelectItem>
                      <SelectItem value="urgent">Urgent - Business critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  value={newIssue.description}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide as much detail as possible about what happened, when it occurred, and how it affected your business..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    id="attachments"
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="attachments" className="cursor-pointer">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload photos or documents
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB each
                      </p>
                    </div>
                  </label>
                </div>
                
                {newIssue.attachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Attached Files:</p>
                    {newIssue.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  All reported issues are investigated within 24 hours. You'll receive updates via email and can track progress here.
                </AlertDescription>
              </Alert>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Issue...
                  </>
                ) : (
                  'Submit Issue Report'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Issue History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {issues.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Issues Reported</h3>
                <p className="text-gray-600">
                  You haven't reported any issues yet. That's great!
                </p>
              </CardContent>
            </Card>
          ) : (
            issues.map((issue) => (
              <Card key={issue.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{issue.title}</h3>
                        <Badge className={priorityColors[issue.priority]}>
                          {issue.priority.toUpperCase()}
                        </Badge>
                        <Badge className={statusColors[issue.status]}>
                          {issue.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Order: {issue.orderId} • Supplier: {issue.supplierName} • Category: {issue.category}
                      </p>
                      <p className="text-gray-700 mb-3">{issue.description}</p>
                      
                      {issue.attachments && issue.attachments.length > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {issue.attachments.length} attachment(s)
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Created: {issue.dateCreated}</p>
                      {issue.dateResolved && (
                        <p className="text-sm text-gray-500">Resolved: {issue.dateResolved}</p>
                      )}
                    </div>
                  </div>

                  {issue.resolution && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-medium text-green-900 mb-1">Resolution</h4>
                          <p className="text-green-800 text-sm">{issue.resolution}</p>
                          
                          {issue.vendorSatisfaction && (
                            <div className="mt-3">
                              <p className="text-sm text-green-800 mb-1">Your satisfaction rating:</p>
                              {renderSatisfactionStars(issue.vendorSatisfaction)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      Issue ID: {issue.id}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedIssue(issue)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      
                      {issue.status !== 'closed' && (
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Add Comment
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default IssueReporting;
