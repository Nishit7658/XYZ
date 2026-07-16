'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ShieldCheck, GraduationCap, LockKeyhole, Search, CheckCircle2, LockOpen, Loader2, FileCheck, Coins, KeyRound, AlertCircle, Info, ArrowRight, EyeOff, Activity, Wallet } from 'lucide-react';

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
    
    setTimeout(() => setPaymentStatus('proving'), 1500);
    setTimeout(() => setPaymentStatus('sending'), 3000);
    setTimeout(() => {
      setPaymentStatus('success');
      setReceiptHash('0x' + Math.random().toString(16).slice(2, 12) + '...' + Math.random().toString(16).slice(2, 8));
      setAmount('');
    }, 4500);
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
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 bg-[length:200%_auto] animate-gradient">
            VeriTuition
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'student' ? 'bg-indigo-500/20 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              1. Student Portal
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'admin' ? 'bg-fuchsia-500/20 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.2)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              2. College Auditor
            </button>
          </div>
          <div className="scale-95 origin-right">
            <ConnectButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Project Context Banner */}
        <div className="bg-gradient-to-r from-indigo-950/50 to-fuchsia-950/50 border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-indigo-300 font-medium text-xs border border-white/10 mb-4 backdrop-blur-md">
                <Info className="w-4 h-4" /> Hackathon Project Overview
              </div>
              <h2 className="text-3xl font-bold mb-3 text-white">Confidential College Fee Payments</h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                Public blockchains expose your financial history to the world. <strong className="text-indigo-300">VeriTuition fixes this.</strong> We use encrypted payloads (simulating eERC/FHE on Avalanche Fuji) so that your wallet balance and payment amounts are completely hidden from the public, yet verifiable by the College Auditor.
              </p>
            </div>
            <div className="hidden md:flex gap-4 items-center bg-black/20 p-4 rounded-2xl border border-white/5">
              <div className="text-center group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-2 mx-auto ring-1 ring-indigo-500/30"><LockKeyhole className="w-5 h-5 text-indigo-300" /></div>
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">1. Encrypt</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <div className="text-center group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                <div className="w-12 h-12 bg-fuchsia-500/20 rounded-full flex items-center justify-center mb-2 mx-auto ring-1 ring-fuchsia-500/30"><ShieldCheck className="w-5 h-5 text-fuchsia-300" /></div>
                <span className="text-[10px] font-bold text-fuchsia-300 uppercase tracking-wider">2. Send Tx</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <div className="text-center group-hover:-translate-y-1 transition-transform duration-300 delay-200">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-2 mx-auto ring-1 ring-emerald-500/30"><LockOpen className="w-5 h-5 text-emerald-300" /></div>
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">3. Decrypt</span>
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'student' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                Student View: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">Secure Payment</span>
              </h1>
              <p className="text-slate-400 text-lg">Follow the steps below to simulate a confidential transaction.</p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* Step 1: Balance Card */}
              <div className="md:col-span-5 bg-white/[0.02] rounded-3xl p-8 shadow-2xl border border-white/10 relative group hover:bg-white/[0.04] transition-colors duration-500 backdrop-blur-xl">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] ring-1 ring-white/20 transform -rotate-6">1</div>
                
                <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-3">
                  <Coins className="w-6 h-6 text-indigo-400" /> Mint Test Funds
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  Notice how your balance shows as "****"? That's because it's <strong className="text-indigo-300">encrypted on the blockchain</strong>. No one else can see your wealth.
                </p>

                <div className="bg-black/40 rounded-2xl p-6 border border-white/5 text-center mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                  <h4 className="text-slate-500 font-semibold mb-2 uppercase tracking-widest text-[10px]">Your Encrypted Balance</h4>
                  <div className="text-4xl font-black font-mono text-white flex justify-center items-center gap-3 tracking-tight">
                    {balance} <span className="text-xl text-indigo-400 font-bold">VERI</span>
                  </div>
                </div>
                  
                <button 
                  onClick={handleMint}
                  disabled={isMinting}
                  className="w-full text-sm font-bold text-white bg-white/5 border border-white/10 px-6 py-4 rounded-xl hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                >
                  {isMinting ? <Loader2 className="w-5 h-5 animate-spin text-indigo-300" /> : (
                    <>
                      <Wallet className="w-4 h-4 text-indigo-400 group-hover/btn:text-white transition-colors" /> Mint 5,000 VERI
                    </>
                  )}
                </button>
              </div>

              {/* Step 2: Payment Card */}
              <div className="md:col-span-7 bg-white/[0.02] rounded-3xl p-8 shadow-2xl border border-white/10 relative backdrop-blur-xl">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(217,70,239,0.4)] ring-1 ring-white/20 transform -rotate-6">2</div>
                
                {paymentStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-6 animate-in zoom-in duration-500">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                      <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center shadow-inner relative z-10 backdrop-blur-md">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white">Payment Complete!</h3>
                      <p className="text-emerald-400/80 mt-2 font-medium">Your tuition was paid completely privately.</p>
                    </div>
                    
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 w-full text-left space-y-3 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
                      <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                        <FileCheck className="w-5 h-5" /> ZK-Proof Receipt Generated
                      </div>
                      <div className="text-xs font-mono text-emerald-200/70 break-all bg-emerald-950/30 p-4 rounded-xl border border-emerald-900/50 shadow-inner">
                        Proof Hash: <span className="text-emerald-300">{receiptHash}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-snug">This cryptographic receipt proves you paid your fees, without revealing to the public exactly how much you paid.</p>
                    </div>

                    <button 
                      onClick={resetPayment}
                      className="text-slate-400 font-semibold hover:text-white pt-2 text-sm transition-colors flex items-center gap-2"
                    >
                      Make another payment <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-fuchsia-400" /> Pay College Tuition
                    </h3>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                      Enter the amount you wish to pay. The amount will be <strong className="text-fuchsia-300">encrypted</strong> using the College's Public Key. Only they will be able to read it.
                    </p>
                    
                    <form onSubmit={handlePayment} className="space-y-6">
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Tuition Amount</label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                          <input
                            type="number"
                            step="any"
                            required
                            disabled={paymentStatus !== 'idle'}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="e.g. 2.5"
                            className="w-full pl-6 pr-16 py-4 rounded-xl border border-white/10 bg-[#0B0F19]/90 focus:bg-[#0B0F19] focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all text-xl font-bold text-white placeholder:text-slate-600 disabled:opacity-50 relative z-10 backdrop-blur-md"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-500 z-20 pointer-events-none">AVAX</div>
                        </div>
                      </div>
                      
                      <div className="bg-fuchsia-950/30 border border-fuchsia-900/50 text-fuchsia-200/80 text-sm p-4 rounded-xl flex gap-3 leading-relaxed">
                        <LockKeyhole className="w-5 h-5 shrink-0 text-fuchsia-400 mt-0.5" />
                        <p><strong>Privacy Check:</strong> The public block explorer will only see a random string of ciphertext, not your {amount || 'entered'} AVAX amount.</p>
                      </div>
                      
                      <button
                        disabled={paymentStatus !== 'idle' || !amount}
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none flex justify-center items-center gap-3 text-lg border border-white/10 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-full hover:-translate-y-full transition-transform duration-700 ease-in-out"></div>
                        {paymentStatus === 'idle' && (
                          <span className="relative z-10 flex items-center gap-2">Encrypt & Send Payment <ArrowRight className="w-5 h-5" /></span>
                        )}
                        {paymentStatus === 'encrypting' && <span className="relative z-10 flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Encrypting Payload...</span>}
                        {paymentStatus === 'proving' && <span className="relative z-10 flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Generating ZK Proof...</span>}
                        {paymentStatus === 'sending' && <span className="relative z-10 flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Confirming on Avalanche...</span>}
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
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                Auditor View: <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">Decryption Hub</span>
              </h1>
              <p className="text-slate-400 text-lg">See exactly what the college administrators see vs what the public sees.</p>
            </div>

            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white/[0.02] p-10 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-indigo-500"></div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20"></div>
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
                    <KeyRound className="w-8 h-8 text-indigo-400" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2 text-white">College Auditor Login</h2>
                <p className="text-slate-400 text-center mb-8 text-sm">Strictly for authorized personnel to decrypt student payments.</p>
                
                <form onSubmit={handleAdminLogin} className="space-y-5">
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={auditorKey}
                      onChange={(e) => setAuditorKey(e.target.value)}
                      placeholder="Enter Private Key (hint: fuji2026)"
                      className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black/50 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-center text-white placeholder:text-slate-600 backdrop-blur-sm"
                    />
                  </div>
                  {loginError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-950/50 border border-red-900/50 p-3 rounded-lg justify-center animate-in shake">
                      <AlertCircle className="w-4 h-4" /> Invalid auditor key provided.
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Unlock Dashboard
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8 animate-in zoom-in-95 duration-500">
                <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900/80 border border-indigo-500/20 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
                  <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/20 mb-5">
                      <LockOpen className="w-4 h-4" /> Authorized Access Granted
                    </div>
                    <h2 className="text-3xl font-black tracking-tight mb-3">Decryption Dashboard</h2>
                    <p className="text-indigo-200/70 text-sm leading-relaxed">
                      As the Auditor, you possess the Private Key to decrypt the ciphertext payloads coming from the Avalanche network. 
                      <strong className="text-white ml-1">Without this key, these transactions are completely unreadable to the public.</strong>
                    </p>
                  </div>
                  <button onClick={() => setIsAdminLoggedIn(false)} className="bg-white/5 hover:bg-white/10 text-slate-300 px-6 py-3 rounded-xl text-sm font-semibold transition-all border border-white/10 relative z-10 shrink-0 flex items-center gap-2 hover:text-white group">
                    <LockKeyhole className="w-4 h-4 group-hover:scale-110 transition-transform" /> Lock Session
                  </button>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-black/40 border-b border-white/10 text-slate-400 font-semibold text-xs uppercase tracking-widest">
                        <tr>
                          <th className="px-8 py-6">Time</th>
                          <th className="px-8 py-6">Blockchain Payload (Public vs Private)</th>
                          <th className="px-8 py-6 text-right">Auditor Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {/* Mock Data Row */}
                        <tr className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-8 text-slate-500 font-medium">Just now</td>
                          <td className="px-8 py-8">
                            {decryptedData ? (
                              <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-emerald-400/70 uppercase font-black tracking-widest flex items-center gap-1">
                                  <LockOpen className="w-3 h-3"/> Decrypted Real Data
                                </span>
                                <div className="flex items-center gap-3 text-emerald-400 bg-emerald-950/30 px-5 py-4 rounded-xl border border-emerald-900/50 font-bold text-base animate-in fade-in slide-in-from-left-4 duration-500 shadow-inner">
                                  <Activity className="w-5 h-5 text-emerald-500" /> {decryptedData}
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-1">
                                  <EyeOff className="w-3 h-3"/> What the public sees
                                </span>
                                <div className="font-mono text-sm text-slate-400 bg-black/50 px-5 py-4 rounded-xl border border-white/5 shadow-inner">
                                  0x84d2f093284ce89f3b174a9c8... (Ciphertext)
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="px-8 py-8 text-right align-bottom">
                            {decryptedData ? (
                              <span className="text-emerald-400 font-bold text-sm inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-xl">
                                <CheckCircle2 className="w-4 h-4" /> Verified
                              </span>
                            ) : (
                              <button 
                                onClick={handleDecrypt}
                                disabled={isDecrypting}
                                className="text-white font-bold bg-indigo-600/90 px-6 py-3.5 rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-indigo-500/50 transition-all duration-300 flex items-center gap-2 ml-auto disabled:opacity-50"
                              >
                                {isDecrypting ? (
                                  <Loader2 className="w-5 h-5 animate-spin" /> 
                                ) : (
                                  <><KeyRound className="w-4 h-4 text-indigo-300" /> Decrypt Payload</>
                                )}
                              </button>
                            )}
                          </td>
                        </tr>
                        
                        {/* Empty State Row */}
                        <tr className="opacity-30 blur-[1px] pointer-events-none">
                          <td className="px-8 py-8 text-slate-600 font-medium">1 hour ago</td>
                          <td className="px-8 py-8">
                             <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-slate-600 uppercase font-black tracking-widest flex items-center gap-1">
                                  <EyeOff className="w-3 h-3"/> What the public sees
                                </span>
                                <div className="font-mono text-sm text-slate-500 bg-black/50 px-5 py-4 rounded-xl border border-white/5">
                                  0x99a1b2c3d4e5f6g7h8i9... (Ciphertext)
                                </div>
                              </div>
                          </td>
                          <td className="px-8 py-8 text-right align-bottom">
                            <span className="text-slate-500 font-bold text-sm inline-flex items-center gap-2 bg-white/5 px-5 py-3 rounded-xl">
                              <CheckCircle2 className="w-4 h-4" /> Verified
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
