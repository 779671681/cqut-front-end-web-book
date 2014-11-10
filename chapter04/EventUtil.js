 (function (window, undefined) {
	var isIE = !!window.attachEvent,
		isOther = !!window.addEventListener;

	function returnFalse() {
		return false;
	}

	function returnTrue() {
		return true;
	}

	//�ı��ڵ��ע�ͽڵ㲻�ܽ���event�Ȳ���
	function isSuit(obj) {
		if (obj.nodeType === 3 || obj.nodeType === 8) {
			return returnFalse();
		} else {
			return returnTrue();
		}
	}

	function getEvent(event) {
		return e = event || window.event;
	}

	var EventUtil = new Object();

	EventUtil.getEvent = getEvent;

	//���¼�
	EventUtil.addEvent = function(obj, type, callback, isBubble) {
		if(isSuit(obj)) {
			if(isIE) {
				obj.attachEvent('on' + type, callback);
				return this;
			} else if(isOther) {
				obj.addEventListener(type, callback, isBubble);
				return this;
			} else {
				obj['on' + type] = callback;
				return this;
			}
		} else {
			return this;
		}
	};
	//����¼�
	EventUtil.removeEvent = function (obj, type, callback, isBubble){
		if(isIE) {
			obj,detachEvent('on' + type, callback);
		} else if(isOther) {
			obj.removeEventListener(type, callback, isBubble);
		} else {
			obj['on' + type] = null;
		}
	};
	//��ֹĬ����Ϊ
	EventUtil.preventDefault = function (e) {
		if(isIE) {
			e.returnValue = false;
		} else if(isOther) {
			e.preventDefault();
		}
	};
	//��ֹð�ݻ���ί��
	EventUtil.stopPropagation = function () {
		if(isIE) {
			e.cancelBubble = true;
		} else if(isOther) {
			e.stopPropagation();
		}
	};
	//����mouseout��mouseover�ȣ�����¼�Ŀ��
	EventUtil.getRelatedTarget = function(){
        if(e.relatedTarget) {
			return e.relatedTarget;
        } else if(e.toElement) {
			e.toElement;
        } else if(e.fromElement) {
			e.fromElement;
        } else {
			returnFalse();
        }
	};
	//��ȡkeycode
	EventUtil.getKeyCode = function(){
		if(typeof e.charCode == "number") {
			return e.charCode;
		} else {
			return e.keyCode
		}       
    },
	//��ȡʵ���¼�Դ
	EventUtil.getTarget = function (event) {
		var e = getEvent(event);

		return e.target || e.srcElement;
	}

	EventUtil.time = (new Date).getTime();

	window.EventUtil = EventUtil;
})(window);