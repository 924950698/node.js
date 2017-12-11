function Login(container, btnContainer, logoutContainer) {
	//外围盒子
	this.container = container;
	//
    this.btnContainer = btnContainer;
    //退出按钮
    this.logoutContainer = logoutContainer;
    //方法
	this.createDom();
    this.bindEvents();
}

Login.Template = `
	<div class="modal fade" id="loginModel" role="dialog" aria-labelledby="loginLabel">
 		<div class="modal-dialog" role="document">
    		<div class="modal-content">
      			<div class="modal-header">
        			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        				<span aria-hidden="true">&times;</span>
        			</button>
        			<h4 class="modal-title" id="loginLabel">登录</h4>
      			</div>
      			<div class="modal-body">
        			<form>
				    	<div class="form-group">
				        	<label for="username" class="control-label">用户名</label>
				        	<input type="text" class="form-control" id="username">
				    	</div>
          				<div class="form-group">
            				<label for="password" class="control-label">密码</label>
            				<input type="password" class="form-control" id="password">
          				</div>
        			</form>
      			</div>
				<div class="modal-footer">
        			<button type="button" id="loginBtn" class="btn btn-primary">登录</button>
      			</div>
                <div style="margin:20px;" class="alert hide alert-success" id="successNotice">恭喜您登录成功！</div>
                <div style="margin:20px;" class="alert hide alert-danger" id="errorNotice">sorry, 用户名密码错误</div>
    		</div>
  		</div>
	</div>
`;

$.extend(Login.prototype, {
	createDom: function() {
		//“注册，登录” 和  “ 用户名，退出” 是两个状态。一个用btnContainer，一个用logoutContainer
        this.btnContainer.append('<li><a href="#" data-toggle="modal" data-target="#loginModel">登录</a></li>');
        this.logoutContainer.append('<li><a href="javascript:;" id="loginUser"></a></li><li><a href="javascripot:;" id="logout">退出</a></li>');
        this.element = $(Login.Template);
        //登录的两种状态的提示框（不显示）
        this.noticeElem = this.element.find("#successNotice");//notice：通知，注意的意思
        this.errNoticeElem = this.element.find("#errorNotice");
		this.container.append(this.element);
	},

    /*bindEvents: function() {
    	//模板上的登录按钮
        var loginBtn = this.element.find("#loginBtn");
        loginBtn.on("click", $.proxy(this.handleLoginBtnClick, this));
        //得焦事件,登录时输入错误，会显示提示框，然后触发handleLogoutClick，在次点击输入框时，提示框会隐藏
        //用户名框 做了得焦事件，密码框 没有做
        var userElem = this.element.find("#username");
        userElem.on("focus", $.proxy(this.handleUsernameFocus, this));
        //退出按钮点击事件
        var logoutElem = this.logoutContainer.find("#logout");
        logoutElem.on("click", $.proxy(this.handleLogoutClick, this));
    },*/
   
   bindEvents: function() {
        var loginBtn = this.element.find("#loginBtn");
        loginBtn.on("click", $.proxy(this.handleLoginBtnClick, this));
        var userElem = this.element.find("#username");
        userElem.on("focus", $.proxy(this.handleUsernameFocus, this));
        var logoutElem = this.logoutContainer.find("#logout");
        logoutElem.on("click", $.proxy(this.handleLogoutClick, this));
    },
   
//处理登录按钮点击事件
    handleLoginBtnClick: function() {
    	//声明变量接收用户名 和  密码
        var username = this.element.find("#username").val(),
            password = this.element.find("#password").val();
        //ajax把参数传进去
        $.ajax({
            type: "post",
            url: "/api/user/login",
            data: {
                username: username,
                password: password
            },
            success: $.proxy(this.handleLoginSucc, this)
        })
    },
//获取回调函数
    handleLoginSucc: function(res) {
        if (res.data.login) {			//在contraller中
            window.location.reload();//成功后就 刷新
        }else {
            this.errNoticeElem.removeClass('hide');
        }
    },

    succCloseModal: function() {
    	//恭喜你登陆成功--清除隐藏
        this.noticeElem.addClass('hide');
        //模态框也清除隐藏，下面写法是固定用法
        this.element.modal('hide');
    },
//input框 失焦事件，
    handleUsernameFocus: function() {
        this.errNoticeElem.addClass('hide');
    },
//退出按钮点击事件    为啥要用ajax呢? 点击退出按钮后，
    handleLogoutClick: function() {
        $.ajax({
            url: '/api/user/logout',    
            success: $.proxy(this.handleLogoutSucc, this)
        })
    },
//退出回调函数成功
    handleLogoutSucc: function(res) {
        if (res.data.logout) {
            window.location.reload();
        }
    },
//显示用户名
    setUsername: function(username) {
        var userElem = this.logoutContainer.find("#loginUser");
//元素.text(要追加的内容) 和   .html用法一样
        userElem.text(username);
    }
})

