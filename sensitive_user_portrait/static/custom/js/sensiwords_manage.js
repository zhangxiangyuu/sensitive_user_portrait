function Tag(){
  this.ajax_method = 'GET';
}
Tag.prototype = {   //获取数据，重新画表
  call_sync_ajax_request:function(url, method, callback){
    $.ajax({
      url: url,
      type: method,
      dataType: 'json',
      async: false,
      success:callback
    });
  },

Draw_tag_table:function(data){
	//console.log(data);
	var data = []


    $('#sensi_manage_table').empty();
    var item = data;
    console.log(item);
    var html = '';
	html += '<table class="table table-bordered table-striped table-condensed datatable" >';
	html += '<thead><tr style="text-align:center;">';
	html += '<th>敏感词</th><th>等级</th><th>类别</th><th>时间</th><th>操作</th></tr>';
	html += '</thead>';
	html += '<tbody>';
	for(i=0;i<item.length;i++){
		html += '<tr>'
		html += '<td name="attribute_name">'+item[i].attribute_name+'</td>';
		var item_value = item[i].attribute_value.split('&').join('/');
        if (!item_value){
            html += '<td name="attribute_value"><a href="" data-toggle="modal" data-target="#editor" id="currentEdit" style="color:darkred;font-size:10px;" title="添加标签名">添加</a></td>';
        }
        else{
            html += '<td name="attribute_value"><a href="" data-toggle="modal" data-target="#editor" id="currentEdit" title="点击编辑">'+item_value+'</a></td>';
        }
        html += '<td name="creater">'+item[i].user+'</td>';
		html += '<td name="time">'+item[i].date+'</td>'
		html += '<td name="operate" style="cursor:pointer;" ><a href="javascript:void(0)" id="delTag">删除</a><a href="javascript:void(0)" id="delTag">删除</a></td>';
		html += '</tr>';
	}
	html += '</tbody>';
	html += '</table>';
	$('#Tagtable').append(html);
  }
}
var url ="/tag/search_attribute/";
var Tag = new Tag();
Tag.call_sync_ajax_request(url, Tag.ajax_method, Tag.Draw_tag_table);

function Tag_search(){

	 this.url = "/tag/search_attribute/?";
}
Tag_search.prototype = {   //群组搜索
call_sync_ajax_request:function(url, method, callback){
	$.ajax({
      url: url,
      type: method,
      dataType: 'json',
      async: false,
      success:callback
    });
},
searchResult:function(data){
	 $('#Tagtable').empty();
    var item = data;
    var html = '';
	html += '<table class="table table-bordered table-striped table-condensed datatable" >';
	html += '<thead><tr style="text-align:center;">';
	html += '<th>标签类别</th><th>标签名</th><th>创建者</th><th>时间</th><th>操作</th></tr>';
	html += '</thead>';
	html += '<tbody>';
	for(i=0;i<item.length;i++){
		html += '<tr>'
		html += '<td name="attribute_name">'+item[i].attribute_name+'</td>';
		html += '<td name="attribute_value"><a href="javascript:void(0)" data-toggle="modal" data-target="#editor" title="点击编辑">'+item[i].attribute_value+'</a></td>';
		html += '<td name="creater">'+item[i].user+'</td>';
		html += '<td name="time">'+item[i].date+'</td>'
		html += '<td name="operate" style="cursor:pointer;" ><a href="javascript:void(0)" id="delTag">删除</a></td>';
		html += '</tr>';
	}
	html += '</tbody>';
	html += '</table>';
	$('#Tagtable').append(html);
    $('.datatable').dataTable({
        "sDom": "<'row'<'col-md-6'l ><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ 每页"
        }
    });
}
}

function searchbtnFun(that){
	$('#searchbtn').off("click").click(function(){
		var url = that.url;
		$("#float-wrap").addClass("hidden");
        $("#SearchTab").addClass("hidden");
		url += get_data();
		that.call_sync_ajax_request(url,that.ajax_method,that.searchResult);
	});
}


function get_data(){
	var temp='';
    var input_value;
    var input_name;
	 $('.searchinput').each(function(){
        input_name = $(this).attr('name')+'=';
        input_value = $(this).val()+'&';
        temp += input_name;
        temp += input_value;;
    });
	//console.log(temp);
	temp = temp.substring(0, temp.length-1);
	return temp;
}

var fbase = new Tag_search();
searchbtnFun(fbase);

function Tag_add(){
  this.url = '/tag/submit_attribute/?';
}
Tag_add.prototype = {   //获取数据，重新画表
  call_sync_ajax_request:function(url, method, callback){
    $.ajax({
      url: url,
      type: method,
      dataType: 'json',
      async: false,
      success:callback
    });
  },

NewTag:function(data){
	//console.log(data);
  location.reload();
  }
}

function tagAddFun(that){
	$('#newTag').off("click").click(function(){
		var url = that.url;
		url += get_input_data();
		that.call_sync_ajax_request(url,that.ajax_method,that.NewTag);
	});
}

function get_input_data(){
	var temp='';
    var input_value;
    var input_name;
	var tagnames = document.getElementsByName("attribute_name");
	var tagclass = document.getElementById("tagClass");
	input_name = "attribute_name=";
	input_value = document.getElementsByName("attribute_name")[tagnames.length-1].value;
	var reg = "^[a-zA-Z0-9_\u4e00-\u9fa5\uf900-\ufa2d]";
	
	while(!input_value.match(reg)){
		alert('标签类型只能包含英文、汉字、数字和下划线，请重新输入');
		tagnames.focus();
	}
	/*if(!input_value.match(reg)){
		alert('标签类型只能包含英文、汉字、数字和下划线，请重新输入');
		return;
	}*/
	temp += input_name;
    temp = temp + input_value +'&';
	var tagnames = document.getElementsByName("attribute_value");
	input_name = "attribute_value=";
	var value = '';
    var value_list = new Array();
	//console.log(tagnames);
	for(i=4;i<tagnames.length;i++){
        var this_value = document.getElementsByName("attribute_value")[i].value;
		console.log(this_value);
		if(this_value){
			value_list.push(this_value);
		}
	}
	value = value_list.join(',');
    console.log(value);
	input_value = value+'&';
	temp += input_name;
    temp += input_value;
	input_name = "user=";
	input_value ="admint&";
	temp += input_name;
    temp += input_value;
	input_name = "date=";
	input_value =currentDate()+'&';
	temp += input_name;
    temp += input_value;
	temp = temp.substring(0, temp.length-1);
	console.log(temp);
	return temp;
}
function currentDate(){
	var myDate = new Date();
	var yy = myDate.getFullYear();
	var mm = myDate.getMonth() + 1;
	if(mm<10){
		mm = '0'+mm.toString();
		
	}
	var dd = myDate.getDate();
	if(dd<10){
		dd = '0'+dd.toString();
	}
	
	var date = yy.toString()+ '-' + mm.toString() + '-' + dd.toString();
	console.log(date);
	return date;
}
var TagAdd = new Tag_add();
tagAddFun(TagAdd);

 function Tag_delete(){
	 this.url = "/tag/delete_attribute/?";
}
Tag_delete.prototype = {   //删除
call_sync_ajax_request:function(url, method, callback){
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      async: true,
      success:callback
    });
},
del:function(data){
	//location.reload();
	console.log(data);
}
}

function deleteGroup(that){
	$('a[id^="delTag"]').click(function(e){
		var url = that.url;
		var temp = $(this).parent().prev().prev().prev().prev().html();
		console.log(temp);
		url = url + 'attribute_name=' + temp;
		//window.location.href = url;
		that.call_sync_ajax_request(url,that.ajax_method,that.del);
		console.log(url);
	});
}

var Tag_delete = new Tag_delete();
deleteGroup(Tag_delete);

function TagChange(){
  this.url = '/tag/change_attribute/?';
}
TagChange.prototype = {   //获取数据，重新画表
  call_sync_ajax_request:function(url, method, callback){
    $.ajax({
      url: url,
      type: method,
      dataType: 'json',
      async: false,
      success:callback
    });
  },

ChangeTag:function(data){
	//console.log(data);
   location.reload();
  }
}

function tagChangeFun(that){
	$('#modifySave').off("click").click(function(){
		var url = that.url;
		url += input_data();
		that.call_sync_ajax_request(url,that.ajax_method,that.ChangeTag);
	});
}

function input_data(){
	var temp='';
    var input_value;
    var input_name;
	//console.log(tagnames);
	input_name = "attribute_name=";
	input_value = $('#attributeName').html()+'&';
	temp += input_name;
    temp += input_value;

	var tagnames = $('.tagName').length;
	input_name = "attribute_value=";
	var value = '';
	var reg = "^[a-zA-Z0-9_\u4e00-\u9fa5\uf900-\ufa2d]+$";	
	for(i=0;i<tagnames;i++){
		value += $(".tagName").eq(i).html()+',';
		//console.log(value);
	}
	value = value.substring(0,value.length-1);
	input_value = value+'&';
	temp += input_name;
    temp += input_value;

	input_name = "user=";
	input_value ="admint&";
	temp += input_name;
    temp += input_value;
	input_name = "date=";
	input_value =cDate()+'&';
	temp += input_name;
    temp += input_value;
	temp = temp.substring(0, temp.length-1);
	console.log(temp);
	return temp;
}
function cDate(){
	var myDate = new Date();
	var yy = myDate.getFullYear();
	var mm = myDate.getMonth() + 1;
	if(mm<10){
		mm = '0'+mm.toString();
		
	}
	var dd = myDate.getDate();
	if(dd<10){
		dd = '0'+dd.toString();
	}
	
	var date = yy.toString()+ '-' + mm.toString() + '-' + dd.toString();
	//console.log(date);
	return date;
}
var TagChange = new TagChange();
//Tag.call_sync_ajax_request(url, Tag.ajax_method, Tag.AddTag);
tagChangeFun(TagChange);

