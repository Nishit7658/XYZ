'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ShieldCheck, GraduationCap, LockKeyhole, Search, CheckCircle2, LockOpen, Loader2, FileCheck, Coins, KeyRound, AlertCircle, Info, ArrowRight, EyeOff } from 'lucide-react';

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
    if (auditorKey === 'fuji2026') {
      setIsAdminLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleDecrypt = () => {
    setIsDecrypting(true);
    setTimeout(() => {
      setIsDecrypting(false);
      setDecryptedData('Student ID: 2026-CS-89 | Amount: 1,000 VERI');
    }, 2000);
  };

  const resetPayment = () => setPaymentStatus('idle');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200 pb-20">
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
              1. Student Portal
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'admin' ? 'bg-white shadow-sm text-indigo-700 scale-105' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              2. College Auditor
            </button>
          </div>
          <ConnectButton />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Project Context Banner - Always visible to explain the project */}
        <div className="bg-indigo-900 text-white rounded-3xl p-8 mb-12 shadow-xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 font-medium text-xs border border-white/10 mb-4">
                <Info className="w-4 h-4" /> What is this project?
              </div>
              <h2 className="text-3xl font-bold mb-3">Confidential College Fee Payments</h2>
              <p className="text-indigo-100/80 leading-relaxed">
                Normally, paying with crypto exposes your wallet balance and transaction history to the entire world. 
                <strong className="text-white"> VeriTuition fixes this.</strong> We use encrypted payloads (simulating eERC/FHE on Avalanche Fuji) so that 
                your financial data is completely hidden from the public, but can still be verified by authorized college auditors.
              </p>
            </div>
            <div className="hidden md:flex gap-4 items-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 mx-auto"><LockKeyhole className="w-6 h-6 text-indigo-200" /></div>
                <span className="text-xs font-semibold text-indigo-200">1. Encrypt</span>
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-400" />
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 mx-auto"><ShieldCheck className="w-6 h-6 text-indigo-200" /></div>
                <span className="text-xs font-semibold text-indigo-200">2. Verify On-Chain</span>
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-400" />
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 mx-auto"><LockOpen className="w-6 h-6 text-indigo-200" /></div>
                <span className="text-xs font-semibold text-indigo-200">3. Auditor Decrypts</span>
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'student' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Student View: Make a Secure Payment
              </h1>
              <p className="text-slate-500 mt-2 text-lg">Follow the steps below to simulate a confidential transaction.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Step 1: Balance Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border-2 border-indigo-50 relative group transition-all">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-200">1</div>
                
                <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
                  <Coins className="w-6 h-6 text-indigo-500" /> Mint Test Funds
                </h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  First, you need some "VERI" tokens to pay your tuition. Notice how your balance shows as "****"? That's because it's encrypted on the blockchain. No one else can see your wealth!
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center mb-6">
                  <h4 className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-xs">Your Encrypted Balance</h4>
                  <div className="text-4xl font-black font-mono text-slate-800 flex justify-center items-center gap-3">
                    {balance} <span className="text-xl text-slate-400">VERI</span>
                  </div>
                </div>
                  
                <button 
                  onClick={handleMint}
                  disabled={isMinting}
                  className="w-full text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-6 py-4 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {isMinting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Click Here to Mint 5,000 VERI'}
                </button>
              </div>

              {/* Step 2: Payment Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border-2 border-violet-50 relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-violet-200">2</div>
                
                {paymentStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-4 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Payment Complete!</h3>
                      <p className="text-slate-500 mt-2">Your tuition was paid, but the amount is hidden.</p>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full text-left space-y-3">
                      <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-1">
                        <FileCheck className="w-5 h-5" /> ZK-Proof Receipt Generated
                      </div>
                      <div className="text-xs font-mono text-slate-500 break-all bg-white p-3 rounded-lg border border-slate-100">
                        Proof Hash: {receiptHash}
                      </div>
                      <p className="text-xs text-slate-400 leading-snug">This receipt proves you paid your fees, without revealing to the public exactly how much you paid.</p>
                    </div>

                    <button 
                      onClick={resetPayment}
                      className="text-violet-600 font-semibold hover:underline pt-2 text-sm"
                    >
                      Make another payment
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-violet-500" /> Pay College Tuition
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      Enter the amount you wish to pay. When you submit, the amount will be encrypted using the College's Public Key. Only they will be able to read it.
                    </p>
                    
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
                            className="w-full pl-5 pr-12 py-4 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-violet-600/10 focus:border-violet-600 outline-none transition-all text-lg font-medium text-slate-900 placeholder:text-slate-400 disabled:bg-slate-50"
                          />
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">VERI</div>
                        </div>
                      </div>
                      
                      <div className="bg-violet-50 border border-violet-100 text-violet-900 text-sm p-4 rounded-xl flex gap-3 leading-relaxed">
                        <LockKeyhole className="w-5 h-5 shrink-0 text-violet-600 mt-0.5" />
                        <p><strong>Privacy Check:</strong> The public block explorer will only see a random string of ciphertext, not your {amount || 'entered'} VERI amount.</p>
                      </div>
                      
                      <button
                        disabled={paymentStatus !== 'idle' || !amount}
                        type="submit"
                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-violet-600/30 transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none flex justify-center items-center gap-3 text-lg"
                      >
                        {paymentStatus === 'idle' && (
                          <>Encrypt & Send Payment <ArrowRight className="w-5 h-5" /></>
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
            
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Auditor View: Decrypting Payments
              </h1>
              <p className="text-slate-500 mt-2 text-lg">See exactly what the college administrators see vs what the public sees.</p>
            </div>

            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <KeyRound className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">College Auditor Login</h2>
                <p className="text-slate-500 text-center mb-8 text-sm">This dashboard is strictly for authorized personnel to decrypt student payments.</p>
                
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      required
                      value={auditorKey}
                      onChange={(e) => setAuditorKey(e.target.value)}
                      placeholder="Enter Private Key (hint: fuji2026)"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all text-center"
                    />
                  </div>
                  {loginError && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg justify-center">
                      <AlertCircle className="w-4 h-4" /> Invalid auditor key provided.
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
                <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                  <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/20 mb-4">
                      <LockOpen className="w-4 h-4" /> Authorized Access Granted
                    </div>
                    <h2 className="text-3xl font-black tracking-tight mb-2">Decryption Dashboard</h2>
                    <p className="text-slate-400 text-sm">
                      As the Auditor, you have the Private Key required to decrypt the ciphertext payloads coming from the Avalanche network. 
                      <strong className="text-white ml-1">Without this key, the transactions below look like gibberish to everyone else.</strong>
                    </p>
                  </div>
                  <button onClick={() => setIsAdminLoggedIn(false)} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-slate-600 relative z-10 shrink-0">
                    Lock Session
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/40 mt-8">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                        <tr>
                          <th className="px-6 py-5">Time</th>
                          <th className="px-6 py-5">Public Explorer View (Ciphertext)</th>
                          <th className="px-6 py-5 text-right">Auditor Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {/* Mock Data Row */}
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-6 text-slate-500">Just now</td>
                          <td className="px-6 py-6">
                            {decryptedData ? (
                              <div className="flex flex-col gap-1">
                                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Decrypted Real Data:</span>
                                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-3 rounded-lg border border-emerald-200 font-bold text-base animate-in fade-in zoom-in duration-300">
                                  <LockOpen className="w-5 h-5" /> {decryptedData}
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-1">
                                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1"><EyeOff className="w-3 h-3"/> What the public sees:</span>
                                <div className="font-mono text-sm text-slate-400 bg-slate-50 px-4 py-3 rounded-lg border border-slate-100">
                                  0x84d2f093284ce89f3b1... (Encrypted Payload)
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-6 text-right align-bottom">
                            {decryptedData ? (
                              <span className="text-emerald-600 font-bold text-sm inline-flex items-center gap-1 bg-emerald-50 px-4 py-2 rounded-lg">
                                <CheckCircle2 className="w-4 h-4" /> Payment Verified
                              </span>
                            ) : (
                              <button 
                                onClick={handleDecrypt}
                                disabled={isDecrypting}
                                className="text-white font-bold bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 flex items-center gap-2 ml-auto disabled:opacity-70"
                              >
                                {isDecrypting ? (
                                  <Loader2 className="w-5 h-5 animate-spin" /> 
                                ) : (
                                  <><KeyRound className="w-4 h-4 text-indigo-200" /> Apply Private Key to Decrypt</>
                                )}
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
