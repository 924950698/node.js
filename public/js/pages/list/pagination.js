function Pagination(container) {
	this.container = container; 
	this.bindEvents();
}
$.extend(Pagination.prototype, {
	
	bindEvents: function() {
		this.container.on("click", '.page-item', $.proxy(this.handleItemClick, this))
	},

	setPageNumber: function(totalPage) {
		var str = '';	
		for(var i= 1; i<= totalPage; i ++){
			str += "<li><a class='page-item' href = 'javascript:;'>"+ i +"</a></li>";
		}
		this.container.html(str);
	},

	handleItemClick: function(e) {
		var pageNum = $(e.target).html();

		//自动向外触发一个事件
		$(this).trigger(new $.Event("change", {
			pageNum : pageNum
		}))	
	},

	changePage: function(page){
		var item = this.container.find("li").eq( page-1);//对应页的下标 = 页数 -1
			link = item.find("a");//找到a，然后手动触发点击事件
console.log(link);
			link.trigger("click");
	}
})