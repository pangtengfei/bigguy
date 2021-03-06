$(function() {
    var $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        $searchForm = $('.J_search_form');
    /**
     * 删除品牌
     * @param  {[type]}   ids      [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    del = function(ids, callback) {
        if (!ids) {
            notify.warn('未选择任何项');
            return;
        }
        $('.J_confirm').modal({
            onConfirm: function(options) {
                $.post('', {
                    ids: ids
                }).then(function(res) {
                    if (res.code == 200) {
                        notify.warn('删除成功');
                        callback && callback();
                    } else {
                        notify.warn(res.message);
                    }
                });
            },
            onCancel: function() {}
        });
    };
    /**
     * 单条删除
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_single_del').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        del(id, function() {
            $tr.remove();
        });
    });
    /**
     * 批量删除
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_multi-del').on('click', function() {
        var ids = [];
        $singleCheckbox.each(function() {
            this.checked && ids.push($(this).closest('tr').attr('data-id'));
        });
        del(ids.join(','), function() {
            location.href = location.href;
        });
    });
    /**
     * 编辑
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_edit').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
});
