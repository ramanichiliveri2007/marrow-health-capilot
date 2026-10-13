import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { Activity, ArrowDown, ArrowRight, ArrowUpRight, Check, CircleHelp, Clock3, FileImage, FileText, Heart, HeartPulse, Home, Menu, MessageCircle, Moon, Paperclip, Send, ShieldCheck, Sparkles, Upload, X, Droplets, Footprints } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();
const navigation = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Wellness overview', icon: Activity },
  { href: '/reports', label: 'My reports', icon: FileText },
  { href: '/assistant', label: 'AI Assistant', icon: MessageCircle },
];

function Shell({ children }: { children: ReactNode }) {
  const [path] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const current = navigation.find(item => item.href === path)?.label ?? 'Your health, gently';
  return <div className="app-shell">
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label="Morrow home"><span className="brand-mark"><HeartPulse size={21} strokeWidth={2.2}/></span><span>morrow<span className="brand-dot">.</span></span></Link>
      <div className="side-caption">YOUR SPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        {navigation.map(({href,label,icon:Icon}) => <Link key={href} href={href} className={`nav-link ${path === href ? 'active' : ''}`} aria-current={path === href ? 'page' : undefined}><Icon size={18}/><span>{label}</span>{label === 'AI Assistant' && <span className="nav-new">DEMO</span>}</Link>)}
      </nav>
      <div className="sidebar-bottom"><div className="privacy-mark"><ShieldCheck size={18}/><div><strong>Your privacy comes first</strong><span>Files stay on this device</span></div></div><div className="side-foot">A little more clarity, every day.</div></div>
    </aside>
    <div className="main-frame">
      <header className="topbar">
        <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21}/></button>
        <div className="crumb">Morrow <span>/</span> <strong>{current}</strong></div>
        <div className="top-right"><span className="local-status"><span className="status-dot"/> Demo mode</span><span className="avatar">S</span></div>
      </header>
      {menuOpen && <div className="mobile-nav">{navigation.map(({href,label,icon:Icon}) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={path === href ? 'selected' : ''}><Icon size={18}/>{label}</Link>)}</div>}
      <main className="main-content">{children}</main>
      <footer className="page-footer"><span>Made for everyday wellbeing, not medical care.</span><Link href="/assistant">Questions? Start a conversation <ArrowUpRight size={14}/></Link></footer>
    </div>
  </div>;
}

function HomePage() {
  return <div className="page home-page">
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line"/> A GENTLER WAY TO CHECK IN</div>
        <h1>Your health story,<br/><em>in clearer focus.</em></h1>
        <p className="hero-lede">A calm place to bring your everyday wellness notes together, notice your routines, and find a little more clarity.</p>
        <div className="hero-actions"><Link href="/reports" className="button button-primary"><Upload size={17}/> Upload a health report <ArrowRight size={16}/></Link><Link href="/dashboard" className="text-link">Explore sample dashboard <ArrowRight size={15}/></Link></div>
        <div className="trust-row"><span><ShieldCheck size={16}/> Private by design</span><span><CircleHelp size={16}/> Here to support, not diagnose</span></div>
      </div>
      <div className="hero-art" aria-label="Illustration representing balanced everyday wellbeing">
        <div className="art-orbit orbit-a"/><div className="art-orbit orbit-b"/>
        <div className="art-sun"/>
        <div className="art-note note-one"><span className="tiny-icon teal"><Footprints size={17}/></span><span><b>A little movement</b><small>adds up</small></span><ArrowUpRight size={15}/></div>
        <div className="art-note note-two"><span className="tiny-icon coral"><Heart size={17}/></span><span><b>One day at a time</b><small>you’re doing fine</small></span></div>
        <div className="art-center"><div className="art-leaf"><Activity size={48} strokeWidth={1.5}/></div><span>YOUR WELLNESS<br/>IS YOURS TO SHAPE</span></div>
        <div className="art-caption"><span className="caption-rule"/> Small steps count.</div>
      </div>
    </section>
    <div className="demo-banner"><div className="demo-icon"><Sparkles size={18}/></div><p><strong>A quick note about this demo</strong><br/>Everything you see is sample data. Nothing is connected to your health records, and files you select stay right here on your device.</p><span className="demo-pill">SAMPLE EXPERIENCE</span></div>
    <section className="welcome-lower">
      <div><span className="eyebrow">A PLACE TO BEGIN</span><h2>Wellness isn’t a test<br/>you have to pass.</h2><p>Start wherever you are. Browse a fictional wellness snapshot, keep a report handy on your device, or ask a general question in a friendly space.</p></div>
      <div className="path-list">
        <Link href="/dashboard" className="path-item"><span className="path-number">01</span><span><b>Get a gentle overview</b><small>See a clearly labeled sample wellness day.</small></span><ArrowRight size={17}/></Link>
        <Link href="/reports" className="path-item"><span className="path-number">02</span><span><b>Keep a report close</b><small>Select a file without uploading or processing it.</small></span><ArrowRight size={17}/></Link>
        <Link href="/assistant" className="path-item"><span className="path-number">03</span><span><b>Ask a general question</b><small>Try the bilingual assistant demo.</small></span><ArrowRight size={17}/></Link>
      </div>
    </section>
    <div className="bottom-note"><ShieldCheck size={18}/><span><strong>Thoughtful by design.</strong> Morrow helps you explore everyday wellness information. It doesn’t diagnose, provide treatment, or replace a healthcare professional.</span></div>
  </div>;
}

const metrics = [
  {label:'Steps',value:'6,842',unit:'steps',goal:'of 8,000 sample goal',icon:Footprints,color:'mint',progress:72},
  {label:'Sleep',value:'7h 24m',unit:'last night',goal:'a restful sample night',icon:Moon,color:'lilac',progress:84},
  {label:'Hydration',value:'5',unit:'glasses',goal:'of 8 sample glasses',icon:Droplets,color:'blue',progress:62},
  {label:'Heart rate',value:'72',unit:'bpm',goal:'sample resting reading',icon:Heart,color:'rose',progress:58},
];
function DashboardPage() {
  return <div className="page">
    <div className="page-heading"><div><div className="eyebrow">YOUR WELLNESS, AT A GLANCE</div><h1>A little snapshot.</h1><p>A simple view of everyday patterns, just for exploring.</p></div><div className="date-chip"><Clock3 size={16}/> Sample day · Today</div></div>
    <div className="sample-alert"><span className="sample-alert-icon"><Sparkles size={17}/></span><div><strong>Fictional sample data</strong><span>These numbers are made up for this demo. They are not your personal health information or medical guidance.</span></div></div>
    <section className="metric-grid" aria-label="Sample wellness metrics">{metrics.map(({label,value,unit,goal,icon:Icon,color,progress})=><article className={`metric-card ${color}`} key={label}><div className="metric-top"><span>{label}</span><span className="metric-icon"><Icon size={18}/></span></div><div className="metric-value">{value}<small>{unit}</small></div><div className="metric-goal">{goal}</div><div className="metric-progress"><span style={{width:`${progress}%`}}/></div></article>)}</section>
    <section className="dashboard-lower">
      <article className="panel week-panel"><div className="panel-head"><div><span className="eyebrow">A FICTIONAL WEEK</span><h2>Gentle rhythms</h2></div><span className="small-badge">Sample steps</span></div><div className="bar-chart" role="img" aria-label="Fictional sample step counts over seven days"><div className="chart-guides"><span>8k</span><span>4k</span><span>0</span></div>{[['M',44],['T',63],['W',52],['T',81],['F',67],['S',37],['S',58]].map(([day,height],i)=><div className="bar-column" key={i}><div className={`bar ${i===3?'highlight':''}`} style={{height:`${height}%`}}/><span>{day}</span></div>)}</div><div className="chart-caption"><span className="chart-dot"/> No perfect streaks needed. This is only an illustration.</div></article>
      <article className="panel reflection-panel"><div className="reflection-mark"><HeartPulse size={21}/></div><span className="eyebrow">A KIND REMINDER</span><h2>Consistency can be small.</h2><p>This sample week has a mix of quieter and busier days. Real life has rhythms too, and rest belongs in the picture.</p><Link href="/assistant" className="text-link">Explore a general question <ArrowRight size={15}/></Link></article>
    </section>
    <div className="disclaimer-line"><ShieldCheck size={16}/> Not health advice. For personal concerns, a qualified healthcare professional can help.</div>
  </div>;
}

const acceptedTypes = ['application/pdf','image/jpeg','image/png','image/webp','image/gif','image/heic'];
function ReportsPage() {
  const [files,setFiles] = useState<File[]>([]);
  const [dragging,setDragging] = useState(false);
  const [notice,setNotice] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const addFiles = (incoming: FileList | File[]) => {
    const valid = Array.from(incoming).filter(file => acceptedTypes.includes(file.type) || /\.(pdf|jpe?g|png|webp|gif|heic)$/i.test(file.name));
    const rejected = incoming.length - valid.length;
    setFiles(previous => [...previous,...valid.filter(file => !previous.some(old => old.name === file.name && old.size === file.size))]);
    setNotice(rejected ? `${rejected} file${rejected > 1 ? 's were' : ' was'} skipped. Choose a PDF or image file.` : valid.length ? `${valid.length} file${valid.length > 1 ? 's' : ''} selected on this device.` : '');
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { if(event.target.files) addFiles(event.target.files); event.target.value=''; };
  const handleDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); if(event.dataTransfer.files) addFiles(event.dataTransfer.files); };
  return <div className="page">
    <div className="page-heading"><div><div className="eyebrow">A PRIVATE PLACE FOR YOUR FILES</div><h1>Keep reports close.</h1><p>Select a health report to keep track of it in this demo. Nothing leaves your device.</p></div><div className="date-chip"><ShieldCheck size={16}/> On-device only</div></div>
    <div className="report-layout">
      <section className="panel report-main"><div className="panel-head"><div><span className="eyebrow">YOUR FILES</span><h2>Choose what to keep nearby</h2></div><span className="small-badge">No upload</span></div>
        <div className={`drop-zone ${dragging?'dragging':''}`} onDragOver={event=>{event.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={handleDrop}>
          <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.gif,.heic,application/pdf,image/*" multiple onChange={handleChange} aria-label="Choose PDF or image reports"/>
          <div className="drop-icon"><Upload size={22}/></div><h3>Bring a report into your space</h3><p>Drag a PDF or image here, or choose from your device.</p>
          <button className="button button-primary" onClick={()=>inputRef.current?.click()}><Paperclip size={16}/> Choose files</button>
          <div className="file-types">PDF, JPG, PNG, WEBP, GIF, HEIC <span>·</span> Multiple files welcome</div>
        </div>
        <div className="file-list-heading"><span>SELECTED FILES <span className="count">{files.length}</span></span>{files.length>0&&<button className="clear-button" onClick={()=>{setFiles([]);setNotice('All selected files were removed.')}}>Remove all</button>}</div>
        {files.length===0?<div className="empty-files"><div className="empty-file-icon"><FileText size={21}/></div><div><strong>No files selected yet</strong><span>Files you choose will appear here. We won’t read or send them.</span></div></div>:<div className="file-list">{files.map((file,index)=><div className="file-row" key={`${file.name}-${file.size}-${index}`}><span className="file-kind">{file.type==='application/pdf'?<FileText size={19}/>:<FileImage size={19}/>}</span><div className="file-details"><strong>{file.name}</strong><span>{(file.size/1024/1024).toFixed(2)} MB · Selected on this device</span></div><span className="local-pill"><Check size={13}/> Local</span><button className="remove-file" aria-label={`Remove ${file.name}`} onClick={()=>{setFiles(current=>current.filter((_,i)=>i!==index));setNotice(`${file.name} removed.`)}}><X size={17}/></button></div>)}</div>}
        <div className="privacy-callout"><ShieldCheck size={18}/><p><strong>Your files stay yours.</strong> This demo does not upload, open, or process selected files. Leaving or refreshing this page clears your selection.</p></div>
        {notice&&<div className="sr-status" role="status">{notice}</div>}
      </section>
      <aside className="report-aside"><div className="aside-art"><div className="doc-sheet"><div/><div/><div/><span><Check size={15}/></span></div><div className="orbit-dot"/></div><span className="eyebrow">A NOTE ON THIS DEMO</span><h3>Nothing is being analyzed.</h3><p>Choosing a file only shows its name here. There’s no upload, storage, or health-data processing behind this experience.</p><div className="aside-separator"/><div className="aside-point"><ShieldCheck size={17}/><span>Private to this browser session</span></div><div className="aside-point"><CircleHelp size={17}/><span>Not medical advice or diagnosis</span></div></aside>
    </div>
  </div>;
}

type ChatMessage = {id:number;from:'user'|'bot';text:string};
function AssistantPage() {
  const [language,setLanguage] = useState<'en'|'te'>('en');
  const [text,setText] = useState('');
  const [messages,setMessages] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = language==='en';
  const canned = t
    ? 'Thanks for sharing that. I’m a demo companion, so I can’t interpret health details or give personal advice. I can offer general wellbeing information, or help you think of a question to bring to a healthcare professional.'
    : 'పంచుకున్నందుకు ధన్యవాదాలు. నేను డెమో సహాయకుడిని మాత్రమే, కాబట్టి ఆరోగ్య వివరాలను అర్థం చేసుకోవడం లేదా వ్యక్తిగత సలహా ఇవ్వడం చేయలేను. సాధారణ శ్రేయస్సు సమాచారం అందించగలను, లేదా వైద్య నిపుణులను అడగాల్సిన ప్రశ్నను ఆలోచించడంలో సహాయపడగలను.';
  const send = (event?:FormEvent) => {event?.preventDefault();const trimmed=text.trim();if(!trimmed)return;setMessages(current=>[...current,{id:Date.now(),from:'user',text:trimmed},{id:Date.now()+1,from:'bot',text:canned}]);setText('');};
  const starter = (value:string) => {setText(value);inputRef.current?.focus();};
  return <div className="page assistant-page">
    <div className="page-heading"><div><div className="eyebrow">A FRIENDLY PLACE TO ASK</div><h1>Let’s talk it through.</h1><p>General wellbeing questions are welcome. This is a scripted demo, not a real AI or a clinician.</p></div><div className="language-switch" aria-label="Choose conversation language"><button onClick={()=>setLanguage('en')} className={t?'selected':''} aria-pressed={t}>English</button><button onClick={()=>setLanguage('te')} className={!t?'selected':''} aria-pressed={!t}>తెలుగు</button></div></div>
    <div className="chat-layout">
      <section className="chat-panel" aria-label="Demo assistant conversation"><div className="chat-top"><div className="assistant-identity"><span className="assistant-avatar"><Sparkles size={19}/></span><div><strong>Morrow companion</strong><span><i/> General wellbeing · Demo</span></div></div><span className="chat-scripted">SCRIPTED REPLIES</span></div>
        <div className="chat-messages" aria-live="polite">
          <div className="welcome-message"><div className="welcome-bubble"><p>{t?'Hi there. I’m here to make everyday wellness feel a little easier to explore. What’s on your mind?':'నమస్కారం. రోజువారీ శ్రేయస్సు గురించి తెలుసుకోవడాన్ని కొంచెం సులభం చేయడానికి నేను ఇక్కడ ఉన్నాను. మీ మనసులో ఏముంది?'}</p><span>Just now</span></div></div>
          {messages.map(message=><div key={message.id} className={`message-row ${message.from}`}><div className={message.from==='bot'?'reply-bubble':'user-bubble'}>{message.text}<span>{message.from==='bot'?'Demo response':'You'}</span></div></div>)}
          {messages.length===0&&<div className="suggestion-wrap"><span className="suggestion-label">{t?'NOT SURE WHERE TO START?':'ఎక్కడ ప్రారంభించాలో తెలియదా?'}</span><div className="suggestion-list">{(t?['What are small ways to build a routine?','How can I prepare for a doctor visit?']:['చిన్న అలవాట్లను ఎలా ప్రారంభించాలి?','డాక్టర్‌ను కలిసే ముందు ఎలా సిద్ధం కావాలి?']).map(item=><button key={item} onClick={()=>starter(item)}>{item}<ArrowUpRight size={14}/></button>)}</div></div>}
        </div>
        <form className="chat-composer" onSubmit={send}><input ref={inputRef} value={text} onChange={event=>setText(event.target.value)} aria-label={t?'Write a general wellbeing question':'సాధారణ శ్రేయస్సు ప్రశ్న రాయండి'} placeholder={t?'Write a general wellbeing question…':'సాధారణ శ్రేయస్సు ప్రశ్న రాయండి…'}/><button type="submit" disabled={!text.trim()} aria-label="Send message"><Send size={17}/></button></form>
        <div className="composer-note"><ShieldCheck size={14}/>{t?'Please don’t share personal or urgent medical details.':'దయచేసి వ్యక్తిగత లేదా అత్యవసర వైద్య వివరాలను పంచుకోవద్దు.'}</div>
      </section>
      <aside className="chat-aside"><div className="safe-card"><span className="safe-icon"><HeartPulse size={19}/></span><span className="eyebrow">A SAFE SPACE</span><h3>Supportive, not clinical.</h3><p>{t?'This demo shares general, pre-written wellbeing responses. It can’t understand your health or offer personal recommendations.':'ఈ డెమో ముందే రాసిన సాధారణ శ్రేయస్సు సమాధానాలను మాత్రమే అందిస్తుంది. ఇది మీ ఆరోగ్యాన్ని అర్థం చేసుకోదు లేదా వ్యక్తిగత సిఫార్సులు ఇవ్వదు.'}</p></div>
        <div className="emergency-card"><div className="emergency-top"><span className="emergency-mark"><Activity size={17}/></span><strong>Need care right now?</strong></div><p>{t?'If you may be experiencing an emergency, contact your local emergency services now. For health concerns, speak with a qualified healthcare professional.':'అత్యవసర పరిస్థితి కావచ్చని అనిపిస్తే, వెంటనే స్థానిక అత్యవసర సేవలను సంప్రదించండి. ఆరోగ్య సమస్యల కోసం అర్హత కలిగిన వైద్య నిపుణులను సంప్రదించండి.'}</p></div>
        <button className="reset-chat" onClick={()=>{setMessages([]);setText('')}}><ArrowDown size={14}/> Start a fresh conversation</button>
      </aside>
    </div>
  </div>;
}

function NotFoundPage(){return <div className="page not-found"><span className="eyebrow">A SMALL DETOUR</span><h1>We can’t find that page.</h1><Link href="/" className="button button-primary">Back to home <ArrowRight size={16}/></Link></div>}
function RoutedErrorBoundary({children}:{children:ReactNode}) { const [location]=useLocation(); return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>; }
function Router(){return <RoutedErrorBoundary><Switch><Route path="/" component={()=> <Shell><HomePage/></Shell>}/><Route path="/dashboard" component={()=> <Shell><DashboardPage/></Shell>}/><Route path="/reports" component={()=> <Shell><ReportsPage/></Shell>}/><Route path="/assistant" component={()=> <Shell><AssistantPage/></Shell>}/><Route component={()=> <Shell><NotFoundPage/></Shell>}/></Switch></RoutedErrorBoundary>}
function App(){return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,'')}><Router/></WouterRouter><Toaster/></TooltipProvider></QueryClientProvider>}
export default App;
