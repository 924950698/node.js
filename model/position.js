var db = require('../utils/database.js');
var Positions = db.model('position', { //将表名存进数据库，数据库会自动加s，
//写第三个参数 position,就不在加s了
	name: String,
	company: String,
	 salary: String,
	address: String
});

const addPosition = (name, company, salary, address, callback) => { //打散参数，
//如果传的参数特别多再用对象，一行能显示就用打散
	const positions = new Positions({ 
		name: name, 
		company:company,
		salary: salary,
		address: address
	});
//给服务器发送数据
	positions.save().then(() => {
		callback();
	})
}

const getTableList = (page, pageNum, callback) => {		//.find()后面有两个方法
//positions是上面的表名。
	Positions.find({}).limit(pageNum).skip((page -1)*pageNum).then((result) => { 
//表名.find（{查找所有的数据}）.then((所有的数据)) => {})
//.then() 执行完以上操作后，在往下执行
		callback(result);
	})
}

const getTotalPages = (pageNum, callback) =>{
	//.count() ： 数据库里所有的数量
	//totalNum :  全部的
	Positions.find({}).count().then((totalNum)=>{
		const totalPage = Math.ceil(totalNum / pageNum);
		callback(totalPage);
	})	
} 

const deleteItem = ( id, callback ) => {
	//err:代表是否有错误
	//result:代表删除的结果
	Positions.findByIdAndRemove(id,(err, result) => {
		if(!err && result) {
			callback(true);
		}else{
			callback(false);
		}
	})
}

const getItem = (id, callback) => {
	Positions.findById(id, (err, result) => {
		callback(result)
	})
}

const upData = (id,  name, company,salary, address, callback) => {
	Positions.findByIdAndUpdate(id,{
		 name: name,
		 company: company,
		 salary: salary,
		 address: address 
	},(err, result) => {
		callback(result);
	})
}



module.exports = {
	addPosition,
	getTableList,
	getTotalPages,
	deleteItem,
	getItem,
	upData
};