'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ShieldCheck, GraduationCap, LockKeyhole, Search, CheckCircle2, LockOpen, Loader2, FileCheck, Coins, KeyRound, AlertCircle } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  
  // Student State
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'encrypting' | 'proving' | 'sending' | 'success'>('idle');
  const [isMinting, setIsMinting] = useState(false);
  const [balance, setBalance] = useState('****');
  const [receiptHash, setReceiptHash] = useState('');

  // Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [auditorKey, setAuditorKey] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptedData, setDecryptedData] = useState<string | null>(null);

  // Handlers
  const handleMint = () => {
    setIsMinting(true);
    setTimeout(() => {
      setBalance('5,000');
      setIsMinting(false);
    }, 1500);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus('encrypting');
    
    setTimeout(() => setPaymentStatus('proving'), 1200);
    setTimeout(() => setPaymentStatus('sending'), 2500);
    setTimeout(() => {
      setPaymentStatus('success');
      setReceiptHash('0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6));
      setAmount('');
    }, 4000);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For Hackathon MVP, we mock the private key verification
    if (auditorKey === 'fuji2026') {
      setIsAdminLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleDecrypt = () => {
    setIsDecrypting(true);
    // Simulate decryption process
    setTimeout(() => {
      setIsDecrypting(false);
      setDecryptedData('Student ID: 2026-CS-89 | Amount: 1,000 VERI');
    }, 2000);
  };

  const resetPayment = () => setPaymentStatus('idle');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2.5 rounded-xl shadow-md shadow-indigo-200">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            VeriTuition
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'student' ? 'bg-white shadow-sm text-indigo-700 scale-105' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Student Portal
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'admin' ? 'bg-white shadow-sm text-indigo-700 scale-105' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Auditor Admin
            </button>
          </div>
          <ConnectButton />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {activeTab === 'student' ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-medium text-sm border border-indigo-100 mb-2">
                <LockKeyhole className="w-4 h-4" /> Powered by Avalanche Fuji
              </div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900">
                Pay Your Tuition <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Privately</span>
              </h1>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Your wallet balance and payment amounts are encrypted on-chain. No one else can see your financial data except the verified college auditor.
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* Balance Card */}
              <div className="md:col-span-5 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:border-indigo-200 transition-colors duration-300">
                <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rotate-12">
                  <LockKeyhole className="w-64 h-64 text-indigo-900" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-slate-500 font-semibold mb-2 uppercase tracking-wider text-sm flex items-center gap-2">
                    <Coins className="w-4 h-4" /> Encrypted Balance
                  </h3>
                  <div className="text-5xl font-black font-mono text-slate-800 my-4 flex items-center gap-3">
                    {balance} <span className="text-2xl text-slate-400">VERI</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 w-fit px-3 py-1.5 rounded-lg font-medium border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4" /> Securely hidden from public
                  </div>
                  
                  <button 
                    onClick={handleMint}
                    disabled={isMinting}
                    className="mt-10 text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-6 py-3.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 w-full flex justify-center items-center gap-2 shadow-sm disabled:opacity-70"
                  >
                    {isMinting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Mint Test Tokens'}
                  </button>
                </div>
              </div>

              {/* Payment Card */}
              <div className="md:col-span-7 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative">
                
                {paymentStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2 shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Payment Successful</h3>
                      <p className="text-slate-500 mt-2">Your tuition was paid completely privately.</p>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full text-left space-y-3">
                      <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-1">
                        <FileCheck className="w-5 h-5" /> ZK-Proof Receipt Generated
                      </div>
                      <div className="text-xs font-mono text-slate-500 break-all bg-white p-3 rounded-lg border border-slate-100">
                        Proof Hash: {receiptHash}
                      </div>
                      <p className="text-xs text-slate-400">This receipt proves you paid without revealing the amount.</p>
                    </div>

                    <button 
                      onClick={resetPayment}
                      className="text-indigo-600 font-medium hover:underline pt-4"
                    >
                      Make another payment
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-violet-100 p-3 rounded-2xl shadow-inner">
                        <GraduationCap className="w-6 h-6 text-violet-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-slate-900">Send Payment</h3>
                        <p className="text-sm text-slate-500">To: College Auditor (0x4A...9B)</p>
                      </div>
                    </div>
                    
                    <form onSubmit={handlePayment} className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700">Tuition Amount (VERI)</label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            disabled={paymentStatus !== 'idle'}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="e.g. 1000"
                            className="w-full pl-5 pr-12 py-4 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all text-lg font-medium text-slate-900 placeholder:text-slate-400 disabled:bg-slate-50"
                          />
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">VERI</div>
                        </div>
                      </div>
                      
                      <div className="bg-indigo-50/50 border border-indigo-100 text-indigo-900 text-sm p-4 rounded-xl flex gap-3 leading-relaxed">
                        <LockKeyhole className="w-5 h-5 shrink-0 text-indigo-600 mt-0.5" />
                        <p>Your payment data will be encrypted with the College Auditor's public key before touching the blockchain.</p>
                      </div>
                      
                      <button
                        disabled={paymentStatus !== 'idle' || !amount}
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none flex justify-center items-center gap-3 text-lg relative overflow-hidden group"
                      >
                        {paymentStatus === 'idle' && (
                          <>Submit Encrypted Payment <LockKeyhole className="w-5 h-5 group-hover:scale-110 transition-transform" /></>
                        )}
                        {paymentStatus === 'encrypting' && <><Loader2 className="w-5 h-5 animate-spin" /> Encrypting Payload...</>}
                        {paymentStatus === 'proving' && <><Loader2 className="w-5 h-5 animate-spin" /> Generating ZK Proof...</>}
                        {paymentStatus === 'sending' && <><Loader2 className="w-5 h-5 animate-spin" /> Confirming on Avalanche...</>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <KeyRound className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Privacy Login</h2>
                <p className="text-slate-500 text-center mb-8 text-sm">Enter the Auditor Private Key to unlock the decryption dashboard.</p>
                
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      required
                      value={auditorKey}
                      onChange={(e) => setAuditorKey(e.target.value)}
                      placeholder="Enter Auditor Key (hint: fuji2026)"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all text-center"
                    />
                  </div>
                  {loginError && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg justify-center">
                      <AlertCircle className="w-4 h-4" /> Invalid key provided.
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                  >
                    Unlock Dashboard
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 font-medium text-xs border border-white/10 mb-4">
                      <ShieldCheck className="w-4 h-4" /> Authorized Auditor View
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">Auditor Dashboard</h1>
                    <p className="text-slate-400 mt-2 max-w-xl text-lg">Decrypt and verify incoming student tuition payments using your private key.</p>
                  </div>
                  <div className="relative z-10 w-full md:w-auto">
                    <button onClick={() => setIsAdminLoggedIn(false)} className="absolute -top-12 right-0 text-sm text-slate-400 hover:text-white transition-colors">
                      Lock Session
                    </button>
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search Tx Hash..." 
                      className="w-full md:w-72 pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-slate-500 backdrop-blur-sm transition-all"
                    />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/40">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                        <tr>
                          <th className="px-6 py-5">Time</th>
                          <th className="px-6 py-5">Sender Address</th>
                          <th className="px-6 py-5">Transaction Data</th>
                          <th className="px-6 py-5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {/* Mock Data Row */}
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-5 text-slate-500">2 mins ago</td>
                          <td className="px-6 py-5 font-mono text-xs text-slate-700 bg-slate-100 rounded px-2 py-1 m-5 inline-block">0x71C...97aB</td>
                          <td className="px-6 py-5">
                            {decryptedData ? (
                              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-100 font-medium animate-in fade-in zoom-in duration-300">
                                <LockOpen className="w-4 h-4" /> {decryptedData}
                              </div>
                            ) : (
                              <div className="font-mono text-xs text-slate-400 truncate max-w-[250px] bg-slate-50 px-3 py-1.5 rounded border border-slate-100">
                                0x84d2f093284c...e89f
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-5 text-right">
                            {decryptedData ? (
                              <span className="text-emerald-600 font-bold text-sm inline-flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Verified
                              </span>
                            ) : (
                              <button 
                                onClick={handleDecrypt}
                                disabled={isDecrypting}
                                className="text-white font-semibold bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 hover:shadow-md transition-all duration-300 flex items-center gap-2 ml-auto disabled:opacity-70 w-[110px] justify-center"
                              >
                                {isDecrypting ? (
                                  <Loader2 className="w-4 h-4 animate-spin" /> 
                                ) : (
                                  <><LockKeyhole className="w-4 h-4 text-indigo-400" /> Decrypt</>
                                )}
                              </button>
                            )}
                          </td>
                        </tr>
                        
                        {/* Empty State Rows */}
                        <tr className="opacity-50 blur-[1px]">
                          <td className="px-6 py-5 text-slate-400">1 hour ago</td>
                          <td className="px-6 py-5 font-mono text-xs text-slate-500">0x3A2...1f8e</td>
                          <td className="px-6 py-5 font-mono text-xs text-slate-400 truncate max-w-[250px]">0x99a1b2c3d4e5...f6g7</td>
                          <td className="px-6 py-5 text-right">
                            <span className="text-slate-400 font-medium text-sm">Verified</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="p-12 text-center flex flex-col items-center bg-slate-50 border-t border-slate-100">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-indigo-200 rounded-full blur animate-pulse"></div>
                      <ShieldCheck className="w-14 h-14 text-indigo-600 relative z-10" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-lg">Listening for Transactions</h3>
                    <p className="text-slate-500 mt-1">Waiting for new confidential payments on Avalanche Fuji.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
