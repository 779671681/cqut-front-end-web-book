;(function(win, doc){
 
	/**
     * @description �����Ի���
     * @param con Ҫ��ʾ������
     * @param tit�Ի������
     * @param wid�Ի�����
     * @param lef�Ի���ˮƽ����
     * @param top�Ի�����ֱ����
     */
	var Dialog = function(con, tit, wid, lef, top, fun) {
		con = con || "";
		tit = tit || "";
		wid = wid | 0 || 300;

		var ui = creatUI(con, tit, wid);// ����UI

		doc.body.appendChild(ui.content);// ��UI���뵽body��
		setPosition(ui.content, lef, top);// ����λ��

		EventUtil.addEvent(ui.elements[4], 'click', closeFun);// �󶨹ر��¼�

		this.ui = ui;
	};

	function closeFun(event) {// ����رհ�ťִ�еķ���
		debugger
		event = EventUtil.getEvent(event);// ��ȡ�¼�����
		var target = EventUtil.getTarget(event);
		target.setAttribute("isClose", "1");// ���ùرձ�ǣ���ֹ�رպ����close() ����
		EventUtil.preventDefault(event);// ��ֹĬ���¼�
		EventUtil.removeEvent(target ,"click", closeFun);
		doc.body.removeChild(target.offsetParent.offsetParent);
	}

	Dialog.prototype.setWidth = function(width) {
		this.ui.content.style.width = width + 'px';
	}

	Dialog.prototype.setHeight = function(width) {
		this.ui.content.style.height = width + 'px';
	}

	Dialog.prototype.close = function() {
		if(null !== this.ui && !this.ui.elements[4].getAttribute("isClose")) {
			EventUtil.removeEvent(this.ui.elements[4] ,"click", closeFun);
			doc.body.removeChild(this.ui.content);
		}
		this.ui = null;
	}

	function creatUI(con, tit, wid) {

		var uiArr = [doc.createElement('div'), doc.createElement('div'),
			doc.createElement('span'), doc.createTextNode(tit), 
			doc.createElement('a'), doc.createElement('div'),
			doc.createTextNode(con), doc.createElement('div')],
			main = uiArr[0],// �Ի�������
			head = uiArr[1],// ���ⲿ��
			title = uiArr[2],// ����
			titText = uiArr[3],// ��������
			close = uiArr[4],// �رհ�ť
			content = uiArr[5],// ���ݲ���
			conText = uiArr[6],// ��������
			moveHandler = uiArr[7];// �϶�����

		main.className = 'edu_dialog';
		head.className = 'dg_header';
		title.className = 'dg_title';
		close.className = 'dg_close_button';
		content.className = 'dg_content';
		moveHandler.className = 'dg_handler draggable';// ���ӽڵ�����϶�ʵ��

		if(wid > 0) {
			main.style.width = wid + 'px';
		}

		title.appendChild(titText);
		head.appendChild(title);
		head.appendChild(close);
		content.appendChild(conText);
		main.appendChild(moveHandler);
		main.appendChild(head);
		main.appendChild(content);

		return {content : main, elements : uiArr};
	}

	function setPosition(dom, lef, top) {
		// Ĭ��������Ǿ���(û�п��ǹ�����,���߿ɽ�һ������)
		var screen = DOMUtil.getViewportSize();// ��ȡ���ڴ�С
		dom.style.left = (lef == undefined ? ((screen.w - DOMUtil.getStyle(dom, 'width').slice(0, -2)) >> 1) : lef) + 'px'; 
		dom.style.top = (top == undefined ? ((screen.h - DOMUtil.getStyle(dom, 'height').slice(0, -2)) >> 1) : top)+ 'px';
	}

	win.Dialog = Dialog;
})(window, document);