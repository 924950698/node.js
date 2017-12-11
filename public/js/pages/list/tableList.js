function TableList(container,modalContainer) {
	this.container = container;
	this.modalContainer = modalContainer;
	this.deletePage = 1;//记录当前删除的页数
	this.pageNum = 10;
	this.createModal();
	this.createDom();
	this.bindEvents();
}

TableList.ModalTemplate = `
	<div class="modal fade" id="addPositionModel" role="dialog" aria-labelledby="loginLabel">
 		<div class="modal-dialog" role="document">
    		<div class="modal-content">
      			<div class="modal-header">
        			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        				<span aria-hidden="true">&times;</span>
        			</button>
        			<h4 class="modal-title" id="loginLabel">修改职位</h4>
      			</div>
      			<div class="modal-body">
        			<form>
				    	<div class="form-group">
				        	<label for="name" class="control-label">职位名称</label>
				        	<input type="text" class="form-control" id="name">
				    	</div>
          				<div class="form-group">
            				<label for="company" class="control-label" >公司</label>
            				<input type="text" class="form-control" id="company">
          				</div>
          				<div class="form-group">
            				<label for="salary" class="control-label">薪资范围</label>
            				<select class="form-control" id="salary">
							  <option>5000-10000</option>
							  <option>10000-15000</option>
							  <option>15000-20000</option>
							  <option>20000-30000</option>
							  <option>30000-40000</option>
							</select>
          				</div>
          				<div class="form-group">
            				<label for="address" class="control-label">工作地点</label>
            				<input type="text" class="form-control" id="address">
          				</div>
        			</form>
      			</div>
				<div class="modal-footer">
        			<button type="button" id="upDataBtn" class="btn btn-primary">修改</button>
      			</div>
    		</div>
  		</div>
	</div>
`

$.extend( TableList.prototype, {

	createModal: function() {
		this.modal = $(TableList.ModalTemplate);
		this.modalContainer.append(this.modal);
		this.userInput = this.modal.find("#name");
		this.companyInput = this.modal.find("#company");
		this.salaryInput = this.modal.find("#salary");
		this.addressInput = this.modal.find("#address");

	},

	createDom : function() {
		$.ajax({
			url: "/api/position/tableList",
			//data是传参数到C层的req.query.page 和 req.query.pageNum
			data: {
				page :this.deletePage,
				pageNum :this.pageNum
			}, 
			success: $.proxy(this.handleGetListSucc, this)
		})
	},

	//获取数据成功后，渲染页面
	handleGetListSucc: function(res) {
		//接收到的res变成了空的，
		if( !res.data.tableList || !res.data.tableList.length){
			// !res.data.tableList:表示为真
			if( res.data.totalPage > 1) {//大于1，前一页还有内容，等于1前一页没有内容
		
				//trriger携带事件自动向外触发
				$(this).trigger(new $.Event("changePage", {//前一页还有值，把前一页的代码向外触发出去，paje.js来监听
					page : this.deletePage -1	//得到上一页的页码
				}))
				
			}else{
				return;
			}	
		}
		var str = "";
		var length = res.data.tableList.length;
		for(var i = 0;i < length; i ++){
			var item = res.data.tableList[i];
			str += `<tr>
				<td>${i + 1}</td>
				<td>${item.name}</td>
				<td>${item.company}</td>
				<td>${item.salary}</td>
				<td>${item.address}</td>
				<td><span  data-id="${item._id}" class="js-upData">更改</span> 
				    <span  data-id="${item._id}" class="js-delete">删除</span>
				</td>
			</tr>`
			//js-delete :只给js用   
			//item._id:控制台有_id,item._id调用此id
		}
		this.container.html(str);
		$(this).trigger(new $.Event("success", { 
			//new $.Event()能携带数据
			totalPage: res.data.totalPage
		}))
	},

	refreshPage: function(pageNum){
		if(pageNum) {
			this.deletePage = pageNum;
		}
		this.createDom();
	},

	bindEvents: function() {//点击删除按钮--触发监听事件
		this.container.on("click", ".js-delete", $.proxy(this.handleDeleteClick, this));
		this.container.on("click", ".js-upData", $.proxy(this.handleUpdataClick, this));
		
		var upDataBtn = this.modal.find("#upDataBtn");
		upDataBtn.on("click", $.proxy(this.handleUpdataPositon, this)) 
	},

	handleDeleteClick: function(e) {
		var id = $(e.target).attr("data-id");//监听了点击事件的id（页数）
		$.ajax({
			url:"api/position/delete",		//然后用ajax发送删除请求
			data:{
				id:id
			},
			success:$.proxy(this.handleDeleteSucc, this)
		}) 
	},

	handleDeleteSucc: function(res) {
	//res是从后台C层deleteItem方法--接收回来的参数
	//代表删除的结果
		if( res.data.delete){
			this.refreshPage();
		}else{
			alert("删除失败");
		}
	},

	handleUpdataClick: function(e) {
		this.dataId = $(e.target).attr("data-id");
		//this.modal.modal("show");
		$.ajax({
			url:"/api/position/getItem",
			data: {
				id : this.dataId
			},
			success: $.proxy(this.handleGetItemSucc, this) 
		})
	},

	handleGetItemSucc: function(res) {
		var data = res.data.result;
		
		this.userInput.val(data.name);
		this.companyInput.val(data.company);
		this.salaryInput.val(data.salary);
		this.addressInput.val(data.address);
		this.modal.modal("show");
	},

	handleUpdataPositon: function() {
		$.ajax({
			url: "/api/position/upData",
			data:{
				id:this.dataId,
				name:this.userInput.val(),
				company:this.companyInput.val(),
				salary:this.salaryInput.val(),
				address:this.addressInput.val()
			},
			success: $.proxy(this.handleUpdataSucc,this)
		})
	},

	handleUpdataSucc:function(res) {
		if(res.data.updata){
			this.modal.modal("hide");
			this.refreshPage();
		}
	} 

})