function Page() {
	this.headerContainer = $("#root");
	this.contentContainer = $("#content");
	this.tableContainer = $("#tbody");
	this.container = $("#container");

}

$.extend(Page.prototype, {

	init: function() {
		this.createHeader();
		this.creteAddPosComponent();
		this.createTableListComponent();//创建表格的tbody部分
		//分页代码
		this.createPagination();
		this.bindEvents();
	},

	createHeader: function() {
		this.header = new Header(this.headerContainer);
	},

	creteAddPosComponent: function() {
		
		this.addPosition = new AddPosition(this.contentContainer);//不是共用对象，放在list文件下
	},

	createTableListComponent: function() {
		this.tableList = new TableList(this.tableContainer ,this.contentContainer);
	},

	createPagination: function(){
		var paginationElem = this.contentContainer.find("#pagination");
		this.pagination = new Pagination(this.container); 
	},

	bindEvents: function(){ 
		$(this.tableList).on("success",$.proxy(this.handleTableGetDataSucc, this));
		$(this.tableList).on("changePage",$.proxy(this.handleTablePageChange, this));//监听changePage事件，执行handleTablePageChange
		$(this.pagination).on("change", $.proxy(this.handlePaginationChange, this))
	},

	handleTableGetDataSucc: function(e){
		var totalPage = e.totalPage;
		this.pagination.setPageNumber(totalPage);

	},

	handlePaginationChange: function(e){
		console.log(e)
		this.tableList.refreshPage(e.pageNum);
	},

	handleTablePageChange: function(e) {
		var page = e.page;
		this.pagination.changePage(page);
	}
})