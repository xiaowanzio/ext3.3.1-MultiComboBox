# Ext.ux.form.MultiComboBox

基于 **ExtJS 3.x** 扩展的多选下拉框组件。
支持复选框多选、点击不收起、支持表单提交、值与标签提取等功能。

---

## ✨ 功能特点

* ✅ 复选框多选
* ✅ 点击选项不关闭下拉框
* ✅ 保留焦点外点击时的选中项
* ✅ 可通过 `setValue` 动态设置多个值
* ✅ 支持获取值数组与显示文本数组
* ✅ 表单提交时支持 `hiddenName`

---

## 📦 引入方式

将本组件 JS 放入项目中，并在页面中加载：

```html
<script type="text/javascript" src="Ext.ux.form.MultiComboBox.js"></script>
```

---

## 🚀 基础示例

```javascript
var multiCombo = new Ext.ux.form.MultiComboBox({
    fieldLabel: '多选示例',
    name: 'demoField',
    hiddenName: 'demoField',
    width: 250,
    store: new Ext.data.SimpleStore({
        fields: ['id', 'name', 'checked'],
        data: [
            ['A', '选项A', false],
            ['B', '选项B', false],
            ['C', '选项C', false]
        ]
    }),
    mode: 'local',
    displayField: 'name',
    valueField: 'id',
    triggerAction: 'all',
    separator: ',', // 多个值拼接符
    editable: false,
    value: 'A,B' // 默认选中
});

new Ext.form.FormPanel({
    renderTo: Ext.getBody(),
    width: 400,
    items: [multiCombo]
});
```

---

## 📌 API 说明

### 🔹 配置项

| 名称           | 类型      | 默认值         | 说明             |
| ------------ | ------- | ----------- | -------------- |
| `checkField` | String  | `'checked'` | 控制复选框状态的字段     |
| `separator`  | String  | `','`       | 多个值拼接符         |
| `editable`   | Boolean | `false` 推荐  | 禁止手动输入，避免过滤或错乱 |

> 说明：其余 ComboBox 的原有配置完全支持

---

## 🔹 常用方法

| 方法             | 返回值    | 说明                         |
| -------------- | ------ | -------------------------- |
| `getValue()`   | String | 多值拼接字符串，例如 `"A,B,C"`       |
| `getValues()`  | Array  | 值数组，例如 `["A", "B"]`        |
| `getLabels()`  | Array  | 显示文本数组，例如 `["选项A", "选项B"]` |
| `setValue(v)`  | void   | 设置值，可以是字符串、数组或多个参数         |
| `clearValue()` | void   | 清空所有选中状态                   |

示例：

```javascript
console.log(multiCombo.getValue());   // "A,B"
console.log(multiCombo.getValues());  // ["A", "B"]
console.log(multiCombo.getLabels());  // ["选项A", "选项B"]
```

---

## ✅ 表单提交示例

当配置了 `hiddenName` 时：

* 提交值为 `valueField` 的多选值拼接字符串
* 示例：`demoField = "A,B"`

---

## 🎨 可选样式增强

```css
.x-combo-list-item {
    padding: 4px 6px !important;
    line-height: 18px !important;
}
```

---

## ⚠️ 兼容性

| 版本                | 支持情况 |
| ----------------- | ---- |
| ✅ ExtJS 3.0 - 3.4 |      |
| ❌ ExtJS 4+（需适配）   |      |

---

## 📝 授权许可

本组件可自由使用、修改、商用，无需授权。

---
