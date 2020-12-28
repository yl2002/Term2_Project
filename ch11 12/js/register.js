/**
 * 注册功能
 */
$(function () {
        //调用验证插件
        $('#registerForm').validate({
                //验证规则
                rules: {
                        //用户名的验证
                        username: {
                                required: true, //非空验证
                                rangelength: [3,6] //长度验证
                        },
                        //验证密码
                        password: {
                                required: true, //非空验证
                                isPassword: true //自定义的密码验证
                        },
                        //确认密码验证
                        checkPassword: {
                                required: true, //非空验证
                                equalTo: "#password" // 验证密码一致性
                        },
                        //电话号码
                        tel: {
                              required: true, //非空
                              isTel: true  //自定义的电话号码
                        }
                },
                //提示信息
                messages: {
                        //用户名提示信息
                        username: {
                                required: '用户名不能为空', //非空提示
                                rangelength: '长度为在3-6位' //长度提示

                        },
                        //密码的提示信息
                        password: {

                                required: '密码不能为空', //非空验证
                                isPassword: '亲！输入5-10个以字母开头、可带数字、“_”、“.”的字符串哟！'

                        },
                        //确认密码提示
                        checkPassword: {
                                required: '请再次输入密码', //非空验证
                                equalTo: '两次密码不一致' //
                        },
                        //电话号码提示
                        tel: {
                                required: '电话号码不能为空', //非空
                                isTel: '电话号码格式不正确'  //自定义的电话号码
                          }
                }
        })

        //密码自定义验证
        jQuery.validator.addMethod("isPassword", function(value, element) {
                var pwdReg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[,_]){4,9}$/;
                return this.optional(element) || (pwdReg.test(value));
        });
        //手机号码自定义验证
        jQuery.validator.addMethod("isTel", function(value, element) {
                var telReg = /^[1]+[3,8,5,7,9]+\d{9}$/;
                return this.optional(element) || (telReg.test(value));
        });
})

