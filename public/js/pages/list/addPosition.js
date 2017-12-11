//first：创建 新增职位 文件
function AddPosition(contentContainer) {
	this.contentContainer = contentContainer;
	this.createDom();
	this.bindEvents();
}

AddPosition.Template = `
	<div class="modal fade" id="addPositionModel" role="dialog" aria-labelledby="loginLabel">
 		<div class="modal-dialog" role="document">
    		<div class="modal-content">
      			<div class="modal-header">
        			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        				<span aria-hidden="true">&times;</span>
        			</button>
        			<h4 class="modal-title" id="loginLabel">新增职位</h4>
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
          				<div class="form-group">
            				<label for="address" class="control-label">公司logo</label>
            				<input type="file" class="form-control" id="logo">
          				</div>
        			</form>
      			</div>
				<div class="modal-footer">
        			<button type="button" id="addBtn" class="btn btn-primary">新增</button>
      			</div>
    		</div>
  		</div>
	</div>
` 

$.extend(AddPosition.prototype, {
	createDom : function() {
		this.element = $(AddPosition.Template);//放在this.element中不会对其他组件产生影响
		this.contentContainer.append(this.element);
	},

	bindEvents: function (){
		var addBtn = this.element.find("#addBtn");
		addBtn.on("click", $.proxy(this.handleAddBtnClick, this));
	},

	handleAddBtnClick: function(){
		var nameElem = this.element.find("#name"),
			companyElem =  this.element.find("#company"),
			salaryElem = this.element.find("#salary"),
			addressElem = this.element.find("#address");
		
		$.ajax({						//ajax键值对格式
			url:'/api/position/add',	
			data:{						
			//data 用来向服务器请求数据,发送到c层的add方法中
				name:nameElem.val(),			
				company: companyElem.val(),
				salary: salaryElem.val(),
				address: addressElem.val()
			},
			success: $.proxy(this.handleAddPositionSucc, this)
		})
	},

	handleAddPositionSucc: function(res){
			//alert("success");
		} 


})