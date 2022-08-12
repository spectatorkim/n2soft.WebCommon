/*
 * http://www.cyber-i.com/
 * 최초 작성자 : dajinnim@cyber-i.com
 * 마지막 수정자 : dajinnim@cyber-i.com
 */
(function(R) {
	R.fn.getSVG = function(submitObject){

		var paper = this,
			restore = {svg: R.svg, vml: R.vml};

		if(!submitObject)
			var submitObject = {};

		if(!submitObject.url || submitObject.url == '') // java url
			submitObject.url = "/WEB-APP/export/image";
		if(!submitObject.file || submitObject.file == '') // 확장자
			submitObject.file = "png";
		if(!submitObject.name || submitObject.name == '') // 파일명
			submitObject.name = "image";
		if(!submitObject.width || submitObject.width == '') // 넓이
			submitObject.width = paper.width;
		if(!submitObject.height || submitObject.height == '') // 높이
			submitObject.height = paper.height;

		// 자동 서밋 안되고 <svg> 만 얻고 싶은 경우
		// PDF 등에서 사용.
		var completeImage = null;
		if(submitObject.done != undefined && submitObject.done != null && submitObject.done != '') {
			completeImage = submitObject.done;
		}


		var getForm = function(val){
			var form = $('<form>');
			form.attr('method', 'post').css('display', 'none');

			var input = $('<input type="hidden">');
			input.attr('name', 'SVGSTRING').val(val);

			form.append(input);


			// 이미지타입(png, jpeg, tiff) 파라미터
			var typeInput = $('<input type="hidden">');
			typeInput.attr('name', 'TYPE').val(submitObject.file);	//png, jpeg, tiff
			form.append(typeInput);

			// 파일 이름 파라미터
			var fileNameInput = $('<input type="hidden">');
			fileNameInput.attr('name', 'FILENAME').val(submitObject.name);
			form.append(fileNameInput);

			return form;
		};

		var submitForm = function(val){
			var form = getForm(val);

			form.attr('action', submitObject.url);

			document.body.appendChild(form[0]);
			form.submit();
			form.remove();

			return false;
		};

		var lastVMLNode = function(val, _obj){
			if(fills.length > 0) {
				val += '</defs>';
			}

			val += _obj;
			val += '</svg>';

			val = val.replaceAll(' class="undefined"', '');
			val = val.replaceAll(' class=undefined', '');

			return val;

		};

		// IE에서 SVGElement에 innerHTML이 지원되지 않아 만듬.
		var innerHTML = function (node) {
			var s = new XMLSerializer();
			var childrens = node.childNodes;
			var str = "";
			for(var i = 0; i < childrens.length; i++) {
				str += s.serializeToString(childrens[i]);
			}

			return str;
		};

		var svgStr = '';
		svgStr = '<svg style="overflow: hidden; position: relative;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + submitObject.width + '" version="1.1" height="' + submitObject.height + '">';

		if(restore.svg) {
			// var toSVG = paper.toSVG();
			// svgStr += toSVG;
			
			// svgStr += paper.canvas.innerHTML;
			svgStr += innerHTML(paper.canvas);
			svgStr += '</svg>';

			svgStr = svgStr.replaceAll(' stroke-dasharray=" "', "");
			svgStr = svgStr.replaceAll(' fill="undefined"', "");
			svgStr = svgStr.replaceAll(' d=""', "");
			svgStr = svgStr.replaceAll('&apos;', "'");

			
			if(submitObject.log) {
				console.log(svgStr);
				return;
			}

			if(completeImage != null) completeImage(svgStr);
			else {
				svgStr = encodeURIComponent(svgStr);
				
				submitForm(svgStr);
			}

		} else {
			var toSVG = paper.toSVG();

			var obj = $(svgStr + paper.toSVG() + '</svg>');


			var objs = obj.find('[fill^=url]');
			var fills = [];
			$.each(objs, function(idx, node){
				if(node.fill.indexOf('#') > -1){

				} else {
					fills.push(node);
				}
				if(node["class"] == "undefined" || node["class"] == '')
					node.removeAttr('class');

			});
			var fillsLength = fills.length;

			var thingToDoCompleted = function(item, img) {
				fillsLength --;

				if(fillsLength == 0) {
					var val = lastVMLNode(svgStr, toSVG);

					if(submitObject.log) {
						console.log(val);
						return;
					}

					if(completeImage != null) completeImage(val);
					else
						submitForm(encodeURIComponent(val));
				}
			};

			var loader = function(items, thingToDo, allDone){
				if(!items) return;
				if("undefined" === items.length) items = [items];

				for(var i = 0; i < items.length; i ++){
					loadImage(items, i, allDone);
				}
			};

			var onloadFunction = function(node, imgSrc, onComplete, img){
				var ids = Raphael.createUUID();
				var transPos = {};

				if(node.x && node.y){
					transPos.x = node.x;
					transPos.y = node.y;

				} else if (node.cx != undefined) {

					transPos.x = node.cx;
					transPos.y = node.cy;
				}else {

					var num = '', nCount = 3;
					var pos = [];
					for(var i = 0, length = node.d.length; i < length; i++){
						if(nCount == 0) break;

						if(!isNaN(node.d[i]) || node.d[i] === '.'){ // 숫자이면
							num += node.d[i];
						} else {
							if(num!= '') {
								pos.push(num);
							}
							num = '';
							nCount --;
						}
					}

					transPos.x = pos[0];
					transPos.y = pos[1];

					if(transPos.x == undefined) transPos.x = 0;
					if(transPos.y == undefined) transPos.y = 0;

				}
				svgStr += '<pattern id="'+ids+'" x="0" y="0" patternUnits="userSpaceOnUse" width="'+img.width+'" height="'+img.height+'" patternTransform="matrix(1,0,0,1,0,0) translate('+transPos.x+','+transPos.y+')" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">';
				svgStr += '<image x="0" y="0" xlink:href="'+imgSrc+'" width="'+img.width+'" height="'+img.height+'" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></image>';
				svgStr += "</pattern>";

				node.fill = 'url(#'+ids+')';

				/*
					jQuery에서 linearGradient 속성중 id의 쌍따옴표를 삭제해버린다.
					이 때문에 사용.
				 */
				var idx = toSVG.indexOf('url('+imgSrc+')'), leng = String('url('+imgSrc+')').length;
				toSVG = toSVG.substring(0, idx) + 'url(#'+ids+')' + toSVG.substring(idx + leng);

				onComplete(node, this);
			};
			var loadImage = function(items, i, onComplete) {
				var imgSrc = items[i].fill;

				imgSrc = imgSrc.split('(')[1];
				imgSrc = imgSrc.split(')')[0];

				var img = new Image();

				img.onload = function(){
					onloadFunction(items[i], imgSrc, onComplete, this);

					img.onload = img.onerror = null;
					img = null;
				};

				img.onerror = function(e){
					console.log(e.message);
				};

				img.src = imgSrc;
			};



			if(fills.length > 0) { // 이미지가 한개 이상일 경우
				svgStr += '<desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Chart</desc><defs>';

				loader(fills, loadImage, thingToDoCompleted);
			} else { // 그외.

				// lastVMLNode(svgStr, toSVG);
				var val = lastVMLNode(svgStr, toSVG);

				if(submitObject.log) {
					console.log(val);
					return;
				}

				if(completeImage != null) completeImage(val);
				else
					submitForm(encodeURIComponent(val));
			}
		}
	}

})(window.Raphael);