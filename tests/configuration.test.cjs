const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const {evaluate,sources}=require('../docs/configuration-rules.js');
const base={product:'aqara',rail:'fixed',diameter:30,heading:'ring',opening:'single',goal:'install',hub:'unknown',controller:'unknown'};
const cases=[
 ['SIM01','E1杆径符合，但伸缩杆被明确排除',{rail:'extendable'},'R03','blocked'],
 ['SIM02','E1下边界25mm仅杆径项符合',{diameter:25},'R02','documented'],
 ['SIM03','E1上边界32mm仅杆径项符合',{diameter:32},'R02','documented'],
 ['SIM04','E1超出上限',{diameter:32.1},'R02','blocked'],
 ['SIM05','E1低于下限',{diameter:24.9},'R02','blocked'],
 ['SIM06','空杆径不是0或不支持',{diameter:null},'R02','verify'],
 ['SIM07','Type1细伸缩杆不被自动放行',{product:'switchbot',rail:'extendable',diameter:12},'R03','verify'],
 ['SIM08','Type1超出专页杆径范围',{product:'switchbot',diameter:41},'R02','blocked'],
 ['SIM09','所查Apple桥接路径缺品牌桥接器',{product:'switchbot',goal:'apple_matter',hub:'no',controller:'yes'},'R06','missing'],
 ['SIM10','有桥接器仍缺所查平台控制器',{product:'switchbot',goal:'apple_matter',hub:'yes',controller:'no'},'R07','missing'],
 ['SIM11','自报已有设备不能变成已验证兼容',{product:'switchbot',goal:'apple_matter',hub:'yes',controller:'yes'},'R07','verify'],
 ['SIM12','E1未知现行Matter路径不是不支持',{goal:'apple_matter',hub:'yes',controller:'yes'},'R08','verify'],
 ['SIM13','单开不自动生成两台采购要求',{},'R05','info'],
 ['SIM14','对开明确区分配置与套装',{opening:'pair'},'R05','info'],
 ['SIM15','轨道不在规则范围不等于硬件不支持',{rail:'track'},'R01','verify'],
 ['SIM16','Aqara App路径缺Hub',{goal:'app',hub:'no'},'R09','missing'],
 ['SIM17','帘头未列不能断言不支持',{heading:'other'},'R04','verify'],
 ['SIM18','资料条件符合也不能跳过现场检查',{},'R11','verify']
];
const outputs=cases.map(([id,title,change,rule,expected])=>{const input={...base,...change};const result=evaluate(input);const actual=result.rows.find(r=>r.rule===rule)?.status;return {id,title,kind:'synthetic_rule_test',participant_id:null,input,expected_rule:rule,expected_status:expected,actual_status:actual,pass:actual===expected,result};});
outputs.forEach(o=>test(o.id+' '+o.title,()=>assert.equal(o.actual_status,o.expected_status)));
test('明确不匹配优先显示，仍保留其它待核项',()=>{const r=evaluate({...base,rail:'extendable'});assert.equal(r.status,'blocked');assert.ok(r.rows.some(x=>x.status==='verify'));});
test('所有场景不能返回购买许可或真人研究指标',()=>{for(const o of outputs){assert.ok(['blocked','verify'].includes(o.result.status));assert.equal(o.result.real_participants,0);assert.equal(o.participant_id,null);}});
test('全部规则来源ID存在且URL使用https',()=>{for(const o of outputs)for(const r of o.result.rows)for(const id of r.source_ids)assert.ok(sources[id].url.startsWith('https://'));});
test('非法输入明确拒绝，不把NaN或负数当未知',()=>{for(const change of [{diameter:NaN},{diameter:-1},{diameter:0},{diameter:'30'},{product:'unknown'},{hub:'maybe'}])assert.equal(evaluate({...base,...change}).status,'invalid');assert.equal(evaluate(null).status,'invalid');});
if(process.env.P2_WRITE_REPORT==='1'){
  const report={executed_at:new Date().toISOString(),executor:'Codex assistant',kind:'deterministic_software_test_on_synthetic_inputs',rule_version:'1.0.0',real_participants:0,real_sessions:0,usability_metrics:null,summary:{cases:outputs.length,passed:outputs.filter(o=>o.pass).length},cases:outputs};
  fs.writeFileSync(path.join(__dirname,'../verification/configuration_scenarios.json'),JSON.stringify(report,null,2)+'\n');
}
