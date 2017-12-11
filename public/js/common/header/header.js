function Header(container) {
    this.container = container;
    this.createDom();
    this.checkLogin();
    this.createRegister();
    this.createLogin();
}

Header.Template = `
    <header>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">职位管理系统</a>
                </div>
    
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="/">首页 <span class="sr-only">(current)</span></a></li>
                        <li><a href="/list.html">职位管理</a></li>
                    </ul>
     
                    <ul class="nav navbar-nav navbar-right hide" id="btnContainer"></ul>
                    <ul class="nav navbar-nav navbar-right hide" id="logoutContainer"></ul>
                </div>
            </div>
        </nav>
</header>
`;

$.extend(Header.prototype, {

    createDom: function() {
        this.element = $(Header.Template);
        this.container.append(this.element);
        this.btnContainer = this.element.find("#btnContainer");
        this.logoutContainer = this.element.find("#logoutContainer");
    },

    createRegister: function() {
        this.register = new Register(this.element, this.btnContainer);
    },
//登录按钮
    createLogin: function() {
        this.login = new Login(this.element, this.btnContainer, this.logoutContainer)
    },

    checkLogin: function() {
        $.ajax({
            url: "/api/user/isLogin",
            success: $.proxy(this.handleGetLoginStatusSucc, this)
        })
    },

    handleGetLoginStatusSucc: function(res) {
        if (!res.data.isLogin) {
            this.btnContainer.removeClass('hide');
        }else {
            this.logoutContainer.removeClass('hide');
            this.login.setUsername(res.data.username);
        }
    }

})

