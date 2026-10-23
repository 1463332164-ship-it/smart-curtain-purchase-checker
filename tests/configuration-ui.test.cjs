// Lightweight DOM adapter: exercises the actual UI event handlers, NOT a browser.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const api = require('../docs/configuration-rules.js');
function setup() {
  class Element {
    constructor(tag='div') { this.tag=tag; this.value=''; this.textContent=''; this.children=[]; this.handlers={}; this.hidden=true; }
    append(...nodes) { this.children.push(...nodes); }
    replaceChildren(...nodes) { this.children=[...nodes]; }
    addEventListener(type, handler) { this.handlers[type]=handler; }
    fire(type) { this.handlers[type]?.({target:this,preventDefault(){}}); }
  }
  const ids=['product','rail','diameter','heading','opening','goal','hub','controller','scenario','config-output','stale','config-form','clear-config'];
  const nodes=Object.fromEntries(ids.map(id=>[id,new Element()]));
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../docs/configuration-ui.js'),'utf8'),{
    document:{getElementById:id=>nodes[id],createElement:tag=>new Element(tag)},P2Config:api
  });
  const load=name=>{nodes.scenario.value=name;nodes.scenario.fire('change');};
  const submit=()=>nodes['config-form'].fire('submit');
  const text=node=>[node.textContent,...node.children.map(text)].join('\n');
  return {nodes,load,submit,read:()=>text(nodes['config-output'])};
}
test('UI preset E1 rejects extendable rods while reporting the diameter separately',()=>{
  const h=setup(); h.load('aqara_extendable'); h.submit();
  assert.equal(h.nodes.diameter.value,'30'); assert.match(h.read(),/发现明确不匹配项/);
  assert.match(h.read(),/R02 · FAC009/); assert.match(h.read(),/R03 · FAC010/);
});
test('UI preset SwitchBot reports the missing controller',()=>{
  const h=setup();h.load('switchbot_apple');h.submit();
  assert.equal(h.nodes.controller.value,'no'); assert.match(h.read(),/尚缺所述配置项/);assert.match(h.read(),/R07 · FAC006/);
});
test('UI preset Aqara Matter retains unknown with self-reported devices',()=>{
  const h=setup();h.load('aqara_matter');h.submit();assert.match(h.read(),/R08 · FAC016/);assert.match(h.read(),/现行完整Matter路径尚未核实/);
});
test('UI editing invalidates rendered conclusions and marks custom input',()=>{
  const h=setup();h.load('aqara_extendable');h.submit();h.nodes.diameter.value='31';h.nodes['config-form'].fire('input');
  assert.equal(h.read(),'');assert.equal(h.nodes.stale.hidden,false);assert.equal(h.nodes.scenario.value,'custom');
});
test('UI clear restores waiting state and clears stale indicator',()=>{
  const h=setup();h.load('aqara_matter');h.submit();h.nodes['clear-config'].fire('click');
  assert.equal(h.nodes.diameter.value,'');assert.equal(h.nodes.stale.hidden,true);assert.match(h.read(),/等待检查/);
});
test('UI blank numeric value becomes unknown, not zero',()=>{
  const h=setup();h.load('aqara_extendable');h.nodes.diameter.value='';h.submit();assert.match(h.read(),/缺少杆径/);assert.doesNotMatch(h.read(),/杆径超出/);
});
test('UI renderer handles rule-level invalid input without throwing',()=>{
  const h=setup();h.load('aqara_extendable');h.nodes.diameter.value='-1';h.submit();assert.match(h.read(),/请修正输入/);
});
test('UI evidence anchors preserve https and safe new-tab attributes',()=>{
  const h=setup();h.load('switchbot_apple');h.submit();
  const walk=n=>[n,...n.children.flatMap(walk)];const links=walk(h.nodes['config-output']).filter(n=>n.tag==='a');
  assert.ok(links.length>0);for(const link of links){assert.match(link.href,/^https:\/\//);assert.equal(link.rel,'noopener noreferrer');assert.equal(link.target,'_blank');}
});
