(() => {
  const message = document.getElementById('auth-message');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  let sitekey = '';
  let loginWidget = null;
  let signupWidget = null;
  let loginToken = '';
  let signupToken = '';

  const nextUrl = (() => {
    const n = new URLSearchParams(location.search).get('next') || '/conta';
    return n.startsWith('/') && !n.startsWith('//') ? n : '/conta';
  })();

  function show(text,type='error') {
    message.textContent=text; message.className=`form-message ${type}`; message.hidden=false;
  }
  function clearMessage(){message.hidden=true;message.textContent='';}
  function renderLoginCaptcha(){ if(window.hcaptcha && sitekey && loginWidget===null) loginWidget=window.hcaptcha.render('login-captcha',{sitekey,callback:t=>loginToken=t,'expired-callback':()=>loginToken='','error-callback':()=>loginToken=''}); }
  function renderSignupCaptcha(){ if(window.hcaptcha && sitekey && signupWidget===null) signupWidget=window.hcaptcha.render('signup-captcha',{sitekey,callback:t=>signupToken=t,'expired-callback':()=>signupToken='','error-callback':()=>signupToken=''}); }
  function setTab(which){
    clearMessage();
    const login=which==='login';
    document.getElementById('tab-login').classList.toggle('active',login);
    document.getElementById('tab-signup').classList.toggle('active',!login);
    loginForm.hidden=!login; signupForm.hidden=login;
    if(login) renderLoginCaptcha(); else renderSignupCaptcha();
  }

  async function loadCaptcha() {
    const r=await fetch('/api/config',{cache:'no-store'});
    const cfg=await r.json();
    sitekey=cfg.hcaptchaSitekey||'';
    if(!sitekey){show('Captcha não configurado no Vercel.');return;}
    await new Promise((resolve,reject)=>{
      if(window.hcaptcha) return resolve();
      const s=document.createElement('script');s.src='https://js.hcaptcha.com/1/api.js?render=explicit';s.async=true;s.defer=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
    });
    renderLoginCaptcha();
  }

  async function submit(path,body,form,widgetId) {
    clearMessage();
    if(!form.reportValidity()) return;
    if(!body.captchaToken){show('Conclua o captcha para continuar.');return;}
    const btn=form.querySelector('button[type="submit"]');const old=btn.innerHTML;btn.disabled=true;btn.textContent='Aguarde...';
    try{
      const r=await fetch(path,{method:'POST',headers:{'content-type':'application/json'},credentials:'include',body:JSON.stringify(body)});
      const data=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(data.error||'Não foi possível continuar.');
      if(data.requiresEmailConfirmation){show(data.message||'Confira seu e-mail para confirmar a conta.','success');return;}
      location.href=nextUrl;
    }catch(e){show(e.message||'Não foi possível continuar.');if(window.hcaptcha&&widgetId!==null)window.hcaptcha.reset(widgetId);if(path.includes('login'))loginToken='';else signupToken='';}
    finally{btn.disabled=false;btn.innerHTML=old;}
  }

  document.getElementById('tab-login').addEventListener('click',()=>setTab('login'));
  document.getElementById('tab-signup').addEventListener('click',()=>setTab('signup'));
  loginForm.addEventListener('submit',e=>{e.preventDefault();submit('/api/auth/login',{email:document.getElementById('login-email').value.trim(),password:document.getElementById('login-password').value,captchaToken:loginToken},loginForm,loginWidget)});
  signupForm.addEventListener('submit',e=>{e.preventDefault();submit('/api/auth/signup',{name:document.getElementById('signup-name').value.trim(),email:document.getElementById('signup-email').value.trim(),password:document.getElementById('signup-password').value,captchaToken:signupToken},signupForm,signupWidget)});

  document.addEventListener('DOMContentLoaded',async()=>{
    try{const r=await fetch('/api/auth/me',{credentials:'include',cache:'no-store'});const d=await r.json();if(d.user){location.href=nextUrl;return;}}catch{}
    loadCaptcha().catch(()=>show('Não foi possível carregar o captcha. Atualize a página.'));
  });
})();
