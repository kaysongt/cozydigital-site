import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import vm from 'node:vm';
const code=readFileSync('integrations/google-workspace/Code.gs','utf8');
function fixture(){
 const sheets=new Map(), props=new Map([['SPREADSHEET_ID','test-sheet'],['WEB_APP_URL','https://script.google.com/macros/s/test/exec']]),sent=[];
 let sender='out@cozydigital.org',failMail=false;
 function range(s,r,c,h,w){return {getValues:()=>Array.from({length:h},(_,i)=>Array.from({length:w},(_,j)=>s.data[r+i-1]?.[c+j-1]??'')),setValues:vals=>{vals.forEach((row,i)=>{s.data[r+i-1]??=[];row.forEach((v,j)=>s.data[r+i-1][c+j-1]=v);});}};}
 const book={getSheetByName:n=>sheets.get(n)};
 const ctx=vm.createContext({PropertiesService:{getScriptProperties:()=>({getProperty:k=>props.get(k),setProperty:(k,v)=>props.set(k,v)})},Session:{getEffectiveUser:()=>({getEmail:()=>sender})},SpreadsheetApp:{openById:()=>book,flush:()=>{}},Utilities:{getUuid:randomUUID},MailApp:{getRemainingDailyQuota:()=>100,sendEmail:m=>{if(failMail)throw Error('mail failed');sent.push(m);}},LockService:{getScriptLock:()=>({tryLock:()=>true,waitLock:()=>{},releaseLock:()=>{}})},ContentService:{MimeType:{JSON:'application/json'},createTextOutput:t=>({text:t,setMimeType(){return this;}})},HtmlService:{createHtmlOutput:text=>({text})}});
 vm.runInContext(code,ctx);
 for(const [name,headers] of [['Subscribers',ctx.SUB_HEADERS],['Webinar registrations',ctx.WEB_HEADERS],['Mail merge audience',['Email','Name']]]){
  const s={data:[Array.from(headers)],getRange(r,c,h,w){return range(this,r,c,h,w);},getDataRange(){return range(this,1,1,this.data.length,headers.length);},appendRow(v){this.data.push(Array.from(v));},clearContents(){this.data=[];}};sheets.set(name,s);
 }
 const post=p=>JSON.parse(ctx.doPost({parameter:{format:'json',...p}}).text);
 return {ctx,sheets,props,sent,post,setSender:v=>sender=v,setFail:v=>failMail=v};
}
let passed=0;
function test(name,run){run();passed++;console.log('PASS',name);}
test('sender ownership enforced',()=>{let f=fixture();f.setSender('someone@gmail.com');assert.throws(()=>f.ctx.setup());});
test('setup sends no email',()=>{let f=fixture();f.ctx.setup();assert.equal(f.sent.length,0);});
test('consent required',()=>{let f=fixture();assert.equal(f.post({action:'subscribe',email:'qa@example.invalid'}).ok,false);assert.equal(f.sheets.get('Subscribers').data.length,1);});
test('email normalized and formula text escaped',()=>{let f=fixture();assert.equal(f.post({action:'subscribe',email:'QA@example.invalid',name:'=IMPORTXML("x")',consent:'yes'}).ok,true);let r=f.sheets.get('Subscribers').data[1];assert.equal(r[0],'qa@example.invalid');assert.ok(r[1].startsWith("'="));assert.equal(r[2],'pending');});
test('pending addresses excluded from audience',()=>{let f=fixture();f.post({action:'subscribe',email:'qa@example.invalid',consent:'yes'});f.ctx.exportNewsletterAudience();assert.equal(f.sheets.get('Mail merge audience').data.length,1);});
test('GET confirmation cannot change consent',()=>{let f=fixture();f.post({action:'subscribe',email:'qa@example.invalid',consent:'yes'});let r=f.sheets.get('Subscribers').data[1];f.ctx.doGet({parameter:{action:'confirm',token:r[7]}});assert.equal(r[2],'pending');});
test('POST confirms and audience includes only confirmed rows',()=>{let f=fixture();f.post({action:'subscribe',email:'qa@example.invalid',consent:'yes'});let r=f.sheets.get('Subscribers').data[1];assert.equal(f.post({action:'confirm',token:r[7]}).state,'subscribed');f.ctx.exportNewsletterAudience();assert.equal(f.sheets.get('Mail merge audience').data[1][0],'qa@example.invalid');});
test('unsubscribe is idempotent and invalidates confirmation',()=>{let f=fixture();f.post({action:'subscribe',email:'qa@example.invalid',consent:'yes'});let r=f.sheets.get('Subscribers').data[1];let t=r[7],u=r[8];f.post({action:'confirm',token:t});assert.equal(f.post({action:'unsubscribe',token:u}).state,'unsubscribed');assert.equal(f.post({action:'unsubscribe',token:u}).state,'unsubscribed');assert.equal(f.post({action:'confirm',token:t}).ok,false);f.ctx.exportNewsletterAudience();assert.equal(f.sheets.get('Mail merge audience').data.length,1);});
test('expired confirmations denied',()=>{let f=fixture();f.post({action:'subscribe',email:'qa@example.invalid',consent:'yes'});let r=f.sheets.get('Subscribers').data[1];r[3]='2000-01-01T00:00:00.000Z';assert.equal(f.post({action:'confirm',token:r[7]}).ok,false);});
test('active repeat signup sends no duplicate email',()=>{let f=fixture();f.post({action:'subscribe',email:'qa@example.invalid',consent:'yes'});f.post({action:'confirm',token:f.sheets.get('Subscribers').data[1][7]});f.post({action:'subscribe',email:'qa@example.invalid',consent:'yes'});assert.equal(f.sent.length,1);});
test('webinar-only registration never joins newsletter',()=>{let f=fixture();assert.equal(f.post({action:'webinar',email:'qa@example.invalid',name:'QA',request_id:randomUUID()}).ok,true);assert.equal(f.sheets.get('Subscribers').data.length,1);assert.equal(f.sent.length,0);});
test('webinar retries deduplicate email',()=>{let f=fixture();let p={action:'webinar',email:'qa@example.invalid',name:'QA',request_id:randomUUID()};f.post(p);f.post(p);assert.equal(f.sheets.get('Webinar registrations').data.length,2);});
test('optional newsletter starts pending',()=>{let f=fixture();let r=f.post({action:'webinar',email:'qa@example.invalid',name:'QA',request_id:randomUUID(),marketing:'yes'});assert.equal(r.newsletter,'confirmation_required');assert.equal(f.sheets.get('Subscribers').data[1][2],'pending');});
test('mail failure preserves webinar and reports partial status',()=>{let f=fixture();f.setFail(true);let r=f.post({action:'webinar',email:'qa@example.invalid',name:'QA',request_id:randomUUID(),marketing:'yes'});assert.equal(r.ok,true);assert.equal(r.newsletter,'pending_retry');assert.equal(f.sheets.get('Webinar registrations').data.length,2);});
test('mail failure never falsely confirms newsletter',()=>{let f=fixture();f.setFail(true);assert.equal(f.post({action:'subscribe',email:'qa@example.invalid',consent:'yes'}).ok,false);assert.equal(f.sheets.get('Subscribers').data[1][2],'pending');});
test('honeypot and unknown actions rejected',()=>{let f=fixture();assert.equal(f.post({action:'subscribe',company_url:'spam',email:'qa@example.invalid',consent:'yes'}).ok,false);assert.equal(f.post({action:'exportNewsletterAudience'}).ok,false);});
test('malformed token and invalid email denied',()=>{let f=fixture();assert.equal(f.post({action:'confirm',token:'wrong'}).ok,false);assert.equal(f.post({action:'subscribe',email:'wrong',consent:'yes'}).ok,false);});
test('quota caps fail closed',()=>{let f=fixture();f.props.set('MAIL_DAY',new Date().toISOString().slice(0,10));f.props.set('MAIL_COUNT','50');assert.equal(f.post({action:'subscribe',email:'qa@example.invalid',consent:'yes'}).ok,false);assert.equal(f.sent.length,0);});
console.log(`${passed} tests passed. Google services mocked; no live emails sent.`);
