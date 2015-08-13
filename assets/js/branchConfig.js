$(function() {
    var imageUploadify = $('.J_upload_container').imageUploadify(),
        $branchModal = $('.J_branch_moal'),
        $branchModalTitle = $('.am-modal-hd span'),
        $branchSubmit = $('.J_branch_submit'),
        $branchForm = $('.J_branch_form'),
        $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        EDIT = '编辑',
        ADD = '添加',
        /**
         * 删除品牌
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delBranchs = function(ids, callback) {
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
        delBranchs(id, function() {
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
        delBranchs(ids.join(','), function() {
            location.href = location.href;
        });
    });
    $('.J_add_branch').on('click', function() {
        $branchModalTitle.text(ADD);
        $branchSubmit.text(ADD);
        imageUploadify.reset();
        $branchForm[0].reset();
        $branchModal.modal();
    });
    $('.J_branch_edit').on('click', function() {
        var $tr = $(this).closest('tr');
        $branchModalTitle.text(EDIT);
        $branchSubmit.text(EDIT);
        $('.J_branch_name').val($tr.attr('data-name'));
        $('.J_branch_id').val($tr.attr('data-id'));
        $tr.attr('data-ishot') === '1' ? $('.J_branch_ishot').attr('checked', 'checked') : $('.J_branch_ishot').removeAttr('checked');
        imageUploadify.set($tr.attr('data-imageid'), $tr.attr('data-imagepath'));
        $branchModal.modal();
    });
    $branchSubmit.on('click', function() {
        var $name = $('.J_branch_name'),
            $id = $('.J_branch_id'),
            id = $id.val(),
            t = id ? EDIT : ADD,
            name = $.trim($name.val());
        if (name === '') {
            notify.warn('品牌名称不能为空!');
            $name.focus();
            return;
        }
        var message = imageUploadify.get();
        if (message && (message = message.errorMessage)) {
            notify.warn(message);
            return;
        }
        $branchForm.ajaxSubmit({
            success: function(res) {
                if (res.code == 200) {
                    notify.success(t + '成功');
                    location.href = '';
                } else {
                    notify.warn(t + '失败');
                }
            }
        });
    });
    $('.J_set_subbranch').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
});
