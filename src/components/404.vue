

<style lang="scss">
			body{ margin:0; 
      padding:0;
       background:#efefef; 
       font-family:Georgia, Times, Verdana, Geneva, Arial, Helvetica, sans-serif; }
			div#mother{ margin:0 auto; width:943px; height:572px; position:relative; }
			#errorBox{ background: url(../images/shiyanyisu.com_bg.png) no-repeat top left; 
      width:943px; height:572px; margin:auto; }
			div#errorText{ color:#39351e; padding:115px 0 0 446px }
			div#errorText p{ width:303px; font-size:14px; line-height:26px; }
			div.link{ /*background:#f90;*/ height:50px; width:145px; float:left; }
			div#home{ margin:20px 0 0 444px;}
			div#contact{ margin:20px 0 0 25px;}
			h1{ font-size:40px; margin-bottom:35px; }
		</style>

<template>
    <div id="mother">
			<div id="errorBox">
				<div id="errorText">
					<h1>Sorry..页面没有找到！</h1>
					<p>
						似乎你所寻找的网页已移动或丢失了。
						<p>或者也许你只是键入错误了一些东西。</p>
						我们建议你返回首页官网进行浏览
					</p>

					<p>
						或者请与管理员联系，谢谢！
					</p>
				</div>
				<a href="/" title="返回首页">
					<div class="link" id="home"></div>
				</a>
				<a href="http://www.17sucai.com/" title="联系管理员">
					<div class="link" id="contact"></div>

				</a>
			</div>
		</div>
</template>
