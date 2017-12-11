function Page() {
	this.container = $("#root");
}

$.extend(Page.prototype, {

	init: function() {
		this.createHeader();
	},

	createHeader: function() {
		this.header = new Header(this.container);
	}

})