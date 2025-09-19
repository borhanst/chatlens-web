import React, { useState } from 'react';
import { 
  CreditCard, 
  FileText, 
  TrendingUp, 
  Settings, 
  Receipt,
  Plus,
  Edit,
  Trash2,
  Download,
  Calendar,
  DollarSign,
  Users,
  Zap,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  X,
  Save,
  Upload,
  Eye,
  Filter,
  Search,
  ExternalLink,
  Star,
  Crown,
  Package
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isPrimary: boolean;
  status: 'active' | 'expired' | 'failed';
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
  description: string;
}

interface Subscription {
  plan: string;
  price: number;
  billing: 'monthly' | 'annual';
  nextBilling: string;
  seats: {
    used: number;
    total: number;
  };
  status: 'active' | 'cancelled' | 'past_due';
}

const BillingSettings = () => {
  const [activeSection, setActiveSection] = useState<string>('subscription');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [invoiceFilter, setInvoiceFilter] = useState('all');
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [autoRenew, setAutoRenew] = useState(true);
  const [billingEmail, setBillingEmail] = useState('john.doe@example.com');
  const [companyName, setCompanyName] = useState('Acme Corporation');
  const [taxNumber, setTaxNumber] = useState('');
  const [currency, setCurrency] = useState('USD');

  const [subscription] = useState<Subscription>({
    plan: 'Business',
    price: 49,
    billing: 'monthly',
    nextBilling: '2024-01-15',
    seats: { used: 3, total: 5 },
    status: 'active'
  });

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2026,
      isPrimary: true,
      status: 'active'
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '5555',
      expiryMonth: 8,
      expiryYear: 2025,
      isPrimary: false,
      status: 'active'
    },
    {
      id: '3',
      type: 'amex',
      last4: '0005',
      expiryMonth: 3,
      expiryYear: 2024,
      isPrimary: false,
      status: 'expired'
    }
  ]);

  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      number: 'INV-2024-001',
      date: '2024-12-01',
      amount: 49.00,
      status: 'paid',
      downloadUrl: '#',
      description: 'Business Plan - December 2024'
    },
    {
      id: '2',
      number: 'INV-2024-002',
      date: '2024-11-01',
      amount: 49.00,
      status: 'paid',
      downloadUrl: '#',
      description: 'Business Plan - November 2024'
    },
    {
      id: '3',
      number: 'INV-2024-003',
      date: '2024-10-01',
      amount: 49.00,
      status: 'failed',
      downloadUrl: '#',
      description: 'Business Plan - October 2024'
    }
  ]);

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      features: ['100 conversations/month', '1 website', 'Basic support'],
      popular: false
    },
    {
      name: 'Business',
      price: { monthly: 49, annual: 39 },
      features: ['5,000 conversations/month', '5 websites', 'Priority support', 'Advanced analytics'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 149, annual: 119 },
      features: ['Unlimited conversations', 'Unlimited websites', 'Dedicated support', 'Custom integrations'],
      popular: false
    }
  ];

  const usageData = {
    apiCalls: { used: 3247, limit: 5000 },
    conversations: { used: 1834, limit: 5000 },
    websites: { used: 3, limit: 5 }
  };

  const sections = [
    { id: 'subscription', label: 'Subscription Overview', icon: Package },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'invoices', label: 'Invoices & Receipts', icon: FileText },
    { id: 'usage', label: 'Usage & Add-ons', icon: TrendingUp },
    { id: 'settings', label: 'Billing Settings', icon: Settings },
    { id: 'customization', label: 'Invoice Customization', icon: Receipt }
  ];

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>;
      case 'mastercard':
        return <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>;
      case 'amex':
        return <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>;
      default:
        return <CreditCard className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
      case 'expired':
      case 'past_due':
        return 'text-red-600 bg-red-50';
      case 'cancelled':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
      case 'expired':
      case 'past_due':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(invoiceSearch.toLowerCase());
    const matchesFilter = invoiceFilter === 'all' || invoice.status === invoiceFilter;
    return matchesSearch && matchesFilter;
  });

  const calculateSavings = () => {
    const currentPlan = plans.find(p => p.name === subscription.plan);
    if (!currentPlan) return 0;
    const monthlyTotal = currentPlan.price.monthly * 12;
    const annualTotal = currentPlan.price.annual * 12;
    return ((monthlyTotal - annualTotal) / monthlyTotal * 100).toFixed(0);
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'subscription':
        return (
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{subscription.plan} Plan</h3>
                    <p className="text-blue-600 font-semibold">
                      ${subscription.price}/{subscription.billing === 'monthly' ? 'month' : 'year'}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Active
                </span>
              </div>

              {/* Billing Cycle Toggle */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-gray-700">Billing Cycle</span>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm ${billingCycle === 'monthly' ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    Monthly
                  </span>
                  <button
                    onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      billingCycle === 'annual' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className={`text-sm ${billingCycle === 'annual' ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    Annual
                  </span>
                  {billingCycle === 'annual' && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      Save {calculateSavings()}%
                    </span>
                  )}
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-xs text-gray-500">Next Billing</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(subscription.nextBilling).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <span className="text-xs text-gray-500">Team Seats</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {subscription.seats.used} / {subscription.seats.total}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-purple-500" />
                    <span className="text-xs text-gray-500">Monthly Cost</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    ${subscription.price}.00
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                <Star className="w-4 h-4 mr-2" />
                Change Plan
              </button>
              <button className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </button>
              <button
                onClick={() => setShowCancelModal(true)}
                className="flex items-center justify-center px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel Subscription
              </button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                <p className="text-sm text-gray-600">Manage your saved payment methods</p>
              </div>
              <button
                onClick={() => setShowAddPaymentModal(true)}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </button>
            </div>

            {/* Payment Methods List */}
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getCardIcon(method.type)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            •••• •••• •••• {method.last4}
                          </span>
                          {method.isPrimary && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              Primary
                            </span>
                          )}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(method.status)}`}>
                            {getStatusIcon(method.status)}
                            <span className="ml-1 capitalize">{method.status}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!method.isPrimary && (
                        <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Set as Primary
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Secure Payment Processing</h4>
                  <p className="text-sm text-green-700 mt-1">
                    All payment information is encrypted and processed securely through Stripe. We never store your full card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'invoices':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Invoices & Receipts</h3>
                <p className="text-sm text-gray-600">Download and manage your billing history</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    value={invoiceSearch}
                    onChange={(e) => setInvoiceSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={invoiceFilter}
                  onChange={(e) => setInvoiceFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice #</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                            {invoice.number}
                          </code>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {invoice.description}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          ${invoice.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            {getStatusIcon(invoice.status)}
                            <span className="ml-1 capitalize">{invoice.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredInvoices.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No invoices found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Usage & Add-ons</h3>
              <p className="text-sm text-gray-600">Monitor your usage and purchase additional resources</p>
            </div>

            {/* Usage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-500">API Calls</span>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {usageData.apiCalls.used.toLocaleString()} / {usageData.apiCalls.limit.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {Math.round((usageData.apiCalls.used / usageData.apiCalls.limit) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(usageData.apiCalls.used / usageData.apiCalls.limit) * 100}%` }}
                    />
                  </div>
                </div>
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Purchase More API Calls
                </button>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-500">Conversations</span>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {usageData.conversations.used.toLocaleString()} / {usageData.conversations.limit.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {Math.round((usageData.conversations.used / usageData.conversations.limit) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(usageData.conversations.used / usageData.conversations.limit) * 100}%` }}
                    />
                  </div>
                </div>
                <button className="w-full text-sm text-green-600 hover:text-green-700 font-medium">
                  Increase Conversation Limit
                </button>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-xs text-gray-500">Websites</span>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {usageData.websites.used} / {usageData.websites.limit}
                    </span>
                    <span className="text-sm text-gray-500">
                      {Math.round((usageData.websites.used / usageData.websites.limit) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(usageData.websites.used / usageData.websites.limit) * 100}%` }}
                    />
                  </div>
                </div>
                <button className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Add More Websites
                </button>
              </div>
            </div>

            {/* Usage Chart */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Usage Trend</h4>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[65, 78, 82, 90, 85, 95, 88, 92, 87, 94, 89, 96].map((height, index) => (
                  <div key={index} className="flex-1 bg-blue-100 rounded-t-lg relative group cursor-pointer hover:bg-blue-200 transition-colors">
                    <div 
                      className="bg-blue-500 rounded-t-lg transition-all duration-300"
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height}% used
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Billing Settings & Preferences</h3>
              <p className="text-sm text-gray-600">Configure your billing preferences and contact information</p>
            </div>

            {/* Billing Contact */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Billing Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Email
                  </label>
                  <input
                    type="email"
                    value={billingEmail}
                    onChange={(e) => setBillingEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Billing Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State / Province
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tax Information */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Tax Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax / VAT Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tax number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Auto-Renewal */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-md font-semibold text-gray-900">Auto-Renewal</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Automatically renew your subscription to avoid service interruption
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRenew}
                    onChange={(e) => setAutoRenew(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    autoRenew ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      autoRenew ? 'translate-x-5' : 'translate-x-0.5'
                    } mt-0.5`}></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'customization':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Invoice Customization</h3>
              <p className="text-sm text-gray-600">Customize your invoice appearance with your branding</p>
            </div>

            {/* Logo Upload */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Company Logo</h4>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 200x80px, PNG or JPG
                  </p>
                </div>
              </div>
            </div>

            {/* Invoice Footer */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Invoice Footer</h4>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Thank you for using ChatLens! For support, contact us at support@chatlens.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                This text will appear at the bottom of all invoices
              </p>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-semibold text-gray-900">Invoice Preview</h4>
                <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview PDF
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-gray-900">INVOICE</h3>
                    <p className="text-sm text-gray-600">INV-2024-001</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Bill To:</h4>
                    <p className="text-sm text-gray-600">
                      {companyName}<br />
                      {billingEmail}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">From:</h4>
                    <p className="text-sm text-gray-600">
                      ChatLens Inc.<br />
                      support@chatlens.com
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-500 text-center">
                    Thank you for using ChatLens! For support, contact us at support@chatlens.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
        <p className="text-gray-600">
          Manage your subscription, payment methods, and billing preferences.
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <div key={section.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => setActiveSection(isActive ? '' : section.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.label}</h3>
                  </div>
                </div>
                {isActive ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Section Content */}
              {isActive && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-6">
                    {renderSection(section.id)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Choose Your Plan</h3>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative rounded-lg border-2 p-6 ${
                      plan.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">
                          ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                        </span>
                        <span className="text-gray-500 ml-2">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        plan.popular
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      {plan.name === subscription.plan ? 'Current Plan' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Action Bar */}
      <div className="fixed bottom-6 right-6 flex items-center space-x-3">
        <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium shadow-lg transition-colors">
          <CreditCard className="w-4 h-4 mr-2" />
          Manage Payment
        </button>
        <button className="flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-lg transition-colors">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default BillingSettings;