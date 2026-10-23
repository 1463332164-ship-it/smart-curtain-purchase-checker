(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.P2Config=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const sources={
    SRC001:{title:'SwitchBot Rod Type 1 专页',url:'https://us.switch-bot.com/products/switchbot-curtain-3-rod-type-1',checked:'2026-10-22',scope:'本轮读取产品描述；不采用推荐商品的规格'},
    SRC002:{title:'SwitchBot Curtain 3 通用页',url:'https://us.switch-bot.com/products/switchbot-curtain-3',checked:'2026-10-22',scope:'Product Description，伸缩杆及对开说明'},
    SRC003:{title:'SwitchBot Curtain 3 杆型兼容图',url:'https://support.switch-bot.com/hc/en-us/articles/33395020305047-Rod-Rail-Size-Compatible-With-SwitchBot-Curtain-3',checked:'2026-10-22',scope:'沿用阶段2看图记录，本轮未重看图片；不据此确认Type 1例外'},
    SRC004:{title:'SwitchBot Matter over Bridge 帮助页',url:'https://support.switch-bot.com/hc/en-us/articles/35927178604311-How-to-Connect-SwitchBot-Devices-to-Third-Party-Platforms-Matter-over-Bridge',checked:'2026-10-22',scope:'Required devices / Add to Apple Home'},
    SRC005:{title:'Aqara E1 Rod 美国产品页',url:'https://www.aqara.com/us/product/curtain-driver-e1-rod-version/',checked:'2026-10-22',scope:'Rods / Wide Compatibility / Multiple Control'},
    SRC006:{title:'Aqara E1 Rod FAQ',url:'https://store-support.aqara.com/products/aqara-smart-curtain-motor-e1-rod-version#faq',checked:'2026-10-22',scope:'沿用阶段2实际展开的Q2/Q13；本轮浏览器超时，未重读答案'},
    SRC007:{title:'Aqara M2 Matter 历史公告',url:'https://www.aqara.com/en/aqara-hub-m2-matter-update-has-started-to-roll-out/',checked:'2026-10-22',scope:'历史背景，不能证明当前全部配置；本轮未重新定位E1名单'}
  };
  const labels={documented:'该项资料条件相符',blocked:'存在明确不匹配项',verify:'需进一步核实',missing:'尚缺所述配置项',info:'配置说明',invalid:'输入有误'};
  function evaluate(input){
    const rows=[];const add=(rule,status,title,detail,refs,facts)=>rows.push({rule,status,title,detail,source_ids:refs||[],fact_ids:facts||[]});
    const enums={product:['switchbot','aqara'],rail:['fixed','extendable','track','unknown'],heading:['ring','grommet','rod_pocket','other','unknown'],opening:['single','pair','unknown'],goal:['install','app','apple_matter','other'],hub:['yes','no','unknown'],controller:['yes','no','unknown']};
    if(!input||typeof input!=='object')return {status:'invalid',rows:[{rule:'INPUT',status:'invalid',title:'输入必须是对象',detail:'请重新选择条件。',source_ids:[],fact_ids:[]}]};
    for(const [key,values] of Object.entries(enums))if(!values.includes(input[key]))add('INPUT-'+key,'invalid','输入字段无效：'+key,'请使用页面提供的选项。');
    if(input.diameter!==null&&(typeof input.diameter!=='number'||!Number.isFinite(input.diameter)||input.diameter<=0))add('INPUT-diameter','invalid','杆径必须是正数或未知','单位是毫米；空白不等于0。');
    if(rows.length)return {status:'invalid',rows};
    const aq=input.product==='aqara';const diameter=input.diameter;const range=aq?[25,32]:[10,40];const spec=aq?'SRC005':'SRC001';
    if(input.rail==='track'||input.rail==='unknown')add('R01','verify','先确认安装结构','当前检查路径仅覆盖圆杆。轨道不在本工具的规则范围内，不等于该产品必定不支持轨道。',[spec],aq?['FAC009']:['FAC003']);
    else {
      if(diameter===null)add('R02','verify','缺少杆径','测量实际运行段；伸缩结构还需要检查接缝和过渡条件。',[spec],aq?['FAC009']:['FAC003']);
      else if(diameter<range[0]||diameter>range[1])add('R02','blocked','杆径超出所查资料范围','所查型号给出的范围为'+range.join('–')+' mm；不外推其他版本。',[spec],aq?['FAC009']:['FAC003']);
      else add('R02','documented','杆径在所查范围内','仅此项符合'+range.join('–')+' mm，不代表完成安装适配判断。',[spec],aq?['FAC009']:['FAC003']);
      if(input.rail==='extendable')add('R03',aq?'blocked':'verify',aq?'该版本明确排除伸缩杆':'伸缩杆需要核对具体版本与接缝',aq?'Aqara E1 Rod产品页明确排除伸缩杆；杆径符合也不能抵消该限制。':'Type 1专页与通用页范围尚未对齐；不因杆径合格就输出可以安装。',['SRC005',...(aq?[]:['SRC001','SRC002'])].filter(s=>aq||s!=='SRC005'),aq?['FAC010']:['FAC002','FAC003']);
    }
    if(aq&&['ring','grommet'].includes(input.heading))add('R04','documented','帘头在FAQ已列类型中','仍须检查杆表面、附件、负载、间隙等完整安装要求。',['SRC006'],['FAC012']);
    else add('R04','verify','帘头和附件仍需按准确版本核对',input.heading==='rod_pocket'?'不能把Rod Pocket和挂环式混为一谈；本工具不为该条件作适配保证。':'当前资料不足以给该帘头和所有附件作完整适配结论。',aq?['SRC006']:['SRC001','SRC003'],aq?['FAC012']:['FAC007']);
    if(input.opening==='pair')add('R05','info','对开方案要核对两侧设备与包装',aq?'产品页描述两台组合使用的方案；不能说所有窗型都必须两台。':'通用页对开方案按两台说明；核对Type 1所购包装实际包含几台。',[aq?'SRC005':'SRC002'],[aq?'FAC013':'FAC004']);
    else if(input.opening==='unknown')add('R05','verify','还未确认单开或对开','确认需要驱动几侧后再检查设备数量和包装内容。',[aq?'SRC005':'SRC002']);
    else add('R05','info','单开不套用对开的两台说明','此处不生成最低采购数量或价格；仍按准确型号安装说明确认。',[aq?'SRC005':'SRC002']);
    if(input.goal==='apple_matter'&&!aq){
      add('R06',input.hub==='no'?'missing':'verify','Apple Home：分别核对桥接器',input.hub==='no'?'此处采用的官方Matter桥接路径需要兼容SwitchBot桥接器；Hub 2为文档示例。':'“已有Hub”不足以确认兼容；核对准确型号、固件与配对路径。',['SRC004'],['FAC005']);
      add('R07',input.controller==='no'?'missing':'verify','Apple Home：还要核对平台控制器',input.controller==='no'?'所查帮助页列出HomePod/Apple TV等控制器；仅有手机或桥接器不能据此认定配置完整。':'核对控制器代际、系统版本和所需功能；工具没有验证现场设备。',['SRC004'],['FAC006']);
    }else if(input.goal==='apple_matter'&&aq)add('R08','verify','E1现行完整Matter路径尚未核实','产品页带历史OTA说明。需要逐项确认Hub、固件、地区和平台控制器，不能输出不支持，也不能输出任意Hub都可以。',['SRC005','SRC007'],['FAC016']);
    else if(input.goal==='app'&&aq)add('R09',input.hub==='no'?'missing':'verify','Aqara App路径需核对Hub','阶段2展开的FAQ要求具备Zigbee 3.0功能的Hub；型号和适配性还需单独确认。',['SRC006'],['FAC011']);
    else if(input.goal==='app'||input.goal==='other')add('R10','verify','尚未覆盖这一完整控制路径','App近场、远程、语音及第三方生态不能合并判断；本工具不补齐未核实配置。',[spec]);
    add('R11','verify','完整安装检查仍未完成','重量、摩擦、附件、端部间隙、校准等未逐项建模。结果仅为买前资料初筛，没有实机或现场安装保证。',[spec]);
    const status=rows.some(r=>r.status==='blocked')?'blocked':'verify';
    return {status,rows,rule_version:'1.0.0',evidence_cutoff:'2026-10-22',real_participants:0,scope:'公开资料初筛；无真人或实机验证'};
  }
  return {evaluate,sources,labels};
});
