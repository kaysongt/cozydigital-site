/** Cozy Digital newsletter. Deploy while signed in as out@cozydigital.org.
 * Script properties: SPREADSHEET_ID, WEB_APP_URL. Never make the Sheet public.
 * No campaign sends or scheduled triggers are installed by this script.
 */
var SUB_HEADERS = ['Email','Name','Status','Requested UTC','Confirmed UTC','Unsubscribed UTC','Consent version','Confirm token','Unsubscribe token','Source'];
var WEB_HEADERS = ['Email','Name','Goal','Registered UTC','Marketing requested','Source','Request ID'];
var CONSENT_VERSION = 'cozy-newsletter-2026-10-24-v1';
var OWNER = 'out@cozydigital.org';

function settings_() {
  var p = PropertiesService.getScriptProperties();
  var c = {sheet:p.getProperty('SPREADSHEET_ID'), url:p.getProperty('WEB_APP_URL')};
  if (!c.sheet || !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(c.url || '')) throw new Error('Setup incomplete');
  if (Session.getEffectiveUser().getEmail().toLowerCase() !== OWNER) throw new Error('Use the approved Workspace sender');
  return c;
}
function sheet_(name, headers) {
  var book = SpreadsheetApp.openById(settings_().sheet);
  var s = book.getSheetByName(name);
  if (!s) throw new Error('Required worksheet missing');
  if (s.getRange(1,1,1,headers.length).getValues()[0].join('|') !== headers.join('|')) throw new Error('Unexpected headers');
  return s;
}
function setup() {
  sheet_('Subscribers',SUB_HEADERS); sheet_('Webinar registrations',WEB_HEADERS);
  return 'Configuration verified. No messages sent.';
}
function text_(v,max) { var s=String(v||'').trim(); if(s.length>max) throw new Error('Field too long'); return s; }
function email_(v) { var s=text_(v,254).toLowerCase(); if(!/^[^\s@]+@[^\s@.]+\.[^\s@]+$/.test(s)) throw new Error('Invalid email'); return s; }
function cell_(v) { return /^[=+\-@\t\r\n]/.test(String(v)) ? "'"+v : v; }
function raw_(v) { return String(v).replace(/^'(?=[=+\-@\t\r\n])/,''); }
function row_(s,email) { var rows=s.getDataRange().getValues(); for(var i=1;i<rows.length;i++) if(rows[i][0]===cell_(email)) return {index:i+1,values:rows[i]}; return null; }
function uuid_() { return Utilities.getUuid()+Utilities.getUuid(); }
function save_(s,entry,values) { if(entry) s.getRange(entry.index,1,1,values.length).setValues([values]); else s.appendRow(values); SpreadsheetApp.flush(); }
function budget_(kind,limit) {
  var p=PropertiesService.getScriptProperties(), day=new Date().toISOString().slice(0,10), key=kind+'_COUNT';
  var n=p.getProperty(kind+'_DAY')===day?Number(p.getProperty(key)||0):0;
  if(n>=limit) throw new Error('Please try again later');
  p.setProperty(kind+'_DAY',day);p.setProperty(key,String(n+1));
}
function escape_(v) { return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function page_(title,body) {
  return HtmlService.createHtmlOutput('<!doctype html><html lang="en"><head><base target="_top"><title>'+escape_(title)+' | Cozy Digital</title></head><body style="background:#faf7ef;color:#102737;font-family:Arial,sans-serif;max-width:42rem;margin:10vh auto;padding:24px;line-height:1.65"><p>COZY DIGITAL</p><h1>'+escape_(title)+'</h1>'+body+'<p><a href="https://cozydigital.org/" rel="noreferrer">Back to Cozy Digital</a></p></body></html>').addMetaTag('viewport','width=device-width, initial-scale=1').setTitle(title+' | Cozy Digital');
}
function result_(p,value) {
  if(p.format==='json') return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  var messages={confirmation_required:['Check your inbox','If confirmation is needed, we sent a link to confirm your Cozy Digital newsletter subscription. Check spam too.'],subscribed:['You’re subscribed','You’ll receive occasional Cozy Digital tips, examples, and offers.'],unsubscribed:['You’re unsubscribed','You will no longer receive the Cozy Digital newsletter.'],saved:['Your webinar signup is saved','The team will share the date and viewing link when confirmed.'],invalid:['We couldn’t complete that request','The link may have expired or the request could not be saved. Return to the site to try again.'],partial:['Your webinar signup is saved','Your optional newsletter confirmation could not be sent. You can request it again from the newsletter page.']};
  var m=messages[value.state]||messages.invalid;return page_(m[0],'<p>'+m[1]+'</p>');
}
function subscribe_(p,email) {
  if(p.consent!=='yes') throw new Error('Newsletter consent required');
  var s=sheet_('Subscribers',SUB_HEADERS), old=row_(s,email), now=new Date().toISOString();
  if(old && old.values[2]==='subscribed') return {ok:true,state:'confirmation_required'};
  if(old && Date.now()-Date.parse(old.values[3])<60000) throw new Error('Please wait before requesting another link');
  if(MailApp.getRemainingDailyQuota()<5) throw new Error('Mail quota unavailable');
  budget_('MAIL',50);
  var token=uuid_(), unsubscribe=old?old.values[8]:uuid_();
  var values=[cell_(email),cell_(text_(p.name,255)),'pending',now,'','',CONSENT_VERSION,token,unsubscribe,cell_(text_(p.source,200)||'newsletter')];
  save_(s,old,values);
  var base=settings_().url;
  MailApp.sendEmail({to:email,replyTo:OWNER,name:'Cozy Digital',subject:'Confirm your Cozy Digital newsletter subscription',body:'Thanks for joining Cozy Digital. Confirm below to receive occasional tips, production examples, news, and offers from Quincy and Kayson.\n\n'+base+'?action=confirm&token='+token+'\n\nThe confirmation link expires in 48 hours. If you did not request this, ignore this message.\n\nCancel or unsubscribe: '+base+'?action=unsubscribe&token='+unsubscribe});
  return {ok:true,state:'confirmation_required'};
}
function webinar_(p,email) {
  var name=text_(p.name,255), goal=text_(p.goal,700), id=text_(p.request_id,80), marketing=p.marketing==='yes';
  if(!name || !/^[a-zA-Z0-9-]{16,80}$/.test(id)) throw new Error('Invalid webinar request');
  var s=sheet_('Webinar registrations',WEB_HEADERS),old=row_(s,email);
  if(!old) save_(s,null,[cell_(email),cell_(name),cell_(goal),new Date().toISOString(),marketing?'yes':'no',cell_(text_(p.source,200)||'webinar'),id]);
  if(marketing) {
    try { subscribe_({name:name,source:'webinar',consent:'yes'},email); }
    catch(e) { return {ok:true,state:'saved',newsletter:'pending_retry'}; }
  }
  return {ok:true,state:'saved',newsletter:marketing?'confirmation_required':'not_requested'};
}
function subscription_(p) {
  if(!/^(confirm|unsubscribe)$/.test(p.action||'') || !/^[a-f0-9-]{72}$/.test(p.token||'')) throw new Error('Invalid link');
  var s=sheet_('Subscribers',SUB_HEADERS), rows=s.getDataRange().getValues(),col=p.action==='confirm'?7:8;
  for(var i=1;i<rows.length;i++) if(rows[i][col]===p.token) return {sheet:s,index:i+1,values:rows[i]};
  throw new Error('Invalid link');
}
function change_(p) {
  var e=subscription_(p),v=e.values;
  if(p.action==='confirm') {
    if(v[2]==='unsubscribed' || Date.now()-Date.parse(v[3])>48*3600000) throw new Error('Expired');
    v[2]='subscribed';v[4]=v[4]||new Date().toISOString();
  }else {v[2]='unsubscribed';v[5]=new Date().toISOString();v[7]='';}
  save_(e.sheet,e,v);return {ok:true,state:v[2]};
}
function doGet(e) {
  try {
    var p=(e&&e.parameter)||{};subscription_(p);
    var label=p.action==='confirm'?'Confirm subscription':'Unsubscribe';
    return page_(label,'<p>Select the button to '+label.toLowerCase()+'.</p><form method="post" action="'+escape_(settings_().url)+'"><input type="hidden" name="action" value="'+p.action+'"><input type="hidden" name="token" value="'+escape_(p.token)+'"><button style="padding:14px 22px;background:#113e48;color:white;border:0;border-radius:6px;font-size:18px">'+label+'</button></form>');
  }catch(e){return result_({}, {ok:false,state:'invalid'});}
}
function doPost(e) {
  var p=(e&&e.parameter)||{}, lock=LockService.getScriptLock();
  if(!lock.tryLock(10000)) return result_(p,{ok:false,state:'invalid'});
  try {
    settings_();
    if(p.action==='confirm'||p.action==='unsubscribe') return result_(p,change_(p));
    if(p.company_url) throw new Error('Invalid request');
    if(p.action!=='subscribe'&&p.action!=='webinar') throw new Error('Invalid action');
    var email=email_(p.email);budget_('SUBMISSION',100);
    return result_(p,p.action==='webinar'?webinar_(p,email):subscribe_(p,email));
  }catch(e){return result_(p,{ok:false,state:'invalid'});}
  finally{lock.releaseLock();}
}
/** Run immediately before a newsletter. This refreshes the private audience; sends nothing.
 * Gmail mail merge from OWNER also suppresses Gmail-managed unsubscribes.
 */
function exportNewsletterAudience() {
  var lock=LockService.getScriptLock();lock.waitLock(10000);
  try {
    var book=SpreadsheetApp.openById(settings_().sheet), target=book.getSheetByName('Mail merge audience');
    if(!target) throw new Error('Audience worksheet missing');
    var seen={},rows=sheet_('Subscribers',SUB_HEADERS).getDataRange().getValues().slice(1).filter(function(r){
      if(r[2]!=='subscribed'||!r[4]||seen[r[0]]) return false;seen[r[0]]=true;return true;
    }).map(function(r){return [cell_(email_(raw_(r[0]))),r[1]];});
    target.clearContents();target.getRange(1,1,1,2).setValues([['Email','Name']]);
    if(rows.length) target.getRange(2,1,rows.length,2).setValues(rows);
    SpreadsheetApp.flush();return rows.length+' confirmed subscribers. No mail sent.';
  }finally{lock.releaseLock();}
}
