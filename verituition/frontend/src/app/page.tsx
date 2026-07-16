'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ShieldCheck, GraduationCap, LockKeyhole, Search, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [amount, setAmount] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      alert('Encrypted Payment Successful!');
      setAmount('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* Navigation */}
      <nav className="border-b bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            VeriTuition
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'student' ? 'bg-white shadow text-indigo-700' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'admin' ? 'bg-white shadow text-indigo-700' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Auditor Admin
            </button>
          </div>
          <ConnectButton />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {activeTab === 'student' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight">Pay Your Tuition <span className="text-indigo-600">Privately</span></h1>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Your wallet balance and payment amounts are encrypted. No one else can see your financial data except the verified college auditor.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Balance Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <LockKeyhole className="w-32 h-32" />
                </div>
                <h3 className="text-gray-500 font-medium mb-2">Encrypted Balance</h3>
                <div className="text-3xl font-bold font-mono">**** VERI</div>
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Securely hidden from public
                </p>
                
                <button className="mt-8 text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors w-full">
                  Mint Test Tokens
                </button>
              </div>

              {/* Payment Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-violet-100 p-2 rounded-full">
                    <GraduationCap className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Send Payment</h3>
                </div>
                
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (VERI)</label>
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 1000"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg flex gap-2">
                    <LockKeyhole className="w-5 h-5 shrink-0" />
                    <p>This payload will be encrypted with the College Auditor's public key before being sent to the blockchain.</p>
                  </div>
                  <button
                    disabled={isPaying || !amount}
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isPaying ? 'Encrypting & Sending...' : 'Submit Encrypted Payment'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Auditor Dashboard</h1>
                <p className="text-gray-500 mt-1">Decrypt and verify incoming student tuition payments.</p>
              </div>
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search Tx Hash..." 
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Sender Address</th>
                    <th className="px-6 py-4 font-medium">Encrypted Payload</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {/* Mock Data Row */}
                  <tr className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">Just now</td>
                    <td className="px-6 py-4 font-mono text-xs">0x1234...abcd</td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-400 truncate max-w-[200px]">
                      0x84d2f0932...
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 font-medium hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded flex items-center gap-2 ml-auto group-hover:bg-indigo-100 transition-colors">
                        <LockKeyhole className="w-4 h-4" /> Decrypt
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                <ShieldCheck className="w-12 h-12 text-gray-300 mb-3" />
                <p>Waiting for new confidential transactions on Avalanche Fuji.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
