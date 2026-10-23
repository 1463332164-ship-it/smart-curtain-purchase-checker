# 来源与业务口径复核

前一轮来源审计（原样保留实质结论），访问：2026-10-23；执行者：Codex assistant；方式：网络工具读取官方页面。不是实机测试。原数据包和规则中的2026-10-22日期是历史快照，不以这份报告批量改写。以下为简短事实摘要，不保存品牌图片、手册或页面全文。

| 来源 | 本轮实际读到的内容与定位 | 结果/范围 |
|---|---|---|
| [SRC001 Type 1专页](https://us.switch-bot.com/products/switchbot-curtain-3-rod-type-1) | Product Description：杆径10–40mm | 支持FAC003的尺寸项；不采纳99.99%适配率等宣传数字，不推断完整安装通过 |
| [SRC002 通用页](https://us.switch-bot.com/products/switchbot-curtain-3) | 产品说明：细于5/8英寸伸缩杆的限制及对开两台说明 | 支持FAC002、FAC004；与Type 1的适用版本关系仍待核 |
| [SRC003 兼容图页](https://support.switch-bot.com/hc/en-us/articles/33395020305047-Rod-Rail-Size-Compatible-With-SwitchBot-Curtain-3) | 页面可访问；正文主要为图片 | 本轮未重新看图。FAC007等沿用历史记录，不宣称新核实 |
| [SRC004 Matter桥接帮助](https://support.switch-bot.com/hc/en-us/articles/35927178604311-How-to-Connect-SwitchBot-Devices-to-Third-Party-Platforms-Matter-over-Bridge) | Required devices / Add to Apple Home：Curtain 3、品牌桥接器与平台控制器分列，要求更新设备 | 支持FAC005/006及R06/07；仅针对所查桥接路径，不泛化所有Apple接入方式 |
| [SRC005 Aqara E1 Rod](https://www.aqara.com/us/product/curtain-driver-e1-rod-version/) | Rods：25–32mm、排除伸缩杆；生态部分仍含历史OTA说明 | 支持FAC009/010；并不提供完整现行Matter组合核验 |
| [SRC006 Aqara FAQ](https://store-support.aqara.com/products/aqara-smart-curtain-motor-e1-rod-version#faq) | 页面可访问，但本轮提取内容未包含动态答案 | FAC011/012沿用历史展开记录；该次审计浏览器受阻，未再次展开 |
| [SRC007 M2历史公告](https://www.aqara.com/en/aqara-hub-m2-matter-update-has-started-to-roll-out/) | 4.0.0 Beta说明、设备名单确实列出Curtain Driver E1；桥接不是将Zigbee变成Thread | 补齐上轮未重定位的条目；仍不能证明2026年所有地区/Hub/固件组合 |

## 规则与事实的关系

| 场景 | 事实记录 | 项目规则 | 预期输出 |
|---|---|---|---|
| E1、30mm伸缩圆杆 | FAC009/FAC010 → SRC005 | R02检查尺寸，R03单独检查结构；不匹配优先于总体待核 | 总体blocked，尺寸documented，结构blocked |
| Curtain 3、有Hub但无平台控制器 | FAC005/FAC006 → SRC004 | R06不把“有”当兼容认证；R07对明确“没有”列缺项 | 总体verify，R06 verify，R07 missing |
| E1 Matter、自报两类设备都有 | FAC016 → SRC005/SRC007 | R08在没有完整组合证据时保留未知 | 总体verify，R08 verify |

厂商公开规格不等于本项目实测。blocked/verify等状态、冲突优先级、预置任务和R11“完整安装尚未完成”是项目设计的判断规则。将散落条件转成检查流程是研究者的解释；不是厂商对整个工具的背书。三个易错场景是待验证假设，不是已观察到的消费者错误。

当前规则没有整体“可以购买”的状态。R11始终提示未覆盖重量、摩擦、附件、间隙和校准。轨道未覆盖仅表示工具边界，不等于硬件不支持轨道。保留此限制，不为了显示绿色通过而删除。

## 本轮结论

核心三场景的有限判断有对应来源，未发现需反转的业务结论；没有据此验证全部硬件兼容组合。FAQ与图片的现时复核、Type 1伸缩杆适用范围、Aqara现行完整Matter配置仍开放。来源页面能读取不等于公开转载许可已确认。候选包只使用自行概括的事实、短说明和来源链接，发布批准仍待用户作出。

## 2026-10-24发布前链接与关键内容复查

本次通过网络工具重新打开SRC001–SRC007，7个地址均返回官方页面（FAQ锚点跳转到同产品帮助页）。SRC001 Product Description仍显示10–40mm；SRC002产品说明仍含5/8英寸伸缩杆限制及对开两台；SRC004 Required devices仍分列桥接设备与Apple平台控制器；SRC005 Rods仍列25–32mm并排除伸缩杆。仅概括必要事实，不采用营销适配率。

SRC003图示本次未重新目视读取；SRC006动态FAQ答案未再次展开。SRC007页面打开成功，但本次后续定位查询返回工具错误，因此沿用2026-10-23历史公告核对，不标记本次重新确认名单。上述限制不改变R08待核。页面内checked=2026-10-22及“本轮”措辞均属于冻结规则快照，不能解释为今天全面复核。此补充记录不批量覆盖历史事实日期。
