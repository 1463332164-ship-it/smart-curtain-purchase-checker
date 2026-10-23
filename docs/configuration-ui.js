(function(){'use strict';const $=id=>document.getElementById(id);const fields=['product','rail','diameter','heading','opening','goal','hub','controller'];
const blank={product:'switchbot',rail:'unknown',diameter:'',heading:'unknown',opening:'unknown',goal:'install',hub:'unknown',controller:'unknown'};
const scenarios={blank,aqara_extendable:{...blank,product:'aqara',rail:'extendable',diameter:'30',heading:'ring',opening:'single'},switchbot_apple:{...blank,rail:'fixed',diameter:'28',heading:'ring',opening:'pair',goal:'apple_matter',hub:'yes',controller:'no'},aqara_matter:{...blank,product:'aqara',rail:'fixed',diameter:'30',heading:'ring',opening:'single',goal:'apple_matter',hub:'yes',controller:'yes'}};
const el=(tag,text,css)=>{const n=document.createElement(tag);n.textContent=text;if(css)n.className=css;return n;};
function dirty(){ $('config-output').replaceChildren();$('stale').hidden=false; }
function reset(){for(const key of fields)$(key).value=blank[key];$('scenario').value='blank';$('stale').hidden=true;$('config-output').replaceChildren(el('h2','等待检查'),el('p','填写条件，或载入一个标明身份的模拟任务。'));}
function fill(name){for(const key of fields)$(key).value=scenarios[name][key];dirty();}
$('scenario').addEventListener('change',e=>{if(e.target.value==='blank')reset();else if(scenarios[e.target.value])fill(e.target.value);});$('clear-config').addEventListener('click',reset);
// Changing a preset makes it a custom input, not a recorded participant session.
function edited(){ $('scenario').value='custom';dirty(); }
$('config-form').addEventListener('input',edited);$('config-form').addEventListener('change',edited);
$('config-form').addEventListener('submit',e=>{e.preventDefault();const input={};for(const key of fields)input[key]=$(key).value;input.diameter=input.diameter.trim()===''?null:Number(input.diameter);const result=P2Config.evaluate(input);const root=$('config-output');root.replaceChildren();$('stale').hidden=true;root.append(el('h2',result.status==='blocked'?'发现明确不匹配项':result.status==='invalid'?'请修正输入':'还需要核实这些条件'),el('p','结果是资料初筛，不是已确认可以购买。模拟任务与用户自行输入均不构成真人研究记录。'));
for(const row of result.rows){const item=el('article','','rule-result');item.append(el('span',P2Config.labels[row.status],'pill '+row.status),el('h3',row.title),el('p',row.detail),el('small',row.rule+' · '+(row.fact_ids.join(' / ')||'范围或输入规则')));for(const id of row.source_ids){const source=P2Config.sources[id];const link=el('a',id+' · '+source.title+' ↗');link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';item.append(link,el('small',source.checked+' · '+source.scope));}root.append(item);}});
})();
