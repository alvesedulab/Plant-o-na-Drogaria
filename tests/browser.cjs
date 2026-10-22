const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base=process.env.TEST_URL||'http://127.0.0.1:8001';
async function begin(name='Alex'){await page.goto(base);await page.getByRole('button',{name:'Iniciar avaliação'}).click();await page.locator('#player').fill(name);await page.getByRole('button',{name:'Entrar no plantão'}).click()}
async function play(choices){for(let i=0;i<5;i++){assert.equal(await page.locator('#next').isDisabled(),true);assert.equal(await page.getByText('Resposta correta:',{exact:false}).count(),0);await page.locator(`[data-option="${choices[i]}"]`).click();await page.locator('#next').click()}}
for(let hits=0;hits<=5;hits++){
 await begin(hits===5?'<img src=x onerror=alert(1)>':'Alex');
 const correct=[1,0,3,2,1];const choices=correct.map((v,i)=>i<hits?v:(v+1)%4);
 await play(choices);assert.equal((await page.locator('.score').innerText()).replace(/\s/g,''),`${hits*2}/10`);assert.equal(await page.locator('.review article').count(),5);assert.equal(await page.locator('.badge.wrong').count(),5-hits);
 if(hits===5){assert.equal(await page.locator('#result-name img').count(),0);await page.getByRole('button',{name:'Jogar novamente'}).click();assert.equal(await page.locator('#start').count(),1)}
}
await begin();await page.locator('[data-option="0"]').click();await page.locator('#next').click();await page.locator('#back').click();assert.equal(await page.locator('[data-option="0"]').getAttribute('aria-pressed'),'true');await page.locator('[data-option="1"]').click();assert.equal(await page.locator('[aria-pressed="true"]').count(),1);
for(const width of [360,390,768,1280]){await page.setViewportSize({width,height:900});await page.goto(base);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`)}
await page.setViewportSize({width:1280,height:1000});await page.screenshot({path:'/tmp/plantao-desktop.png',fullPage:true});
assert.deepEqual(errors,[]);console.log('PASS: six scores (0–10), 30 answers, hidden feedback, result explanations, restart, safe name, answer revision and responsive widths 360/390/768/1280; no browser errors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
