$(function () {
    $("#link_reg").on('click', () => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $("#link_login").on('click', () => {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    let form = layui.form;
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd != value) {
                return '两次密码不一致';
            }
        }
    })
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            method: 'post',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: (res) => {
                if (res.status !== 0) {
                    layer.msg(res.message || '注册失败');
                    return;
                }
                layer.msg(res.message || '注册成功');
                $('#link_login').click();
            }
        })
    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    layer.msg(res.message)
                    return;
                }
                layer.msg('登入成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html'

            }
        })
    })

})
