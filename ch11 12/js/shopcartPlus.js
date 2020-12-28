/*
*购物车js文件
 */
$(function () {
	//把三个类型的input分别先获取
	var $theadInput = $('thead input[type=checkbox]');  //表头中的全选框
	var $tbodyInputs = $('tbody input[type=checkbox]');  //表格中的每一行的选择框
	var $totalPriceInput = $('.totalPrice input[type=checkbox]');  //计算总价中的全选框

	/*全选*/
	/*
		1.给表头的全选按钮 绑定点击事件 点击的时候 获取到它的选中状态 （true/false）
		2.给表格中每一行的数据的input选择框，赋值为表头的选中状态（true/false）
		3.给计算总价中的全选框，也赋值为表头的选中状态（true/false）
	 */
	//表头的全选
	$theadInput.change(function (){
		var checkState = $(this).prop('checked');  //获取全选框的选中状态
		$tbodyInputs.prop('checked',checkState);   //把状态给表格中的选择框
		$totalPriceInput.prop('checked',checkState);  //把状态给计算总价中的选择框
	
		allTotal();
	});


	/*
		计算总价的全选
			1.给计算总价的全选按钮 绑定点击事件，获取选择状态（true/false）
			2.把状态给表头的全选
			3.把状态给表格中的选择框
	 */
	$totalPriceInput.change(function () {
		var checkState = $(this).prop('checked');  //获取计算总价中的全选框

		$theadInput.prop('checked',checkState);  //赋值给表头全选框
		$tbodyInputs.prop('checked',checkState);  //赋值给表格中全选框
		allTotal();
	})


	/*
		表格中的全选框 反过来影响两个全选框
		1.给表格中的选择框绑定点击事件
		2.定一个标杆 flag = true；
		3.循环表格中的选择框
		4.获取每一个选择框的选中状态
			判断：如果有一个是false 那么就不是全选 . flag = false；
		5.把flag的赋值给两个全选框（因为flag就是对应选中状态）
	 */
	$tbodyInputs.change(function () { //循环表格input
		var flag = true;  //定标杆为true
		$tbodyInputs.each(function (index,input) {  //循环表格input
			var checkState = $(this).prop('checked');  //获取选中状态
			if (!checkState) {  //如果有一个等于false
				flag = false;
			}
		})
		$theadInput.prop('checked',flag);
		$totalPriceInput.prop('checked',flag);
		allTotal();
	})

	/*
		加法功能：
			1.获取+按钮，绑定点击事件
			2.点击的时候，获取后面输入框的值
			3.输入框的值自增
			4.把自增后的值，重新赋值给后面的输入框
	 */
	 $('.add').click(function () {  //给增加绑定事件
	 	var count = parseInt($(this).next().val()); //取后面输入框的值
	 	count++;  //自增
	 	$(this).next().val(count);  //把自增的值 赋值给后面输入框
	
	 	//小计
	 	subTotal($(this),count);
	 	allTotal();
	 })

	 /*
	 	减法功能
	 		1.给绑定点击事件
	 		2.获取前面输入框的值
	 		3.值自减，边界判断，如果小于1，那么等于1 否则等于自己
	 		4.把减少后的值 重新赋值给前面的输入框
	  */
	 $('.reduce').click(function () {
	 	var count = parseInt($(this).prev().val());

	 	count--;
	 	count = count < 1 ? 1 : count;
	 	$(this).prev().val(count);

	 	//小计
	 	subTotal($(this),count);
	 	allTotal();
	 })

	 /*
	 	封装一个小计函数： （点击+ 或 - 的时候 需调用小计函数
	  */
	  function subTotal(dom,count) {
	  	var singlePrice = parseFloat(dom.closest('tr').find('.price').text());

	  	var subTotalPrice = singlePrice * count;
	  	dom.closest('tr').find('.subprice').text(subTotalPrice.toFixed(2))
	  }


	  /*
	  	总计功能实现：（头部全选 计算总价全选 表格的选择框 + - 删除 六个地方调用总计）
	  	 	1.定义一个变量 用于保存总价 定义一个变量 用于保存已选商品 数量
	  	 	2.获取所有表格中的选择框，循环，获取选中状态，判断
	  	 	3.如果选中，那么就要累加这一行的小计
	   */
	  function allTotal() {
	  	var allPrice = 0;
	  	var selectedCount = 0;

	  	$('tbody input[type=checkbox]').each(function () {
	  		var checkState = $(this).prop('checked');
	  		if (checkState) {
	  			allPrice += parseFloat($(this).closest('tr').find('.subprice').text());
	  			selectedCount++;
	  		}
	  		
	  	})//渲染
	  		$('.total').text(allPrice.toFixed(2));
	  		$('.count').text(selectedCount);
	  }


	  /*
	  	关于下面的删除功能： 模拟，不是真正的逻辑，是；‘伪’的
	   */
	  //删除
	  $('.del').click(function () {
	  	$(this).closest('tr').remove()
	  	getGoodsCount();
	  	allTotal();
	  })

	  //删除选中
	  $('.deleteChecked').click(function () {
	  		$('tbody input[type=checkbox]').each(function () {
	  			var checkState = $(this).prop('checked');
	  			if (checkState) {
	  				$(this).closest('tr').remove();
	  			}
	  		})
	  		getGoodsCount();
	  		allTotal();
	  })

	  //封装一个获取全部商品的函数
	  function getGoodsCount() {
	  	//获取数量
	  	var goodsCount= $('table tbody tr').length;
	  	//渲染
	  	$('.goodsCount').text(goodsCount);
	  } 

	  getGoodsCount();

}) 