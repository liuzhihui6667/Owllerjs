Icon
=
Icon组件提供一套通用的图标，可以很方便的使用。

样例
-
|    图标  |     名称      |     图标    |      名称      |
|:-------:|:-------------:|:----------:|:-------------:|
|   <img src="../../static/md/image/dashboard.png" width="25" height="25" />   |     dashboard    |    <img src="../../static/md/image/close.png" width="25" height="25" />    |	  close	   |
|   <img src="../../static/md/image/store.png" width="25" height="25" />   |     store    |    <img src="../../static/md/image/setting.png" width="25" height="25" />    |	  setting	   |
|   <img src="../../static/md/image/left.png" width="25" height="25" />   |     left    |    <img src="../../static/md/image/right.png" width="25" height="25" />    |	  right	   |
|   <img src="../../static/md/image/top.png" width="25" height="25" />   |     top    |    <img src="../../static/md/image/bottom.png" width="25" height="25" />    |	  bottom	   |
|   <img src="../../static/md/image/outdent.png" width="25" height="25" />   |     store    |    <img src="../../static/md/image/indent.png" width="25" height="25" />    |	  setting	   |

使用
-

只需要在需要插入图标的位置加入如下标签即可,Icon渲染器会自动渲染。
```javascript
<owl-icon name="store"></owl-icon>
```

如果你想改变该图标的大小及样式，可以为该标签添加class或者style属性，<font color=red>如果为其添加class，请注意CSS权重问题。如下所示</font>
```javascript
//为图标添加style属性
<owl-icon name="store" style="width: 100px;height: 100px"></owl-icon>

//为图标添加class属性
<style>
	//第一种加权方式
	svg.my-icon {
		width: 100px;
		height: 100px;
	}
	//第二种加权方式
	.my-icon {
		width: 100px !important;
		height: 100px !important;
	}
</style>
<owl-icon name="store" class="my-icon"></owl-icon>
```

属性
-
|	属性名称		|	属性描述		|	示例值	|
|:-------------:|:-------------:|:----------:|
|	name		|	该图标的名称，从样例表中获取		|	dashboard, store, left	|