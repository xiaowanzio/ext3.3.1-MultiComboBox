Ext.namespace('Ext.ux.form');

/**
 * 多选ComboBox组件
 * @author LF
 * @date 2025-10-15
 */
Ext.ux.form.MultiComboBox = Ext.extend(Ext.form.ComboBox, {
    /** 复选框字段名 */
    checkField: 'checked',
    /** 多个值之间的分隔符 */
    separator: ',',

    /**
     * 初始化组件
     */
    initComponent: function() {
        // 自定义模板，添加复选框
        this.tpl = this.tpl || new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="x-combo-list-item" style="line-height: 5px;">',
            '<input type="checkbox" style="vertical-align: middle; margin: 0 5px 0 0; position: relative; top: -1px;" {[values.' + this.checkField + ' ? "checked" : ""]}/> ',
            '<span style="vertical-align: middle;">{' + this.displayField + '}</span>',
            '</div>',
            '</tpl>'
        );

        Ext.ux.form.MultiComboBox.superclass.initComponent.call(this);

        // 绑定事件
        this.on({
            scope: this,
            beforequery: this.onBeforeQuery,
            blur: this.onRealBlur
        });
    },

    /**
     * 选中项处理（点击不关闭下拉框）
     */
    onSelect: function(record, index) {
        if (this.fireEvent('beforeselect', this, record, index) !== false) {
            // 切换复选框状态
            record.set(this.checkField, !record.get(this.checkField));
            // 更新显示值
            this.updateDisplay();
            this.fireEvent('select', this, record, index);
        }
    },

    /**
     * 展开下拉框（防止重复展开）
     */
    expand: function() {
        if (this.isExpanded && this.isExpanded()) return;
        Ext.ux.form.MultiComboBox.superclass.expand.call(this);
    },

    /**
     * 条件折叠（点击外部区域时折叠）
     */
    collapseIf: function(e) {
        if (!e.within(this.wrap) && !e.within(this.list)) {
            this.collapse();
        }
    },

    /**
     * 获取选中的记录（核心方法，避免重复遍历）
     * @return {Object} {values: [], displays: []}
     * @private
     */
    getCheckedRecords: function() {
        var values = [], displays = [];
        this.store.each(function(r) {
            if (r.get(this.checkField)) {
                values.push(r.get(this.valueField));
                displays.push(r.get(this.displayField));
            }
        }, this);
        return {values: values, displays: displays};
    },

    /**
     * 更新显示值（统一处理显示逻辑）
     * @private
     */
    updateDisplay: function() {
        var checked = this.getCheckedRecords();
        var display = checked.displays.join(this.separator);
        
        this.value = checked.values.join(this.separator);
        this.setRawValue(display);
        this.lastSelectionText = display;
        
        if (this.hiddenField) {
            this.hiddenField.value = this.value;
        }
    },

    /**
     * 设置值
     * @param {String|Array} v 值（字符串、数组或多个参数）
     */
    setValue: function(v) {
        // 支持多参数形式：setValue('val1', 'val2', 'val3')
        if (arguments.length > 1) {
            v = Array.prototype.slice.call(arguments);
        }

        // 统一转换为数组
        if (!v) {
            v = [];
        } else if (typeof v === 'string') {
            v = v.split(this.separator);
        } else if (!Ext.isArray(v)) {
            v = [v];
        }
        // 使用Set提高查找性能（模拟Set）
        var valueMap = {};
        for (var i = 0; i < v.length; i++) {
            valueMap[v[i]] = true;
        }

        // 批量更新复选状态
        this.store.each(function(r) {
            r.set(this.checkField, !!valueMap[r.get(this.valueField)]);
        }, this);

        // 更新显示
        this.updateDisplay();
    },

    /**
     * 查询前处理（显示所有选项）
     */
    onBeforeQuery: function(qe) {
        qe.query = qe.query || '';
        qe.forceAll = true;
    },

    /**
     * 失焦处理（保留选中值）
     */
    onRealBlur: function() {
        this.list.hide();
        this.updateDisplay();
    },

    /**
     * 断言值有效性（覆盖父类，防止失焦时清空）
     */
    assertValue: function() {
        this.updateDisplay();
    },

    /**
     * 获取选中的值数组
     * @return {Array} 选中项的value数组
     */
    getValues: function() {
        return this.getCheckedRecords().values;
    },

    /**
     * 获取选中的显示文本数组
     * @return {Array} 选中项的displayField数组
     */
    getLabels: function() {
        return this.getCheckedRecords().displays;
    },

    /**
     * 获取当前值（覆盖父类方法）
     * @return {String} 用分隔符连接的选中值字符串
     */
    getValue: function() {
        return this.value || '';
    },


    /**
     * 清空所有选中项
     */
    clearValue: function() {
        this.setValue([]);
    }
});

Ext.reg('multiCombo', Ext.ux.form.MultiComboBox);
